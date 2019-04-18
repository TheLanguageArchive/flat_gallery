/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/application.ts":
/*!****************************!*\
  !*** ./src/application.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var settings_1 = __webpack_require__(/*! @fg-services/settings */ "./src/services/settings.ts");
var application_not_run_1 = __webpack_require__(/*! @fg-exceptions/application-not-run */ "./src/exceptions/application-not-run.ts");
var viewer_1 = __webpack_require__(/*! @fg-apps/viewer */ "./src/apps/viewer/index.ts");
var modal_1 = __webpack_require__(/*! @fg-apps/modal */ "./src/apps/modal.ts");
var navigation_1 = __webpack_require__(/*! @fg-services/navigation */ "./src/services/navigation.ts");
var Application = /** @class */ (function () {
    function Application() {
        this.apps = [];
    }
    Application.prototype.bootstrap = function (settings) {
        locator_1.default.set('app', this);
        locator_1.default.set('settings', settings.flat_gallery);
        locator_1.default.set('openseadragon', settings.islandora_open_seadragon_viewer);
        if (null == settings.flat_gallery) {
            // application should not run if
            // settings aren't passed through
            throw new application_not_run_1.default('FLAT Gallery settings missing (Drupal.settings.flat_gallery)');
        }
        if (true === settings_1.isModalSettings(settings.flat_gallery)) {
            this.apps.push(new modal_1.default());
        }
        if (true === settings_1.isDefaultSettings(settings.flat_gallery)) {
            locator_1.default.set('navigation', new navigation_1.default(settings.flat_gallery.images));
            this.apps.push(new viewer_1.default());
        }
    };
    Application.prototype.run = function (settings) {
        this.bootstrap(settings);
        this.apps.forEach(function (app) {
            app.run();
        });
    };
    return Application;
}());
exports.Application = Application;


/***/ }),

/***/ "./src/apps/modal.ts":
/*!***************************!*\
  !*** ./src/apps/modal.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = __webpack_require__(/*! @fg-events/manager */ "./src/events/manager.ts");
var open_1 = __webpack_require__(/*! @fg-events/modal/open */ "./src/events/modal/open.ts");
var close_1 = __webpack_require__(/*! @fg-events/modal/close */ "./src/events/modal/close.ts");
var ModalApp = /** @class */ (function () {
    function ModalApp() {
    }
    ModalApp.prototype.run = function () {
        manager_1.default.add(new open_1.default());
        manager_1.default.add(new close_1.default());
    };
    return ModalApp;
}());
exports.default = ModalApp;


/***/ }),

/***/ "./src/apps/viewer/index.ts":
/*!**********************************!*\
  !*** ./src/apps/viewer/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fullscreen_1 = __webpack_require__(/*! @fg-services/fullscreen */ "./src/services/fullscreen.ts");
var openseadragon_1 = __webpack_require__(/*! ./openseadragon */ "./src/apps/viewer/openseadragon/index.ts");
var next_1 = __webpack_require__(/*! @fg-events/navigation/next */ "./src/events/navigation/next.ts");
var manager_1 = __webpack_require__(/*! @fg-events/manager */ "./src/events/manager.ts");
var previous_1 = __webpack_require__(/*! @fg-events/navigation/previous */ "./src/events/navigation/previous.ts");
var ViewerApp = /** @class */ (function () {
    function ViewerApp() {
        this.viewers = [
            new openseadragon_1.default(),
        ];
    }
    ViewerApp.prototype.bootstrap = function () {
        fullscreen_1.default();
        manager_1.default.add(new next_1.default());
        manager_1.default.add(new previous_1.default());
    };
    ViewerApp.prototype.run = function () {
        this.bootstrap();
        this.viewers.forEach(function (viewer) {
            viewer.run();
        });
    };
    return ViewerApp;
}());
exports.default = ViewerApp;


/***/ }),

/***/ "./src/apps/viewer/openseadragon/index.ts":
/*!************************************************!*\
  !*** ./src/apps/viewer/openseadragon/index.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var openseadragon_1 = __webpack_require__(/*! @fg-apps/viewer/openseadragon/openseadragon */ "./src/apps/viewer/openseadragon/openseadragon.ts");
var OpenseadragonViewer = /** @class */ (function () {
    function OpenseadragonViewer() {
    }
    OpenseadragonViewer.prototype.run = function () {
        var settings = locator_1.default.get('settings');
        this.openseadragon = new openseadragon_1.default(settings.openseadragon.options.id);
        this.openseadragon.setup();
    };
    return OpenseadragonViewer;
}());
exports.default = OpenseadragonViewer;


/***/ }),

