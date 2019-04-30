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

/***/ "./src/animations/animation.ts":
/*!*************************************!*\
  !*** ./src/animations/animation.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Animation = /** @class */ (function () {
    function Animation() {
        this.queue = [];
        this.framerate = 60;
        this.running = false;
    }
    Animation.prototype.enqueue = function (effect) {
        this.queue.push(effect);
    };
    Animation.prototype.animate = function () {
        if (false === this.running) {
            this.running = true;
            this.frame = -1;
            this.timer = setInterval(this.process.bind(this), 1000 / this.framerate);
        }
    };
    Animation.prototype.process = function () {
        var _this = this;
        this.frame += 1;
        var done = [];
        this.queue.forEach(function (effect) {
            var result = effect.run(_this.frame);
            if (false == result) {
                done.push(effect);
            }
        });
        if (done.length === this.queue.length) {
            this.stop();
        }
    };
    Animation.prototype.stop = function () {
        this.queue = [];
        this.running = false;
        clearInterval(this.timer);
    };
    return Animation;
}());
exports.default = Animation;


/***/ }),

/***/ "./src/animations/fade-out.ts":
/*!************************************!*\
  !*** ./src/animations/fade-out.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FadeOutAnimation = /** @class */ (function () {
    function FadeOutAnimation(element, from, to, speed) {
        this.element = element;
        this.from = from;
        this.to = to;
        this.speed = speed;
        this.framerate = 60 * speed;
        this.frames = this.tween();
    }
    FadeOutAnimation.prototype.run = function (frame) {
        if (null != this.frames[frame]) {
            if (null === this.element) {
                return false;
            }
            this.element.style.opacity = this.frames[frame].toString();
            return true;
        }
        return false;
    };
    FadeOutAnimation.prototype.tween = function () {
        var frames = [];
        var tween = (this.to - this.from) / this.framerate;
        for (var i = 0; i <= this.framerate; i++) {
            frames[i] = (this.from + (tween * i)) / 100;
        }
        return frames;
    };
    return FadeOutAnimation;
}());
exports.default = FadeOutAnimation;


/***/ }),

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
var link_generator_1 = __webpack_require__(/*! @fg-services/link-generator */ "./src/services/link-generator.ts");
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
            var default_settings = settings.flat_gallery;
            var navigation = new navigation_1.default(default_settings.current_id, default_settings.images);
            locator_1.default.set('link-generator', new link_generator_1.default(navigation, default_settings.fedora.base_url));
            locator_1.default.set('navigation', navigation);
            this.apps.push(new viewer_1.default());
        }
    };
    Application.prototype.run = function (settings) {
        this.bootstrap(settings);
        this.apps.forEach(function (app) {
            app.run();
        });
    };
    Application.prototype.action = function (action) {
        this.apps.forEach(function (app) {
            app.action(action);
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
    ModalApp.prototype.action = function () { };
    ModalApp.prototype.run = function () {
        manager_1.default.add(new open_1.default());
        manager_1.default.add(new close_1.default());
    };
    return ModalApp;
}());
exports.default = ModalApp;


/***/ }),

/***/ "./src/apps/viewer/actions/load-image.ts":
/*!***********************************************!*\
  !*** ./src/apps/viewer/actions/load-image.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LoadImageAction = /** @class */ (function () {
    function LoadImageAction(image) {
        this.image = image;
    }
    LoadImageAction.prototype.getImage = function () {
        return this.image;
    };
    return LoadImageAction;
}());
exports.default = LoadImageAction;


/***/ }),

/***/ "./src/apps/viewer/basic/basic.ts":
/*!****************************************!*\
  !*** ./src/apps/viewer/basic/basic.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var fedora_model_1 = __webpack_require__(/*! @fg-models/fedora-model */ "./src/models/fedora-model.ts");
