import { Event as CustomEvent } from "@fg-events/event";

export default class EventManager {

    static add(event: CustomEvent) {
        event.target.addEventListener(event.type, event.listener.bind(event), event.useCapture);
    }

    static remove(event: CustomEvent) {
        event.target.removeEventListener(event.type, event.listener.bind(event), event.useCapture);
    }
}
