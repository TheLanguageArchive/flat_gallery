import { Application } from "./application";
import Settings, { DefaultSettings } from "@fg-services/settings";

Drupal.behaviors.FlatGalleryNew = {

    attach(context, settings: Settings) {

        let application = new Application();
        application.run(settings);
    },

    detach(context) {
    }
};
