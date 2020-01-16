import { Event as CustomEvent } from "@fg-events/event";
import ServiceLocator from "@fg-services/locator";
import Navigation from "@fg-services/navigation";

export default class MouseMoveEvent implements CustomEvent {

    type: string;
    target: EventTarget;
    useCapture: boolean;
    navigation: Navigation;

    constructor() {

        this.type       = 'mousemove';
        this.useCapture = false;
        this.target     = document;
        this.navigation = ServiceLocator.get('navigation') as Navigation;
    }

    listener(event: MouseEvent) {
        this.navigation.stopHidingNavigation();
    }
}
