import ServiceLocator from "@fg-services/locator";
import Navigation from "@fg-services/navigation";
import { FedoraModel } from "@fg-models/fedora-model";
import Image from "@fg-models/image";

export default class BasicViewModel {

    private fullscreen: boolean;
    private eventsBound: boolean;

    constructor() {

        this.fullscreen  = false;
        this.eventsBound = false;
    }

    setup() {

        if (true === this.eventsBound) {
            return;
        }

        let navigation = (ServiceLocator.get('navigation') as Navigation);

        if (navigation.current().model !== FedoraModel.Basic) {
            return;
        }

        document.addEventListener('click', this.enterFullscreen.bind(this));

        let fullscreenchange = this.leaveFullscreen.bind(this);

        document.addEventListener('fullscreenchange', fullscreenchange);
        document.addEventListener('webkitfullscreenchange', fullscreenchange);
        document.addEventListener('mozfullscreenchange', fullscreenchange);
        document.addEventListener('MSFullscreenChange', fullscreenchange);

        this.eventsBound = true;
    }

    enterFullscreen(event: Event) {

        let target = (event.target as Element);
        if (target.getAttribute('data-role') === 'flat-gallery-toggle-fullscreen') {

            if (true === this.fullscreen) {
                return;
            }

            this.fullscreen = true;
            let fullscreenRequestElement = document.querySelector('[data-role="flat-gallery-fullscreen"]');

            fullscreenRequestElement
                .requestFullscreen()
                .then(() => {

                    let navigation = ServiceLocator.get('navigation') as Navigation;
                    navigation.show();
                    navigation.render();

                    this.renderImage(navigation.current());
                });
        }
    }

    leaveFullscreen() {

        let navigation = ServiceLocator.get('navigation') as Navigation;

        if (null === document.fullscreenElement && true === this.fullscreen && navigation.current().model === FedoraModel.Basic) {

            this.fullscreen = false;

            navigation.hide();

            let viewerElement  = document.querySelector('[data-role="flat-gallery-viewer"]');
            let basicElement   = document.querySelector('[data-role="flat-gallery-toggle-fullscreen"]');

            while (viewerElement.lastChild) {
                viewerElement.removeChild(viewerElement.lastChild);
            }

            viewerElement.appendChild(basicElement);

            let fullscreenElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');

            while (fullscreenElement.lastChild) {
                fullscreenElement.removeChild(fullscreenElement.lastChild);
            }
        }
    }

    renderImage(image: Image) {

        let viewerElement   =  null;
        let imageElement    = document.createElement('img');
        let captionsElement = document.createElement('div');

        imageElement.setAttribute('data-role', 'flat-gallery-toggle-fullscreen');
        imageElement.setAttribute('data-flat-gallery-id', image.id.toString());
        imageElement.setAttribute('src', image.object);
        imageElement.classList.add('flat-gallery-basic-image');

        captionsElement.classList.add('hidden');

        if (null === document.fullscreenElement) {

            viewerElement   = document.querySelector('[data-role="flat-gallery-viewer"]');
            this.fullscreen = false;

        } else {

            viewerElement   = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
            this.fullscreen = true;
        }

        while (viewerElement.lastChild) {
            viewerElement.removeChild(viewerElement.lastChild);
        }

        if (image.descriptions.length > 0 && true === this.fullscreen) {

            captionsElement.classList.remove('hidden');
            captionsElement.classList.add('flat-gallery-viewer-caption');
            captionsElement.setAttribute('data-role', 'flat-gallery-captions');

            image.descriptions.forEach((description) => {

                let captionElement = document.createElement('span');
                captionElement.textContent = description;

                captionsElement.appendChild(captionElement);
            });
        }

        viewerElement.appendChild(imageElement);
        viewerElement.appendChild(captionsElement);
    }
}
