import Image from "@fg-models/image";
import { DefaultSettings } from "@fg-services/settings";
import ServiceLocator from "@fg-services/locator";

export default async function FetchLargeImage(image: Image) {

  let settings = (ServiceLocator.get('settings') as DefaultSettings);
  let url      = settings.fedora.base_url + '/ajax';
  let page     = settings.current_page;

  let response = await fetch(`${url}/${image.id}?page=${page}`);

  return await response.json();
}
