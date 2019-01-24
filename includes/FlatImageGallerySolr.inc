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
            $results = $this->solr->search($query, 0, 1000, $params);
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
        $models = [];

        foreach ($data['response']['docs'] as $doc) {

            $models[$doc['PID']] = [

                'pid'    => $doc['PID'],
                'models' => $doc['RELS_EXT_hasModel_uri_ms'],
            ];
        }

        return $models;
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

                'RELS_EXT_isViewableByUser_literal_ms:"' . $user->name . '"',
                'OR',
                '((*:* -RELS_EXT_isViewableByUser_literal_ms:[* TO *]) AND (*:* -RELS_EXT_isViewableByRole_literal_ms:[* TO *]))',
            ],
        ];

        foreach ($user->roles as $role) {
            $params['fq'][] = 'OR RELS_EXT_isViewableByRole_literal_ms:"' . $role . '"';
        }

        $params['fl'][] = 'PID, RELS_EXT_hasModel_uri_ms';
        $params['fq']   = implode(' ', $params['fq']);
        $params['sort'] = variable_get('islandora_solr_object_label_field', 'fgs_label_s') . ' asc';

        return $params;
    }
}