var fullscreen_captions_template_1 = __webpack_require__(/*! @fg-models/fullscreen-captions-template */ "./src/models/fullscreen-captions-template.ts");
var viewer_template_1 = __webpack_require__(/*! @fg-models/viewer-template */ "./src/models/viewer-template.ts");
var BasicViewModel = /** @class */ (function () {
    function BasicViewModel() {
        this.fullscreen = false;
        this.eventsBound = false;
    }
    BasicViewModel.prototype.setup = function () {
        if (null != document.fullscreenElement) {
            this.fullscreen = true;
        }
        if (true === this.eventsBound) {
            return;
        }
        var navigation = locator_1.default.get('navigation');
        if (navigation.current().model !== fedora_model_1.FedoraModel.Basic) {
            return;
        }
        document.addEventListener('click', this.toggleFullscreen.bind(this));
        var fullscreenchange = this.fullscreenChange.bind(this);
        document.addEventListener('fullscreenchange', fullscreenchange);
        document.addEventListener('webkitfullscreenchange', fullscreenchange);
        document.addEventListener('mozfullscreenchange', fullscreenchange);
        document.addEventListener('MSFullscreenChange', fullscreenchange);
        this.eventsBound = true;
    };
    BasicViewModel.prototype.fullscreenChange = function () {
        var navigation = locator_1.default.get('navigation');
        if (navigation.current().model !== fedora_model_1.FedoraModel.Basic) {
            return;
        }
        if (null == document.fullscreenElement) {
            // exiting fullscreen
            this.leaveFullscreen();
        }
        else {
            // entering fullscreen
            this.enterFullscreen();
        }
    };
    BasicViewModel.prototype.requestFullscreen = function () {
        if (true === this.fullscreen) {
            return;
        }
        this.fullscreen = true;
        var fullscreenRequestElement = document.querySelector('[data-role="flat-gallery-fullscreen"]');
        fullscreenRequestElement.requestFullscreen();
    };
    BasicViewModel.prototype.toggleFullscreen = function () {
        var target = event.target;
        if (target.getAttribute('data-role') === 'flat-gallery-toggle-fullscreen') {
            if (null == document.fullscreenElement) {
                this.requestFullscreen();
            }
            else {
                // calling document.exitFullscreen instead of this.leaveFullscreen
                // because listeners on fullscreenchange already call it
                document.exitFullscreen();
            }
        }
    };
    BasicViewModel.prototype.enterFullscreen = function () {
        var navigation = locator_1.default.get('navigation');
        navigation.show();
        navigation.render();
        this.renderFullscreenImage(navigation.current());
    };
    BasicViewModel.prototype.leaveFullscreen = function () {
        var navigation = locator_1.default.get('navigation');
        var image = navigation.current();
        if (null == document.fullscreenElement && true === this.fullscreen && image.model === fedora_model_1.FedoraModel.Basic) {
            this.fullscreen = false;
            navigation.hide();
            this.renderViewerImage(image);
        }
    };
    BasicViewModel.prototype.renderImage = function (image) {
        var imageElement = document.createElement('img');
        imageElement.setAttribute('data-role', 'flat-gallery-toggle-fullscreen');
        imageElement.setAttribute('data-flat-gallery-id', image.id.toString());
        imageElement.setAttribute('src', image.object);
        imageElement.classList.add('flat-gallery-basic-image');
        return imageElement;
    };
    BasicViewModel.prototype.renderFullscreenImage = function (image) {
        var fullscreenElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
        var captionsElement = fullscreen_captions_template_1.default(image);
        var imageElement = this.renderImage(image);
        while (fullscreenElement.lastChild) {
            fullscreenElement.removeChild(fullscreenElement.lastChild);
        }
        fullscreenElement.appendChild(imageElement);
        if (false !== captionsElement) {
            fullscreenElement.appendChild(captionsElement);
        }
    };
    BasicViewModel.prototype.renderViewerImage = function (image) {
        var fullscreenElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
        var viewerElement = document.querySelector('[data-role="flat-gallery-viewer"]');
        var imageElement = this.renderImage(image);
        var viewer = viewer_template_1.default(imageElement, image);
        while (viewerElement.lastChild) {
            viewerElement.removeChild(viewerElement.lastChild);
        }
        viewerElement.appendChild(viewer);
        while (fullscreenElement.lastChild) {
            fullscreenElement.removeChild(fullscreenElement.lastChild);
        }
    };
    return BasicViewModel;
}());
exports.default = BasicViewModel;


/***/ }),

/***/ "./src/apps/viewer/basic/index.ts":
/*!****************************************!*\
  !*** ./src/apps/viewer/basic/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var basic_1 = __webpack_require__(/*! @fg-apps/viewer/basic/basic */ "./src/apps/viewer/basic/basic.ts");
var load_image_1 = __webpack_require__(/*! @fg-apps/viewer/actions/load-image */ "./src/apps/viewer/actions/load-image.ts");
var fedora_model_1 = __webpack_require__(/*! @fg-models/fedora-model */ "./src/models/fedora-model.ts");
var BasicViewer = /** @class */ (function () {
    function BasicViewer() {
    }
    BasicViewer.prototype.run = function () {
        this.basic = new basic_1.default();
        this.basic.setup();
    };
    BasicViewer.prototype.action = function (action) {
        if (action instanceof load_image_1.default && action.getImage().model === fedora_model_1.FedoraModel.Basic) {
            this.basic.setup();
            if (null == document.fullscreenElement) {
                // outside of fullscreen
                this.basic.renderViewerImage(action.getImage());
            }
            else {
                // inside of fullscreen
                this.basic.renderFullscreenImage(action.getImage());
            }
        }
    };
    return BasicViewer;
}());
exports.default = BasicViewer;


/***/ }),

/***/ "./src/apps/viewer/index.ts":
/*!**********************************!*\
  !*** ./src/apps/viewer/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var openseadragon_1 = __webpack_require__(/*! ./openseadragon */ "./src/apps/viewer/openseadragon/index.ts");
