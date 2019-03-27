(function(jq) {

    if (!Element.prototype.requestFullscreen) {
        Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
    }

    if (!document.exitFullscreen) {
        document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    }

    jq(function() {

        var body   = jq('body');
        var full   = jq('[data-role="flat-gallery-toggle-fullscreen"]');
        var fullEl = jq('[data-role="flat-gallery-toggle-fullscreen"]:last').get(0);

        body.on('click', '[data-role="flat-gallery-toggle-fullscreen"]', function(event) {

            event.preventDefault();

            if (full.data('flat-gallery-fullscreen') === true) {

                if (document.exitFullscreen) {

                    document.exitFullscreen();

                } else {

                    jq('[data-role="flat-gallery-fullscreen"]').addClass('hidden');
                    jq('[data-role="flat-gallery-preview"]').removeClass('hidden');
                }

                full.data('flat-gallery-fullscreen', false);

            } else {

                if (fullEl.requestFullscreen) {

                    fullEl.requestFullscreen();

                } else {

                    jq('[data-role="flat-gallery-fullscreen"]').removeClass('hidden');
                    jq('[data-role="flat-gallery-preview"]').addClass('hidden');
                }

                full.data('flat-gallery-fullscreen', true);
            }
        });

        body.on('click', '[data-role="flat-gallery-modal"]', function(event) {

            event.preventDefault();

            var url      = jq(this).attr('href');
            var template = jq('[type="text/template"]');

            window.scrollTo(0, 0);
            body.append(template.html());

            var content = jq('[data-role="flat-gallery-modal-content"]');
            content.parent().fadeTo('fast', 1.0);
        });

        body.on('click', '[data-role="flat-gallery-modal-close"]', function(event) {

            event.preventDefault();

            var container = jq('[data-role="flat-gallery-modal-container"]:last');

            container.fadeOut(function() {
                container.remove();
            });
        });
    });

})(jQuery);
