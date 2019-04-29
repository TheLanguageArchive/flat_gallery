import Image from "@fg-models/image";
import { DefaultSettings } from "./settings";
import ServiceLocator from "./locator";

export default async function FetchLargeImage(image: Image) {

  let url      = (ServiceLocator.get('settings') as DefaultSettings).fedora.base_url + '/ajax';
  let response = await fetch(`${url}/${image.id}`);

  return await response.json();
}
