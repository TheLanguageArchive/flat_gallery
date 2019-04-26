import Action from "@fg-apps/viewer/actions/action";
import Image from "@fg-models/image";

export default class LoadImageAction implements Action {

    private image: Image;

    constructor(image: Image) {
        this.image = image;
    }

    getImage() {
        return this.image;
    }
}
