import Action from "@fg-apps/viewer/actions/action";
import FetchPage from "@fg-services/fetch-page";

export default class FetchPageAction implements Action {

    async fetchPage() {

        try {

            let data = await FetchPage();
            let grid = document.querySelector('[data-role="flat-gallery-grid"]') as HTMLDivElement;

            if (typeof data.page !== 'undefined') {
                grid.innerHTML += data.page.items;
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
