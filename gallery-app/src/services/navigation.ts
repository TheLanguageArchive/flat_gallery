import { Image } from "@fg-models/image";

export default class Navigation {

    private id: number;
    private images: Image[];

    constructor(images: Image[]) {

        this.id     = 0;
        this.images = images;
    }

    all() {
        return this.images;
    }

    current() {
        return this.images[this.id];
    }

    nextImageAvailable() {
        return this.images.
    }

    next() {

        if (true === this.nextImageAvailable()) {
            return false;
        }

        this.id += 1;

        return this.images[this.id];
    }

    previousImageAvailable() {
        return this.images[this.id - 1] instanceof Image;
    }

    previous() {

        if (true === this.previousImageAvailable()) {
            return false;
        }

        this.id -= 1;

        return this.images[this.id];
    }

    show() {

        let navigationElement = document.querySelector('[data-role="flat-gallery-nav"]');
        navigationElement.classList.remove('hidden');
    }

    hide() {

        let navigationElement = document.querySelector('[data-role="flat-gallery-nav"]');
        navigationElement.classList.add('hidden');
    }

    render() {

        let nextImage     = this.nextImageAvailable();
        let previousImage = this.previousImageAvailable();

        let next          = document.querySelector('[data-flat-gallery-nav="previous"]');
        let previous      = document.querySelector('[data-flat-gallery-nav="next"]');

        next.classList.add('hidden');
        previous.classList.add('hidden');

        if (true === nextImage) {
            next.classList.remove('hidden');
        }

        if (true === previousImage) {
            previous.classList.remove('hidden');
        }
    }
}