var manager_1 = __webpack_require__(/*! @fg-events/manager */ "./src/events/manager.ts");
var next_1 = __webpack_require__(/*! @fg-events/navigation/next */ "./src/events/navigation/next.ts");
var previous_1 = __webpack_require__(/*! @fg-events/navigation/previous */ "./src/events/navigation/previous.ts");
var keyboard_next_1 = __webpack_require__(/*! @fg-events/navigation/keyboard-next */ "./src/events/navigation/keyboard-next.ts");
var keyboard_previous_1 = __webpack_require__(/*! @fg-events/navigation/keyboard-previous */ "./src/events/navigation/keyboard-previous.ts");
var basic_1 = __webpack_require__(/*! @fg-apps/viewer/basic */ "./src/apps/viewer/basic/index.ts");
var mouse_move_1 = __webpack_require__(/*! @fg-events/navigation/mouse-move */ "./src/events/navigation/mouse-move.ts");
var load_image_1 = __webpack_require__(/*! ./actions/load-image */ "./src/apps/viewer/actions/load-image.ts");
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var nav_textual_1 = __webpack_require__(/*! @fg-apps/viewer/nav-textual */ "./src/apps/viewer/nav-textual.ts");
var fullscreen_1 = __webpack_require__(/*! @fg-services/fullscreen */ "./src/services/fullscreen.ts");
var click_thumbnail_1 = __webpack_require__(/*! @fg-events/navigation/click-thumbnail */ "./src/events/navigation/click-thumbnail.ts");
var pop_state_1 = __webpack_require__(/*! @fg-events/navigation/pop-state */ "./src/events/navigation/pop-state.ts");
var history_1 = __webpack_require__(/*! @fg-services/history */ "./src/services/history.ts");
var ViewerApp = /** @class */ (function () {
    function ViewerApp() {
        this.viewers = [
            new openseadragon_1.default(),
            new basic_1.default(),
        ];
    }
    ViewerApp.prototype.bootstrap = function () {
        fullscreen_1.default();
        history_1.default(locator_1.default.get('navigation').current());
        manager_1.default.add(new next_1.default());
        manager_1.default.add(new previous_1.default());
        manager_1.default.add(new keyboard_next_1.default());
        manager_1.default.add(new keyboard_previous_1.default());
        manager_1.default.add(new mouse_move_1.default());
        manager_1.default.add(new click_thumbnail_1.default());
        manager_1.default.add(new pop_state_1.default());
        this.navTextual = new nav_textual_1.default(locator_1.default.get('link-generator'));
    };
    ViewerApp.prototype.run = function () {
        this.bootstrap();
        this.viewers.forEach(function (viewer) {
            viewer.run();
        });
    };
    ViewerApp.prototype.action = function (action) {
        if (action instanceof load_image_1.default) {
            this.navTextual.render();
        }
        this.viewers.forEach(function (viewer) {
            viewer.action(action);
        });
    };
    return ViewerApp;
}());
exports.default = ViewerApp;


/***/ }),

/***/ "./src/apps/viewer/nav-textual.ts":
/*!****************************************!*\
  !*** ./src/apps/viewer/nav-textual.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NavTextualViewModel = /** @class */ (function () {
    function NavTextualViewModel(generator) {
        this.generator = generator;
    }
    NavTextualViewModel.prototype.render = function () {
        var links = this.generator.generateNavigationLinks();
        var navTextualElement = document.querySelector('[data-role="flat-gallery-nav-textual"]');
        while (navTextualElement.lastChild) {
            navTextualElement.removeChild(navTextualElement.lastChild);
        }
        links.forEach(function (link) {
            navTextualElement.appendChild(link);
        });
    };
    return NavTextualViewModel;
}());
exports.default = NavTextualViewModel;


/***/ }),

/***/ "./src/apps/viewer/openseadragon/index.ts":
/*!************************************************!*\
  !*** ./src/apps/viewer/openseadragon/index.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var openseadragon_1 = __webpack_require__(/*! @fg-apps/viewer/openseadragon/openseadragon */ "./src/apps/viewer/openseadragon/openseadragon.ts");
