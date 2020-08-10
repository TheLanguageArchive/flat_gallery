import App from "@fg-apps/app";
import Viewer from "@fg-apps/viewer/viewer";
import OpenseadragonViewer from "@fg-apps/viewer/openseadragon";
import OpenseadragonBasicViewer from "@fg-apps/viewer/openseadragon-basic";
import EventManager from "@fg-events/manager";
import NavigationNextEvent from "@fg-events/navigation/next";
import NavigationPreviousEvent from "@fg-events/navigation/previous";
import KeyboardNextEvent from "@fg-events/navigation/keyboard-next";
import KeyboardPreviousEvent from "@fg-events/navigation/keyboard-previous";
import Action from "@fg-apps/viewer/actions/action";
import MouseMoveEvent from "@fg-events/navigation/mouse-move";
import LoadImageAction from "./actions/load-image";
import ServiceLocator from "@fg-services/locator";
import FixFullscreenCompatibility from "@fg-services/fullscreen";
import ClickThumbnailEvent from "@fg-events/navigation/click-thumbnail";
import PopStateEvent from "@fg-events/navigation/pop-state";
import FetchPageEvent from "@fg-events/navigation/fetch-page";
import FetchPageAction from "./actions/fetch-page";
import LazyLoadIntersectedEvent from "@fg-events/lazy-load/intersected";

export default class ViewerApp implements App {

    private viewers: Viewer[] = [

        new OpenseadragonViewer(),
        new OpenseadragonBasicViewer(),
    ];

    bootstrap() {

        FixFullscreenCompatibility();

        ServiceLocator.set('loading-image-lock', false);

        EventManager.add(new NavigationNextEvent());
        EventManager.add(new NavigationPreviousEvent());
        EventManager.add(new KeyboardNextEvent());
        EventManager.add(new KeyboardPreviousEvent());
        EventManager.add(new MouseMoveEvent());
        EventManager.add(new ClickThumbnailEvent());
        EventManager.add(new PopStateEvent());
        EventManager.add(new FetchPageEvent());
        EventManager.add(new LazyLoadIntersectedEvent());
    }

    run() {

        this.bootstrap();

        this.viewers.forEach((viewer: Viewer) => {
            viewer.run();
        });
    }

    action(action: Action) {

        if (action instanceof LoadImageAction) {
            window.scrollTo(0, 0);
        }

        if (action instanceof FetchPageAction) {
            action.fetchPage();
        }

        this.viewers.forEach((viewer: Viewer) => {
            viewer.action(action);
        });
    }
}
