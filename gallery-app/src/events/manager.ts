import { Event as CustomEvent } from "@fg-events/event";

export class EventManager {

    add(event: CustomEvent) {
        event.target.addEventListener(event.type, event.listener.bind(event), event.useCapture);
    }

    remove(event: CustomEvent) {
        event.target.removeEventListener(event.type, event.listener.bind(event), event.useCapture);
    }
}

export default new EventManager();
