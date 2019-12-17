import { Event as CustomEvent } from "@fg-events/event";
import ModalTemplate from "@fg-models/modal-template";

export default class ModalOpenEvent implements CustomEvent {

    type: string;
    target: EventTarget;
    useCapture: boolean;
    url: string;

    constructor(url: string) {

        this.type       = 'click';
        this.useCapture = false;
        this.target     = document;
        this.url        = url;
    }

    listener(event: Event) {

        let target = (event.target as Element);
        if (target.getAttribute('data-role') === 'flat-gallery-modal') {

            event.preventDefault();

            let template = ModalTemplate(this.url);
            let body     = document.querySelector('body');

            window.scrollTo(0, 0);
            body.appendChild(template);

            let iframe = document.querySelector('[data-role="flat-gallery-modal-iframe"]') as HTMLElement;
            iframe.focus();

            setTimeout(() => {

                // adding timeout to allow for css transition
                // to be called
                let content = document.querySelector('[data-role="flat-gallery-modal-content"]');
                (content.parentNode as Element).classList.add('fade-to');
            });
        }
    }
}
