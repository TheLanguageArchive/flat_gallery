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
import LoadImageAction from "./actions/load-image";
import ServiceLocator from "@fg-services/locator";
import LinkGenerator from "@fg-services/link-generator";
import NavTextualViewModel from "@fg-apps/viewer/nav-textual";
import FixFullscreenCompatibility from "@fg-services/fullscreen";
import ClickThumbnailEvent from "@fg-events/navigation/click-thumbnail";
import PopStateEvent from "@fg-events/navigation/pop-state";
import Navigation from "@fg-services/navigation";
import PushImageToHistory from "@fg-services/history";

export default class ViewerApp implements App {

    private navTextual: NavTextualViewModel;

    private viewers: Viewer[] = [

        new OpenseadragonViewer(),
        new BasicViewer(),
    ];

    bootstrap() {

        FixFullscreenCompatibility();
        PushImageToHistory((ServiceLocator.get('navigation') as Navigation).current());

        EventManager.add(new NavigationNextEvent());
        EventManager.add(new NavigationPreviousEvent());
        EventManager.add(new KeyboardNextEvent());
        EventManager.add(new KeyboardPreviousEvent());
        EventManager.add(new MouseMoveEvent());
        EventManager.add(new ClickThumbnailEvent());
        EventManager.add(new PopStateEvent());

        this.navTextual = new NavTextualViewModel(ServiceLocator.get('link-generator') as LinkGenerator);
    }

    run() {

        this.bootstrap();

        this.viewers.forEach((viewer: Viewer) => {
            viewer.run();
        });
    }

    action(action: Action) {

        if (action instanceof LoadImageAction) {
            this.navTextual.render();
        }

        this.viewers.forEach((viewer: Viewer) => {
            viewer.action(action);
        });
    }
}