var load_image_1 = __webpack_require__(/*! ../actions/load-image */ "./src/apps/viewer/actions/load-image.ts");
var fedora_model_1 = __webpack_require__(/*! @fg-models/fedora-model */ "./src/models/fedora-model.ts");
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var OpenseadragonViewer = /** @class */ (function () {
    function OpenseadragonViewer() {
    }
    OpenseadragonViewer.prototype.run = function () {
        var settings = locator_1.default.get('settings');
        this.openseadragon = new openseadragon_1.default(settings.openseadragon.options.id);
        this.openseadragon.setup();
    };
    OpenseadragonViewer.prototype.action = function (action) {
        if (action instanceof load_image_1.default && action.getImage().model === fedora_model_1.FedoraModel.Large) {
            this.openseadragon.create(action.getImage());
        }
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
var fetch_large_image_1 = __webpack_require__(/*! @fg-services/fetch-large-image */ "./src/services/fetch-large-image.ts");
var fedora_model_1 = __webpack_require__(/*! @fg-models/fedora-model */ "./src/models/fedora-model.ts");
var viewer_template_1 = __webpack_require__(/*! @fg-models/viewer-template */ "./src/models/viewer-template.ts");
var fullscreen_captions_template_1 = __webpack_require__(/*! @fg-models/fullscreen-captions-template */ "./src/models/fullscreen-captions-template.ts");
var viewer_captions_template_1 = __webpack_require__(/*! @fg-models/viewer-captions-template */ "./src/models/viewer-captions-template.ts");
var OpenseadragonViewModel = /** @class */ (function () {
    function OpenseadragonViewModel(base) {
        this.base = '#' + base;
        this.fullscreen = false;
    }
    OpenseadragonViewModel.prototype.setup = function () {
        var _this = this;
        var openseadragon = locator_1.default.get('openseadragon');
        if (null == openseadragon) {
            return;
        }
        openseadragon.buttons.buttons.forEach(function (button) {
            if (button.tooltip === 'Toggle full page') {
                button.addHandler('click', function (options) {
                    if (false === _this.fullscreen) {
                        _this.requestFullscreen();
                    }
                    else {
                        // calling document.exitFullscreen instead of this.leaveFullscreen
                        // because listeners on fullscreenchange already call it
                        document.exitFullscreen();
                    }
                });
            }
        });
        openseadragon.addHandler('pre-full-screen', function (options) {
            options.preventDefaultAction = true;
        });
        var fullscreenchange = this.fullscreenChange.bind(this);
        document.addEventListener('fullscreenchange', fullscreenchange);
        document.addEventListener('webkitfullscreenchange', fullscreenchange);
        document.addEventListener('mozfullscreenchange', fullscreenchange);
        document.addEventListener('MSFullscreenChange', fullscreenchange);
    };
    OpenseadragonViewModel.prototype.fullscreenChange = function () {
        var navigation = locator_1.default.get('navigation');
        if (navigation.current().model !== fedora_model_1.FedoraModel.Large) {
            return;
        }
        if (null == document.fullscreenElement) {
            // exiting fullscreen
            this.leaveFullscreen();
        }
        else {
            // entering fullscreen
            this.enterFullscreen();
        }
    };
    OpenseadragonViewModel.prototype.requestFullscreen = function () {
        if (true === this.fullscreen) {
            return;
        }
        this.fullscreen = true;
        var fullscreenRequestElement = document.querySelector('[data-role="flat-gallery-fullscreen"]');
        fullscreenRequestElement.requestFullscreen();
    };
    OpenseadragonViewModel.prototype.enterFullscreen = function () {
        var navigation = locator_1.default.get('navigation');
        navigation.show();
        navigation.render();
        this.renderFullscreenElement(navigation.current());
    };
    OpenseadragonViewModel.prototype.leaveFullscreen = function () {
        var navigation = locator_1.default.get('navigation');
        var image = navigation.current();
        if (null == document.fullscreenElement && true === this.fullscreen && image.model === fedora_model_1.FedoraModel.Large) {
            this.fullscreen = false;
            navigation.hide();
            this.renderViewerElement(image);
        }
    };
    OpenseadragonViewModel.prototype.create = function (image) {
        var _this = this;
        this.cleanBaseElement();
        fetch_large_image_1.default(image)
            .then(function (settings) {
            Drupal.settings.islandoraOpenSeadragon.djatokaServerBaseURL = settings.djatokaServerBaseURL;
            Drupal.IslandoraOpenSeadragonViewer[_this.base] = new Drupal.IslandoraOpenSeadragonViewer(_this.base, settings);
            locator_1.default.set('openseadragon', Drupal.settings.islandora_open_seadragon_viewer);
            _this.setup();
            // if (false === this.fullscreen) {
            //     this.renderViewerCaptions(image);
            // } else {
            //     this.renderFullscreenCaptions(image);
            // }
        });
    };
    OpenseadragonViewModel.prototype.cleanBaseElement = function () {
        if (typeof Drupal.IslandoraOpenSeadragonViewer === 'undefined') {
            return;
        }
        var viewerElement = null;
        var captionsElement = null;
        var image = locator_1.default.get('navigation').current();
        var baseElement = document.querySelector(this.base);
        var newBaseElement = document.createElement('div');
        newBaseElement.setAttribute('id', this.base.substring(1)); // removing # from base name
        newBaseElement.classList.add('islandora-openseadragon');
        if (null == document.fullscreenElement) {
            // out of fullscreen
            viewerElement = document.querySelector('[data-role="flat-gallery-viewer"]');
            captionsElement = viewer_captions_template_1.default(image);
            this.fullscreen = false;
        }
        else {
            // inside fullscreen
            this.fullscreen = true;
            viewerElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
            captionsElement = fullscreen_captions_template_1.default(image);
            newBaseElement.classList.add('flat-gallery-openseadragon-fullscreen');
        }
        if (null != baseElement) {
            // removing current baseElement
            baseElement.remove();
        }
        // cleaning viewer element
        while (viewerElement.lastChild) {
            viewerElement.removeChild(viewerElement.lastChild);
        }
        // and adding new base element
        viewerElement.appendChild(newBaseElement);
        // and adding captions
        if (false !== captionsElement) {
            viewerElement.appendChild(captionsElement);
        }
        // finally removing it from cache
        delete Drupal.IslandoraOpenSeadragonViewer[this.base];
    };
    OpenseadragonViewModel.prototype.renderFullscreenElement = function (image) {
        var fullscreenElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
        var openseadragonElement = document.querySelector(this.base);
        while (fullscreenElement.lastChild) {
            fullscreenElement.removeChild(fullscreenElement.lastChild);
        }
        fullscreenElement.appendChild(openseadragonElement);
        openseadragonElement.classList.add('flat-gallery-openseadragon-fullscreen');
        this.renderFullscreenCaptions(image);
    };
    OpenseadragonViewModel.prototype.renderViewerElement = function (image) {
        var fullscreenElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
        var viewerElement = document.querySelector('[data-role="flat-gallery-viewer"]');
        var openseadragonElement = document.querySelector(this.base);
        while (viewerElement.lastChild) {
            viewerElement.removeChild(viewerElement.lastChild);
        }
        openseadragonElement.classList.remove('flat-gallery-openseadragon-fullscreen');
        viewerElement.appendChild(viewer_template_1.default(openseadragonElement, image));
        while (fullscreenElement.lastChild) {
            fullscreenElement.removeChild(fullscreenElement.lastChild);
        }
    };
    OpenseadragonViewModel.prototype.renderFullscreenCaptions = function (image) {
        var fullscreenElement = document.querySelector('[data-role="flat-gallery-fullscreen-element"]');
        var captionsElement = fullscreen_captions_template_1.default(image);
        if (false !== captionsElement) {
            fullscreenElement.appendChild(captionsElement);
        }
    };
    OpenseadragonViewModel.prototype.renderViewerCaptions = function (image) {
        var viewerElement = document.querySelector('[data-role="flat-gallery-viewer"]');
        var captionsElement = viewer_captions_template_1.default(image);
        if (false !== captionsElement) {
            viewerElement.appendChild(captionsElement);
        }
    };
    return OpenseadragonViewModel;
}());
exports.default = OpenseadragonViewModel;


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
        event.target.addEventListener(event.type, event.listener.bind(event), event.useCapture);
    };
    EventManager.prototype.remove = function (event) {
        event.target.removeEventListener(event.type, event.listener.bind(event), event.useCapture);
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

/***/ "./src/events/navigation/click-thumbnail.ts":
/*!**************************************************!*\
  !*** ./src/events/navigation/click-thumbnail.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var load_image_1 = __webpack_require__(/*! @fg-apps/viewer/actions/load-image */ "./src/apps/viewer/actions/load-image.ts");
var history_1 = __webpack_require__(/*! @fg-services/history */ "./src/services/history.ts");
var ClickThumbnailEvent = /** @class */ (function () {
    function ClickThumbnailEvent() {
        this.type = 'click';
        this.useCapture = false;
        this.target = document;
        this.application = locator_1.default.get('app');
        this.navigation = locator_1.default.get('navigation');
        this.generator = locator_1.default.get('link-generator');
    }
    ClickThumbnailEvent.prototype.listener = function (event) {
        var target = event.target;
        if (target.hasAttribute('data-load-image')) {
            event.preventDefault();
            var id = +target.getAttribute('data-load-image');
            var changed = this.navigation.setImage(id);
            var image = this.navigation.current();
            if (false === changed) {
                return;
            }
            this.navigation.render();
            this.application.action(new load_image_1.default(image));
            history_1.default(image);
        }
    };
    return ClickThumbnailEvent;
}());
exports.default = ClickThumbnailEvent;


/***/ }),

