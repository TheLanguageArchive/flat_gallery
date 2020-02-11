import ServiceLocator from "@fg-services/locator";
import { OpenseadragonInstance } from "@fg-services/settings";
import Navigation from "@fg-services/navigation";
import Image from "@fg-models/image";
import FetchLargeImage from "@fg-services/fetch-large-image";
import { FedoraModel } from "@fg-models/fedora-model";
import ViewerTemplate from "@fg-models/viewer-template";
import FullscreenCaptionsTemplate from "@fg-models/fullscreen-captions-template";
import ViewerCaptionsTemplate from "@fg-models/viewer-captions-template";
import LoadImageLock from "@fg-models/load-image-lock";

export default class OpenseadragonBasicViewModel {

    private base: string;

    constructor(base) {
        this.base = '#' + base;
    }

    setup() {

        let loadImageLock = (ServiceLocator.get('load-image-lock') as LoadImageLock);
        let openseadragon = (ServiceLocator.get('openseadragon-basic') as OpenseadragonInstance);

        loadImageLock.unlock();

        if (null == openseadragon) {
            return;
        }

        openseadragon.buttons.buttons.forEach((button) => {

            if (button.tooltip === 'Toggle full page') {

                button.addHandler('click', (options) => {

                    if (null == document.fullscreenElement) {
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

        let navigation = (ServiceLocator.get('navigation') as Navigation);

        if (navigation.current().model !== FedoraModel.Basic) {
            return;
        }

        if (null == document.fullscreenElement) {

            // exiting fullscreen
            this.leaveFullscreen();

        } else {

            // entering fullscreen
            this.enterFullscreen();
        }
    }

    requestFullscreen() {

        if (null != document.fullscreenElement) {
            return;
        }

        let fullscreenRequestElement = document.querySelector('[data-role="flat-gallery-fullscreen"]');
        fullscreenRequestElement.requestFullscreen();
    }

    enterFullscreen() {

        let navigation = ServiceLocator.get('navigation') as Navigation;
        navigation.show();
        navigation.render();

        this.renderFullscreenElement(navigation.current());
    }

    leaveFullscreen() {

        let navigation = ServiceLocator.get('navigation') as Navigation;
        let image      = navigation.current();

        if (null == document.fullscreenElement && image.model === FedoraModel.Basic) {

            navigation.hide();
            this.renderViewerElement(image);
        }
    }

    create(image: Image) {

        let loadImageLock = (ServiceLocator.get('load-image-lock') as LoadImageLock);

        if (true === loadImageLock.isLocked()) {
            return;
        }

        loadImageLock.lock();

        this.cleanBaseElement();

        FetchLargeImage(image)
            .then((settings) => {

                console.log(settings);
                Drupal.IslandoraOpenSeadragonViewer[this.base] = new Drupal.IslandoraOpenSeadragonViewer(this.base, settings);
                ServiceLocator.set('openseadragon-basic', Drupal.settings.islandora_open_seadragon_viewer);

                this.setup();
            });
    }

    cleanBaseElement() {

        if (typeof Drupal.IslandoraOpenSeadragonViewer === 'undefined') {
            return;
        }

        let viewerElement   = null;
        let captionsElement = null;
        let image           = (ServiceLocator.get('navigation') as Navigation).current();
        let baseElement     = document.querySelector(this.base);
        let newBaseElement  = document.createElement('div');

        newBaseElement.setAttribute('id', this.base.substring(1)); // removing # from base name
        newBaseElement.classList.add('islandora-openseadragon');

        if (null == document.fullscreenElement) {

            // out of fullscreen
            viewerElement   = document.querySelector('[data-role="flat-gallery-viewer"]');
            captionsElement = ViewerCaptionsTemplate(image);

        } else {

            // inside fullscreen
            viewerElement   = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
            captionsElement = FullscreenCaptionsTemplate(image);

            newBaseElement.classList.add('flat-gallery-openseadragon-fullscreen');
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

        // and adding captions
        if (false !== captionsElement) {
            viewerElement.appendChild(captionsElement);
        }

        // finally removing it from cache
        delete Drupal.IslandoraOpenSeadragonViewer[this.base];
    }

    renderFullscreenElement(image: Image) {

        let fullscreenElement    = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
        let openseadragonElement = document.querySelector(this.base);

        while (fullscreenElement.lastChild) {
            fullscreenElement.removeChild(fullscreenElement.lastChild);
        }

        fullscreenElement.appendChild(openseadragonElement);
        openseadragonElement.classList.add('flat-gallery-openseadragon-fullscreen');

        this.renderFullscreenCaptions(image);
    }

    renderViewerElement(image: Image) {

        let fullscreenElement    = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
        let viewerElement        = document.querySelector('[data-role="flat-gallery-viewer"]');
        let openseadragonElement = document.querySelector(this.base);

        while (viewerElement.lastChild) {
            viewerElement.removeChild(viewerElement.lastChild);
        }

        openseadragonElement.classList.remove('flat-gallery-openseadragon-fullscreen');

        viewerElement.appendChild(ViewerTemplate(openseadragonElement, image));

        while (fullscreenElement.lastChild) {
            fullscreenElement.removeChild(fullscreenElement.lastChild);
        }
    }

    renderFullscreenCaptions(image: Image) {

        let fullscreenElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
        let captionsElement   = FullscreenCaptionsTemplate(image);

        if (false !== captionsElement) {
            fullscreenElement.appendChild(captionsElement);
        }
    }

    renderViewerCaptions(image: Image) {

        let viewerElement   = document.querySelector('[data-role="flat-gallery-viewer"]');
        let captionsElement = ViewerCaptionsTemplate(image);

        if (false !== captionsElement) {
            viewerElement.appendChild(captionsElement);
        }
    }
}
