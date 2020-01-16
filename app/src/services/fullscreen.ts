export default function FixFullscreenCompatibility() {

  if (typeof document.fullscreenElement == 'undefined') {

    Object.defineProperty(document, 'fullscreenElement', {
      get() {
        if (typeof document.mozFullScreenElement != 'undefined') {
          return document.mozFullScreenElement;
        }

        if (typeof document.webkitFullscreenElement != 'undefined') {
          return document.webkitFullscreenElement;
        }

        if (typeof document.msFullscreenElement != 'undefined') {
          return document.msFullscreenElement;
        }

        return undefined;
      }
    });
  }

  if (typeof Element.prototype.requestFullscreen == 'undefined') {

    if (typeof Element.prototype.mozRequestFullscreen != 'undefined') {
      Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen;
    }

    if (typeof Element.prototype.webkitRequestFullscreen != 'undefined') {
      Element.prototype.requestFullscreen = Element.prototype.webkitRequestFullscreen;
    }

    if (typeof Element.prototype.msRequestFullscreen != 'undefined') {
      Element.prototype.requestFullscreen = Element.prototype.msRequestFullscreen;
    }
  }
}
