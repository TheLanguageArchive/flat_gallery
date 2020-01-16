import AnimationEffect from "@fg-animations/effect";

export default class Animation {

    running: boolean;

    private queue: AnimationEffect[];
    private timer: number;
    private frame: number;
    private framerate: number;

    constructor() {

        this.queue     = [];
        this.framerate = 60;
        this.running   = false;
    }

    enqueue(effect: AnimationEffect) {
        this.queue.push(effect);
    }

    animate() {

        if (false === this.running) {

            this.running = true;
            this.frame   = -1;
            this.timer   = setInterval(this.process.bind(this), 1000 / this.framerate);
        }
    }

    process() {

        this.frame += 1;
        let done    = [];

        this.queue.forEach((effect) => {

            let result = effect.run(this.frame);

            if (false == result) {
                done.push(effect);
            }
        });

        if (done.length === this.queue.length) {
            this.stop();
        }
    }

    stop() {

        this.queue   = [];
        this.running = false;

        clearInterval(this.timer);
    }
}
