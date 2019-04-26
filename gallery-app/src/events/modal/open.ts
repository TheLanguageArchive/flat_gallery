import { Event as CustomEvent } from "@fg-events/event";
import ModalTemplate from "@fg-models/modal-template";
import ServiceLocator from "@fg-services/locator";
import { ModalSettings } from "@fg-services/settings";

export default class ModalOpenEvent implements CustomEvent {

    type: string;
    target: EventTarget;
    useCapture: boolean;

    constructor() {

        this.type       = 'click';
        this.useCapture = false;
        this.target     = document;
    }

    listener(event: Event) {

        let target = (event.target as Element);
        if (target.getAttribute('data-role') === 'flat-gallery-modal') {

            event.preventDefault();

            let template = ModalTemplate((ServiceLocator.get('settings') as ModalSettings).url);
            let body     = document.querySelector('body');

            window.scrollTo(0, 0);
            body.appendChild(template);

            setTimeout(() => {

                // adding timeout to allow for css transition
                // to be called
                let content = document.querySelector('[data-role="flat-gallery-modal-content"]');
                (content.parentNode as Element).classList.add('fade-to');
            });
        }
    }
}
