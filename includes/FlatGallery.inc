<?php
module_load_include('inc', 'islandora', 'includes/authtokens');
module_load_include('inc', 'islandora', 'includes/solution_packs');

/**
 * FLAT Gallery class
 *
 * @author  Ibrahim Abdullah
 * @package FLAT Gallery
 */
class FlatGallery
{
    /**
     * @var AbstractObject
     */
    private $object;

    /**
     * @var FlatGallerySolr
     */
    private $solr;

    /**
     * @var int
     */
    private $total;

    /**
     * @var array
     */
    private $items;

    /**
     * @var array
     */
    private $labels;

    /**
     * @var string|null
     */
    private $id;

    /**
     * @var array
     */
    private $current;

    /**
     * Constructor
     *
     * @param AbstractObject  $object
     * @param FlatGallerySolr $solr
     * @param string|null     $id
     */
    public function __construct(AbstractObject $object, FlatGallerySolr $solr, $id = null)
    {
        $this->object = $object;
        $this->solr   = $solr;
        $this->id     = (int)$id;
    }

    /**
     * fetching items
     *
     * @return array
     */
    public function getItems()
    {
        if (null === $this->items) {

            $id      = 0;
            $results = $this->solr->getItems($this->object->id);
            $params  = $this->solr->paginationParams();
            $labels  = $this->getLabels();

            $this->total = $results['total'];
            $this->items = [];

            foreach ($results['results'] as $result) {

                $thumbnail = false;
                $model     = false;

                if (is_array($result['models']) && in_array('islandora:sp_large_image_cmodel', $result['models'])) {

                    $thumbnail   = url('islandora/object/' . $result['pid'] . '/datastream/JPG/view');
                    $model       = 'islandora:sp_large_image_cmodel';
                    $viewer_type = 'large';

                } elseif (is_array($result['models']) && in_array('islandora:sp_basic_image', $result['models'])) {

                    $thumbnail   = url('islandora/object/' . $result['pid'] . '/datastream/MEDIUM_SIZE/view');
                    $model       = 'islandora:sp_basic_image';
                    $viewer_type = 'basic';

                } else {
                    continue;
                }

                $this->items[$id] = [

                    'id'           => $id,
                    'pid'          => $result['pid'],
                    'filename'     => $result['filename'],
                    'thumbnail'    => $thumbnail,
                    'model'        => $model,
                    'viewer_type'  => $viewer_type,
                    'object'       => url('islandora/object/' . $result['pid'] . '/datastream/OBJ/view'),
                    'url'          => url('islandora/object/' . $this->object->id . '/ig/' . $id, ['query' => ['page' => $params['page']]]),
                    'descriptions' => (isset($labels[$result['pid']]) ? $labels[$result['pid']]['descriptions'] : []),
                ];

                $id += 1;
            }
        }

        return $this->items;
    }

    /**
     * fetching labels
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

            // loading cmd to allow xpath
            $xpath  = new DOMXPath($input);
            $xpath->registerNamespace('cmd', 'http://www.clarin.eu/cmd/');

            // fetching id and pid to create a mapping array
            $items = $xpath->query('/cmd:CMD/cmd:Resources/cmd:ResourceProxyList/cmd:ResourceProxy/cmd:ResourceType[starts-with(@mimetype, "image/")]/parent::node()');
            $map   = [];

            foreach ($items as $item) {

                $id  = $item->attributes->getNamedItem('id')->value;
                $pid = $item->getElementsByTagName('ResourceRef')[0]->attributes->getNamedItem('flatURI')->value;

                $map[$id] = $pid;
            }

            // getting the descriptions, grouped by id
            // and using mapping array above to connect the two
            $items  = $xpath->query('//*[@ref]');
            $labels = [];

            foreach ($items as $item) {

                $id           = $item->attributes->getNamedItem('ref')->value;
                $rows         = $item->getElementsByTagName('Description');
                $descriptions = [];

                foreach ($rows as $row) {

                    if ($row->textContent) {
                        $descriptions[] = $row->textContent;
                    }
                }

                // only add the descriptions if we have a mapping
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
     * Get current id, since the gallery is connected
     * to the compound object, if no id was injected
     * use the current item in the resultset
     *
     * @return string
     */
    public function getCurrentId()
    {
        if (null === $this->id) {

            $items    = $this->getItems();
            $this->id = current($items)['id'];
        }

        return $this->id;
    }

