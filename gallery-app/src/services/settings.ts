import { Image } from "../models/image";
/**
 * All the settings interfaces applicable to Flat Gallery
 *
 * @author  Ibrahim Abdullah <ibrahim.abdullah@mpi.nl>
 * @package Flat Gallery
 */
/**
 * These are the openseadragon main settings that will be
 * used to create an instance of openseadragon.
 * This can either be sent in on page load (if first image
 * is an Large Image), or it can be sent over via AJAX.
 */
export interface OpenseadragonSettings {

    djatokaServerBaseURL: string;
    fitToAspectRatio: number;
    iiifServerBaseURL: string;
    imageServer: string;

    options: {

        /**
         * We will always have the id inside the options
         * so let's make it explicit
         */
        id: string;

        /**
         * All the other options are implicit, so we do not
         * need to define them here.
         */
        [k: string]: any;
    };

    /**
     * This is the PID of the Large Image we are going to load
     */
    pid: string;
}

/**
 * This interface will be sent to us if the first image
 * loaded is not a Large Image. We will then use the options.id
 * to dynamically create an Openseadragon instance
 */
export interface OptionsIdSettings {

    options: {
        id: string;
    };
}

export interface FedoraSettings {

    pid: string;
    label: string;
    base_url: string;
}

export interface DefaultSettings {

    fedora: FedoraSettings;

    current_id: number;

    /**
     * Flat Gallery sends us either an array of images
     * or it sends us an empty array if no images are found.
     */
    images: [Image];

    /**
     * Openseadragon has a couple of settings already preloaded
     * if the first image in the previewer is a Large Image so it
     * will send {@link OpenseadragonSettings}
     * Or else it sends us a clean array with just the {@link OptionsIdSettings}.
     */
    openseadragon: OpenseadragonSettings | OptionsIdSettings;
}

/**
 * This interface will be sent to use if we only want
 * to bind the modal event binding.
 */
export interface ModalSettings {

    modal: true;
    url: string;
}

export interface OpenseadragonInstance {
    addHandler: (event: string, handler: (options: {[k: string]: any}) => any) => any
    buttons: any;
}

/**
 * Because of how Drupal works, Drupal.behaviors will
 * always be called on every page. To make sure we only run
 * the application, flat_gallery can either be this definition
 * or null | undefined
 */
export interface Settings {

    flat_gallery: DefaultSettings | ModalSettings | null | undefined;

    islandora_open_seadragon_viewer: OpenseadragonInstance | null | undefined;
}

export function isModalSettings(item: any): item is ModalSettings {
    return (<ModalSettings>item).modal !== undefined && (<ModalSettings>item).url !== undefined;
}

export function isDefaultSettings(item: any): item is DefaultSettings {
    return (<DefaultSettings>item).images !== undefined && (<DefaultSettings>item).openseadragon !== undefined;
}

export default Settings;
