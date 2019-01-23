<?php
/**
 * Image gallery class
 *
 * @author  Ibrahim Abdullah
 * @package flat_image_gallery
 */
class FlatImageGallery
{
    /**
     * @var AbstractObject
     */
    private $object;

    /**
     * @var array
     */
    private $images;

    /**
     * @var array
     */
    private $models;

    /**
     * @var string|null
     */
    private $imageId;

    /**
     * @var array
     */
    private $current;

    /**
     * Constructor
     *
     * @param AbstractObject $object
     * @param string|null    $imageId
     */
    public function __construct(AbstractObject $object, $imageId = null)
    {
        $this->object  = $object;
        $this->imageId = $imageId;
    }

    /**
     * fetching models
     *
     * @return array
     */
    public function getModels()
    {
        if (null === $this->models) {

            module_load_include('inc', 'flat_image_gallery', 'includes/FlatImageGallerySolr');

            $solr         = new FlatImageGallerySolr();
            $this->models = $solr->models($this->object->id);
        }

        return $this->models;
    }

    /**
     * fetching images
     *
     * @return XML
     */
    public function getImages()
    {
        if ($this->images !== null) {
            return $this->images;
        }

        if (!isset($this->object['CMD']) || !($cmd = $this->object['CMD']->content)) {

            $this->images = [];
            return $this->images;
        }

        $input  = new DOMDocument();
        $loaded = $input->loadXML($cmd);
        $images = [];

        if ($loaded) {

            $xpath  = new DOMXPath($input);
            $xpath->registerNamespace('cmd', 'http://www.clarin.eu/cmd/');
            $items  = $xpath->query('/cmd:CMD/cmd:Resources/cmd:ResourceProxyList/cmd:ResourceProxy/cmd:ResourceType[starts-with(@mimetype, "image/")]/parent::node()');
            $models = $this->getModels();

            foreach ($items as $item) {

                $id        = $item->attributes->getNamedItem('id')->value;
                $pid       = $item->getElementsByTagName('ResourceRef')[0]->attributes->getNamedItem('flatURI')->value;
                $thumbnail = false;

                if (isset($models[$pid]) && in_array('islandora:sp_large_image_cmodel', $models[$pid]['models'])) {
                    $thumbnail = url('islandora/object/' . $pid . '/datastream/JPG/view');
                } elseif (isset($models[$pid]) && in_array('info:fedora/islandora:sp_basic_image', $models[$pid]['models'])) {
                    $thumbnail = url('islandora/object/' . $pid . '/datastream/MEDIUM_SIZE/view');
                } else {
                    continue;
                }

                $descriptions = $xpath->query('//*[@ref="' . $id . '"]')[0]->getElementsByTagName('Description');
                $label        = false;

                if ($descriptions->length > 0) {
                    $label = $descriptions[0]->textContent;
                }

                $images[$id] = [

                    'pid'       => $pid,
                    'id'        => $id,
                    'label'     => $label,
                    'url'       => url('islandora/object/' . $this->object->id . '/ig/' . $id),
                    'thumbnail' => $thumbnail,
                ];
            }
        }

        $this->images = $images;

        return $this->images;
    }

    /**
     * Get current Id
     *
     * @return string
     */
    public function getCurrentId()
    {
        if (null === $this->imageId) {

            $images        = $this->getImages();
            $this->imageId = current($images)['id'];
        }

        return $this->imageId;
    }

    /**
     * Getting current pid
     *
     * @return string
     */
    public function getCurrentPid()
    {
        $images    = $this->getImages();
        $currentId = $this->getCurrentId();

        return isset($images[$currentId]) ? $images[$currentId]['pid'] : current($images)['pid'];
    }

    /**
     * Getting current image
     *
     * @return string
     */
    public function getCurrentImage()
    {
        if ($this->current === null) {

            $images  = $this->getImages();
            $models  = $this->getModels();
            $id      = $this->getCurrentId();
            $pid     = $this->getCurrentPid();
            $label   = isset($images[$id]) ? $images[$id]['label'] : false;

            if (isset($models[$pid]) && in_array('islandora:sp_large_image_cmodel', $models[$pid]['models'])) {

                $current = islandora_object_load($pid);
                $token   = islandora_get_object_token($current->id, 'JP2', 2);
                $params  = [

                    'token' => $token,
                    'pid'   => $current->id,
                    'dsid'  => 'JP2',
                ];

                $viewer = islandora_get_viewer($params, 'islandora_large_image_viewers', $current);

                $this->current = [

                    'pid'    => $current->id,
                    'viewer' => $viewer,
                    'label'  => $label,
                ];

            } elseif (isset($models[$pid]) && in_array('info:fedora/islandora:sp_basic_image', $models[$pid]['models'])) {

                $this->current = [

                    'pid'    => $pid,
                    'viewer' => '<img src="' . url('islandora/object/' . $pid . '/datastream/OBJ/view') . '" />',
                    'label'  => $label,
                ];

            } else {
                $this->current = false;
            }
        }

        return $this->current;
    }

    /**
     * Preparing prev/next links
     *
     * @return array
     */
    public function getNavigationLinks()
    {
        $images    = $this->getImages();
        $currentId = $this->getCurrentId();
        $previous  = false;
        $next      = false;

        if (count($images) < 2) {
            return false;
        }

        // first resetting pointer
        reset($images);

        // getting first and last image
        $first = current($images);
        $last  = end($images);

        // resetting pointer again
        reset($images);

        // getting pointer to current image
        while (key($images) !== $currentId) {
            next($images);
        }

        // if not on first image
        // get previous and move pointer to next object
        if ($first['id'] !== $currentId) {

            $previous = prev($images);
            next($images);
        }

        $next  = next($images);
        $links = [];

        return [

            'previous' => $this->generateNavigationLink('Previous', $previous),
            'next'     => $this->generateNavigationLink('Next', $next),
        ];
    }

    /**
     * Generate navigation link
     *
     * @param string       $label
     * @param string|false $image
     *
     * @return string
     */
    public function generateNavigationLink(string $label, $image = false): string
    {
        return (false === $image ? $label : l($label, 'islandora/object/' . $this->object->id . '/ig/' . $image['id']));
    }
}
