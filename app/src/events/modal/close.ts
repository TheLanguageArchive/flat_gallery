import { Event as CustomEvent } from "@fg-events/event";
import ServiceLocator from "@fg-services/locator";

export default class ModalCloseEvent implements CustomEvent {

    type: string;
    target: EventTarget;
    useCapture: boolean;

    constructor() {

        this.type       = 'click';
        this.target     = window.parent.document;
        this.useCapture = false;
    }

    listener(event: Event) {

        let target = (event.target as Element);

        if (target.getAttribute('data-role') === 'flat-gallery-modal-close') {

            let content   = window.parent.document.querySelector('[data-role="flat-gallery-modal-content"]');
            let container = (content.parentNode as Element);
            let modal     = window.parent.document.querySelector('[data-role="flat-gallery-modal-container"]');

            container.classList.remove('fade-to');
            modal.remove();
        }
    }
}