/***/ "./src/events/navigation/keyboard-next.ts":
/*!************************************************!*\
  !*** ./src/events/navigation/keyboard-next.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var load_image_1 = __webpack_require__(/*! @fg-apps/viewer/actions/load-image */ "./src/apps/viewer/actions/load-image.ts");
var history_1 = __webpack_require__(/*! @fg-services/history */ "./src/services/history.ts");
var KeyboardNextEvent = /** @class */ (function () {
    function KeyboardNextEvent() {
        this.type = 'keyup';
        this.useCapture = false;
        this.target = document;
        this.application = locator_1.default.get('app');
        this.navigation = locator_1.default.get('navigation');
    }
    KeyboardNextEvent.prototype.listener = function (event) {
        var keyboard = event.which || event.keyCode || 0;
        if (keyboard === 39) {
            event.preventDefault();
            this.navigation.next();
            this.navigation.render();
            this.application.action(new load_image_1.default(this.navigation.current()));
            history_1.default(this.navigation.current());
        }
    };
    return KeyboardNextEvent;
}());
exports.default = KeyboardNextEvent;


/***/ }),

/***/ "./src/events/navigation/keyboard-previous.ts":
/*!****************************************************!*\
  !*** ./src/events/navigation/keyboard-previous.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var load_image_1 = __webpack_require__(/*! @fg-apps/viewer/actions/load-image */ "./src/apps/viewer/actions/load-image.ts");
