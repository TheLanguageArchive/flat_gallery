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
    private $labels;

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
        $this->imageId = (int)$imageId;
    }

    /**
     * fetching models
     *
     * @return array
     */
    public function getImages()
    {
        if (null === $this->images) {

            $this->images = [];

            module_load_include('inc', 'flat_image_gallery', 'includes/FlatImageGallerySolr');

            $solr    = new FlatImageGallerySolr();
            $results = $solr->getImages($this->object->id);

            $id      = 0;
            $labels  = $this->getLabels();

            foreach ($results as $result) {

                $thumbnail = false;
                $model     = false;

                if (is_array($result['models']) && in_array('islandora:sp_large_image_cmodel', $result['models'])) {

                    $thumbnail = url('islandora/object/' . $result['pid'] . '/datastream/JPG/view');
                    $model     = 'islandora:sp_large_image_cmodel';

                } elseif (is_array($result['models']) && in_array('info:fedora/islandora:sp_basic_image', $result['models'])) {

                    $thumbnail = url('islandora/object/' . $result['pid'] . '/datastream/MEDIUM_SIZE/view');
                    $model     = 'info:fedora/islandora:sp_basic_image';

                } else {
                    continue;
                }

                $this->images[$id] = [

                    'id'        => $id,
                    'pid'       => $result['pid'],
                    'thumbnail' => $thumbnail,
                    'model'     => $model,
                    'url'       => url('islandora/object/' . $this->object->id . '/ig/' . $id),
                    'label'     => (isset($labels[$result['pid']]) ? $labels[$result['pid']]['label'] : false),
                ];

                $id += 1;
            }
        }

        return $this->images;
    }

    /**
     * fetching images
     *
     * @return XML
     */
    public function getLabels()
    {
        if ($this->labels !== null) {
            return $this->labels;
        }

        if (!isset($this->object['CMD']) || !($cmd = $this->object['CMD']->content)) {

            $this->labels = [];
            return $this->labels;
        }

        $input  = new DOMDocument();
        $loaded = $input->loadXML($cmd);
        $labels = [];

        if ($loaded) {

            $xpath  = new DOMXPath($input);
            $xpath->registerNamespace('cmd', 'http://www.clarin.eu/cmd/');

            $items = $xpath->query('/cmd:CMD/cmd:Resources/cmd:ResourceProxyList/cmd:ResourceProxy/cmd:ResourceType[starts-with(@mimetype, "image/")]/parent::node()');
            $map   = [];

            foreach ($items as $item) {

                $id  = $item->attributes->getNamedItem('id')->value;
                $pid = $item->getElementsByTagName('ResourceRef')[0]->attributes->getNamedItem('flatURI')->value;

                $map[$id] = $pid;
            }

            $items  = $xpath->query('//*[@ref]');
            $labels = [];

            foreach ($items as $item) {

                $id           = $item->attributes->getNamedItem('ref')->value;
                $label        = false;
                $descriptions = $item->getElementsByTagName('Description');

                if ($descriptions->length > 0) {
                    $label = $descriptions[0]->textContent;
                }

                if (isset($map[$id]) && false !== $label) {

                    $labels[$map[$id]] = [

                        'id'    => $id,
                        'pid'   => $map[$id],
                        'label' => $label,
                    ];
                }
            }
        }

        $this->labels = $labels;

        return $this->labels;
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
     * Getting current image
     *
     * @return string
     */
    public function getCurrentImage()
    {
        if ($this->current === null) {

            $images  = $this->getImages();
            $id      = $this->getCurrentId();

            if (!isset($images[$id])) {

                $this->current = false;
                return false;
            }

            $currentImage = $images[$id];

            if ($currentImage['model'] === 'islandora:sp_large_image_cmodel') {

                $current = islandora_object_load($currentImage['pid']);
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
                    'label'  => $currentImage['label'],
                ];

            } elseif ($currentImage['model'] === 'info:fedora/islandora:sp_basic_image') {

                $this->current = [

                    'pid'    => $currentImage['pid'],
                    'viewer' => '<img src="' . url('islandora/object/' . $currentImage['pid'] . '/datastream/OBJ/view') . '" />',
                    'label'  => $currentImage['label'],
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
