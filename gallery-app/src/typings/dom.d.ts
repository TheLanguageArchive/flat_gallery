interface Element {
    mozRequestFullscreen(options?: FullscreenOptions): Promise<void>;
    webkitRequestFullscreen(options?: FullscreenOptions): Promise<void>;
    msRequestFullscreen(options?: FullscreenOptions): Promise<void>;
}

interface Document {
    mozExitFullscreen(): Promise<void>;
    webkitExitFullscreen(): Promise<void>;
    msExitFullscreen(): Promise<void>;

    fullscreenElement: Element | null;
    webkitFullscreenElement: Element | null;
    mozFullScreenElement: Element | null;
    msFullscreenElement: Element | null;
}
