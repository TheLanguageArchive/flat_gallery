!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ServiceLocator=void 0,t.ServiceLocator=new Map,t.default=t.ServiceLocator},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e){this.image=e}return e.prototype.getImage=function(){return this.image},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FedoraModel=void 0,function(e){e.Basic="islandora:sp_basic_image",e.Large="islandora:sp_large_image_cmodel"}(t.FedoraModel||(t.FedoraModel={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){if(e.descriptions.length>0){var t='\n            <div class="flat-gallery-caption">\n                <small class="flat-gallery-caption-filename">'+e.filename+"</small>\n        ";e.descriptions.forEach((function(e){t+="<h4>"+e+"</h4>"})),t+="</div>";var n=document.createElement("div");return n.innerHTML=t.trim(),n.firstChild}return!1}},function(e,t,n){"use strict";var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,i){function o(e){try{u(a.next(e))}catch(e){i(e)}}function l(e){try{u(a.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,l)}u((a=a.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,a,r,i,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,a&&(r=2&i[0]?a.return:i[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,i[1])).done)return r;switch(a=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,a=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){o.label=i[1];break}if(6===i[0]&&o.label<r[1]){o.label=r[1],r=i;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(i);break}r[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],a=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(27),o=function(){function e(){}return e.prototype.fetchPage=function(){return a(this,void 0,void 0,(function(){var e,t,n;return r(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,i.default()];case 1:return e=a.sent(),t=document.querySelector('[data-role="flat-gallery-grid"]'),void 0!==e.page&&null!==t&&(t.innerHTML+=e.page.items),[3,3];case 2:return a.sent(),[3,3];case 3:return(n=document.querySelector('[data-role="flat-gallery-grid-loading"]'))&&n.classList.add("flat-gallery-grid-hidden"),[2]}}))}))},e}();t.default=o},function(e,t,n){"use strict";var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,i){function o(e){try{u(a.next(e))}catch(e){i(e)}}function l(e){try{u(a.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,l)}u((a=a.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,a,r,i,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,a&&(r=2&i[0]?a.return:i[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,i[1])).done)return r;switch(a=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,a=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){o.label=i[1];break}if(6===i[0]&&o.label<r[1]){o.label=r[1],r=i;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(i);break}r[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],a=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(0);t.default=function(e){return a(this,void 0,void 0,(function(){var t,n,a;return r(this,(function(r){switch(r.label){case 0:return t=i.default.get("settings"),n=t.fedora.base_url+"/ajax",a=t.current_page,[4,fetch(n+"/"+e.id+"?page="+a)];case 1:return[4,r.sent().json()];case 2:return[2,r.sent()]}}))}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(3);t.default=function(e,t){var n=document.createElement("div"),r=document.createElement("div"),i=a.default(t);return r.classList.add("flat-gallery-viewer"),r.appendChild(e),n.appendChild(r),!1!==i&&n.appendChild(i),n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){if(e.descriptions.length>0){var t=document.createElement("div");return t.classList.add("flat-gallery-viewer-caption"),t.setAttribute("data-role","flat-gallery-captions"),e.descriptions.forEach((function(e){var n=document.createElement("span");n.textContent=e,t.appendChild(n)})),t}return!1}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(){}return e.add=function(e){e.target.addEventListener(e.type,e.listener.bind(e),e.useCapture)},e.remove=function(e){e.target.removeEventListener(e.type,e.listener.bind(e),e.useCapture)},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(10);Drupal.behaviors.FlatGalleryNew={attach:function(e,t){window.parent.flat_gallery_app,(new a.Application).bootstrap(t)},detach:function(e){}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Application=void 0;var a=n(0),r=n(11),i=n(12),o=n(13),l=n(31),u=n(34),s=n(8),c=n(35),d=n(37),f=n(38),p=function(){function e(){this.apps=[]}return e.prototype.bootstrap=function(e){if(null==e.flat_gallery)throw new i.default("FLAT Gallery settings missing (Drupal.settings.flat_gallery)");!0===r.isModalSettings(e.flat_gallery)&&this.modal(e),!0===r.isDefaultSettings(e.flat_gallery)&&this.run(e)},e.prototype.modal=function(e){var t=e.flat_gallery.url;s.default.add(new c.default(t)),s.default.add(new d.default)},e.prototype.run=function(e){a.default.set("app",this),a.default.set("settings",e.flat_gallery),a.default.set("openseadragon",e.islandora_open_seadragon_viewer),a.default.set("load-image-lock",new f.default),!0===r.isDefaultSettings(e.flat_gallery)&&a.default.set("loaded-pages",[e.flat_gallery.current_page]);var t=e.flat_gallery,n=new l.default(t.current_id,t.images);a.default.set("link-generator",new u.default(n,t.fedora.base_url)),a.default.set("navigation",n),this.apps.push(new o.default),this.apps.forEach((function(e){e.run()}))},e.prototype.action=function(e){this.apps.forEach((function(t){t.action(e)}))},e}();t.Application=p},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDefaultSettings=t.isModalSettings=void 0,t.isModalSettings=function(e){return void 0!==e.modal&&void 0!==e.url},t.isDefaultSettings=function(e){return void 0!==e.images&&void 0!==e.openseadragon}},function(e,t,n){"use strict";var a,r=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t}(Error);t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(14),r=n(16),i=n(8),o=n(18),l=n(19),u=n(20),s=n(21),c=n(22),d=n(1),f=n(0),p=n(23),h=n(24),g=n(25),v=n(26),y=n(4),m=n(30),b=function(){function e(){this.viewers=[new a.default,new r.default]}return e.prototype.bootstrap=function(){p.default(),f.default.set("loading-image-lock",!1),i.default.add(new o.default),i.default.add(new l.default),i.default.add(new u.default),i.default.add(new s.default),i.default.add(new c.default),i.default.add(new h.default),i.default.add(new g.default),i.default.add(new v.default),i.default.add(new m.default)},e.prototype.run=function(){this.bootstrap(),this.viewers.forEach((function(e){e.run()}))},e.prototype.action=function(e){e instanceof d.default&&window.scrollTo(0,0),e instanceof y.default&&e.fetchPage(),this.viewers.forEach((function(t){t.action(e)}))},e}();t.default=b},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(15),r=n(1),i=n(2),o=n(0),l=function(){function e(){}return e.prototype.run=function(){var e=o.default.get("settings");this.openseadragon=new a.default(e.openseadragon.options.id),this.openseadragon.setup()},e.prototype.action=function(e){e instanceof r.default&&e.getImage().model===i.FedoraModel.Large&&this.openseadragon.create(e.getImage())},e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(5),i=n(2),o=n(6),l=n(7),u=n(3),s=function(){function e(e){this.base="#"+e}return e.prototype.setup=function(){var e=this,t=a.default.get("load-image-lock"),n=a.default.get("openseadragon");if(t.unlock(),null!=n){n.buttons.buttons.forEach((function(t){"Toggle full page"===t.tooltip&&t.addHandler("click",(function(t){null==document.fullscreenElement?e.requestFullscreen():document.exitFullscreen()}))})),n.addHandler("pre-full-screen",(function(e){e.preventDefaultAction=!0}));var r=this.fullscreenChange.bind(this);document.addEventListener("fullscreenchange",r),document.addEventListener("webkitfullscreenchange",r),document.addEventListener("mozfullscreenchange",r),document.addEventListener("MSFullscreenChange",r)}},e.prototype.fullscreenChange=function(){a.default.get("navigation").current().model===i.FedoraModel.Large&&(null==document.fullscreenElement?this.leaveFullscreen():this.enterFullscreen())},e.prototype.requestFullscreen=function(){null==document.fullscreenElement&&document.querySelector('[data-role="flat-gallery-fullscreen"]').requestFullscreen()},e.prototype.enterFullscreen=function(){var e=a.default.get("navigation");e.show(),e.render(),this.renderFullscreenElement(e.current())},e.prototype.leaveFullscreen=function(){var e=a.default.get("navigation"),t=e.current();null==document.fullscreenElement&&t.model===i.FedoraModel.Large&&(e.hide(),this.renderViewerElement(t))},e.prototype.create=function(e){var t=this,n=a.default.get("load-image-lock");!0!==n.isLocked()&&(n.lock(),this.cleanBaseElement(),r.default(e).then((function(e){Drupal.settings.islandoraOpenSeadragon.djatokaServerBaseURL=e.djatokaServerBaseURL,Drupal.IslandoraOpenSeadragonViewer[t.base]=new Drupal.IslandoraOpenSeadragonViewer(t.base,e),a.default.set("openseadragon",Drupal.settings.islandora_open_seadragon_viewer),t.setup()})))},e.prototype.cleanBaseElement=function(){if(void 0!==Drupal.IslandoraOpenSeadragonViewer){var e=null,t=null,n=a.default.get("navigation").current(),r=document.querySelector(this.base),i=document.createElement("div");for(i.setAttribute("id",this.base.substring(1)),i.classList.add("islandora-openseadragon"),null==document.fullscreenElement?(e=document.querySelector('[data-role="flat-gallery-viewer"]'),t=u.default(n)):(e=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),t=l.default(n),i.classList.add("flat-gallery-openseadragon-fullscreen")),null!=r&&r.remove();e.lastChild;)e.removeChild(e.lastChild);e.appendChild(i),!1!==t&&e.appendChild(t),delete Drupal.IslandoraOpenSeadragonViewer[this.base]}},e.prototype.renderFullscreenElement=function(e){for(var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=document.querySelector(this.base);t.lastChild;)t.removeChild(t.lastChild);t.appendChild(n),n.classList.add("flat-gallery-openseadragon-fullscreen"),this.renderFullscreenCaptions(e)},e.prototype.renderViewerElement=function(e){for(var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=document.querySelector('[data-role="flat-gallery-viewer"]'),a=document.querySelector(this.base);n.lastChild;)n.removeChild(n.lastChild);for(a.classList.remove("flat-gallery-openseadragon-fullscreen"),n.appendChild(o.default(a,e));t.lastChild;)t.removeChild(t.lastChild)},e.prototype.renderFullscreenCaptions=function(e){var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=l.default(e);!1!==n&&t.appendChild(n)},e.prototype.renderViewerCaptions=function(e){var t=document.querySelector('[data-role="flat-gallery-viewer"]'),n=u.default(e);!1!==n&&t.appendChild(n)},e}();t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(17),r=n(1),i=n(2),o=n(0),l=function(){function e(){}return e.prototype.run=function(){var e=o.default.get("settings");this.openseadragon=new a.default(e.openseadragon.options.id),this.openseadragon.setup()},e.prototype.action=function(e){e instanceof r.default&&e.getImage().model===i.FedoraModel.Basic&&this.openseadragon.create(e.getImage())},e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(5),i=n(2),o=n(6),l=n(7),u=n(3),s=function(){function e(e){this.base="#"+e}return e.prototype.setup=function(){var e=this,t=a.default.get("load-image-lock"),n=a.default.get("openseadragon-basic");if(t.unlock(),null!=n){n.buttons.buttons.forEach((function(t){"Toggle full page"===t.tooltip&&t.addHandler("click",(function(t){null==document.fullscreenElement?e.requestFullscreen():document.exitFullscreen()}))})),n.addHandler("pre-full-screen",(function(e){e.preventDefaultAction=!0}));var r=this.fullscreenChange.bind(this);document.addEventListener("fullscreenchange",r),document.addEventListener("webkitfullscreenchange",r),document.addEventListener("mozfullscreenchange",r),document.addEventListener("MSFullscreenChange",r)}},e.prototype.fullscreenChange=function(){a.default.get("navigation").current().model===i.FedoraModel.Basic&&(null==document.fullscreenElement?this.leaveFullscreen():this.enterFullscreen())},e.prototype.requestFullscreen=function(){null==document.fullscreenElement&&document.querySelector('[data-role="flat-gallery-fullscreen"]').requestFullscreen()},e.prototype.enterFullscreen=function(){var e=a.default.get("navigation");e.show(),e.render(),this.renderFullscreenElement(e.current())},e.prototype.leaveFullscreen=function(){var e=a.default.get("navigation"),t=e.current();null==document.fullscreenElement&&t.model===i.FedoraModel.Basic&&(e.hide(),this.renderViewerElement(t))},e.prototype.create=function(e){var t=this,n=a.default.get("load-image-lock");!0!==n.isLocked()&&(n.lock(),this.cleanBaseElement(),r.default(e).then((function(e){Drupal.IslandoraOpenSeadragonViewer[t.base]=new Drupal.IslandoraOpenSeadragonViewer(t.base,e),a.default.set("openseadragon-basic",Drupal.settings.islandora_open_seadragon_viewer),t.setup()})))},e.prototype.cleanBaseElement=function(){if(void 0!==Drupal.IslandoraOpenSeadragonViewer){var e=null,t=null,n=a.default.get("navigation").current(),r=document.querySelector(this.base),i=document.createElement("div");for(i.setAttribute("id",this.base.substring(1)),i.classList.add("islandora-openseadragon"),null==document.fullscreenElement?(e=document.querySelector('[data-role="flat-gallery-viewer"]'),t=u.default(n)):(e=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),t=l.default(n),i.classList.add("flat-gallery-openseadragon-fullscreen")),null!=r&&r.remove();e.lastChild;)e.removeChild(e.lastChild);e.appendChild(i),!1!==t&&e.appendChild(t),delete Drupal.IslandoraOpenSeadragonViewer[this.base]}},e.prototype.renderFullscreenElement=function(e){for(var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=document.querySelector(this.base);t.lastChild;)t.removeChild(t.lastChild);t.appendChild(n),n.classList.add("flat-gallery-openseadragon-fullscreen"),this.renderFullscreenCaptions(e)},e.prototype.renderViewerElement=function(e){for(var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=document.querySelector('[data-role="flat-gallery-viewer"]'),a=document.querySelector(this.base);n.lastChild;)n.removeChild(n.lastChild);for(a.classList.remove("flat-gallery-openseadragon-fullscreen"),n.appendChild(o.default(a,e));t.lastChild;)t.removeChild(t.lastChild)},e.prototype.renderFullscreenCaptions=function(e){var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=l.default(e);!1!==n&&t.appendChild(n)},e.prototype.renderViewerCaptions=function(e){var t=document.querySelector('[data-role="flat-gallery-viewer"]'),n=u.default(e);!1!==n&&t.appendChild(n)},e}();t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),i=function(){function e(){this.type="click",this.useCapture=!1,this.target=document,this.application=a.default.get("app"),this.navigation=a.default.get("navigation")}return e.prototype.listener=function(e){var t=e.target;if(t.hasAttribute("data-flat-gallery-nav")&&"next"===t.getAttribute("data-flat-gallery-nav")){if(e.preventDefault(),!0===a.default.get("load-image-lock").isLocked())return;if(!1===this.navigation.nextImageAvailable())return;this.navigation.next(),this.navigation.render(),this.application.action(new r.default(this.navigation.current()))}},e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),i=function(){function e(){this.type="click",this.useCapture=!1,this.target=document,this.application=a.default.get("app"),this.navigation=a.default.get("navigation")}return e.prototype.listener=function(e){var t=e.target;if(t.hasAttribute("data-flat-gallery-nav")&&"previous"===t.getAttribute("data-flat-gallery-nav")){if(e.preventDefault(),!0===a.default.get("load-image-lock").isLocked())return;if(!1===this.navigation.previousImageAvailable())return;this.navigation.previous(),this.navigation.render(),this.application.action(new r.default(this.navigation.current()))}},e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),i=function(){function e(){this.type="keyup",this.useCapture=!1,this.target=document,this.application=a.default.get("app"),this.navigation=a.default.get("navigation")}return e.prototype.listener=function(e){if(39===(e.which||e.keyCode||0)){if(e.preventDefault(),!0===a.default.get("load-image-lock").isLocked())return;if(!1===this.navigation.nextImageAvailable())return;this.navigation.next(),this.navigation.render(),this.application.action(new r.default(this.navigation.current()))}},e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),i=function(){function e(){this.type="keyup",this.useCapture=!1,this.target=document,this.application=a.default.get("app"),this.navigation=a.default.get("navigation")}return e.prototype.listener=function(e){if(37===(e.which||e.keyCode||0)){if(e.preventDefault(),!0===a.default.get("load-image-lock").isLocked())return;if(!1===this.navigation.previousImageAvailable())return;this.navigation.previous(),this.navigation.render(),this.application.action(new r.default(this.navigation.current()))}},e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=function(){function e(){this.type="mousemove",this.useCapture=!1,this.target=document,this.navigation=a.default.get("navigation")}return e.prototype.listener=function(e){this.navigation.stopHidingNavigation()},e}();t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){void 0===document.fullscreenElement&&Object.defineProperty(document,"fullscreenElement",{get:function(){return void 0!==document.mozFullScreenElement?document.mozFullScreenElement:void 0!==document.webkitFullscreenElement?document.webkitFullscreenElement:void 0!==document.msFullscreenElement?document.msFullscreenElement:void 0}}),void 0===Element.prototype.requestFullscreen&&(void 0!==Element.prototype.mozRequestFullscreen&&(Element.prototype.requestFullscreen=Element.prototype.mozRequestFullscreen),void 0!==Element.prototype.webkitRequestFullscreen&&(Element.prototype.requestFullscreen=Element.prototype.webkitRequestFullscreen),void 0!==Element.prototype.msRequestFullscreen&&(Element.prototype.requestFullscreen=Element.prototype.msRequestFullscreen))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),i=function(){function e(){this.type="click",this.useCapture=!1,this.target=document,this.application=a.default.get("app"),this.navigation=a.default.get("navigation"),this.generator=a.default.get("link-generator")}return e.prototype.listener=function(e){var t=e.target;if(t.hasAttribute("data-load-image")){e.preventDefault();var n=+t.getAttribute("data-load-image"),a=this.navigation.setImage(n),i=this.navigation.current();if(!1===a)return;this.navigation.render(),this.application.action(new r.default(i))}},e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),i=function(){function e(){this.type="popstate",this.useCapture=!1,this.target=window,this.application=a.default.get("app"),this.navigation=a.default.get("navigation"),this.generator=a.default.get("link-generator")}return e.prototype.listener=function(e){if(null!==e.state){var t=e.state.id,n=this.navigation.setImage(t),a=this.navigation.current();!1!==n&&(this.navigation.render(),this.application.action(new r.default(a)))}},e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(4),i=function(){function e(){this.type="click",this.useCapture=!1,this.target=document,this.application=a.default.get("app")}return e.prototype.listener=function(e){var t=e.target;t.hasAttribute("data-role")&&"flat-gallery-fetch-page"===t.getAttribute("data-role")&&(e.preventDefault(),this.application.action(new r.default))},e}();t.default=i},function(e,t,n){"use strict";var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,i){function o(e){try{u(a.next(e))}catch(e){i(e)}}function l(e){try{u(a.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,l)}u((a=a.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,a,r,i,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,a&&(r=2&i[0]?a.return:i[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,i[1])).done)return r;switch(a=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,a=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){o.label=i[1];break}if(6===i[0]&&o.label<r[1]){o.label=r[1],r=i;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(i);break}r[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],a=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=n(28),l=n(29);t.default=function(){return a(this,void 0,void 0,(function(){var e,t,n,a,u,s;return r(this,(function(r){switch(r.label){case 0:if(e=i.default.get("settings"),t=e.fedora.base_url+"/items",n=i.default.get("loaded-pages"),a=n[n.length-1]+1,-1!==n.indexOf(a))throw new l.default;return a<e.total_pages?(n.push(a),[4,fetch(t+"?page="+a)]):[3,3];case 1:return u=r.sent(),s={},[4,u.json()];case 2:return[2,(s.page=r.sent(),s.last=a+1>=e.total_pages,s)];case 3:throw new o.default}}))}))}},function(e,t,n){"use strict";var a,r=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t}(Error);t.default=i},function(e,t,n){"use strict";var a,r=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t}(Error);t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(4),i=function(){function e(){this.type="flat.lazyload.intersected",this.target=document,this.useCapture=!1,this.application=a.default.get("app")}return e.prototype.listener=function(e){if("1"==e.target.getAttribute("data-flat-lazy-load-intersected")){var t=document.querySelector('[data-role="flat-gallery-grid-loading"]');t&&t.classList.remove("flat-gallery-grid-hidden"),this.application.action(new r.default)}},e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(32),r=n(33),i=n(0),o=function(){function e(e,t){this.id=e,this.images=t,this.animation=new a.default}return e.prototype.all=function(){return this.images},e.prototype.current=function(){return this.images[this.id]},e.prototype.getNextImage=function(){return!1!==this.nextImageAvailable()&&this.images[this.id+1]},e.prototype.nextImageAvailable=function(){return null!=this.images[this.id+1]},e.prototype.next=function(){return!1!==this.nextImageAvailable()&&(this.id+=1,this.images[this.id])},e.prototype.getPreviousImage=function(){return!1!==this.previousImageAvailable()&&this.images[this.id-1]},e.prototype.previousImageAvailable=function(){return null!=this.images[this.id-1]},e.prototype.previous=function(){return!1!==this.previousImageAvailable()&&(this.id-=1,this.images[this.id])},e.prototype.setImage=function(e){return null!=this.images[e]&&(this.id=e,!0)},e.prototype.show=function(){document.querySelector('[data-role="flat-gallery-nav"]').classList.remove("hidden")},e.prototype.hide=function(){document.querySelector('[data-role="flat-gallery-nav"]').classList.add("hidden")},e.prototype.render=function(){var e=document.querySelector('[data-flat-gallery-nav="next"]'),t=document.querySelector('[data-flat-gallery-nav="previous"]'),n=this.nextImageAvailable(),a=this.previousImageAvailable(),r=this.current();e.classList.add("hidden"),t.classList.add("hidden"),!0===n&&e.classList.remove("hidden"),!0===a&&t.classList.remove("hidden"),document.querySelectorAll('[data-role="flat-gallery-thumbnail"]').forEach((function(e){e.classList.remove("flat-gallery-grid-item-active")})),document.querySelector('[data-role="flat-gallery-thumbnail"][data-flat-gallery-id="'+r.id+'"]').classList.add("flat-gallery-grid-item-active"),this.stopHidingNavigation()},e.prototype.hideNavigation=function(){if(!1===this.animation.running){var e=document.querySelector('[data-flat-gallery-nav="next"]'),t=document.querySelector('[data-flat-gallery-nav="previous"]'),n=document.querySelector('[data-role="flat-gallery-captions"]');this.animation.enqueue(new r.default(t,100,0,1)),this.animation.enqueue(new r.default(e,100,0,1)),n&&this.animation.enqueue(new r.default(n,100,0,1)),this.animation.animate()}},e.prototype.stopHidingNavigation=function(){var e=this;if(null!=document.fullscreenElement){var t=document.querySelector('[data-flat-gallery-nav="next"]'),n=document.querySelector('[data-flat-gallery-nav="previous"]'),a=document.querySelector('[data-role="flat-gallery-captions"]');t.style.opacity="1",n.style.opacity="1",a&&(a.style.opacity="1"),!0===this.animation.running&&this.animation.stop(),clearTimeout(this.hideNavigationTimeout);var r=1e3*i.default.get("settings").delay;this.hideNavigationTimeout=setTimeout((function(){e.hideNavigation()}),r)}},e}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(){this.queue=[],this.framerate=60,this.running=!1}return e.prototype.enqueue=function(e){this.queue.push(e)},e.prototype.animate=function(){!1===this.running&&(this.running=!0,this.frame=-1,this.timer=setInterval(this.process.bind(this),1e3/this.framerate))},e.prototype.process=function(){var e=this;this.frame+=1;var t=[];this.queue.forEach((function(n){0==n.run(e.frame)&&t.push(n)})),t.length===this.queue.length&&this.stop()},e.prototype.stop=function(){this.queue=[],this.running=!1,clearInterval(this.timer)},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t,n,a){this.element=e,this.from=t,this.to=n,this.speed=a,this.framerate=60*a,this.frames=this.tween()}return e.prototype.run=function(e){return null!=this.frames[e]&&(null!==this.element&&(this.element.style.opacity=this.frames[e].toString(),!0))},e.prototype.tween=function(){for(var e=[],t=(this.to-this.from)/this.framerate,n=0;n<=this.framerate;n++)e[n]=(this.from+t*n)/100;return e},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){this.baseUrl=t,this.navigation=e}return e.prototype.generateNavigationLinks=function(){var e=this.navigation.getPreviousImage(),t=this.navigation.getNextImage(),n=[];if(!1!==e){(a=document.createElement("a")).textContent="Previous",a.setAttribute("href",this.baseUrl+"/"+e.id),a.setAttribute("data-flat-gallery-nav","previous"),n.push(a)}else{var a=document.createTextNode("Previous");n.push(a)}if(n.push(document.createTextNode(" | ")),!1!==t){(a=document.createElement("a")).textContent="Next",a.setAttribute("href",this.baseUrl+"/"+t.id),a.setAttribute("data-flat-gallery-nav","next"),n.push(a)}else{a=document.createTextNode("Next");n.push(a)}return n},e.prototype.generateImageUrl=function(e){return this.baseUrl+"/"+e.id},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(36),r=function(){function e(e){this.type="click",this.useCapture=!1,this.target=document,this.url=e}return e.prototype.listener=function(e){if("flat-gallery-modal"===e.target.getAttribute("data-role")){e.preventDefault();var t=a.default(this.url),n=document.querySelector("body");window.scrollTo(0,0),n.appendChild(t),document.querySelector('[data-role="flat-gallery-modal-iframe"]').focus(),document.querySelector('[data-role="flat-gallery-modal-content"]').parentNode.classList.add("fade-to")}},e}();t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t='\n        <div class="flat-gallery-modal" data-role="flat-gallery-modal-container">\n            <div class="flat-gallery-modal-overlay"></div>\n            <div class="flat-gallery-modal-content-container">\n                <a href="#" class="flat-gallery-modal-close" data-role="flat-gallery-modal-close"></a>\n                <div class="flat-gallery-modal-content" data-role="flat-gallery-modal-content">\n                    <iframe allowfullscreen="true" allow="fullscreen" src="'+e+'" data-role="flat-gallery-modal-iframe"></iframe>\n                </div>\n            </div>\n        </div>\n    ',n=document.createElement("div");return n.innerHTML=t.trim(),n.firstChild}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(){this.type="click",this.target=window.parent.document,this.useCapture=!1}return e.prototype.listener=function(e){if("flat-gallery-modal-close"===e.target.getAttribute("data-role")){var t=window.parent.document.querySelector('[data-role="flat-gallery-modal-content"]').parentNode,n=window.parent.document.querySelector('[data-role="flat-gallery-modal-container"]');t.classList.remove("fade-to"),n.remove()}},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e){void 0===e&&(e=!1),this._lock=e}return e.prototype.lock=function(){this._lock=!0},e.prototype.unlock=function(){this._lock=!1},e.prototype.isLocked=function(){return!0===this._lock},e}();t.default=a}]);