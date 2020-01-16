import { Application } from "@fg-application";
import Settings, { DefaultSettings, isModalSettings } from "@fg-services/settings";

Drupal.behaviors.FlatGalleryNew = {

    attach(context, settings: Settings) {

        if (typeof window.parent['flat_gallery_app'] === 'undefined') {
            // window.parent['flat_gallery_app'] = new Application();
        }

        let application = new Application();
        application.bootstrap(settings);
    },

    detach(context) {
    }
};
