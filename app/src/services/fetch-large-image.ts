import Image from "@fg-models/image";
import { DefaultSettings } from "@fg-services/settings";
import ServiceLocator from "@fg-services/locator";

export default async function FetchLargeImage(image: Image) {

  let url      = (ServiceLocator.get('settings') as DefaultSettings).fedora.base_url + '/ajax';
  let response = await fetch(`${url}/${image.id}`);

  return await response.json();
}
