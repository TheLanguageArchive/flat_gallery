/**
 * This interface defines which property an Image object
 * is supposed to have.
 *
 * @author  Ibrahim Abdullah <ibrahim.abdullah@mpi.nl>
 * @package Flat Gallery
 */
export default class Image {

  /**
   * ID refers to the position inside the gallery
   * to allow navigation between the images.
   */
  id: number;

  /**
   * The PID refers to the unique identifier
   * stored in Fedora.
   */
  pid: string;

  /**
   * This is the filename of the image
   */
  filename: string;

  /**
   * This is an absolute uri to the location of the
   * datastream containing the thumbnail.
   */
  thumbnail: string;

  /**
   * This is to identify what kind of image we are
   * displaying, which can be of type {FedoraModel}
   */
  model: string;

  /**
   * This is the absolute uri to the location of the
   * datastream containing the object.
   */
  object: string;

  /**
   * This is the actual uri to the image inside the gallery.
   */
  url: string;

  /**
   * This contains all the labels connected to the image.
   */
  descriptions: string[];
}
