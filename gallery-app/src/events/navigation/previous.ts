import Event from "@fg-events/event";
import ServiceLocator from "@fg-services/locator";
import Navigation from "@fg-services/navigation";

export default class NavigationPreviousEvent implements Event {

    type: string;
    target: EventTarget;
    useCapture: boolean;

    constructor() {

        this.type       = 'click';
        this.useCapture = false;
        this.target     = document;
    }

    listener(event) {

        let target = (event.target as Element);

        if (target.getAttribute('data-flat-gallery-nav') === 'previous') {

            let navigation = ServiceLocator.get('navigation') as Navigation;

            navigation.previous();
            navigation.render();
        }
    }
}
