/**
 * This interface defines a simple representation
 * of the object from Fedora and the url through
 * which can fetch the openseadragon settings with AJAX.
 *
 * @author  Ibrahim Abdullah <ibrahim.abdullah@mpi.nl>
 * @package Flat Gallery
 */
export interface Fedora {

    /**
     * Unique identifier defined in Fedora
     */
    pid: string;

    /**
     * Label defined in Fedora
     */
    label: string;

    /**
     * AJAX uri to fetch openseadragon options
     */
    openseadragon: string;
}
