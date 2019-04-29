import { Event as CustomEvent } from "@fg-events/event";
import ServiceLocator from "@fg-services/locator";
import Navigation from "@fg-services/navigation";
import { Application } from "@fg-application";
import LoadImageAction from "@fg-apps/viewer/actions/load-image";

export default class ClickThumbnailEvent implements CustomEvent {

    type: string;
    target: EventTarget;
    useCapture: boolean;
    application: Application;
    navigation: Navigation;

    constructor() {

        this.type        = 'click';
        this.useCapture  = false;
        this.target      = document;
        this.application = ServiceLocator.get('app') as Application;
        this.navigation  = ServiceLocator.get('navigation') as Navigation;
    }

    listener(event: Event) {

        let target = (event.target as Element);

        if (target.hasAttribute('data-load-image')) {

            event.preventDefault();

            let id      = +target.getAttribute('data-load-image');
            let changed = this.navigation.setImage(id);

            if (false === changed) {
                return;
            }

            this.navigation.render();

            this.application.action(
                new LoadImageAction(
                    this.navigation.current()
                )
            );
        }
    }
}
