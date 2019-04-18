/**
 * Defining which kinds of models this application
 * supports, we use this enum.
 *
 * @author  Ibrahim Abdullah <ibrahim.abdullah@mpi.nl>
 * @package Flat Gallery
 */
export enum FedoraModel {

  /**
   * Simple {@link HTMLImageElement} will be displayed
   */
  Basic = 'islandora:sp_basic_image',

  /**
   * Openseadragon viewer will be displayed
   */
  Large = 'islandora:sp_large_image_cmodel',
};
