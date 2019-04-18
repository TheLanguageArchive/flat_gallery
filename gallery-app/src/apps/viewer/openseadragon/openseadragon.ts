import ServiceLocator from "@fg-services/locator";
import { OpenseadragonViewer } from "@fg-services/settings";
import Navigation from "@fg-services/navigation";

export default class Openseadragon {

    private base: string;
    private fullscreen: boolean;

    constructor(base) {

        this.base       = '#' + base;
        this.fullscreen = false;
    }

    setup() {

        let openseadragon = (ServiceLocator.get('openseadragon') as OpenseadragonViewer);

        if (null == openseadragon) {
            return;
        }

        openseadragon.addHandler('pre-full-screen', (options) => {

            options.preventDefaultAction = true;
            this.enterFullscreen();
        });

        let fullscreenchange = this.leaveFullscreen.bind(this);

        document.addEventListener('fullscreenchange', fullscreenchange);
        document.addEventListener('webkitfullscreenchange', fullscreenchange);
        document.addEventListener('mozfullscreenchange', fullscreenchange);
        document.addEventListener('MSFullscreenChange', fullscreenchange);
    }

    enterFullscreen() {

        if (true === this.fullscreen) {
            return;
        }

        this.fullscreen = true;
        let fullscreenRequestElement = document.querySelector('[data-role="flat-gallery-fullscreen"]');

        fullscreenRequestElement
            .requestFullscreen()
            .then(() => {

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
            });
    }

    leaveFullscreen() {

        if (null === document.fullscreenElement && true === this.fullscreen) {

            this.fullscreen = false;

            let navigation = ServiceLocator.get('navigation') as Navigation;
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
}
