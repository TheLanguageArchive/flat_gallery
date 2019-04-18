import { Application } from "./application";
import Settings from "@fg-services/settings";

(function (jq, Drupal) {

    Drupal.behaviors.FlatGalleryNew = {

        attach(context, settings: Settings) {

            let application = new Application();
            application.run(settings);
        },

        detach(context) {
        }
    };

}(jQuery, Drupal));
