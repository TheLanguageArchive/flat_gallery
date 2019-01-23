(function(jq) {

    jq(function() {

        jq('body').on('click', '[data-role="flat-image-gallery-modal"]', function(event) {

            event.preventDefault();

            jq('body').append(jq('[type="text/template"]').html());
            jq('[data-role="flat-image-gallery-modal-content"]').load(jq(this).data('url'));
        });
    });

})(jQuery);
