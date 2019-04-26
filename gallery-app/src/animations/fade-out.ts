import AnimationEffect from "@fg-animations/effect";

export default class FadeOutAnimation implements AnimationEffect {

    from: number;
    to: number;
    speed: number;

    private element: HTMLElement;
    private framerate: number;
    private frames: number[];

    constructor(element: HTMLElement, from: number, to: number, speed: number) {

        this.element   = element;
        this.from      = from;
        this.to        = to;
        this.speed     = speed;
        this.framerate = 60 * speed;
        this.frames    = this.tween();
    }

    run(frame: number) {

        if (null != this.frames[frame]) {

            if (null === this.element) {
                return false;
            }

            this.element.style.opacity = this.frames[frame].toString();
            return true;
        }

        return false;
    }

    private tween() {

        let frames    = [];
        let tween     = (this.to - this.from) / this.framerate;

        for (let i = 0; i <= this.framerate; i++) {
            frames[i] = (this.from + (tween * i)) / 100;
        }

        return frames;
    }
}
