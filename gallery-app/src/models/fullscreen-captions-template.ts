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
const FullscreenCaptionsTemplate = (image: Image) : Node | false => {

    if (image.descriptions.length > 0) {

        let captionsElement = document.createElement('div');
        captionsElement.classList.add('hidden');

        captionsElement.classList.remove('hidden');
        captionsElement.classList.add('flat-gallery-viewer-caption');

        image.descriptions.forEach((description) => {

            let captionElement = document.createElement('span');
            captionElement.textContent = description;

            captionsElement.appendChild(captionElement);
        });

        return captionsElement;
    }

    return false;
};

export default FullscreenCaptionsTemplate;
