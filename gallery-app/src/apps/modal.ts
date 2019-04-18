import EventManager from "@fg-events/manager";
import ModalOpenEvent from "@fg-events/modal/open";
import ModalCloseEvent from "@fg-events/modal/close";
import App from "@fg-apps/app";

export default class ModalApp implements App {

    run() {

        EventManager.add(new ModalOpenEvent());
        EventManager.add(new ModalCloseEvent());
    }
}