/***/ "./src/apps/viewer/openseadragon/openseadragon.ts":
/*!********************************************************!*\
  !*** ./src/apps/viewer/openseadragon/openseadragon.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var Openseadragon = /** @class */ (function () {
    function Openseadragon(base) {
        this.base = '#' + base;
        this.fullscreen = false;
    }
    Openseadragon.prototype.setup = function () {
        var _this = this;
        var openseadragon = locator_1.default.get('openseadragon');
        if (null == openseadragon) {
            return;
        }
        openseadragon.addHandler('pre-full-screen', function (options) {
            options.preventDefaultAction = true;
            _this.enterFullscreen();
        });
        var fullscreenchange = this.leaveFullscreen.bind(this);
        document.addEventListener('fullscreenchange', fullscreenchange);
        document.addEventListener('webkitfullscreenchange', fullscreenchange);
        document.addEventListener('mozfullscreenchange', fullscreenchange);
        document.addEventListener('MSFullscreenChange', fullscreenchange);
    };
    Openseadragon.prototype.enterFullscreen = function () {
        var _this = this;
        if (true === this.fullscreen) {
            return;
        }
        this.fullscreen = true;
        var fullscreenRequestElement = document.querySelector('[data-role="flat-gallery-fullscreen"]');
        fullscreenRequestElement
            .requestFullscreen()
            .then(function () {
            var fullscreenElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
            var openseadragonElement = document.querySelector(_this.base);
            while (fullscreenElement.lastChild) {
                fullscreenElement.removeChild(fullscreenElement.lastChild);
            }
            fullscreenElement.appendChild(openseadragonElement);
            openseadragonElement.classList.add('flat-gallery-openseadragon-fullscreen');
            var navigation = locator_1.default.get('navigation');
            navigation.show();
            navigation.render();
        });
    };
    Openseadragon.prototype.leaveFullscreen = function () {
        if (null === document.fullscreenElement && true === this.fullscreen) {
            this.fullscreen = false;
            var navigation = locator_1.default.get('navigation');
            navigation.hide();
            var viewerElement = document.querySelector('[data-role="flat-gallery-viewer"]');
            var openseadragonElement = document.querySelector(this.base);
            while (viewerElement.lastChild) {
                viewerElement.removeChild(viewerElement.lastChild);
            }
            openseadragonElement.classList.remove('flat-gallery-openseadragon-fullscreen');
            viewerElement.appendChild(openseadragonElement);
        }
    };
    return Openseadragon;
}());
exports.default = Openseadragon;


/***/ }),

/***/ "./src/events/manager.ts":
/*!*******************************!*\
  !*** ./src/events/manager.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventManager = /** @class */ (function () {
    function EventManager() {
    }
    EventManager.prototype.add = function (event) {
        event.target.addEventListener(event.type, event.listener, event.useCapture);
    };
    EventManager.prototype.remove = function (event) {
        event.target.removeEventListener(event.type, event.listener, event.useCapture);
    };
    return EventManager;
}());
exports.EventManager = EventManager;
exports.default = new EventManager();


/***/ }),

/***/ "./src/events/modal/close.ts":
/*!***********************************!*\
  !*** ./src/events/modal/close.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModalCloseEvent = /** @class */ (function () {
    function ModalCloseEvent() {
        this.type = 'click';
        this.useCapture = false;
        this.target = document;
    }
    ModalCloseEvent.prototype.listener = function (event) {
        var target = event.target;
        if (target.getAttribute('data-role') === 'flat-gallery-modal-close') {
            var content = document.querySelector('[data-role="flat-gallery-modal-content"]');
            var container = content.parentNode;
            var modal = document.querySelector('[data-role="flat-gallery-modal-container"]');
            var transitionend = modal.remove.bind(modal);
            container.addEventListener('transitionend', transitionend);
            container.addEventListener('webkitTransitionEnd', transitionend);
            container.addEventListener('mozTransitionEnd', transitionend);
            container.addEventListener('oTransitionEnd', transitionend);
            container.addEventListener('MSTransitionEnd', transitionend);
            container.classList.remove('fade-to');
        }
    };
    return ModalCloseEvent;
}());
exports.default = ModalCloseEvent;


/***/ }),

/***/ "./src/events/modal/open.ts":
/*!**********************************!*\
  !*** ./src/events/modal/open.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var modal_template_1 = __webpack_require__(/*! @fg-models/modal-template */ "./src/models/modal-template.ts");
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var ModalOpenEvent = /** @class */ (function () {
    function ModalOpenEvent() {
        this.type = 'click';
        this.useCapture = false;
        this.target = document;
    }
    ModalOpenEvent.prototype.listener = function (event) {
        var target = event.target;
        if (target.getAttribute('data-role') === 'flat-gallery-modal') {
            event.preventDefault();
            var template = modal_template_1.default(locator_1.default.get('settings').url);
            var body = document.querySelector('body');
            window.scrollTo(0, 0);
            body.appendChild(template);
            setTimeout(function () {
                // adding timeout to allow for css transition
                // to be called
                var content = document.querySelector('[data-role="flat-gallery-modal-content"]');
                content.parentNode.classList.add('fade-to');
            });
        }
    };
    return ModalOpenEvent;
}());
exports.default = ModalOpenEvent;


