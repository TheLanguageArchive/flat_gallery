import Image from "@fg-models/image";
import { DefaultSettings } from "./settings";
import ServiceLocator from "./locator";

export default async function FetchLargeImage(image: Image) {

  let url      = (ServiceLocator.get('settings') as DefaultSettings).fedora.fetch_large_image_url;
  let response = await fetch(`${url}/${image.id}`);

  return await response.json();
}
