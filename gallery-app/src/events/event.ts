export default interface Event {

    type: string;
    target: EventTarget;
    listener: EventListener;
    useCapture: boolean;
}
