import Viewer from "@fg-apps/viewer/viewer";
import OpenseadragonBasicViewModel from "@fg-apps/viewer/openseadragon-basic/openseadragon-basic";
import Action from "@fg-apps/viewer/actions/action";
import LoadImageAction from "@fg-apps/viewer/actions/load-image";
import { FedoraModel } from "@fg-models/fedora-model";
import ServiceLocator from "@fg-services/locator";
import { DefaultSettings } from "@fg-services/settings";

export default class OpenseadragonBasicViewer implements Viewer {

  private openseadragon: OpenseadragonBasicViewModel;

  run() {

    let settings = (ServiceLocator.get('settings') as DefaultSettings);

    this.openseadragon = new OpenseadragonBasicViewModel(settings.openseadragon.options.id);
    this.openseadragon.setup();
  }

  action(action: Action) {

    if (action instanceof LoadImageAction && action.getImage().model === FedoraModel.Basic) {
      this.openseadragon.create(action.getImage());
    }
  }
}
