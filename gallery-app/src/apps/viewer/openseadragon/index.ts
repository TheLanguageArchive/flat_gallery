import ServiceLocator from "@fg-services/locator";
import { DefaultSettings } from "@fg-services/settings";
import Viewer from "@fg-apps/viewer/viewer";
import Openseadragon from "@fg-apps/viewer/openseadragon/openseadragon";

export default class OpenseadragonViewer implements Viewer {

  private openseadragon: Openseadragon;

  run() {

    let settings = (ServiceLocator.get('settings') as DefaultSettings);

    this.openseadragon = new Openseadragon(settings.openseadragon.options.id);
    this.openseadragon.setup();
  }
}
