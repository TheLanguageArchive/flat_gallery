(function(jq) {
    'use strict';

    Drupal.FlatGallery = {

        bindModal: function() {

            var body = jq('body');

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
        },

        bindFullscreenMethods: function() {

            if (!Element.prototype.requestFullscreen) {
                Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
            }

            if (!document.exitFullscreen) {
                document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
            }

            if (!document.fullscreenElement) {
                document.fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            }
        }
    };

    Drupal.behaviors.flatGallery = {

        attach: function(context, settings) {

            Drupal.FlatGallery.bindFullscreenMethods();
            Drupal.FlatGallery.bindModal();

            if (typeof Drupal.settings.flat_gallery === 'undefined') {
                return;
            }

            var flat_gallery_images = Drupal.settings.flat_gallery.images;

            var body        = jq('body');
            var fullscreen  = jq('[data-role="flat-gallery-toggle-fullscreen"]');
            var navigation  = jq('[data-role="flat-gallery-nav"]');
            var fullElement = jq('[data-role="flat-gallery-fullscreen"]').data('fullscreen', false);

            if ((typeof settings.flat_gallery !== 'undefined') && (typeof settings.flat_gallery.openseadragon !== 'undefined')) {

                // Use custom element #id if set.
                var base = '#' + settings.flat_gallery.openseadragon.options.id;

                var setupViewer = function(base) {

                    var exitOpenseadragonHandler = function() {

                        var baseEl = jq(base);

                        if (null === document.fullscreenElement && true === baseEl.data('fullscreen')) {

                            jq('[data-role="flat-gallery-viewer"]')
                                .prepend(
                                    baseEl
                                        .detach()
                                        .data('fullscreen', false)
                                        .removeClass('flat-gallery-openseadragon-fullscreen')
                                );

                            navigation.addClass('hidden');
                        }
                    };

                    document.addEventListener('fullscreenchange', exitOpenseadragonHandler);
                    document.addEventListener('webkitfullscreenchange', exitOpenseadragonHandler);
                    document.addEventListener('mozfullscreenchange', exitOpenseadragonHandler);
                    document.addEventListener('MSFullscreenChange', exitOpenseadragonHandler);

                    Drupal.settings.islandora_open_seadragon_viewer.addHandler('pre-full-screen', function(options) {

                        options.preventDefaultAction = true;

                        if (fullElement.get(0).requestFullscreen) {

                            fullElement
                                .get(0)
                                .requestFullscreen()
                                .then(function() {

                                    fullElement
                                        .find('[data-role="flat-gallery-fullscreen-element"]')
                                        .empty()
                                        .append(
                                            jq(base)
                                                .detach()
                                                .data('fullscreen', true)
                                                .addClass('flat-gallery-openseadragon-fullscreen')
                                        );

                                    toggleNavigation();
                                    navigation.removeClass('hidden');
                                });
                        }
                    });
                };

                var disconnectViewer = function(base) {

                    if (typeof Drupal.IslandoraOpenSeadragonViewer === 'undefined') {
                        return;
                    }

                    var baseEl = jq(base);
                    baseEl.removeData();
                    baseEl.off();
                    baseEl.empty();

                    delete Drupal.IslandoraOpenSeadragonViewer[base];
                };

                var connectViewer = function(base, id) {

                    disconnectViewer(base);

                    var baseEl = jq(base);

                    if (baseEl.length === 0) {

                        var viewer = '<div id="' + base.replace('#', '') + '" class="islandora-openseadragon"></div>';

                        if (null === document.fullscreenElement) {

                            // out of fullscreen
                            jq('[data-role="flat-gallery-viewer"]').html(viewer);

                        } else {

                            // inside of fullscreen
                            jq('[data-role="flat-gallery-fullscreen-element"]')
                                .html(viewer)
                                .data('fullscreen', true)
                                .addClass('flat-gallery-openseadragon-fullscreen');
                        }
                    }

                    fetchLargeImage(id).then(function(settings) {

                        Drupal.IslandoraOpenSeadragonViewer[base] = new Drupal.IslandoraOpenSeadragonViewer(base, settings);
                        setupViewer(base);
                    });
                };

                var fetchLargeImage = function(id) {
                    return jq.ajax(settings.flat_gallery.url + '/' + id);
                };

                if (Drupal.settings.islandora_open_seadragon_viewer) {
                    setupViewer(base);
                }
            }

            var toggleNavigation = function() {

                var current = fullElement.data('flat-gallery-current-id');
                var prev    = jq('[data-flat-gallery-nav="previous"]').addClass('hidden');
                var next    = jq('[data-flat-gallery-nav="next"]').addClass('hidden');

                if (typeof flat_gallery_images[current - 1] !== 'undefined') {
                    prev.removeClass('hidden');
                }

                if (typeof flat_gallery_images[current + 1] !== 'undefined') {
                    next.removeClass('hidden');
                }
            };

            var exitHandler = function() {

                var toggle = jq('[data-role="flat-gallery-toggle-fullscreen"]');

                if (null === document.fullscreenElement && true === toggle.data('fullscreen')) {

                    jq('[data-role="flat-gallery-viewer"]')
                        .append(
                            toggle.detach()
                        );

                    toggle.data('fullscreen', false);
                    navigation.addClass('hidden');
                }
            };

            var fullscreenHandler = function() {

                var toggle = jq('[data-role="flat-gallery-toggle-fullscreen"]');

                jq('[data-role="flat-gallery-fullscreen-element"]')
                    .empty()
                    .append(
                        toggle.detach()
                    );

                toggle.data('fullscreen', true);

                toggleNavigation();
                navigation.removeClass('hidden');
            };

            var generateImage = function(image) {

                var html  = '<img class="flat-gallery-basic-image" data-role="flat-gallery-toggle-fullscreen"';
                    html += ' data-flat-gallery-id="' + image.id + '" src="' + image.object + '" />';

                return html;
            };

            document.addEventListener('fullscreenchange', exitHandler);
            document.addEventListener('webkitfullscreenchange', exitHandler);
            document.addEventListener('mozfullscreenchange', exitHandler);
            document.addEventListener('MSFullscreenChange', exitHandler);

            body.on('click', '[data-role="flat-gallery-toggle-fullscreen"]', function(event) {

                event.preventDefault();

                var fullscreen = jq('[data-role="flat-gallery-toggle-fullscreen"]');

                if (fullscreen.data('fullscreen') === true) {

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

                var element     = jq(this);
                var which       = element.data('flat-gallery-nav');
                var fullElement = jq('[data-role="flat-gallery-fullscreen"]');
                var current     = fullElement.data('flat-gallery-current-id');

                if (which === 'next' && typeof flat_gallery_images[current + 1] !== 'undefined') {

                    var next  = current + 1;
                    var image = flat_gallery_images[next];

                    fullElement.data('flat-gallery-current-id', next);

                    jq('[data-role="flat-gallery-thumbnail"] a').removeClass('active');
                    jq('[data-role="flat-gallery-thumbnail"][data-flat-gallery-id="' + next + '"] a').addClass('active');

                    if (image.viewer_type === 'large') {

                        connectViewer(base, image.id);

                        if (null !== document.fullscreenElement) {

                            jq(base)
                                .addClass('flat-gallery-openseadragon-fullscreen')
                                .data('fullscreen', true);
                        }

                    } else {

                        disconnectViewer(base);

                        var imageEl = fullElement.find('[data-role="flat-gallery-fullscreen-element"] img');

                        if (imageEl.length === 0) {
                            jq('[data-role="flat-gallery-fullscreen-element"]').html(generateImage(image));
                        } else {
                            imageEl.attr('src', image.object);
                        }

                        if (null !== document.fullscreenElement) {
                            jq('[data-role="flat-gallery-toggle-fullscreen"]').data('fullscreen', true);
                        }
                    }

                    // showing previous button
                    jq('[data-flat-gallery-nav="previous"]').removeClass('hidden');

                    if (typeof flat_gallery_images[next + 1] === 'undefined') {

                        // no more new images, hiding next button
                        jq('[data-flat-gallery-nav="next"]').addClass('hidden');

                    } else {
                        jq('[data-flat-gallery-nav="next"]').removeClass('hidden');
                    }
                }

                if (which === 'previous' && typeof flat_gallery_images[current - 1] !== 'undefined') {

                    var previous = current - 1;
                    var image    = flat_gallery_images[previous];

                    fullElement.data('flat-gallery-current-id', previous);

                    jq('[data-role="flat-gallery-thumbnail"] a').removeClass('active');
                    jq('[data-role="flat-gallery-thumbnail"][data-flat-gallery-id="' + next + '"] a').addClass('active');

                    if (image.viewer_type === 'large') {

                        connectViewer(base, image.id);

                        if (null !== document.fullscreenElement) {

                            jq(base)
                                .addClass('flat-gallery-openseadragon-fullscreen')
                                .data('fullscreen', true);
                        }

                    } else {

                        disconnectViewer(base);

                        var imageEl = fullscreen.find('[data-role="flat-gallery-fullscreen-element"] img');

                        if (imageEl.length === 0) {
                            jq('[data-role="flat-gallery-fullscreen-element"]').html(generateImage(image));
                        } else {
                            imageEl.attr('src', image.object);
                        }

                        if (null !== document.fullscreenElement) {
                            jq('[data-role="flat-gallery-toggle-fullscreen"]').data('fullscreen', true);
                        }
                    }

                    // showing next button
                    jq('[data-flat-gallery-nav="next"]').removeClass('hidden');

                    if (typeof flat_gallery_images[previous - 1] === 'undefined') {

                        // no more new images, hiding previous button
                        jq('[data-flat-gallery-nav="previous"]').addClass('hidden');

                    } else {
                        jq('[data-flat-gallery-nav="previous"]').removeClass('hidden');
                    }
                }
            });
        },
        detach: function(context) {
        }
    };

})(jQuery);
