import { Event as CustomEvent } from "@fg-events/event";
import ServiceLocator from "@fg-services/locator";
import Navigation from "@fg-services/navigation";
import { Application } from "@fg-application";
import LoadImageAction from "@fg-apps/viewer/actions/load-image";
import History from "@fg-services/history";

export default class KeyboardNextEvent implements CustomEvent {

    type: string;
    target: EventTarget;
    useCapture: boolean;
    application: Application;
    navigation: Navigation;
    history: History;

    constructor() {

        this.type        = 'keyup';
        this.useCapture  = false;
        this.target      = document;
        this.application = ServiceLocator.get('app') as Application;
        this.navigation  = ServiceLocator.get('navigation') as Navigation;
        this.history     = ServiceLocator.get('history') as History;
    }

    listener(event: KeyboardEvent) {

        let keyboard = event.which || event.keyCode || 0;

        if (keyboard === 39) {

            event.preventDefault();

            if (false === this.navigation.nextImageAvailable()) {
                return;
            }

            this.navigation.next();
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