    /**
     * Getting current item, either from the url
     * or the first one in the resultset
     *
     * @return string
     */
    public function getCurrentItem()
    {
        if ($this->current === null) {

            $items = $this->getItems();
            $id    = $this->getCurrentId();

            if (!isset($items[$id])) {

                $this->current = false;
                return false;
            }

            $currentItem = $items[$id];
            $current     = islandora_object_load($currentItem['pid']);

            if ($currentItem['model'] === 'islandora:sp_large_image_cmodel') {

                $this->current = [

                    'id'           => $currentItem['id'],
                    'pid'          => $current->id,
                    'object'       => $current,
                    'filename'     => $currentItem['filename'],
                    'viewer_type'  => 'large',
                    'viewer'       => '<div id="islandora-openseadragon-new" class="islandora-openseadragon"></div>',
                    'descriptions' => $currentItem['descriptions'],
                ];

            } elseif ($currentItem['model'] === 'islandora:sp_basic_image') {

                // if basic image just display the contents of the object
                // and load it into a html img tag
                $this->current = [

                    'id'           => $currentItem['id'],
                    'pid'          => $currentItem['pid'],
                    'object'       => $current,
                    'filename'     => $currentItem['filename'],
                    'url'          => $currentItem['object'],
                    'orientation'  => $this->getOrientation($current),
                    'viewer_type'  => 'openseadragon-basic',
                    'viewer'       => '<div id="islandora-openseadragon-new" class="islandora-openseadragon"></div>',
                    'descriptions' => $currentItem['descriptions'],
                ];

            } else {

                // no large or basic image, so do not display object
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
        $items     = $this->getItems();
        $currentId = $this->getCurrentId();

        $previous  = false;
        $next      = false;

        // first resetting pointer
        reset($items);

        // getting first and last item
        $first = current($items);
        $last  = end($items);

        // resetting pointer again
        reset($items);

        // getting pointer to current item
        while (key($items) !== $currentId) {
            next($items);
        }

        // if not on first item
        // get previous and move pointer to next object
        if ($first['id'] !== $currentId) {

            $previous = prev($items);
            next($items);
        }

        $next   = next($items);
        $params = $this->solr->paginationParams();
        $links  = [];

        if (false !== $previous) {

            // we found a previous item
            $links['previous'] = $this->generateNavigationLink('Previous', $previous['id'], ['page' => $params['page']], 'previous');
        }

        if (false === $previous && $params['page'] > 0) {

            // first item on the page, let's use the link to go the previous page
            $links['previous'] = $this->generateNavigationLink('Previous', (variable_get('flat_gallery_pagination_limit', FLAT_GALLERY_DEFAULT_PAGINATION_LIMIT) - 1), ['page' => $params['page'] - 1], 'previous');
        }

        if (!isset($links['previous'])) {

            // no previous link found, let's create an empty link
            $links['previous'] = 'Previous';
        }

        if (false !== $next) {

            // next item found
            $links['next'] = $this->generateNavigationLink('Next', $next['id'], ['page' => $params['page']], 'next');
        }

        if (false === $next) {

            // last item on the page, let's use the link to go the next page
            $pagination = $this->getPaginationLinks();
            $pages      = (int)ceil($this->total / $params['per_page']);

            if ($params['page'] < ($pages - 1)) {

                // we have a next page
                $links['next'] = $this->generateNavigationLink('Next', 0, ['page' => $params['page'] + 1], 'next');
            }
        }

        if (!isset($links['next'])) {

            // no next link found, display empty link
            $links['next'] = 'Next';
        }

        return $links;
    }

    /**
     * Generate navigation link
     *
     * @param string    $label
     * @param int|false $id
     * @param array     $params
     *
     * @return string
     */
    public function generateNavigationLink(string $label, $id = false, $params = [], $nav = false): string
    {
        $params = [
            'query' => $params,
        ];

        if (false !== $nav) {

            $params['attributes'] = [
                'data-flat-gallery-nav' => $nav,
            ];
        }

        return (false === $id ? $label : l(
            decode_entities($label),
            'islandora/object/' . $this->object->id . '/ig/' . $id,
            $params
        ));
    }

    /**
     * Pagination links
     *
     * @return array
     */
    public function getPaginationLinks()
    {
        $items       = $this->getItems();
        $currentItem = $this->getCurrentItem();
        $params      = $this->solr->paginationParams();

        $pages = (int)ceil($this->total / $params['per_page']);
        $links = [];

        if ($params['page'] > $pages) {
            $params['page'] = $pages;
        }

        // if current page is 0, disable previous link
        // or else link to first item on the previous page
        $previous          = $params['page'] === 0 ? false : 0;
        $links['previous'] = $this->generateNavigationLink('&laquo;', $previous, ['page' => ($params['page'] - 1)]);

        for ($page = 0; $page < $pages; $page++) {

            // if current page equals page selected
            // disable link or else link to first item on page selected
            $current = $page === $params['page'] ? false : 0;
            $links[] = $this->generateNavigationLink($page + 1, $current, ['page' => $page]);
        }

        // if current page equals total pages - 1 (start from 0)
        // disable link or else link to first item on next page
        $next          = $params['page'] === ($pages - 1) ? false : 0;
        $links['next'] = $this->generateNavigationLink('&raquo;', $next, ['page' => ($params['page'] + 1)]);

        return $links;
    }

    /**
     * Get EXIF orientation
     *
     * @param AbstractObject $object
     *
     * @return integer
     */
    private function getOrientation(AbstractObject $object)
    {
        $file         = str_replace('file:', '', $object->getDatastream('OBJ')->url);
        $exif         = @exif_read_data($file);
        $orientations = [3 => 180, 6 => -90, 8 => 90];

        if (!isset($exif['Orientation']) || empty($exif['Orientation'])) {
            return 0;
        }

        return isset($orientations[$exif['Orientation']]) ? $orientations[$exif['Orientation']] : 0;
    }
}
