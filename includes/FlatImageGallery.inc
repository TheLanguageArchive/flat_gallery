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
     * @var FlatImageGallerySolr
     */
    private $solr;

    /**
     * @var int
     */
    private $total;

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
     * @param AbstractObject       $object
     * @param FlatImageGallerySolr $solr
     * @param string|null          $imageId
     */
    public function __construct(AbstractObject $object, FlatImageGallerySolr $solr, $imageId = null)
    {
        $this->object  = $object;
        $this->solr    = $solr;
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

            $id      = 0;
            $results = $this->solr->getImages($this->object->id);
            $labels  = $this->getLabels();

            $this->total  = $results['total'];
            $this->images = [];

            foreach ($results['results'] as $result) {

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

                    'id'           => $id,
                    'pid'          => $result['pid'],
                    'filename'     => $result['filename'],
                    'thumbnail'    => $thumbnail,
                    'model'        => $model,
                    'url'          => url('islandora/object/' . $this->object->id . '/ig/' . $id),
                    'descriptions' => (isset($labels[$result['pid']]) ? $labels[$result['pid']]['descriptions'] : []),
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

        if (!isset($this->object['CMD']) || !$this->object['CMD']->content) {

            $this->labels = [];
            return $this->labels;
        }

        $input  = new DOMDocument();
        $loaded = $input->loadXML($this->object['CMD']->content);
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
                $descriptions = [];
                $rows         = $item->getElementsByTagName('Description');

                foreach ($rows as $row) {

                    if ($row->textContent) {
                        $descriptions[] = $row->textContent;
                    }
                }

                if (isset($map[$id])) {

                    $labels[$map[$id]] = [

                        'id'           => $id,
                        'pid'          => $map[$id],
                        'descriptions' => $descriptions,
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

                    'id'           => $currentImage['id'],
                    'pid'          => $current->id,
                    'viewer'       => $viewer,
                    'descriptions' => $currentImage['descriptions'],
                ];

            } elseif ($currentImage['model'] === 'info:fedora/islandora:sp_basic_image') {

                $this->current = [

                    'id'           => $currentImage['id'],
                    'pid'          => $currentImage['pid'],
                    'viewer'       => '<img src="' . url('islandora/object/' . $currentImage['pid'] . '/datastream/OBJ/view') . '" />',
                    'descriptions' => $currentImage['descriptions'],
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
     * @param array        $params
     *
     * @return string
     */
    public function generateNavigationLink(string $label, $image = false, $params = []): string
    {
        return (false === $image ? $label : l(decode_entities($label), 'islandora/object/' . $this->object->id . '/ig/' . $image['id'], ['query' => $params]));
    }

    /**
     * Pagination links
     *
     * @return array
     */
    public function getPaginationLinks()
    {
        $images       = $this->getImages();
        $currentImage = $this->getCurrentImage();
        $params       = $this->solr->paginationParams();

        $pages = (int)ceil($this->total / $params['per_page']);
        $links = [];

        if ($params['page'] > $pages) {
            $params['page'] = $pages;
        }

        $links[] = $this->generateNavigationLink('&laquo;', ($params['page'] === 0 ? false : ($params['page'] - 1)), ['page' => ($params['page'] - 1)]);

        for ($page = 0; $page < $pages; $page++) {
            $links[] = $this->generateNavigationLink($page + 1, ($page === $params['page'] ? false : $currentImage), ['page' => $page]);
        }

        $links[] = $this->generateNavigationLink('&raquo;', ($params['page'] === ($pages - 1) ? false : ($params['page'] + 1)), ['page' => ($params['page'] + 1)]);

        return $links;
    }
}
