import ServiceLocator from "@fg-services/locator";
import { OpenseadragonInstance } from "@fg-services/settings";
import Navigation from "@fg-services/navigation";
import Image from "@fg-models/image";
import FetchLargeImage from "@fg-services/fetch-large-image";
import { FedoraModel } from "@fg-models/fedora-model";

export default class OpenseadragonViewModel {

    private base: string;
    private fullscreen: boolean;

    constructor(base) {

        this.base       = '#' + base;
        this.fullscreen = false;
    }

    setup() {

        let openseadragon = (ServiceLocator.get('openseadragon') as OpenseadragonInstance);

        if (null == openseadragon) {
            return;
        }

        openseadragon.buttons.buttons.forEach((button) => {

            if (button.tooltip === 'Toggle full page') {

                button.addHandler('click', (options) => {

                    if (false === this.fullscreen) {
                        this.requestFullscreen();
                    } else {

                        // calling document.exitFullscreen instead of this.leaveFullscreen
                        // because listeners on fullscreenchange already call it
                        document.exitFullscreen();
                    }
                });
            }
        });

        openseadragon.addHandler('pre-full-screen', (options) => {
            options.preventDefaultAction = true;
        });

        let fullscreenchange = this.fullscreenChange.bind(this);

        document.addEventListener('fullscreenchange', fullscreenchange);
        document.addEventListener('webkitfullscreenchange', fullscreenchange);
        document.addEventListener('mozfullscreenchange', fullscreenchange);
        document.addEventListener('MSFullscreenChange', fullscreenchange);
    }

    fullscreenChange() {

        if (null == document.fullscreenElement) {

            // exiting fullscreen
            this.leaveFullscreen();

        } else {

            // entering fullscreen
            this.enterFullscreen();
        }
    }

    requestFullscreen() {

        if (true === this.fullscreen) {
            return;
        }

        this.fullscreen = true;

        let fullscreenRequestElement = document.querySelector('[data-role="flat-gallery-fullscreen"]');
        fullscreenRequestElement.requestFullscreen();
    }

    enterFullscreen() {

        let fullscreenElement    = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
        let openseadragonElement = document.querySelector(this.base);

        while (fullscreenElement.lastChild) {
            fullscreenElement.removeChild(fullscreenElement.lastChild);
        }

        fullscreenElement.appendChild(openseadragonElement);
        openseadragonElement.classList.add('flat-gallery-openseadragon-fullscreen');

        let navigation = ServiceLocator.get('navigation') as Navigation;
        navigation.show();
        navigation.render();
    }

    leaveFullscreen() {

        let navigation = ServiceLocator.get('navigation') as Navigation;

        if (null == document.fullscreenElement && true === this.fullscreen && navigation.current().model === FedoraModel.Large) {

            this.fullscreen = false;

            navigation.hide();

            let viewerElement        = document.querySelector('[data-role="flat-gallery-viewer"]');
            let openseadragonElement = document.querySelector(this.base);

            while (viewerElement.lastChild) {
                viewerElement.removeChild(viewerElement.lastChild);
            }

            openseadragonElement.classList.remove('flat-gallery-openseadragon-fullscreen');
            viewerElement.appendChild(openseadragonElement);
        }
    }

    create(image: Image) {

        this.cleanBaseElement();

        FetchLargeImage(image)
            .then((settings) => {

                Drupal.settings.islandoraOpenSeadragon.djatokaServerBaseURL = settings.djatokaServerBaseURL;
                Drupal.IslandoraOpenSeadragonViewer[this.base] = new Drupal.IslandoraOpenSeadragonViewer(this.base, settings);

                ServiceLocator.set('openseadragon', Drupal.settings.islandora_open_seadragon_viewer);

                this.setup();
            });
    }

    cleanBaseElement() {

        if (typeof Drupal.IslandoraOpenSeadragonViewer === 'undefined') {
            return;
        }

        let viewerElement  = null;
        let baseElement    = document.querySelector(this.base);
        let newBaseElement = document.createElement('div');

        newBaseElement.setAttribute('id', this.base.substring(1)); // removing # from base name
        newBaseElement.classList.add('islandora-openseadragon');

        if (null == document.fullscreenElement) {

            // out of fullscreen
            viewerElement = document.querySelector('[data-role="flat-gallery-viewer"]');

            this.fullscreen = false;

        } else {

            // inside fullscreen
            viewerElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
            newBaseElement.classList.add('flat-gallery-openseadragon-fullscreen');

            this.fullscreen = true;
        }

        if (null != baseElement) {

            // removing current baseElement
            baseElement.remove();
        }

        // cleaning viewer element
        while (viewerElement.lastChild) {
            viewerElement.removeChild(viewerElement.lastChild);
        }

        // and adding new base element
        viewerElement.appendChild(newBaseElement);

        // finally removing it from cache
        delete Drupal.IslandoraOpenSeadragonViewer[this.base];
    }
}
