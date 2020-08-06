import Viewer from "@fg-apps/viewer/viewer";
import BasicViewModel from "@fg-apps/viewer/basic/basic";
import Action from "@fg-apps/viewer/actions/action";
import LoadImageAction from "@fg-apps/viewer/actions/load-image";
import { FedoraModel } from "@fg-models/fedora-model";

export default class BasicViewer implements Viewer {

    private basic: BasicViewModel;

    run() {

        this.basic = new BasicViewModel();
        this.basic.setup();
    }

    action(action: Action) {

        if (action instanceof LoadImageAction && action.getImage().model === FedoraModel.Basic) {

            this.basic.setup();

            if (null == document.fullscreenElement) {

                // outside of fullscreen
                this.basic.renderViewerImage(action.getImage());

            } else {

                // inside of fullscreen
                this.basic.renderFullscreenImage(action.getImage());
            }
        }
    }
}