/***/ }),

/***/ "./src/events/navigation/next.ts":
/*!***************************************!*\
  !*** ./src/events/navigation/next.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var NavigationNextEvent = /** @class */ (function () {
    function NavigationNextEvent() {
        this.type = 'click';
        this.useCapture = false;
        this.target = document;
    }
    NavigationNextEvent.prototype.listener = function (event) {
        var target = event.target;
        if (target.getAttribute('data-flat-gallery-nav') === 'next') {
            var navigation = locator_1.default.get('navigation');
            navigation.next();
            navigation.render();
        }
    };
    return NavigationNextEvent;
}());
exports.default = NavigationNextEvent;


/***/ }),

/***/ "./src/events/navigation/previous.ts":
/*!*******************************************!*\
  !*** ./src/events/navigation/previous.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var NavigationPreviousEvent = /** @class */ (function () {
    function NavigationPreviousEvent() {
        this.type = 'click';
        this.useCapture = false;
        this.target = document;
    }
    NavigationPreviousEvent.prototype.listener = function (event) {
        var target = event.target;
        if (target.getAttribute('data-flat-gallery-nav') === 'previous') {
            var navigation = locator_1.default.get('navigation');
            navigation.previous();
            navigation.render();
        }
    };
    return NavigationPreviousEvent;
}());
exports.default = NavigationPreviousEvent;


/***/ }),

/***/ "./src/exceptions/application-not-run.ts":
/*!***********************************************!*\
  !*** ./src/exceptions/application-not-run.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationNotRun = /** @class */ (function (_super) {
    __extends(ApplicationNotRun, _super);
    function ApplicationNotRun() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ApplicationNotRun;
}(Error));
exports.default = ApplicationNotRun;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = __webpack_require__(/*! ./application */ "./src/application.ts");
(function (jq, Drupal) {
    Drupal.behaviors.FlatGalleryNew = {
        attach: function (context, settings) {
            var application = new application_1.Application();
            application.run(settings);
        },
        detach: function (context) {
        }
    };
}(jQuery, Drupal));


/***/ }),

/***/ "./src/models/modal-template.ts":
/*!**************************************!*\
  !*** ./src/models/modal-template.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
var ModalTemplate = function (url) {
    var template = "\n        <div class=\"flat-gallery-modal\" data-role=\"flat-gallery-modal-container\">\n            <div class=\"flat-gallery-modal-overlay\"></div>\n            <div class=\"flat-gallery-modal-content-container\">\n                <a href=\"#\" class=\"flat-gallery-modal-close\" data-role=\"flat-gallery-modal-close\"></a>\n                <div class=\"flat-gallery-modal-content\" data-role=\"flat-gallery-modal-content\">\n                    <iframe allowfullscreen=\"true\" allow=\"fullscreen\" src=\"" + url + "\"></iframe>\n                </div>\n            </div>\n        </div>\n    ";
    var element = document.createElement('div');
    element.innerHTML = template.trim();
    return element.firstChild;
};
exports.default = ModalTemplate;


/***/ }),

/***/ "./src/services/fullscreen.ts":
/*!************************************!*\
  !*** ./src/services/fullscreen.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function FixFullscreenCompatibility() {
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
exports.default = FixFullscreenCompatibility;


/***/ }),

/***/ "./src/services/locator.ts":
/*!*********************************!*\
  !*** ./src/services/locator.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceLocator = new Map();
exports.default = exports.ServiceLocator;


/***/ }),

/***/ "./src/services/navigation.ts":
/*!************************************!*\
  !*** ./src/services/navigation.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (17:8)\nYou may need an appropriate loader to handle this file type.\n|     Navigation.prototype.nextImageAvailable = function () {\n|         return this.images.\n>         ;\n|     };\n|     Navigation.prototype.next = function () {");

/***/ }),

/***/ "./src/services/settings.ts":
/*!**********************************!*\
  !*** ./src/services/settings.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isModalSettings(item) {
    return item.modal !== undefined && item.url !== undefined;
}
exports.isModalSettings = isModalSettings;
function isDefaultSettings(item) {
    return item.images !== undefined && item.openseadragon !== undefined;
}
exports.isDefaultSettings = isDefaultSettings;


/***/ })

/******/ });
//# sourceMappingURL=flat-gallery-app-new.js.map