var history_1 = __webpack_require__(/*! @fg-services/history */ "./src/services/history.ts");
var KeyboardPreviousEvent = /** @class */ (function () {
    function KeyboardPreviousEvent() {
        this.type = 'keyup';
        this.useCapture = false;
        this.target = document;
        this.application = locator_1.default.get('app');
        this.navigation = locator_1.default.get('navigation');
    }
    KeyboardPreviousEvent.prototype.listener = function (event) {
        var keyboard = event.which || event.keyCode || 0;
        if (keyboard === 37) {
            event.preventDefault();
            this.navigation.previous();
            this.navigation.render();
            this.application.action(new load_image_1.default(this.navigation.current()));
            history_1.default(this.navigation.current());
        }
    };
    return KeyboardPreviousEvent;
}());
exports.default = KeyboardPreviousEvent;


/***/ }),

/***/ "./src/events/navigation/mouse-move.ts":
/*!*********************************************!*\
  !*** ./src/events/navigation/mouse-move.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var MouseMoveEvent = /** @class */ (function () {
    function MouseMoveEvent() {
        this.type = 'mousemove';
        this.useCapture = false;
        this.target = document;
        this.navigation = locator_1.default.get('navigation');
    }
    MouseMoveEvent.prototype.listener = function (event) {
        this.navigation.stopHidingNavigation();
    };
    return MouseMoveEvent;
}());
exports.default = MouseMoveEvent;


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
var load_image_1 = __webpack_require__(/*! @fg-apps/viewer/actions/load-image */ "./src/apps/viewer/actions/load-image.ts");
var history_1 = __webpack_require__(/*! @fg-services/history */ "./src/services/history.ts");
var NavigationNextEvent = /** @class */ (function () {
    function NavigationNextEvent() {
        this.type = 'click';
        this.useCapture = false;
        this.target = document;
        this.application = locator_1.default.get('app');
        this.navigation = locator_1.default.get('navigation');
    }
    NavigationNextEvent.prototype.listener = function (event) {
        var target = event.target;
        if (target.hasAttribute('data-flat-gallery-nav') && target.getAttribute('data-flat-gallery-nav') === 'next') {
            event.preventDefault();
            this.navigation.next();
            this.navigation.render();
            this.application.action(new load_image_1.default(this.navigation.current()));
            history_1.default(this.navigation.current());
        }
    };
    return NavigationNextEvent;
}());
exports.default = NavigationNextEvent;


/***/ }),

/***/ "./src/events/navigation/pop-state.ts":
/*!********************************************!*\
  !*** ./src/events/navigation/pop-state.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! @fg-services/locator */ "./src/services/locator.ts");
