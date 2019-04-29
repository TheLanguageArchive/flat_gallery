import { Application } from "./application";
import Settings, { DefaultSettings } from "@fg-services/settings";

(function (jq, Drupal, document, Element) {

    Drupal.behaviors.FlatGalleryNew = {

        attach(context, settings: Settings) {

            let application = new Application();
            application.run(settings);
        },

        detach(context) {
        }
    };

}(jQuery, Drupal));
