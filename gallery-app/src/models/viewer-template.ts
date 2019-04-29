import Image from "@fg-models/image";
import ViewerCaptionsTemplate from "./viewer-captions-template";

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

    let element  = document.createElement('div');
    let viewer   = document.createElement('div');
    let captions = ViewerCaptionsTemplate(image);

    viewer.classList.add('flat-gallery-viewer');
    viewer.appendChild(view);

    element.appendChild(viewer);

    if (false !== captions) {
        element.appendChild(captions);
    }

    return element;
};

export default ViewerTemplate;
