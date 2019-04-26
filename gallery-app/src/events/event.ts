export interface Event {

    type: string;
    target: EventTarget;
    listener: EventListener;
    useCapture: boolean;
}

export default Event;
