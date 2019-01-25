<?php
/**
 * @author  Ibrahim Abdullah
 * @package Flat Permissions
 */
class FlatImageGallerySolr
{
    /**
     * @var Apache_Solr_Service
     */
    private $solr;

    /**
     * @var array
     */
    private $pagination;

    /**
     * Connect to apache solr
     *
     * @return Apache_Solr_Service
     */
    public function connect()
    {
        if (null !== $this->solr) {
            return $this->solr;
        }

        $path_parts = parse_url(variable_get('islandora_solr_url', 'localhost:8080/solr'));

        $this->solr = new Apache_Solr_Service($path_parts['host'], $path_parts['port'], $path_parts['path'] . '/');
        $this->solr->setCreateDocuments(0);

        return $this->solr;
    }

    /**
     * Common solr query performer
     *
     * @param string $query
     * @param array $params
     *
     * @return array
     */
    public function query($query, $params = [])
    {
        $this->connect();

        try {

            $pagination = $this->paginationParams();
            $results    = $this->solr->search($query, $pagination['start'], $pagination['per_page'], $params);

        } catch (Exception $e) {

            drupal_set_message(check_plain(t('Error searching Solr index')) . ' ' . $e->getMessage(), 'error');
            return false;
        }

        return json_decode($results->getRawResponse(), true);
    }

    /**
     * Fetching images
     *
     * @param string $parent
     *
     * @return array
     */
    public function getImages($parent)
    {
        $data   = $this->query($this->childrenQuery($parent), $this->childrenParams($parent));
        $images = [];

        foreach ($data['response']['docs'] as $doc) {

            $images[$doc['PID']] = [

                'pid'      => $doc['PID'],
                'models'   => $doc['RELS_EXT_hasModel_uri_ms'],
                'filename' => $doc['fgs_label_s'],
            ];
        }

        return [

            'results' => $images,
            'total'   => $data['response']['numFound'],
            'start'   => $data['response']['start'],
        ];
    }

    /**
     * Children query
     *
     * @param string $parent
     *
     * @return string
     */
    public function childrenQuery($parent)
    {
        return format_string('!constituent_field:("info:fedora/!pid" OR "!pid")', [

            '!pid'               => $parent,
            '!constituent_field' => 'RELS_EXT_isConstituentOf_uri_ms',
        ]);
    }

    /**
     * Building children params
     *
     * @param string $parent
     *
     * @return array
     */
    public function childrenParams($parent)
    {
        global $user;

        $params = [

            'fq' => [

                'RELS_EXT_hasModel_uri_ms:("islandora:sp_large_image_cmodel" OR "info:fedora/islandora:sp_basic_image")',
                'RELS_EXT_isViewableByUser_literal_ms:"' . $user->name . '"
                    OR (
                        (*:* -RELS_EXT_isViewableByUser_literal_ms:[* TO *]) AND (*:* -RELS_EXT_isViewableByRole_literal_ms:[* TO *])
                    )',
            ],
        ];

        foreach ($user->roles as $role) {
            $params['fq'][1] .= ' OR (RELS_EXT_isViewableByRole_literal_ms:"' . $role . '") ';
        }

        $params['fl'][]  = 'PID, fgs_label_s, RELS_EXT_hasModel_uri_ms';
        $params['sort']  = variable_get('islandora_solr_object_label_field', 'fgs_label_s') . ' asc';

        return $params;
    }

    /**
     * Getting pagination params
     *
     * @return array
     */
    public function paginationParams()
    {
        if (null === $this->pagination) {

            $params   = drupal_get_query_parameters();
            $per_page = variable_get('flat_image_gallery_per_page', FLAT_IMAGE_GALLERY_DEFAULT_PAGINATION_LIMIT);
            $start    = 0;
            $page     = 0;

            if (isset($params['page']) && $params['page'] > 0) {

                $page  = (int)$params['page'];
                $start = $params['page'] * $per_page;
            }

            $this->pagination = [

                'page'     => ($page < 0 ? 0 : $page),
                'per_page' => $per_page,
                'start'    => $start,
            ];
        }

        return $this->pagination;
    }
}
