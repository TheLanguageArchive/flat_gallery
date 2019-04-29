import Image from "@fg-models/image";
import ServiceLocator from "./locator";
import LinkGenerator from "./link-generator";

export default function PushImageToHistory(image: Image) {

  let generator = ServiceLocator.get('link-generator') as LinkGenerator;

  history.pushState({
    id: image.id
  }, '', generator.generateImageUrl(image));
}
