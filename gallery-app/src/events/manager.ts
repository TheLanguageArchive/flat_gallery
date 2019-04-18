import Event from "@fg-events/event";

export class EventManager {

    add(event: Event) {
        event.target.addEventListener(event.type, event.listener, event.useCapture);
    }

    remove(event: Event) {
        event.target.removeEventListener(event.type, event.listener, event.useCapture);
    }
}

export default new EventManager();
