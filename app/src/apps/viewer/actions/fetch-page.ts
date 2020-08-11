import Action from "@fg-apps/viewer/actions/action";
import FetchPage from "@fg-services/fetch-page";
import ServiceLocator from "@fg-services/locator";
import Navigation from "@fg-services/navigation";
import Image from "@fg-models/image";

export default class FetchPageAction implements Action {

  async fetchPage() {

    try {

      let data = await FetchPage();
      let grid = document.querySelector('[data-role="flat-gallery-grid"]') as HTMLDivElement;

      if (typeof data.page !== 'undefined' && null !== grid) {

        // adding images to DOM
        grid.innerHTML += data.page.html;

        // adding images to navigation
        let navigation = ServiceLocator.get('navigation') as Navigation;
        navigation.addImages(Object.values(data.page.items) as Image[]);
      }

    } catch (e) {

      // either page was already loaded (e = PageAlreadyFetched)
      // or page could not be fetched (e = PageNotFetched)
    }

    // hiding loader
    let loader = document.querySelector('[data-role="flat-gallery-grid-loading"]') as HTMLDivElement;

    if (loader) {
      loader.classList.add('flat-gallery-grid-hidden');
    }
  }
}
