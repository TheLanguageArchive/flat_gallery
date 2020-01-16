import Navigation from "@fg-services/navigation";
import Image from "@fg-models/image";

export default class LinkGenerator {

  private baseUrl: string;
  private navigation: Navigation;

  constructor(navigation: Navigation, baseUrl: string) {

    this.baseUrl    = baseUrl;
    this.navigation = navigation;
  }

  generateNavigationLinks() {

    let previous = this.navigation.getPreviousImage();
    let next     = this.navigation.getNextImage();
    let links    = [];

    if (false !== previous) {

      let link = document.createElement('a');
      link.textContent = 'Previous';
      link.setAttribute('href', `${this.baseUrl}/${previous.id}`);
      link.setAttribute('data-flat-gallery-nav', 'previous');

      links.push(link);

    } else {

      let link = document.createTextNode('Previous');
      links.push(link);
    }

    links.push(document.createTextNode(' | '));

    if (false !== next) {

      let link = document.createElement('a');
      link.textContent = 'Next';
      link.setAttribute('href', `${this.baseUrl}/${next.id}`);
      link.setAttribute('data-flat-gallery-nav', 'next');

      links.push(link);

    } else {

      let link = document.createTextNode('Next');
      links.push(link);
    }

    return links;
  }

  generateImageUrl(image: Image) {
    return `${this.baseUrl}/${image.id}`;
  }
}