var load_image_1 = __webpack_require__(/*! @fg-apps/viewer/actions/load-image */ "./src/apps/viewer/actions/load-image.ts");
var ClickThumbnailEvent = /** @class */ (function () {
    function ClickThumbnailEvent() {
        this.type = 'popstate';
        this.useCapture = false;
        this.target = window;
        this.application = locator_1.default.get('app');
        this.navigation = locator_1.default.get('navigation');
        this.generator = locator_1.default.get('link-generator');
    }
    ClickThumbnailEvent.prototype.listener = function (event) {
        var id = event.state.id;
        var changed = this.navigation.setImage(id);
        var image = this.navigation.current();
        if (false === changed) {
            return;
        }
        this.navigation.render();
        this.application.action(new load_image_1.default(image));
    };
    return ClickThumbnailEvent;
}());
exports.default = ClickThumbnailEvent;


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
var load_image_1 = __webpack_require__(/*! @fg-apps/viewer/actions/load-image */ "./src/apps/viewer/actions/load-image.ts");
var history_1 = __webpack_require__(/*! @fg-services/history */ "./src/services/history.ts");
var NavigationPreviousEvent = /** @class */ (function () {
    function NavigationPreviousEvent() {
        this.type = 'click';
        this.useCapture = false;
        this.target = document;
        this.application = locator_1.default.get('app');
        this.navigation = locator_1.default.get('navigation');
    }
    NavigationPreviousEvent.prototype.listener = function (event) {
        var target = event.target;
        if (target.hasAttribute('data-flat-gallery-nav') && target.getAttribute('data-flat-gallery-nav') === 'previous') {
            event.preventDefault();
            this.navigation.previous();
            this.navigation.render();
            this.application.action(new load_image_1.default(this.navigation.current()));
            history_1.default(this.navigation.current());
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
(function (jq, Drupal, document, Element) {
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

/***/ "./src/models/fedora-model.ts":
/*!************************************!*\
  !*** ./src/models/fedora-model.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defining which kinds of models this application
 * supports, we use this enum.
 *
 * @author  Ibrahim Abdullah <ibrahim.abdullah@mpi.nl>
 * @package Flat Gallery
 */
var FedoraModel;
(function (FedoraModel) {
    /**
     * Simple {@link HTMLImageElement} will be displayed
     */
    FedoraModel["Basic"] = "islandora:sp_basic_image";
    /**
     * Openseadragon viewer will be displayed
     */
    FedoraModel["Large"] = "islandora:sp_large_image_cmodel";
})(FedoraModel = exports.FedoraModel || (exports.FedoraModel = {}));
;


/***/ }),

/***/ "./src/models/fullscreen-captions-template.ts":
/*!****************************************************!*\
  !*** ./src/models/fullscreen-captions-template.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
var FullscreenCaptionsTemplate = function (image) {
    if (image.descriptions.length > 0) {
        var captionsElement_1 = document.createElement('div');
        captionsElement_1.classList.add('flat-gallery-viewer-caption');
        captionsElement_1.setAttribute('data-role', 'flat-gallery-captions');
        image.descriptions.forEach(function (description) {
            var captionElement = document.createElement('span');
            captionElement.textContent = description;
            captionsElement_1.appendChild(captionElement);
        });
        return captionsElement_1;
    }
    return false;
};
exports.default = FullscreenCaptionsTemplate;


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

/***/ "./src/models/viewer-captions-template.ts":
/*!************************************************!*\
  !*** ./src/models/viewer-captions-template.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
var ViewerCaptionsTemplate = function (image) {
    if (image.descriptions.length > 0) {
        var template_1 = "\n            <div class=\"flat-gallery-caption\">\n                <small class=\"flat-gallery-caption-filename\">" + image.filename + "</small>\n        ";
        image.descriptions.forEach(function (description) {
            template_1 += "<h4>" + description + "</h4>";
        });
        template_1 += '</div>';
        var element = document.createElement('div');
        element.innerHTML = template_1.trim();
        return element.firstChild;
    }
    return false;
};
exports.default = ViewerCaptionsTemplate;


/***/ }),

/***/ "./src/models/viewer-template.ts":
/*!***************************************!*\
  !*** ./src/models/viewer-template.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var viewer_captions_template_1 = __webpack_require__(/*! ./viewer-captions-template */ "./src/models/viewer-captions-template.ts");
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
var ViewerTemplate = function (view, image) {
    var element = document.createElement('div');
    var viewer = document.createElement('div');
    var captions = viewer_captions_template_1.default(image);
    viewer.classList.add('flat-gallery-viewer');
    viewer.appendChild(view);
    element.appendChild(viewer);
    if (false !== captions) {
        element.appendChild(captions);
    }
    return element;
};
exports.default = ViewerTemplate;


/***/ }),

/***/ "./src/services/fetch-large-image.ts":
/*!*******************************************!*\
  !*** ./src/services/fetch-large-image.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! ./locator */ "./src/services/locator.ts");
function FetchLargeImage(image) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = locator_1.default.get('settings').fedora.base_url + '/ajax';
                    return [4 /*yield*/, fetch(url + "/" + image.id)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.default = FetchLargeImage;


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
    if (typeof document.fullscreenElement == 'undefined') {
        Object.defineProperty(document, 'fullscreenElement', {
            get: function () {
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
exports.default = FixFullscreenCompatibility;


/***/ }),

/***/ "./src/services/history.ts":
/*!*********************************!*\
  !*** ./src/services/history.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locator_1 = __webpack_require__(/*! ./locator */ "./src/services/locator.ts");
function PushImageToHistory(image) {
    var generator = locator_1.default.get('link-generator');
    history.pushState({
        id: image.id
    }, '', generator.generateImageUrl(image));
}
exports.default = PushImageToHistory;


/***/ }),

