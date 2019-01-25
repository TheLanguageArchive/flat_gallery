<?php
/**
 * FLAT Gallery Admin Form
 *
 * @param array $form
 * @param array $form_state
 *
 * @return array
 */
function flat_gallery_admin_form($form, &$form_state) {

    $form['pagination'] = [

        '#type'  => 'fieldset',
        '#title' => t('Pagination'),
        'limit'  => [

            '#type'          => 'textfield',
            '#title'         => 'Limit',
            '#size'          => 30,
            '#default_value' => variable_get('flat_gallery_per_page', 10),
        ],
    ];

    $form['actions'] = [

        '#type' => 'actions',

        'submit' => [

            '#type'   => 'submit',
            '#value'  => t('Save Configuration'),
            '#weight' => 0,
            '#submit' => ['flat_gallery_admin_form_submit'],
        ],
        'reset' => [

            '#type'   => 'submit',
            '#value'  => t('Reset to defaults'),
            '#weight' => 1,
            '#submit' => ['flat_gallery_admin_form_submit'],
        ],
    ];

    return $form;
}

/**
 * Admin form submit handler
 *
 * @param array $form
 * @param array $form_state
 *
 * @return void
 */
function flat_gallery_admin_form_submit($form, &$form_state) {

    if ($form_state['triggering_element']['#value'] == t('Reset to defaults')) {

        variable_set('flat_gallery_per_page', FLAT_GALLERY_DEFAULT_PAGINATION_LIMIT);

        $form_state['redirect'] = 'admin/config/flat_deposit/flat_gallery';
        drupal_set_message(t('FLAT gallery admin configuration was successfully reset to defaults'));

    } else {

        variable_set('flat_gallery_per_page', $form_state['values']['limit']);
        drupal_set_message(t('FLAT gallery admin configuration was successfully saved'));
    }
}
