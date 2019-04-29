import LinkGenerator from "@fg-services/link-generator";

export default class NavTextualViewModel {

    private generator: LinkGenerator;

    constructor(generator: LinkGenerator) {
        this.generator = generator;
    }

    render() {

        let links             = this.generator.generateNavigationLinks();
        let navTextualElement = document.querySelector('[data-role="flat-gallery-nav-textual"]');

        while (navTextualElement.lastChild) {
            navTextualElement.removeChild(navTextualElement.lastChild);
        }

        links.forEach((link) => {
            navTextualElement.appendChild(link);
        });
    }
}