/***/ "./src/services/link-generator.ts":
/*!****************************************!*\
  !*** ./src/services/link-generator.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LinkGenerator = /** @class */ (function () {
    function LinkGenerator(navigation, baseUrl) {
        this.baseUrl = baseUrl;
        this.navigation = navigation;
    }
    LinkGenerator.prototype.generateNavigationLinks = function () {
        var previous = this.navigation.getPreviousImage();
        var next = this.navigation.getNextImage();
        var links = [];
        if (false !== previous) {
            var link = document.createElement('a');
            link.textContent = 'Previous';
            link.setAttribute('href', this.baseUrl + "/" + previous.id);
            link.setAttribute('data-flat-gallery-nav', 'previous');
            links.push(link);
        }
        else {
            var link = document.createTextNode('Previous');
            links.push(link);
        }
        links.push(document.createTextNode(' | '));
        if (false !== next) {
            var link = document.createElement('a');
            link.textContent = 'Next';
            link.setAttribute('href', this.baseUrl + "/" + next.id);
            link.setAttribute('data-flat-gallery-nav', 'next');
            links.push(link);
        }
        else {
            var link = document.createTextNode('Next');
            links.push(link);
        }
        return links;
    };
    LinkGenerator.prototype.generateImageUrl = function (image) {
        return this.baseUrl + "/" + image.id;
    };
    return LinkGenerator;
}());
exports.default = LinkGenerator;


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var animation_1 = __webpack_require__(/*! @fg-animations/animation */ "./src/animations/animation.ts");
var fade_out_1 = __webpack_require__(/*! @fg-animations/fade-out */ "./src/animations/fade-out.ts");
var Navigation = /** @class */ (function () {
    function Navigation(current_id, images) {
        this.id = current_id;
        this.images = images;
        this.animation = new animation_1.default();
    }
    Navigation.prototype.all = function () {
        return this.images;
    };
    Navigation.prototype.current = function () {
        return this.images[this.id];
    };
    Navigation.prototype.getNextImage = function () {
        if (false === this.nextImageAvailable()) {
            return false;
        }
        return this.images[this.id + 1];
    };
    Navigation.prototype.nextImageAvailable = function () {
        return null != this.images[this.id + 1];
    };
    Navigation.prototype.next = function () {
        if (false === this.nextImageAvailable()) {
            return false;
        }
        this.id += 1;
        return this.images[this.id];
    };
    Navigation.prototype.getPreviousImage = function () {
        if (false === this.previousImageAvailable()) {
            return false;
        }
        return this.images[this.id - 1];
    };
    Navigation.prototype.previousImageAvailable = function () {
        return null != this.images[this.id - 1];
    };
    Navigation.prototype.previous = function () {
        if (false === this.previousImageAvailable()) {
            return false;
        }
        this.id -= 1;
        return this.images[this.id];
    };
    Navigation.prototype.setImage = function (id) {
        if (null == this.images[id]) {
            return false;
        }
        this.id = id;
        return true;
    };
    Navigation.prototype.show = function () {
        var navigationElement = document.querySelector('[data-role="flat-gallery-nav"]');
        navigationElement.classList.remove('hidden');
    };
    Navigation.prototype.hide = function () {
        var navigationElement = document.querySelector('[data-role="flat-gallery-nav"]');
        navigationElement.classList.add('hidden');
    };
    Navigation.prototype.render = function () {
        var nextElement = document.querySelector('[data-flat-gallery-nav="next"]');
        var previousElement = document.querySelector('[data-flat-gallery-nav="previous"]');
        var nextImageAvailable = this.nextImageAvailable();
        var previousImageAvailable = this.previousImageAvailable();
        var currentImage = this.current();
        nextElement.classList.add('hidden');
        previousElement.classList.add('hidden');
        if (true === nextImageAvailable) {
            nextElement.classList.remove('hidden');
        }
        if (true === previousImageAvailable) {
            previousElement.classList.remove('hidden');
        }
        document.querySelectorAll('[data-role="flat-gallery-thumbnail"] a').forEach(function (thumbnail) {
            thumbnail.classList.remove('active');
        });
        var currentThumbnailElement = document.querySelector("[data-role=\"flat-gallery-thumbnail\"][data-flat-gallery-id=\"" + currentImage.id + "\"] a");
        currentThumbnailElement.classList.add('active');
        // starting up animating arrow fade out
        this.stopHidingNavigation();
    };
    Navigation.prototype.hideNavigation = function () {
        if (false === this.animation.running) {
            var nextElement = document.querySelector('[data-flat-gallery-nav="next"]');
            var previousElement = document.querySelector('[data-flat-gallery-nav="previous"]');
            var captionsElement = document.querySelector('[data-role="flat-gallery-captions"]');
            this.animation.enqueue(new fade_out_1.default(previousElement, 100, 0, 1));
            this.animation.enqueue(new fade_out_1.default(nextElement, 100, 0, 1));
            if (captionsElement) {
                this.animation.enqueue(new fade_out_1.default(captionsElement, 100, 0, 1));
            }
            this.animation.animate();
        }
    };
    Navigation.prototype.stopHidingNavigation = function () {
        var _this = this;
        if (null == document.fullscreenElement) {
            // out of fullscreen
            return;
        }
        var nextElement = document.querySelector('[data-flat-gallery-nav="next"]');
        var previousElement = document.querySelector('[data-flat-gallery-nav="previous"]');
        var captionsElement = document.querySelector('[data-role="flat-gallery-captions"]');
        nextElement.style.opacity = '1';
        previousElement.style.opacity = '1';
        if (captionsElement) {
            captionsElement.style.opacity = '1';
        }
        if (true === this.animation.running) {
            this.animation.stop();
        }
        clearTimeout(this.hideNavigationTimeout);
        this.hideNavigationTimeout = setTimeout(function () {
            _this.hideNavigation();
        }, 5000);
    };
    return Navigation;
}());
exports.default = Navigation;


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
//# sourceMappingURL=flat-gallery-app.js.map