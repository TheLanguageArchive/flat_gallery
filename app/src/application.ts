import ServiceLocator from "@fg-services/locator";
import { Settings, isModalSettings, isDefaultSettings, DefaultSettings, ModalSettings } from "@fg-services/settings";
import ApplicationNotRun from "@fg-exceptions/application-not-run";
import ViewerApp from "@fg-apps/viewer";
import App from "@fg-apps/app";
import Navigation from "@fg-services/navigation";
import Action from "@fg-apps/viewer/actions/action";
import LinkGenerator from "@fg-services/link-generator";
import EventManager from "@fg-events/manager";
import ModalOpenEvent from "@fg-events/modal/open";
import ModalCloseEvent from "@fg-events/modal/close";
import LoadImageLock from "@fg-models/load-image-lock";

export class Application {

  private apps: App[] = [];

  bootstrap(settings: Settings) {

    if (null == settings.flat_gallery) {

      // application should not run if
      // settings aren't passed through
      throw new ApplicationNotRun('FLAT Gallery settings missing (Drupal.settings.flat_gallery)');
    }

    if (true === isModalSettings(settings.flat_gallery)) {
      this.modal(settings);
    }

    if (true === isDefaultSettings(settings.flat_gallery)) {
      this.run(settings);
    }
  }

  modal(settings: Settings) {

    let url = (settings.flat_gallery as ModalSettings).url;

    EventManager.add(new ModalOpenEvent(url));
    EventManager.add(new ModalCloseEvent());
  }

  run(settings: Settings) {

    ServiceLocator.set('app', this);
    ServiceLocator.set('settings', settings.flat_gallery);
    ServiceLocator.set('openseadragon', settings.islandora_open_seadragon_viewer);
    ServiceLocator.set('load-image-lock', new LoadImageLock());

    if (true === isDefaultSettings(settings.flat_gallery)) {
      ServiceLocator.set('loaded-pages', [(settings.flat_gallery as DefaultSettings).current_page]);
    }

    let default_settings = (settings.flat_gallery as DefaultSettings);
    let navigation       = new Navigation(default_settings.current_id, default_settings.images);

    ServiceLocator.set('link-generator', new LinkGenerator(navigation, default_settings.fedora.base_url));
    ServiceLocator.set('navigation', navigation);

    this.apps.push(new ViewerApp());
    this.apps.forEach((app) => {
      app.run();
    });
  }

  action(action: Action) {

    this.apps.forEach((app) => {
      app.action(action);
    });
  }
}
