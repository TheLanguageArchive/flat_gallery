import FixFullscreenCompatibility from "@fg-services/fullscreen";
import App from "@fg-apps/app";
import Viewer from "@fg-apps/viewer/viewer";
import Openseadragon from "./openseadragon";
import NavigationNextEvent from "@fg-events/navigation/next";
import EventManager from "@fg-events/manager";
import NavigationPreviousEvent from "@fg-events/navigation/previous";

export default class ViewerApp implements App {

    private viewers: Viewer[] = [
        new Openseadragon(),
    ];

    bootstrap() {

        FixFullscreenCompatibility();

        EventManager.add(new NavigationNextEvent());
        EventManager.add(new NavigationPreviousEvent());
    }

    run() {

        this.bootstrap();

        this.viewers.forEach((viewer) => {
            viewer.run();
        });
    }
}
