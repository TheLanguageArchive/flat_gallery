import { Event as CustomEvent } from "@fg-events/event";
import ServiceLocator from "@fg-services/locator";
import History from "@fg-services/history";

export default class ModalCloseEvent implements CustomEvent {

    type: string;
    target: EventTarget;
    useCapture: boolean;
    history: History;

    constructor() {

        this.type       = 'click';
        this.target     = document;
        this.useCapture = false;
        this.history    = ServiceLocator.get('history') as History;
    }

    listener(event: Event) {

        let target = (event.target as Element);

        if (target.getAttribute('data-role') === 'flat-gallery-modal-close') {

            let content       = document.querySelector('[data-role="flat-gallery-modal-content"]');
            let container     = (content.parentNode as Element);
            let modal         = document.querySelector('[data-role="flat-gallery-modal-container"]');
            let transitionend = modal.remove.bind(modal);

            container.addEventListener('transitionend', transitionend);
            container.addEventListener('webkitTransitionEnd', transitionend);
            container.addEventListener('mozTransitionEnd', transitionend);
            container.addEventListener('oTransitionEnd', transitionend);
            container.addEventListener('MSTransitionEnd', transitionend);

            container.classList.remove('fade-to');

            this.history.clear();
        }
    }
}
