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
const ViewerCaptionsTemplate = (image: Image) : Node | false => {

    let template = `
        <div class="flat-gallery-caption">
            <small class="flat-gallery-caption-filename">${image.filename}</small>
    `;

    image.descriptions.forEach((description) => {
        template += `<h4>${description}</h4>`;
    });

    template += '</div>';

    let element = document.createElement('div');
    element.innerHTML = template.trim();

    return element.firstChild;
};

export default ViewerCaptionsTemplate;
