import { Event as CustomEvent } from "@fg-events/event";
import { Application } from "@fg-application";
import ServiceLocator from "@fg-services/locator";
import FetchPageAction from "@fg-apps/viewer/actions/fetch-page";

export default class LazyLoadIntersectedEvent implements CustomEvent {

    type: string;
    target: EventTarget;
    useCapture: boolean;
    application: Application;

    constructor() {

        this.type        = 'flat.lazyload.intersected';
        this.target      = document;
        this.useCapture  = false;
        this.application = ServiceLocator.get('app') as Application;
    }

    listener(event: Event) {

        let target = (event.target as Element);

        if (target.getAttribute('data-flat-lazy-load-intersected') == '1') {

            let loader = document.querySelector('[data-role="flat-gallery-grid-loading"]') as HTMLDivElement;

            if (loader) {
                loader.classList.remove('flat-gallery-grid-hidden');
            }

            this.application.action(
                new FetchPageAction()
            );
        }
    }
}
