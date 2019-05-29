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

    $form['general'] = [

        '#type'            => 'fieldset',
        '#title'           => t('FLAT Gallery'),
        'pagination_limit' => [

            '#type'          => 'textfield',
            '#title'         => t('Pagination limit'),
            '#size'          => 30,
            '#default_value' => variable_get('flat_gallery_pagination_limit', FLAT_GALLERY_DEFAULT_PAGINATION_LIMIT),
        ],

        'delay_fade_out'   => [

            '#type'          => 'textfield',
            '#title'         => t('Delay fade out'),
            '#size'          => 30,
            '#default_value' => variable_get('flat_gallery_delay_fade_out', FLAT_GALLERY_DEFAULT_DELAY_FADE_OUT),
            '#help_text'     => 'Fill in the delay to wait before fading out navigation',
        ],
    ];

    $form['actions'] = [

        '#type'  => 'actions',
        'submit' => [

            '#type'   => 'submit',
            '#value'  => t('Save Configuration'),
            '#weight' => 0,
            '#submit' => ['flat_gallery_admin_form_submit'],
        ],
        'reset'  => [

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

        $form_state['redirect'] = 'admin/config/flat_deposit/flat_gallery';

        variable_set('flat_gallery_pagination_limit', FLAT_GALLERY_DEFAULT_PAGINATION_LIMIT);
        variable_set('flat_gallery_delay_fade_out', FLAT_GALLERY_DEFAULT_DELAY_FADE_OUT);

        drupal_set_message(t('FLAT gallery admin configuration was successfully reset to defaults'));

    } else {

        variable_set('flat_gallery_pagination_limit', intval($form_state['values']['pagination_limit']));
        variable_set('flat_gallery_delay_fade_out', intval($form_state['values']['delay_fade_out']));

        drupal_set_message(t('FLAT gallery admin configuration was successfully saved'));
    }
}
