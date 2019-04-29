import ServiceLocator from "@fg-services/locator";
import Navigation from "@fg-services/navigation";
import { FedoraModel } from "@fg-models/fedora-model";
import Image from "@fg-models/image";
import FullscreenCaptionsTemplate from "@fg-models/fullscreen-captions-template";
import ViewerTemplate from "@fg-models/viewer-template";

export default class BasicViewModel {

    private fullscreen: boolean;
    private eventsBound: boolean;

    constructor() {

        this.fullscreen  = false;
        this.eventsBound = false;
    }

    setup() {

        if (null != document.fullscreenElement) {
            this.fullscreen = true;
        }

        if (true === this.eventsBound) {
            return;
        }

        let navigation = (ServiceLocator.get('navigation') as Navigation);

        if (navigation.current().model !== FedoraModel.Basic) {
            return;
        }

        document.addEventListener('click', this.toggleFullscreen.bind(this));

        let fullscreenchange = this.fullscreenChange.bind(this);

        document.addEventListener('fullscreenchange', fullscreenchange);
        document.addEventListener('webkitfullscreenchange', fullscreenchange);
        document.addEventListener('mozfullscreenchange', fullscreenchange);
        document.addEventListener('MSFullscreenChange', fullscreenchange);

        this.eventsBound = true;
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

        if (true === this.fullscreen) {
            return;
        }

        this.fullscreen = true;

        let fullscreenRequestElement = document.querySelector('[data-role="flat-gallery-fullscreen"]');
        fullscreenRequestElement.requestFullscreen();
    }

    toggleFullscreen() {

        let target = (event.target as Element);
        if (target.getAttribute('data-role') === 'flat-gallery-toggle-fullscreen') {

            if (false === this.fullscreen) {
                this.requestFullscreen();
            } else {

                // calling document.exitFullscreen instead of this.leaveFullscreen
                // because listeners on fullscreenchange already call it
                document.exitFullscreen();
            }
        }
    }

    enterFullscreen() {

        let navigation = ServiceLocator.get('navigation') as Navigation;
        navigation.show();
        navigation.render();

        this.renderFullscreenImage(navigation.current());
    }

    leaveFullscreen() {

        let navigation = ServiceLocator.get('navigation') as Navigation;
        let image      = navigation.current();

        if (null == document.fullscreenElement && true === this.fullscreen && image.model === FedoraModel.Basic) {

            this.fullscreen = false;

            navigation.hide();
            this.renderViewerImage(image);
        }
    }

    renderImage(image: Image) {

        let imageElement = document.createElement('img');
        imageElement.setAttribute('data-role', 'flat-gallery-toggle-fullscreen');
        imageElement.setAttribute('data-flat-gallery-id', image.id.toString());
        imageElement.setAttribute('src', image.object);
        imageElement.classList.add('flat-gallery-basic-image');

        return imageElement;
    }

    renderFullscreenImage(image: Image) {

        let fullscreenElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
        let captionsElement   = FullscreenCaptionsTemplate(image);
        let imageElement      = this.renderImage(image);

        while (fullscreenElement.lastChild) {
            fullscreenElement.removeChild(fullscreenElement.lastChild);
        }

        fullscreenElement.appendChild(imageElement);

        if (false !== captionsElement) {
            fullscreenElement.appendChild(captionsElement);
        }
    }

    renderViewerImage(image: Image) {

        let fullscreenElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
        let viewerElement     = document.querySelector('[data-role="flat-gallery-viewer"]');
        let imageElement      = this.renderImage(image);
        let viewer            = ViewerTemplate(imageElement, image);

        while (viewerElement.lastChild) {
            viewerElement.removeChild(viewerElement.lastChild);
        }

        viewerElement.appendChild(viewer);

        while (fullscreenElement.lastChild) {
            fullscreenElement.removeChild(fullscreenElement.lastChild);
        }
    }
}
