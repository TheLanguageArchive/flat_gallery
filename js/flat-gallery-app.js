(function(jq) {

    if (!Element.prototype.requestFullscreen) {
        Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
    }

    if (!document.exitFullscreen) {
        document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    }

    if (!document.fullscreenElement) {
        document.fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    }

    jq(function() {

        if (Drupal.settings.islandora_open_seadragon_viewer) {

            Drupal.settings.islandora_open_seadragon_viewer.addHandler('pre-full-screen', function(options) {
                options.preventDefaultAction = true;
            });
        }

        var body        = jq('body');
        var fullscreen  = jq('[data-role="flat-gallery-toggle-fullscreen"]');
        var navigation  = jq('[data-role="flat-gallery-nav"]');
        var fullElement = fullscreen.get(0);

        var exitHandler = function() {

            if (null === document.fullscreenElement) {

                navigation.addClass('hidden');
                fullscreen.data('flat-gallery-fullscreen', false);
            }
        };

        var fullscreenHandler = function() {

            navigation.removeClass('hidden');
            fullscreen.data('flat-gallery-fullscreen', true);
        };

        document.addEventListener('fullscreenchange', exitHandler);
        document.addEventListener('webkitfullscreenchange', exitHandler);
        document.addEventListener('mozfullscreenchange', exitHandler);
        document.addEventListener('MSFullscreenChange', exitHandler);

        body.on('click', '[data-role="flat-gallery-toggle-fullscreen"]', function(event) {

            event.preventDefault();

            if (fullscreen.data('flat-gallery-fullscreen') === true) {

                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }

            } else {

                if (fullElement.requestFullscreen) {
                    fullElement.requestFullscreen().then(fullscreenHandler);
                }
            }
        });

        body.on('click', '[data-role="flat-gallery-nav"] > div', function(event) {

            // stopping propagation to allow
            // listening to prev/next navigation
            event.stopPropagation();
            event.preventDefault();

            var element = jq(this);
            var which   = element.data('flat-gallery-nav');

            console.log(which);
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
