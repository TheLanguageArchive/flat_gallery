import { Event as CustomEvent } from "@fg-events/event";
import ServiceLocator from "@fg-services/locator";
import { Application } from "@fg-application";
import FetchPageAction from "@fg-apps/viewer/actions/fetch-page";

export default class FetchPageEvent implements CustomEvent {

    type: string;
    target: EventTarget;
    useCapture: boolean;
    application: Application;

    constructor() {

        this.type        = 'click';
        this.useCapture  = false;
        this.target      = document;
        this.application = ServiceLocator.get('app') as Application;
    }

    listener(event: Event) {

        let target = (event.target as Element);

        if (target.hasAttribute('data-role') && target.getAttribute('data-role') === 'flat-gallery-fetch-page') {

            event.preventDefault();

            this.application.action(
                new FetchPageAction()
            );
        }
    }
}
