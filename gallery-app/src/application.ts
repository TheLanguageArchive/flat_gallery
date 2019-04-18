import ServiceLocator from "@fg-services/locator";
import { Settings, isModalSettings, isDefaultSettings, DefaultSettings } from "@fg-services/settings";
import ApplicationNotRun from "@fg-exceptions/application-not-run";
import ViewerApp from "@fg-apps/viewer";
import ModalApp from "@fg-apps/modal";
import App from "@fg-apps/app";
import Navigation from "@fg-services/navigation";

export class Application {

  private apps: App[] = [];

  bootstrap(settings: Settings) {

    ServiceLocator.set('app', this);
    ServiceLocator.set('settings', settings.flat_gallery);
    ServiceLocator.set('openseadragon', settings.islandora_open_seadragon_viewer);

    if (null == settings.flat_gallery) {

      // application should not run if
      // settings aren't passed through
      throw new ApplicationNotRun('FLAT Gallery settings missing (Drupal.settings.flat_gallery)');
    }

    if (true === isModalSettings(settings.flat_gallery)) {
      this.apps.push(new ModalApp());
    }

    if (true === isDefaultSettings(settings.flat_gallery)) {

      ServiceLocator.set('navigation', new Navigation((settings.flat_gallery as DefaultSettings).images));
      this.apps.push(new ViewerApp());
    }
  }

  run(settings: Settings) {

    this.bootstrap(settings);

    this.apps.forEach((app) => {
      app.run();
    });
  }
}
