import Image from "@fg-models/image";
import Animation from "@fg-animations/animation";
import FadeOutAnimation from "@fg-animations/fade-out";
import ServiceLocator from "@fg-services/locator";
import { DefaultSettings } from "@fg-services/settings";

export default class Navigation {

    private id: number;
    private images: Image[];
    private animation: Animation;
    private hideNavigationTimeout: number;

    constructor(current_id: number, images: Image[]) {

        this.id        = current_id;
        this.images    = images;
        this.animation = new Animation();
    }

    all() {
        return this.images;
    }

    addImages(images: Image[]) {
        images.forEach(image => this.images[image.id] = image);
    }

    current() {
        return this.images[this.id];
    }

    getNextImage() {

        if (false === this.nextImageAvailable()) {
            return false;
        }

        return this.images[this.id + 1];
    }

    nextImageAvailable() {
        return null != this.images[this.id + 1];
    }

    next() {

        if (false === this.nextImageAvailable()) {
            return false;
        }

        this.id += 1;

        return this.images[this.id];
    }

    getPreviousImage() {

        if (false === this.previousImageAvailable()) {
            return false;
        }

        return this.images[this.id - 1];
    }

    previousImageAvailable() {
        return null != this.images[this.id - 1];
    }

    previous() {

        if (false === this.previousImageAvailable()) {
            return false;
        }

        this.id -= 1;

        return this.images[this.id];
    }

    setImage(id: number) {

        if (null == this.images[id]) {
            return false;
        }

        this.id = id;
        return true;
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

        let nextElement            = document.querySelector('[data-flat-gallery-nav="next"]');
        let previousElement        = document.querySelector('[data-flat-gallery-nav="previous"]');

        let nextImageAvailable     = this.nextImageAvailable();
        let previousImageAvailable = this.previousImageAvailable();
        let currentImage           = this.current();

        nextElement.classList.add('hidden');
        previousElement.classList.add('hidden');

        if (true === nextImageAvailable) {
            nextElement.classList.remove('hidden');
        }

        if (true === previousImageAvailable) {
            previousElement.classList.remove('hidden');
        }

        document.querySelectorAll('[data-role="flat-gallery-thumbnail"]').forEach((thumbnail) => {
            thumbnail.classList.remove('flat-gallery-grid-item-active');
        });

        let currentThumbnailElement = document.querySelector(`[data-role="flat-gallery-thumbnail"][data-flat-gallery-id="${currentImage.id}"]`);
        currentThumbnailElement.classList.add('flat-gallery-grid-item-active');

        // starting up animating arrow fade out
        this.stopHidingNavigation();
    }

    hideNavigation() {

        if (false === this.animation.running) {

            let nextElement     = document.querySelector('[data-flat-gallery-nav="next"]') as HTMLElement;
            let previousElement = document.querySelector('[data-flat-gallery-nav="previous"]') as HTMLElement;
            let captionsElement = document.querySelector('[data-role="flat-gallery-captions"]') as HTMLElement;

            this.animation.enqueue(new FadeOutAnimation(previousElement, 100, 0, 1));
            this.animation.enqueue(new FadeOutAnimation(nextElement, 100, 0, 1));

            if (captionsElement) {
              this.animation.enqueue(new FadeOutAnimation(captionsElement, 100, 0, 1));
            }

            this.animation.animate();
        }
    }

    stopHidingNavigation() {

        if (null == document.fullscreenElement) {

            // out of fullscreen
            return;
        }

        let nextElement     = document.querySelector('[data-flat-gallery-nav="next"]') as HTMLElement;
        let previousElement = document.querySelector('[data-flat-gallery-nav="previous"]') as HTMLElement;
        let captionsElement = document.querySelector('[data-role="flat-gallery-captions"]') as HTMLElement;

        nextElement.style.opacity     = '1';
        previousElement.style.opacity = '1';

        if (captionsElement) {
          captionsElement.style.opacity = '1';
        }

        if (true === this.animation.running) {
            this.animation.stop();
        }

        window.clearTimeout(this.hideNavigationTimeout);

        let delay = (ServiceLocator.get('settings') as DefaultSettings).delay * 1000;

        this.hideNavigationTimeout = window.setTimeout(() => {
            this.hideNavigation();
        }, delay);
    }
}
