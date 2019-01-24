(function(jq) {

    jq(function() {

        var body = jq('body');

        body.on('click', '[data-role="flat-image-gallery-modal"]', function(event) {

            event.preventDefault();

            var url      = jq(this).attr('href');
            var template = jq('[type="text/template"]');

            window.scrollTo(0, 0);
            body.append(template.html());

            var content = jq('[data-role="flat-image-gallery-modal-content"]');
            content.parent().fadeTo('fast', 1.0);

            // content.load(url, function() {
            //     content.parent().fadeTo('fast', 1.0);
            // });
        });

        body.on('click', '[data-role="flat-image-gallery-modal-close"]', function(event) {

            event.preventDefault();

            var container = jq('[data-role="flat-image-gallery-modal-container"]:last');

            container.fadeOut(function() {
                container.remove();
            });
        });
    });

})(jQuery);
