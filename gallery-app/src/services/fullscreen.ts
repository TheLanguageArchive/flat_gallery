export default function FixFullscreenCompatibility() {

    if (!Element.prototype.requestFullscreen) {
        Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
    }

    if (!document.exitFullscreen) {
        document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    }

    if (!document.fullscreenElement) {
        document.fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    }
}
