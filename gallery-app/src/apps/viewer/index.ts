import FixFullscreenCompatibility from "@fg-services/fullscreen";
import App from "@fg-apps/app";
import Viewer from "@fg-apps/viewer/viewer";
import OpenseadragonViewer from "./openseadragon";
import EventManager from "@fg-events/manager";
import NavigationNextEvent from "@fg-events/navigation/next";
import NavigationPreviousEvent from "@fg-events/navigation/previous";
import KeyboardNextEvent from "@fg-events/navigation/keyboard-next";
import KeyboardPreviousEvent from "@fg-events/navigation/keyboard-previous";
import BasicViewer from "@fg-apps/viewer/basic";
import Action from "@fg-apps/viewer/actions/action";
import MouseMoveEvent from "@fg-events/navigation/mouse-move";

export default class ViewerApp implements App {

    private viewers: Viewer[] = [

        new OpenseadragonViewer(),
        new BasicViewer(),
    ];

    bootstrap() {

        FixFullscreenCompatibility();

        EventManager.add(new NavigationNextEvent());
        EventManager.add(new NavigationPreviousEvent());
        EventManager.add(new KeyboardNextEvent());
        EventManager.add(new KeyboardPreviousEvent());
        EventManager.add(new MouseMoveEvent());
    }

    run() {

        this.bootstrap();

        this.viewers.forEach((viewer: Viewer) => {
            viewer.run();
        });
    }

    action(action: Action) {

        this.viewers.forEach((viewer: Viewer) => {
            viewer.action(action);
        });
    }
}
