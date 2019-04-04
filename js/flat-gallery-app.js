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
        var fullElement = jq('[data-role="flat-gallery-fullscreen"]');

        var exitHandler = function() {

            if (null === document.fullscreenElement) {

                fullscreen
                    .empty()
                    .append(
                        fullElement
                            .find('[data-role="flat-gallery-toggle-fullscreen"]')
                            .clone()
                    );

                fullElement
                    .find('[data-role="flat-gallery-fullscreen-element"]')
                    .empty();

                navigation.addClass('hidden');
                fullscreen.data('flat-gallery-fullscreen', false);
            }
        };

        var fullscreenHandler = function() {

            fullElement
                .find('[data-role="flat-gallery-fullscreen-element"]')
                .empty()
                .append(fullscreen.clone())

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

                if (fullElement.get(0).requestFullscreen) {

                    fullElement
                        .get(0)
                        .requestFullscreen()
                        .then(fullscreenHandler);
                }
            }
        });

        body.on('click', '[data-role="flat-gallery-nav"] > div', function(event) {

            // stopping propagation to allow
            // listening to prev/next navigation
            event.stopPropagation();
            event.preventDefault();

            var element    = jq(this);
            var which      = element.data('flat-gallery-nav');
            var fullscreen = jq('[data-role="flat-gallery-fullscreen"]');
            var current    = fullscreen.data('flat-gallery-current-id');

            if (which === 'next' && typeof Drupal.settings.flat_gallery.images[current + 1] !== 'undefined') {

                var next  = current + 1;
                var image = Drupal.settings.flat_gallery.images[next];

                fullscreen
                    .data('flat-gallery-current-id', next)
                    .find('[data-role="flat-gallery-fullscreen-element"] img')
                    .attr('src', image.object);

                // showing previous button
                jq('[data-flat-gallery-nav="previous"]').removeClass('hidden');

                if (typeof Drupal.settings.flat_gallery.images[next + 1] === 'undefined') {

                    // no more new images, hiding next button
                    jq('[data-flat-gallery-nav="next"]').addClass('hidden');

                } else {
                    jq('[data-flat-gallery-nav="next"]').removeClass('hidden');
                }
            }

            if (which === 'previous' && typeof Drupal.settings.flat_gallery.images[current - 1] !== 'undefined') {

                var previous = current - 1;
                var image    = Drupal.settings.flat_gallery.images[previous];

                fullscreen
                    .data('flat-gallery-current-id', previous)
                    .find('[data-role="flat-gallery-fullscreen-element"] img')
                    .attr('src', image.object);

                // showing next button
                jq('[data-flat-gallery-nav="next"]').removeClass('hidden');

                if (typeof Drupal.settings.flat_gallery.images[previous - 1] === 'undefined') {

                    // no more new images, hiding previous button
                    jq('[data-flat-gallery-nav="previous"]').addClass('hidden');

                } else {
                    jq('[data-flat-gallery-nav="previous"]').removeClass('hidden');
                }
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
