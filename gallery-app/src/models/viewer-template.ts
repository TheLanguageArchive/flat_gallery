import Image from "@fg-models/image";

/**
 * Creating captions from template
 *
 * @author  Ibrahim Abdullah <ibrahim.abdullah@mpi.nl>
 * @package Flat Gallery
 */
/**
 * @param url string
 *
 * @return Element
 */
const ViewerTemplate = (view: Element, image: Image) : Node => {

    let template = `
        <div class="flat-gallery-caption" data-role="flat-gallery-viewer-captions">
            <small class="flat-gallery-caption-filename">${image.filename}</small>
    `;

    if (image.descriptions.length > 0) {

        image.descriptions.forEach((description) => {
            template += `<h4>${description}</h4>`;
        });
    }

    template += '</div>';

    let element = document.createElement('div');

    let viewer  = document.createElement('div');
    viewer.classList.add('flat-gallery-viewer');
    viewer.appendChild(view);

    let captions = document.createElement('div');
    captions.innerHTML = template.trim();

    element.appendChild(viewer);
    element.appendChild(captions.firstChild);

    return element;
};

export default ViewerTemplate;
