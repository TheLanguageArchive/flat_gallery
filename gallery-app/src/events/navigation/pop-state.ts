import { Event as CustomEvent } from "@fg-events/event";
import ServiceLocator from "@fg-services/locator";
import Navigation from "@fg-services/navigation";
import { Application } from "@fg-application";
import LoadImageAction from "@fg-apps/viewer/actions/load-image";
import LinkGenerator from "@fg-services/link-generator";

export default class ClickThumbnailEvent implements CustomEvent {

    type: string;
    target: EventTarget;
    useCapture: boolean;
    application: Application;
    navigation: Navigation;
    generator: LinkGenerator;

    constructor() {

        this.type        = 'popstate';
        this.useCapture  = false;
        this.target      = window;
        this.application = ServiceLocator.get('app') as Application;
        this.navigation  = ServiceLocator.get('navigation') as Navigation;
        this.generator   = ServiceLocator.get('link-generator') as LinkGenerator;
    }

    listener(event: PopStateEvent) {

        let id      = event.state.id;
        let changed = this.navigation.setImage(id);
        let image   = this.navigation.current();

        if (false === changed) {
            return;
        }

        this.navigation.render();

        this.application.action(
            new LoadImageAction(
                image
            )
        );
    }
}
