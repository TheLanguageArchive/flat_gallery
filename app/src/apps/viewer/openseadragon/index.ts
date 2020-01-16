import Viewer from "@fg-apps/viewer/viewer";
import OpenseadragonViewModel from "@fg-apps/viewer/openseadragon/openseadragon";
import Action from "../actions/action";
import LoadImageAction from "../actions/load-image";
import { FedoraModel } from "@fg-models/fedora-model";
import ServiceLocator from "@fg-services/locator";
import { DefaultSettings } from "@fg-services/settings";

export default class OpenseadragonViewer implements Viewer {

  private openseadragon: OpenseadragonViewModel;

  run() {

    let settings = (ServiceLocator.get('settings') as DefaultSettings);

    this.openseadragon = new OpenseadragonViewModel(settings.openseadragon.options.id);
    this.openseadragon.setup();
  }

  action(action: Action) {

    if (action instanceof LoadImageAction && action.getImage().model === FedoraModel.Large) {
      this.openseadragon.create(action.getImage());
    }
  }
}
