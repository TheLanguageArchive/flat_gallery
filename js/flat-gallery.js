!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ServiceLocator=new Map,t.default=t.ServiceLocator},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e){this.image=e}return e.prototype.getImage=function(){return this.image},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.Basic="islandora:sp_basic_image",e.Large="islandora:sp_large_image_cmodel"}(t.FedoraModel||(t.FedoraModel={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){if(e.descriptions.length>0){var t='\n            <div class="flat-gallery-caption">\n                <small class="flat-gallery-caption-filename">'+e.filename+"</small>\n        ";e.descriptions.forEach((function(e){t+="<h4>"+e+"</h4>"})),t+="</div>";var n=document.createElement("div");return n.innerHTML=t.trim(),n.firstChild}return!1}},function(e,t,n){"use strict";var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,l){function i(e){try{u(a.next(e))}catch(e){l(e)}}function o(e){try{u(a.throw(e))}catch(e){l(e)}}function u(e){e.done?r(e.value):new n((function(t){t(e.value)})).then(i,o)}u((a=a.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,a,r,l,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return l={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function o(l){return function(o){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,a&&(r=2&l[0]?a.return:l[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,l[1])).done)return r;switch(a=0,r&&(l=[2&l[0],r.value]),l[0]){case 0:case 1:r=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,a=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!(r=(r=i.trys).length>0&&r[r.length-1])&&(6===l[0]||2===l[0])){i=0;continue}if(3===l[0]&&(!r||l[1]>r[0]&&l[1]<r[3])){i.label=l[1];break}if(6===l[0]&&i.label<r[1]){i.label=r[1],r=l;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(l);break}r[2]&&i.ops.pop(),i.trys.pop();continue}l=t.call(e,i)}catch(e){l=[6,e],a=0}finally{n=r=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,o])}}};Object.defineProperty(t,"__esModule",{value:!0});var l=n(0);t.default=function(e){return a(this,void 0,void 0,(function(){var t;return r(this,(function(n){switch(n.label){case 0:return t=l.default.get("settings").fedora.base_url+"/ajax",[4,fetch(t+"/"+e.id)];case 1:return[4,n.sent().json()];case 2:return[2,n.sent()]}}))}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(3);t.default=function(e,t){var n=document.createElement("div"),r=document.createElement("div"),l=a.default(t);return r.classList.add("flat-gallery-viewer"),r.appendChild(e),n.appendChild(r),!1!==l&&n.appendChild(l),n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){if(e.descriptions.length>0){var t=document.createElement("div");return t.classList.add("flat-gallery-viewer-caption"),t.setAttribute("data-role","flat-gallery-captions"),e.descriptions.forEach((function(e){var n=document.createElement("span");n.textContent=e,t.appendChild(n)})),t}return!1}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(){}return e.add=function(e){e.target.addEventListener(e.type,e.listener.bind(e),e.useCapture)},e.remove=function(e){e.target.removeEventListener(e.type,e.listener.bind(e),e.useCapture)},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(9);Drupal.behaviors.FlatGalleryNew={attach:function(e,t){window.parent.flat_gallery_app,(new a.Application).bootstrap(t)},detach:function(e){}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(10),l=n(11),i=n(12),o=n(26),u=n(29),s=n(7),d=n(30),c=n(32),f=function(){function e(){this.apps=[]}return e.prototype.bootstrap=function(e){if(null==e.flat_gallery)throw new l.default("FLAT Gallery settings missing (Drupal.settings.flat_gallery)");!0===r.isModalSettings(e.flat_gallery)&&this.modal(e),!0===r.isDefaultSettings(e.flat_gallery)&&this.run(e)},e.prototype.modal=function(e){var t=e.flat_gallery.url;s.default.add(new d.default(t)),s.default.add(new c.default)},e.prototype.run=function(e){a.default.set("app",this),a.default.set("settings",e.flat_gallery),a.default.set("openseadragon",e.islandora_open_seadragon_viewer);var t=e.flat_gallery,n=new o.default(t.current_id,t.images);a.default.set("link-generator",new u.default(n,t.fedora.base_url)),a.default.set("navigation",n),this.apps.push(new i.default),this.apps.forEach((function(e){e.run()}))},e.prototype.action=function(e){this.apps.forEach((function(t){t.action(e)}))},e}();t.Application=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isModalSettings=function(e){return void 0!==e.modal&&void 0!==e.url},t.isDefaultSettings=function(e){return void 0!==e.images&&void 0!==e.openseadragon}},function(e,t,n){"use strict";var a,r=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var l=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t}(Error);t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(13),r=n(15),l=n(7),i=n(17),o=n(18),u=n(19),s=n(20),d=n(21),c=n(1),f=n(0),p=n(22),h=n(23),g=n(24),v=n(25),m=function(){function e(){this.viewers=[new a.default,new r.default]}return e.prototype.bootstrap=function(){h.default(),l.default.add(new i.default),l.default.add(new o.default),l.default.add(new u.default),l.default.add(new s.default),l.default.add(new d.default),l.default.add(new g.default),l.default.add(new v.default),this.navTextual=new p.default(f.default.get("link-generator"))},e.prototype.run=function(){this.bootstrap(),this.viewers.forEach((function(e){e.run()}))},e.prototype.action=function(e){e instanceof c.default&&this.navTextual.render(),this.viewers.forEach((function(t){t.action(e)}))},e}();t.default=m},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(14),r=n(1),l=n(2),i=n(0),o=function(){function e(){}return e.prototype.run=function(){var e=i.default.get("settings");this.openseadragon=new a.default(e.openseadragon.options.id),this.openseadragon.setup()},e.prototype.action=function(e){e instanceof r.default&&e.getImage().model===l.FedoraModel.Large&&this.openseadragon.create(e.getImage())},e}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(4),l=n(2),i=n(5),o=n(6),u=n(3),s=function(){function e(e){this.base="#"+e}return e.prototype.setup=function(){var e=this,t=a.default.get("openseadragon");if(null!=t){t.buttons.buttons.forEach((function(t){"Toggle full page"===t.tooltip&&t.addHandler("click",(function(t){null==document.fullscreenElement?e.requestFullscreen():document.exitFullscreen()}))})),t.addHandler("pre-full-screen",(function(e){e.preventDefaultAction=!0}));var n=this.fullscreenChange.bind(this);document.addEventListener("fullscreenchange",n),document.addEventListener("webkitfullscreenchange",n),document.addEventListener("mozfullscreenchange",n),document.addEventListener("MSFullscreenChange",n)}},e.prototype.fullscreenChange=function(){a.default.get("navigation").current().model===l.FedoraModel.Large&&(null==document.fullscreenElement?this.leaveFullscreen():this.enterFullscreen())},e.prototype.requestFullscreen=function(){null==document.fullscreenElement&&document.querySelector('[data-role="flat-gallery-fullscreen"]').requestFullscreen()},e.prototype.enterFullscreen=function(){var e=a.default.get("navigation");e.show(),e.render(),this.renderFullscreenElement(e.current())},e.prototype.leaveFullscreen=function(){var e=a.default.get("navigation"),t=e.current();null==document.fullscreenElement&&t.model===l.FedoraModel.Large&&(e.hide(),this.renderViewerElement(t))},e.prototype.create=function(e){var t=this;this.cleanBaseElement(),r.default(e).then((function(e){Drupal.settings.islandoraOpenSeadragon.djatokaServerBaseURL=e.djatokaServerBaseURL,Drupal.IslandoraOpenSeadragonViewer[t.base]=new Drupal.IslandoraOpenSeadragonViewer(t.base,e),a.default.set("openseadragon",Drupal.settings.islandora_open_seadragon_viewer),t.setup()}))},e.prototype.cleanBaseElement=function(){if(void 0!==Drupal.IslandoraOpenSeadragonViewer){var e=null,t=null,n=a.default.get("navigation").current(),r=document.querySelector(this.base),l=document.createElement("div");for(l.setAttribute("id",this.base.substring(1)),l.classList.add("islandora-openseadragon"),null==document.fullscreenElement?(e=document.querySelector('[data-role="flat-gallery-viewer"]'),t=u.default(n)):(e=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),t=o.default(n),l.classList.add("flat-gallery-openseadragon-fullscreen")),null!=r&&r.remove();e.lastChild;)e.removeChild(e.lastChild);e.appendChild(l),!1!==t&&e.appendChild(t),delete Drupal.IslandoraOpenSeadragonViewer[this.base]}},e.prototype.renderFullscreenElement=function(e){for(var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=document.querySelector(this.base);t.lastChild;)t.removeChild(t.lastChild);t.appendChild(n),n.classList.add("flat-gallery-openseadragon-fullscreen"),this.renderFullscreenCaptions(e)},e.prototype.renderViewerElement=function(e){for(var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=document.querySelector('[data-role="flat-gallery-viewer"]'),a=document.querySelector(this.base);n.lastChild;)n.removeChild(n.lastChild);for(a.classList.remove("flat-gallery-openseadragon-fullscreen"),n.appendChild(i.default(a,e));t.lastChild;)t.removeChild(t.lastChild)},e.prototype.renderFullscreenCaptions=function(e){var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=o.default(e);!1!==n&&t.appendChild(n)},e.prototype.renderViewerCaptions=function(e){var t=document.querySelector('[data-role="flat-gallery-viewer"]'),n=u.default(e);!1!==n&&t.appendChild(n)},e}();t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(16),r=n(1),l=n(2),i=n(0),o=function(){function e(){}return e.prototype.run=function(){var e=i.default.get("settings");this.openseadragon=new a.default(e.openseadragon.options.id),this.openseadragon.setup()},e.prototype.action=function(e){e instanceof r.default&&e.getImage().model===l.FedoraModel.Basic&&this.openseadragon.create(e.getImage())},e}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(4),l=n(2),i=n(5),o=n(6),u=n(3),s=function(){function e(e){this.base="#"+e}return e.prototype.setup=function(){var e=this,t=a.default.get("openseadragon-basic");if(null!=t){t.buttons.buttons.forEach((function(t){"Toggle full page"===t.tooltip&&t.addHandler("click",(function(t){null==document.fullscreenElement?e.requestFullscreen():document.exitFullscreen()}))})),t.addHandler("pre-full-screen",(function(e){e.preventDefaultAction=!0}));var n=this.fullscreenChange.bind(this);document.addEventListener("fullscreenchange",n),document.addEventListener("webkitfullscreenchange",n),document.addEventListener("mozfullscreenchange",n),document.addEventListener("MSFullscreenChange",n)}},e.prototype.fullscreenChange=function(){a.default.get("navigation").current().model===l.FedoraModel.Basic&&(null==document.fullscreenElement?this.leaveFullscreen():this.enterFullscreen())},e.prototype.requestFullscreen=function(){null==document.fullscreenElement&&document.querySelector('[data-role="flat-gallery-fullscreen"]').requestFullscreen()},e.prototype.enterFullscreen=function(){var e=a.default.get("navigation");e.show(),e.render(),this.renderFullscreenElement(e.current())},e.prototype.leaveFullscreen=function(){var e=a.default.get("navigation"),t=e.current();null==document.fullscreenElement&&t.model===l.FedoraModel.Basic&&(e.hide(),this.renderViewerElement(t))},e.prototype.create=function(e){var t=this;this.cleanBaseElement(),r.default(e).then((function(e){Drupal.IslandoraOpenSeadragonViewer[t.base]=new Drupal.IslandoraOpenSeadragonViewer(t.base,e),a.default.set("openseadragon-basic",Drupal.settings.islandora_open_seadragon_viewer),t.setup()}))},e.prototype.cleanBaseElement=function(){if(void 0!==Drupal.IslandoraOpenSeadragonViewer){var e=null,t=null,n=a.default.get("navigation").current(),r=document.querySelector(this.base),l=document.createElement("div");for(l.setAttribute("id",this.base.substring(1)),l.classList.add("islandora-openseadragon"),null==document.fullscreenElement?(e=document.querySelector('[data-role="flat-gallery-viewer"]'),t=u.default(n)):(e=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),t=o.default(n),l.classList.add("flat-gallery-openseadragon-fullscreen")),null!=r&&r.remove();e.lastChild;)e.removeChild(e.lastChild);e.appendChild(l),!1!==t&&e.appendChild(t),delete Drupal.IslandoraOpenSeadragonViewer[this.base]}},e.prototype.renderFullscreenElement=function(e){for(var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=document.querySelector(this.base);t.lastChild;)t.removeChild(t.lastChild);t.appendChild(n),n.classList.add("flat-gallery-openseadragon-fullscreen"),this.renderFullscreenCaptions(e)},e.prototype.renderViewerElement=function(e){for(var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=document.querySelector('[data-role="flat-gallery-viewer"]'),a=document.querySelector(this.base);n.lastChild;)n.removeChild(n.lastChild);for(a.classList.remove("flat-gallery-openseadragon-fullscreen"),n.appendChild(i.default(a,e));t.lastChild;)t.removeChild(t.lastChild)},e.prototype.renderFullscreenCaptions=function(e){var t=document.querySelector('[data-role="flat-gallery-fullscreen-element"]'),n=o.default(e);!1!==n&&t.appendChild(n)},e.prototype.renderViewerCaptions=function(e){var t=document.querySelector('[data-role="flat-gallery-viewer"]'),n=u.default(e);!1!==n&&t.appendChild(n)},e}();t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),l=function(){function e(){this.type="click",this.useCapture=!1,this.target=document,this.application=a.default.get("app"),this.navigation=a.default.get("navigation")}return e.prototype.listener=function(e){var t=e.target;if(t.hasAttribute("data-flat-gallery-nav")&&"next"===t.getAttribute("data-flat-gallery-nav")){if(e.preventDefault(),!1===this.navigation.nextImageAvailable())return;this.navigation.next(),this.navigation.render(),this.application.action(new r.default(this.navigation.current()))}},e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),l=function(){function e(){this.type="click",this.useCapture=!1,this.target=document,this.application=a.default.get("app"),this.navigation=a.default.get("navigation")}return e.prototype.listener=function(e){var t=e.target;if(t.hasAttribute("data-flat-gallery-nav")&&"previous"===t.getAttribute("data-flat-gallery-nav")){if(e.preventDefault(),!1===this.navigation.previousImageAvailable())return;this.navigation.previous(),this.navigation.render(),this.application.action(new r.default(this.navigation.current()))}},e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),l=function(){function e(){this.type="keyup",this.useCapture=!1,this.target=document,this.application=a.default.get("app"),this.navigation=a.default.get("navigation")}return e.prototype.listener=function(e){if(39===(e.which||e.keyCode||0)){if(e.preventDefault(),!1===this.navigation.nextImageAvailable())return;this.navigation.next(),this.navigation.render(),this.application.action(new r.default(this.navigation.current()))}},e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),l=function(){function e(){this.type="keyup",this.useCapture=!1,this.target=document,this.application=a.default.get("app"),this.navigation=a.default.get("navigation")}return e.prototype.listener=function(e){if(37===(e.which||e.keyCode||0)){if(e.preventDefault(),!1===this.navigation.previousImageAvailable())return;this.navigation.previous(),this.navigation.render(),this.application.action(new r.default(this.navigation.current()))}},e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=function(){function e(){this.type="mousemove",this.useCapture=!1,this.target=document,this.navigation=a.default.get("navigation")}return e.prototype.listener=function(e){this.navigation.stopHidingNavigation()},e}();t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e){this.generator=e}return e.prototype.render=function(){for(var e=this.generator.generateNavigationLinks(),t=document.querySelector('[data-role="flat-gallery-nav-textual"]');t.lastChild;)t.removeChild(t.lastChild);e.forEach((function(e){t.appendChild(e)}))},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){void 0===document.fullscreenElement&&Object.defineProperty(document,"fullscreenElement",{get:function(){return void 0!==document.mozFullScreenElement?document.mozFullScreenElement:void 0!==document.webkitFullscreenElement?document.webkitFullscreenElement:void 0!==document.msFullscreenElement?document.msFullscreenElement:void 0}}),void 0===Element.prototype.requestFullscreen&&(void 0!==Element.prototype.mozRequestFullscreen&&(Element.prototype.requestFullscreen=Element.prototype.mozRequestFullscreen),void 0!==Element.prototype.webkitRequestFullscreen&&(Element.prototype.requestFullscreen=Element.prototype.webkitRequestFullscreen),void 0!==Element.prototype.msRequestFullscreen&&(Element.prototype.requestFullscreen=Element.prototype.msRequestFullscreen))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),l=function(){function e(){this.type="click",this.useCapture=!1,this.target=document,this.application=a.default.get("app"),this.navigation=a.default.get("navigation"),this.generator=a.default.get("link-generator")}return e.prototype.listener=function(e){var t=e.target;if(t.hasAttribute("data-load-image")){e.preventDefault();var n=+t.getAttribute("data-load-image"),a=this.navigation.setImage(n),l=this.navigation.current();if(!1===a)return;this.navigation.render(),this.application.action(new r.default(l))}},e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),l=function(){function e(){this.type="popstate",this.useCapture=!1,this.target=window,this.application=a.default.get("app"),this.navigation=a.default.get("navigation"),this.generator=a.default.get("link-generator")}return e.prototype.listener=function(e){if(null!==e.state){var t=e.state.id,n=this.navigation.setImage(t),a=this.navigation.current();!1!==n&&(this.navigation.render(),this.application.action(new r.default(a)))}},e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(27),r=n(28),l=n(0),i=function(){function e(e,t){this.id=e,this.images=t,this.animation=new a.default}return e.prototype.all=function(){return this.images},e.prototype.current=function(){return this.images[this.id]},e.prototype.getNextImage=function(){return!1!==this.nextImageAvailable()&&this.images[this.id+1]},e.prototype.nextImageAvailable=function(){return null!=this.images[this.id+1]},e.prototype.next=function(){return!1!==this.nextImageAvailable()&&(this.id+=1,this.images[this.id])},e.prototype.getPreviousImage=function(){return!1!==this.previousImageAvailable()&&this.images[this.id-1]},e.prototype.previousImageAvailable=function(){return null!=this.images[this.id-1]},e.prototype.previous=function(){return!1!==this.previousImageAvailable()&&(this.id-=1,this.images[this.id])},e.prototype.setImage=function(e){return null!=this.images[e]&&(this.id=e,!0)},e.prototype.show=function(){document.querySelector('[data-role="flat-gallery-nav"]').classList.remove("hidden")},e.prototype.hide=function(){document.querySelector('[data-role="flat-gallery-nav"]').classList.add("hidden")},e.prototype.render=function(){var e=document.querySelector('[data-flat-gallery-nav="next"]'),t=document.querySelector('[data-flat-gallery-nav="previous"]'),n=this.nextImageAvailable(),a=this.previousImageAvailable(),r=this.current();e.classList.add("hidden"),t.classList.add("hidden"),!0===n&&e.classList.remove("hidden"),!0===a&&t.classList.remove("hidden"),document.querySelectorAll('[data-role="flat-gallery-thumbnail"] a').forEach((function(e){e.classList.remove("active")})),document.querySelector('[data-role="flat-gallery-thumbnail"][data-flat-gallery-id="'+r.id+'"] a').classList.add("active"),this.stopHidingNavigation()},e.prototype.hideNavigation=function(){if(!1===this.animation.running){var e=document.querySelector('[data-flat-gallery-nav="next"]'),t=document.querySelector('[data-flat-gallery-nav="previous"]'),n=document.querySelector('[data-role="flat-gallery-captions"]');this.animation.enqueue(new r.default(t,100,0,1)),this.animation.enqueue(new r.default(e,100,0,1)),n&&this.animation.enqueue(new r.default(n,100,0,1)),this.animation.animate()}},e.prototype.stopHidingNavigation=function(){var e=this;if(null!=document.fullscreenElement){var t=document.querySelector('[data-flat-gallery-nav="next"]'),n=document.querySelector('[data-flat-gallery-nav="previous"]'),a=document.querySelector('[data-role="flat-gallery-captions"]');t.style.opacity="1",n.style.opacity="1",a&&(a.style.opacity="1"),!0===this.animation.running&&this.animation.stop(),clearTimeout(this.hideNavigationTimeout);var r=1e3*l.default.get("settings").delay;this.hideNavigationTimeout=setTimeout((function(){e.hideNavigation()}),r)}},e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(){this.queue=[],this.framerate=60,this.running=!1}return e.prototype.enqueue=function(e){this.queue.push(e)},e.prototype.animate=function(){!1===this.running&&(this.running=!0,this.frame=-1,this.timer=setInterval(this.process.bind(this),1e3/this.framerate))},e.prototype.process=function(){var e=this;this.frame+=1;var t=[];this.queue.forEach((function(n){0==n.run(e.frame)&&t.push(n)})),t.length===this.queue.length&&this.stop()},e.prototype.stop=function(){this.queue=[],this.running=!1,clearInterval(this.timer)},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t,n,a){this.element=e,this.from=t,this.to=n,this.speed=a,this.framerate=60*a,this.frames=this.tween()}return e.prototype.run=function(e){return null!=this.frames[e]&&(null!==this.element&&(this.element.style.opacity=this.frames[e].toString(),!0))},e.prototype.tween=function(){for(var e=[],t=(this.to-this.from)/this.framerate,n=0;n<=this.framerate;n++)e[n]=(this.from+t*n)/100;return e},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){this.baseUrl=t,this.navigation=e}return e.prototype.generateNavigationLinks=function(){var e=this.navigation.getPreviousImage(),t=this.navigation.getNextImage(),n=[];if(!1!==e){(a=document.createElement("a")).textContent="Previous",a.setAttribute("href",this.baseUrl+"/"+e.id),a.setAttribute("data-flat-gallery-nav","previous"),n.push(a)}else{var a=document.createTextNode("Previous");n.push(a)}if(n.push(document.createTextNode(" | ")),!1!==t){(a=document.createElement("a")).textContent="Next",a.setAttribute("href",this.baseUrl+"/"+t.id),a.setAttribute("data-flat-gallery-nav","next"),n.push(a)}else{a=document.createTextNode("Next");n.push(a)}return n},e.prototype.generateImageUrl=function(e){return this.baseUrl+"/"+e.id},e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(31),r=function(){function e(e){this.type="click",this.useCapture=!1,this.target=document,this.url=e}return e.prototype.listener=function(e){if("flat-gallery-modal"===e.target.getAttribute("data-role")){e.preventDefault();var t=a.default(this.url),n=document.querySelector("body");window.scrollTo(0,0),n.appendChild(t),document.querySelector('[data-role="flat-gallery-modal-iframe"]').focus(),document.querySelector('[data-role="flat-gallery-modal-content"]').parentNode.classList.add("fade-to")}},e}();t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t='\n        <div class="flat-gallery-modal" data-role="flat-gallery-modal-container">\n            <div class="flat-gallery-modal-overlay"></div>\n            <div class="flat-gallery-modal-content-container">\n                <a href="#" class="flat-gallery-modal-close" data-role="flat-gallery-modal-close"></a>\n                <div class="flat-gallery-modal-content" data-role="flat-gallery-modal-content">\n                    <iframe allowfullscreen="true" allow="fullscreen" src="'+e+'" data-role="flat-gallery-modal-iframe"></iframe>\n                </div>\n            </div>\n        </div>\n    ',n=document.createElement("div");return n.innerHTML=t.trim(),n.firstChild}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(){this.type="click",this.target=window.parent.document,this.useCapture=!1}return e.prototype.listener=function(e){if("flat-gallery-modal-close"===e.target.getAttribute("data-role")){var t=window.parent.document.querySelector('[data-role="flat-gallery-modal-content"]').parentNode,n=window.parent.document.querySelector('[data-role="flat-gallery-modal-container"]');t.classList.remove("fade-to"),n.remove()}},e}();t.default=a}]);