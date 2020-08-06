import { DefaultSettings } from "@fg-services/settings";
import ServiceLocator from "@fg-services/locator";
import PageNotFetched from "@fg-exceptions/page-not-fetched";
import PageAlreadyFetched from "@fg-exceptions/page-already-fetched";

export default async function FetchPage() {

  let settings = (ServiceLocator.get('settings') as DefaultSettings);
  let url      = settings.fedora.base_url + '/items';
  let pages    = (ServiceLocator.get('loaded-pages') as number[]);
  let page     = pages[pages.length - 1] + 1;

  if (pages.indexOf(page) !== -1) {

    // page was already loaded
    throw new PageAlreadyFetched();
  }

  if (page < settings.total_pages) {

    // page not loaded yet
    // add to loaded list
    pages.push(page);

    let response = await fetch(`${url}?page=${page}`);

    return {

      // returning next page
      page: await response.json(),

      // and if page after this one is the last one
      last: (page + 1) >= settings.total_pages,
    };
  }

  // requested page could not be fetched
  throw new PageNotFetched();
}
