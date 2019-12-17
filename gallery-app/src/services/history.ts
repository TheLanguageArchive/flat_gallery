import Image from "@fg-models/image";
import ServiceLocator from "./locator";
import LinkGenerator from "./link-generator";

export default class History {

  total: number;

  constructor() {
    this.total = 0;
  }

  push(image: Image) {

    let generator = ServiceLocator.get('link-generator') as LinkGenerator;

    history.pushState({
      id: image.id
    }, '', generator.generateImageUrl(image));

    this.total += 1;
    console.log(this.total);
  }

  clear() {
    console.log(this.total);
    // history.go(this.total * -1);
  }
}
