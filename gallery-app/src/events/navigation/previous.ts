import { Event as CustomEvent } from "@fg-events/event";
import ServiceLocator from "@fg-services/locator";
import Navigation from "@fg-services/navigation";
import { Application } from "@fg-application";
import LoadImageAction from "@fg-apps/viewer/actions/load-image";
import History from "@fg-services/history";

export default class NavigationPreviousEvent implements CustomEvent {

    type: string;
    target: EventTarget;
    useCapture: boolean;
    application: Application;
    navigation: Navigation;
    history: History;

    constructor() {

        this.type        = 'click';
        this.useCapture  = false;
        this.target      = document;
        this.application = ServiceLocator.get('app') as Application;
        this.navigation  = ServiceLocator.get('navigation') as Navigation;
        this.history     = ServiceLocator.get('history') as History;
    }

    listener(event: Event) {

        let target = (event.target as Element);

        if (target.hasAttribute('data-flat-gallery-nav') && target.getAttribute('data-flat-gallery-nav') === 'previous') {

            event.preventDefault();

            if (false === this.navigation.previousImageAvailable()) {
                return;
            }

            this.navigation.previous();
            this.navigation.render();

            this.application.action(
                new LoadImageAction(
                    this.navigation.current()
                )
            );

            this.history.push(this.navigation.current());
        }
    }
}
