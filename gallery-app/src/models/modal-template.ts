/**
 * Creating modal from template
 *
 * @author  Ibrahim Abdullah <ibrahim.abdullah@mpi.nl>
 * @package Flat Gallery
 */
/**
 * @param url string
 *
 * @return Element
 */
const ModalTemplate = (url: string) : Node => {

    let template = `
        <div class="flat-gallery-modal" data-role="flat-gallery-modal-container">
            <div class="flat-gallery-modal-overlay"></div>
            <div class="flat-gallery-modal-content-container">
                <a href="#" class="flat-gallery-modal-close" data-role="flat-gallery-modal-close"></a>
                <div class="flat-gallery-modal-content" data-role="flat-gallery-modal-content">
                    <iframe allowfullscreen="true" allow="fullscreen" src="${url}"></iframe>
                </div>
            </div>
        </div>
    `;

    let element = document.createElement('div');
    element.innerHTML = template.trim();

    return element.firstChild;
};

export default ModalTemplate;
