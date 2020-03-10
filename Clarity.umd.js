/**
 * Bundle of clarity
 * Generated: 2020-03-09
 * Version: 1.0.0
 * License: Apache-2.0
 * Author: James Craig
 */

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('moment')) :
   typeof define === 'function' && define.amd ? define(['exports', 'vue', 'moment'], factory) :
   (global = global || self, factory(global.Clarity = {}, global.Vue, global.moment));
}(this, (function (exports, Vue, moment) { 'use strict';

   Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;
   moment = moment && Object.prototype.hasOwnProperty.call(moment, 'default') ? moment['default'] : moment;

   HTMLElement.prototype.getParentByClass = function (className) {
       var element = this.parentElement;
       while (element && !element.hasClass(className)) {
           element = element.parentElement;
       }
       return element;
   };
   HTMLElement.prototype.hasClass = function (className) {
       return (" " + this.className + " ").indexOf(" " + className + " ") > -1;
   };
   HTMLElement.prototype.replaceClass = function (originalClassName, newClassName) {
       var tempClassName = " " + this.className + " ";
       if (newClassName === "") {
           this.className = tempClassName.replace(new RegExp(" " + originalClassName + " ", "gi"), " ").trim();
       }
       else {
           this.className = tempClassName.replace(new RegExp(" " + originalClassName + " ", "gi"), " " + newClassName + " ").trim();
       }
   };
   HTMLElement.prototype.toggleClass = function (originalClassName, newClassName) {
       if (this.hasClass(originalClassName)) {
           this.replaceClass(originalClassName, newClassName);
           return;
       }
       this.replaceClass(newClassName, originalClassName);
   };
   HTMLElement.prototype.removeClass = function (className) {
       this.replaceClass(className, "");
   };
   HTMLElement.prototype.addClass = function (className) {
       if (!this.hasClass(className)) {
           this.className += " " + className;
       }
   };
   HTMLElement.prototype.show = function () {
       this.replaceClass("hidden", "show");
       this.addClass("show");
   };
   HTMLElement.prototype.hide = function () {
       this.replaceClass("show", "hidden");
       this.addClass("hidden");
   };
   HTMLElement.prototype.attribute = function (name, value) {
       if (value === void 0) { value = null; }
       if (value != null) {
           this.setAttribute(name, value);
           return value;
       }
       return this.getAttribute(name);
   };

   NodeList.prototype.map = function (callback) {
       var ReturnValues = [];
       for (var x = 0; x < this.length; ++x) {
           ReturnValues = ReturnValues.concat(callback(this[x]));
       }
       return ReturnValues;
   };
   NodeList.prototype.filter = function (callback) {
       var ReturnValues = [];
       for (var x = 0; x < this.length; ++x) {
           if (callback(this[x])) {
               ReturnValues = ReturnValues.concat(this[x]);
           }
       }
       return ReturnValues;
   };

   if (typeof Object.assign !== "function") {
       Object.defineProperty(Object, "assign", {
           value: function assign(target, varArgs) {
               if (target == null) {
                   throw new TypeError("Cannot convert undefined or null to object");
               }
               var to = Object(target);
               for (var index = 1; index < arguments.length; index++) {
                   var nextSource = arguments[index];
                   if (nextSource != null) {
                       for (var nextKey in nextSource) {
                           if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                               to[nextKey] = nextSource[nextKey];
                           }
                       }
                   }
               }
               return to;
           },
           writable: true,
           configurable: true,
       });
   }

   String.prototype.slugify = function () {
       return this.trim().replace(/ /g, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").replace(/([^a-zA-Z0-9-_/./:]+)/g, "");
   };

   var BrowserUtils = (function () {
       function BrowserUtils() {
       }
       Object.defineProperty(BrowserUtils, "isOSX", {
           get: function () {
               return ~navigator.userAgent.indexOf("Mac OS X") !== -1;
           },
           enumerable: true,
           configurable: true
       });
       Object.defineProperty(BrowserUtils, "domain", {
           get: function () {
               return "http://" + window.location.host;
           },
           enumerable: true,
           configurable: true
       });
       Object.defineProperty(BrowserUtils, "isLocal", {
           get: function () {
               return (/^http:\/\/localhost:\d{5}$/).test(BrowserUtils.domain);
           },
           enumerable: true,
           configurable: true
       });
       BrowserUtils.getURLParameter = function (name) {
           return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search)
               || [, ""])[1].replace(/\+/g, "%20")) || null;
       };
       Object.defineProperty(BrowserUtils, "HashBang", {
           get: function () {
               return window.location.hash.replace("#!", "");
           },
           enumerable: true,
           configurable: true
       });
       Object.defineProperty(BrowserUtils, "Id", {
           get: function () {
               return window.location.pathname.split("/").pop();
           },
           enumerable: true,
           configurable: true
       });
       return BrowserUtils;
   }());

   var clickOutside = {
       bind: function (el) {
           clickOutside.onEventBound = clickOutside.onEvent.bind({ el: el });
           document.addEventListener("click", clickOutside.onEventBound);
       },
       cb: function (event) {
           return;
       },
       onEvent: function (event) {
           if (event.target === this.el || this.el.contains(event.target) || clickOutside.cb) {
               clickOutside.cb(event);
           }
       },
       onEventBound: function () {
           return;
       },
       unbind: function () {
           document.removeEventListener("click", clickOutside.onEventBound);
       },
       update: function (el, binding) {
           if (typeof binding.value !== "function") {
               throw new Error("Argument must be a function");
           }
           clickOutside.cb = binding.value;
       },
   };
   function RegisterDirectives() {
       Vue.directive("click-outside", clickOutside);
   }

   function RegisterFilters() {
       Vue.filter("moment", function (date, format) {
           if (!date) {
               return "N/A";
           }
           return moment(date, "YYYY-MM-DDThh:mm:ss").format(format);
       });
       Vue.filter("capitalize", function (str) {
           if (!str) {
               return "";
           }
           return str.charAt(0).toUpperCase() + str.slice(1);
       });
   }

   var Globals = (function () {
       function Globals() {
       }
       Globals.keyMappings = {
           'BACKSPACE': 8,
           'TAB': 9,
           'ENTER': 13,
           'SHIFT': 16,
           'CTRL': 17,
           'ALT': 18,
           'PAUSE': 19,
           'CAPSLOCK': 20,
           'ESCAPE': 27,
           'SPACE': 32,
           'PAGEUP': 33,
           'PAGEDOWN': 34,
           'END': 35,
           'HOME': 36,
           'LEFT': 37,
           'UP': 38,
           'RIGHT': 39,
           'DOWN': 40,
           'INS': 45,
           'DEL': 46,
           'META': 91,
           '*': 106,
           '+': 107,
           'MINUS': 109,
           'F1': 112,
           'F2': 113,
           'F3': 114,
           'F4': 115,
           'F5': 116,
           'F6': 117,
           'F7': 118,
           'F8': 119,
           'F9': 120,
           'F10': 121,
           'F11': 122,
           'F12': 123,
           'NUMLOCK': 144,
           'SCROLLLOCK': 145,
           ';': 186,
           '=': 187,
           '': 188,
           '-': 189,
           '.': 190,
           '/': 191,
           '`': 192,
           '[': 219,
           '\\': 220,
           ']': 221,
           "'": 222
       };
       return Globals;
   }());

   var Keypress = (function () {
       function Keypress(keys) {
           this.keys = this.getKeys(keys);
       }
       Keypress.prototype.getKeys = function (keyCode) {
           return keyCode.toUpperCase().split(/-(?!$)/).map(function (x) { return Globals.keyMappings[x] || x.charCodeAt(0); });
       };
       Keypress.prototype.isPressed = function (keyCode) {
           var keysPressed = keyCode;
           if (keysPressed.length !== this.keys.length) {
               return false;
           }
           for (var x = 0; x < keysPressed.length; ++x) {
               if (this.keys.indexOf(keysPressed[x]) === -1) {
                   return false;
               }
           }
           return true;
       };
       return Keypress;
   }());

   var Sequence = (function () {
       function Sequence(keyCodes, callback) {
           this.keyCodeSequence = keyCodes.toUpperCase();
           this.keyCodes = keyCodes.toUpperCase().split(" ").map(function (x) { return new Keypress(x); });
           this.callback = callback;
           this.length = this.keyCodes.length;
           this.isDefault = "<*>" === keyCodes;
       }
       Sequence.prototype.call = function (keyCodes, event, scope) {
           this.callback(event, { scope: scope, keysPressed: keyCodes });
           return true;
       };
       Sequence.prototype.press = function (keyCodes, event, scope) {
           var individualCodes = keyCodes;
           if (individualCodes.length !== this.length) {
               return false;
           }
           for (var x = 0; x < this.keyCodes.length; ++x) {
               if (!this.keyCodes[x].isPressed(individualCodes[x])) {
                   return false;
               }
           }
           return this.call(keyCodes, event, scope);
       };
       Sequence.prototype.isPartial = function (keyCodes) {
           var individualCodes = keyCodes;
           if (individualCodes.length > this.length) {
               return false;
           }
           for (var x = 0; x < individualCodes.length; ++x) {
               if (!this.keyCodes[x].isPressed(individualCodes[x])) {
                   return false;
               }
           }
           return true;
       };
       return Sequence;
   }());

   var Scope = (function () {
       function Scope(name) {
           this.name = name;
           this.sequences = [];
       }
       Scope.prototype.press = function (keyCodes, event) {
           this.sequences = this.sequences.sort(function (x, y) { return x.length > y.length ? 1 : -1; });
           for (var x = 0; x < this.sequences.length; ++x) {
               if (this.sequences[x].press(keyCodes, event, this)) {
                   return true;
               }
           }
           return false;
       };
       Scope.prototype.callDefault = function (keyCodes, event) {
           var defaultItems = this.sequences.filter(function (x) { return x.isDefault; });
           if (defaultItems.length === 0) {
               return false;
           }
           return defaultItems[0].call(keyCodes, event, this);
       };
       Scope.prototype.isPartial = function (keyCodes) {
           for (var x = 0; x < this.sequences.length; ++x) {
               if (this.sequences[x].isPartial(keyCodes)) {
                   return true;
               }
           }
           return false;
       };
       Scope.prototype.addSequence = function (keyCodes, callback) {
           this.removeSequence(keyCodes);
           this.sequences.push(new Sequence(keyCodes, callback));
           return this;
       };
       Scope.prototype.removeSequence = function (keyCodes) {
           this.sequences = this.sequences.filter(function (x) { return x.keyCodeSequence !== keyCodes.toUpperCase(); });
           return this;
       };
       Scope.prototype.clear = function () {
           this.sequences = [];
           return this;
       };
       return Scope;
   }());

   var Hotkeys = (function () {
       function Hotkeys() {
           this.scopes = {};
           this.scopes["Default"] = new Scope("Default");
           this.currentScope = this.scopes["Default"];
           this.filter = function (x) {
               var tagName = (x.target || x.srcElement).tagName;
               return tagName !== "INPUT"
                   && tagName !== "SELECT"
                   && tagName !== "TEXTAREA";
           };
           this.latestKeys = [];
       }
       Hotkeys.prototype.setScope = function (name) {
           var scope = this.addScope(name);
           this.currentScope = scope;
           return scope;
       };
       Hotkeys.prototype.addScope = function (name) {
           var tempScope = this.scopes[name];
           if (tempScope !== undefined) {
               return tempScope;
           }
           tempScope = new Scope(name);
           this.scopes[name] = tempScope;
           return tempScope;
       };
       Hotkeys.prototype.removeScope = function (name) {
           this.scopes[name] = undefined;
           if (name === "Default") {
               this.scopes["Default"] = new Scope("Default");
           }
           if (this.currentScope.name === name) {
               this.currentScope = this.scopes["Default"];
           }
           return this;
       };
       Hotkeys.prototype.clear = function () {
           this.scopes = {};
           this.scopes["Default"] = new Scope("Default");
           this.currentScope = this.scopes["Default"];
           this.latestKeys = [];
           return this;
       };
       Hotkeys.prototype.bind = function (keyCodes, callback) {
           this.currentScope.addSequence(keyCodes, callback);
           return this;
       };
       Hotkeys.prototype.unbind = function (keyCodes) {
           this.currentScope.removeSequence(keyCodes);
           return this;
       };
       Hotkeys.prototype.press = function (event) {
           if (!(this.filter(event))) {
               return;
           }
           var currentKey = this.getKeys(event);
           this.latestKeys.push(currentKey);
           var tempArray = this.latestKeys.slice();
           if (this.currentScope.press(this.latestKeys, event)) {
               this.latestKeys = [];
           }
           else {
               while (this.latestKeys.length > 0) {
                   if (this.currentScope.isPartial(this.latestKeys)) {
                       return;
                   }
                   this.latestKeys.shift();
               }
               if (this.latestKeys.length === 0) {
                   this.currentScope.callDefault(tempArray, event);
               }
           }
       };
       Hotkeys.prototype.getKeys = function (event) {
           var returnValue = [];
           if (event.altKey) {
               returnValue.push(Globals.keyMappings["ALT"]);
           }
           if (event.ctrlKey) {
               returnValue.push(Globals.keyMappings["CTRL"]);
           }
           if (event.metaKey) {
               returnValue.push(Globals.keyMappings["META"]);
           }
           if (event.shiftKey) {
               returnValue.push(Globals.keyMappings["SHIFT"]);
           }
           if (returnValue.indexOf(event.keyCode) === -1) {
               returnValue.push(event.keyCode);
           }
           return returnValue;
       };
       return Hotkeys;
   }());

   var StringDictionary = (function () {
       function StringDictionary() {
       }
       return StringDictionary;
   }());

   var PathPart = (function () {
       function PathPart(part, defaultValues) {
           this.variable = part.charAt(0) === '{' && part.charAt(part.length - 1) === '}';
           part = part.replace(/[{}]/g, '');
           this.optional = part.charAt(0) === '^';
           this.part = part.replace(/[\^]/g, '');
           if (defaultValues[this.part] !== undefined) {
               this.defaultValue = defaultValues[this.part];
           }
           else {
               this.defaultValue = '';
           }
       }
       PathPart.prototype.isMatch = function (part) {
           if (part === undefined || part === null) {
               return this.optional;
           }
           part = part;
           if (this.variable) {
               return this.optional || part !== '';
           }
           return this.optional || part.toUpperCase() === this.part.toUpperCase();
       };
       PathPart.prototype.getValue = function (part) {
           if (!this.variable) {
               return part || this.defaultValue;
           }
           if (part !== undefined) {
               return part || this.defaultValue;
           }
           else {
               return this.defaultValue;
           }
       };
       PathPart.prototype.setValue = function (part, parameters) {
           var tempValue = this.getValue(part);
           parameters[this.part] = this.getValue(part);
       };
       return PathPart;
   }());

   var QueryPart = (function () {
       function QueryPart(part, defaultValues) {
           var tempParts = part.split("=", 2);
           this.key = tempParts[0];
           part = tempParts[1];
           this.variable = part.charAt(0) === "{" && part.charAt(part.length - 1) === "}";
           part = part.replace(/[{}]/g, "");
           this.optional = part.charAt(0) === "^";
           this.part = part.replace(/[\^]/g, "");
           if (defaultValues[this.part] !== undefined) {
               this.defaultValue = defaultValues[this.part];
           }
           else {
               this.defaultValue = "";
           }
       }
       QueryPart.prototype.isMatch = function (part) {
           if (part === undefined || part === null) {
               return false;
           }
           var tempParts = part.split("=", 2);
           if (tempParts.length !== 2) {
               return false;
           }
           if (this.key.toUpperCase() !== tempParts[0].toUpperCase()) {
               return false;
           }
           part = tempParts[1];
           if (part === undefined) {
               return this.optional;
           }
           if (this.variable) {
               return this.optional || part !== "";
           }
           return this.optional || part.toUpperCase() === this.part.toUpperCase();
       };
       QueryPart.prototype.getValue = function (part) {
           if (part === undefined || part === null) {
               return this.defaultValue;
           }
           var tempParts = part.split("=", 2);
           if (tempParts.length !== 2) {
               return this.defaultValue;
           }
           part = tempParts[1];
           if (!this.variable) {
               return part || this.defaultValue;
           }
           if (part !== undefined) {
               return part || this.defaultValue;
           }
           else {
               return this.defaultValue;
           }
       };
       QueryPart.prototype.setValue = function (part, parameters) {
           var tempValue = this.getValue(part);
           parameters[this.key] = this.getValue(part);
       };
       return QueryPart;
   }());

   var HashPart = (function () {
       function HashPart(part, defaultValues) {
           part = part.replace(/[#!]/g, "");
           this.variable = part.charAt(0) === "{" && part.charAt(part.length - 1) === "}";
           part = part.replace(/[{}]/g, "");
           this.optional = part.charAt(0) === "^";
           this.part = part.replace(/[\^]/g, "");
           if (defaultValues[this.part] !== undefined) {
               this.defaultValue = defaultValues[this.part];
           }
           else {
               this.defaultValue = "";
           }
       }
       HashPart.prototype.isMatch = function (part) {
           if (part === undefined || part === null) {
               return this.optional;
           }
           part = part.replace(/[#!]/g, "");
           if (this.variable) {
               return this.optional || part !== "";
           }
           return this.optional || part.toUpperCase() === this.part.toUpperCase();
       };
       HashPart.prototype.getValue = function (part) {
           if (!this.variable) {
               return part || this.defaultValue;
           }
           if (part !== undefined) {
               return part || this.defaultValue;
           }
           else {
               return this.defaultValue;
           }
       };
       HashPart.prototype.setValue = function (part, parameters) {
           part = part ? part : "";
           part = part.replace(/[#!]/g, "");
           parameters[this.part] = this.getValue(part);
       };
       return HashPart;
   }());

   var Route = (function () {
       function Route(url, callback, defaultValues) {
           if (defaultValues === undefined) {
               defaultValues = new StringDictionary();
           }
           this.url = this.fixUrl(url);
           this.pathParts = this.getPathParts(this.url).map(function (x) { return new PathPart(x, defaultValues); });
           this.pathParts = this.pathParts ? this.pathParts : [];
           this.queryParts = this.getQueryParts(this.url).map(function (x) { return new QueryPart(x, defaultValues); });
           this.queryParts = this.queryParts ? this.queryParts : [];
           this.hashParts = this.getHashParts(this.url).map(function (x) { return new HashPart(x, defaultValues); });
           this.hashParts = this.hashParts ? this.hashParts : [];
           this.callbacks = [callback];
           this.defaultValues = defaultValues;
       }
       Route.prototype.isRoute = function (url) {
           return this.url === this.fixUrl(url);
       };
       Route.prototype.addCallback = function (callback) {
           this.callbacks.push(callback);
       };
       Route.prototype.removeCallback = function (callback) {
           this.callbacks = this.callbacks.filter(function (x) { return x !== callback; });
       };
       Route.prototype.fixUrl = function (url) {
           if (!url.length) {
               return url;
           }
           return url.replace(/^\//, "").replace(/\/+/g, "/").replace(/^\/|\/($|\?)/, "").replace(/\/\#/g, "#");
       };
       Route.prototype.getPathParts = function (url) {
           return url.split("?", 2)[0].split("#", 2)[0].split("/");
       };
       Route.prototype.getHashParts = function (url) {
           var urlSplit = url.split("?", 2)[0].split("#", 2);
           return (urlSplit.length < 2) ? [] : [urlSplit[1].replace("!", "")];
       };
       Route.prototype.getQueryParts = function (url) {
           var urlSplit = url.split("?", 2);
           if (urlSplit.length < 2) {
               return [];
           }
           url = urlSplit[1];
           return url ? url.split("&") : [];
       };
       Route.prototype.getParametersFromUrl = function (pathParts, queryParts, hashParts) {
           var parameters = new StringDictionary();
           for (var x = 0; x < pathParts.length; ++x) {
               this.pathParts[x].setValue(pathParts[x], parameters);
           }
           for (var x = 0; x < queryParts.length; ++x) {
               this.queryParts[x].setValue(queryParts[x], parameters);
           }
           for (var x = 0; x < hashParts.length; ++x) {
               this.hashParts[x].setValue(hashParts[x], parameters);
           }
           if (this.pathParts.length > pathParts.length) {
               for (var x = pathParts.length; x < this.pathParts.length; ++x) {
                   this.pathParts[x].setValue("", parameters);
               }
           }
           if (this.queryParts.length > queryParts.length) {
               for (var x = queryParts.length; x < this.queryParts.length; ++x) {
                   this.queryParts[x].setValue("", parameters);
               }
           }
           if (this.hashParts.length > hashParts.length) {
               for (var x = hashParts.length; x < this.hashParts.length; ++x) {
                   this.hashParts[x].setValue("", parameters);
               }
           }
           return parameters;
       };
       Route.prototype.isMatch = function (pathParts, queryParts, hashParts) {
           if (this.pathParts.length < pathParts.length) {
               return false;
           }
           for (var x = 0; x < pathParts.length; ++x) {
               if (!this.pathParts[x].isMatch(pathParts[x])) {
                   return false;
               }
           }
           if (this.pathParts.length > pathParts.length) {
               for (var x = pathParts.length; x < this.pathParts.length; ++x) {
                   if (!this.pathParts[x].isMatch("")) {
                       return false;
                   }
               }
           }
           if (this.queryParts.length < queryParts.length) {
               return false;
           }
           for (var x = 0; x < queryParts.length; ++x) {
               if (!this.queryParts[x].isMatch(queryParts[x])) {
                   return false;
               }
           }
           if (this.queryParts.length > queryParts.length) {
               for (var x = queryParts.length; x < this.queryParts.length; ++x) {
                   if (!this.queryParts[x].isMatch("")) {
                       return false;
                   }
               }
           }
           if (this.hashParts.length < hashParts.length) {
               return false;
           }
           for (var x = 0; x < hashParts.length; ++x) {
               if (!this.hashParts[x].isMatch(hashParts[x])) {
                   return false;
               }
           }
           if (this.hashParts.length > hashParts.length) {
               for (var x = hashParts.length; x < this.hashParts.length; ++x) {
                   if (!this.hashParts[x].isMatch("")) {
                       return false;
                   }
               }
           }
           return true;
       };
       Route.prototype.run = function (url) {
           url = this.fixUrl(url);
           var pathParts = this.getPathParts(url);
           var queryParts = this.getQueryParts(url);
           var hashParts = this.getHashParts(url);
           if (!this.isMatch(pathParts, queryParts, hashParts)) {
               return false;
           }
           var parameters = this.getParametersFromUrl(pathParts, queryParts, hashParts);
           parameters["url"] = url;
           this.callbacks.forEach(function (x) { return x(parameters); });
           return true;
       };
       return Route;
   }());

   var Router = (function () {
       function Router() {
           this.routes = [];
       }
       Router.prototype.map = function (route) {
           for (var x = 0; x < route.length; ++x) {
               this.addRoute(route[x].url, route[x].action, route[x].defaultValues);
           }
       };
       Router.prototype.addRoute = function (url, callback, defaultValues) {
           var routes = this.routes.filter(function (x) { return x.isRoute(url); });
           if (routes.length === 0) {
               this.routes.push(new Route(url, callback, defaultValues));
           }
           else {
               routes[0].addCallback(callback);
           }
           return this;
       };
       Router.prototype.run = function (url) {
           for (var x = 0; x < this.routes.length; ++x) {
               if (this.routes[x].run(url)) {
                   return true;
               }
           }
           return false;
       };
       return Router;
   }());

   var FormValidation = (function () {
       function FormValidation() {
           this.errors = [];
           this.messageAttributes = {};
           this.messageAttributes["patternMismatch"] = "data-error-message-pattern-mismatch";
           this.messageAttributes["rangeOverflow"] = "data-error-message-range-overflow";
           this.messageAttributes["rangeUnderflow"] = "data-error-message-range-underflow";
           this.messageAttributes["stepMismatch"] = "data-error-message-step-mismatch";
           this.messageAttributes["tooLong"] = "data-error-message-too-long";
           this.messageAttributes["tooShort"] = "data-error-message-too-short";
           this.messageAttributes["badInput"] = "data-error-message-bad-input";
           this.messageAttributes["typeMismatch"] = "data-error-message-type-mismatch";
           this.messageAttributes["valueMissing"] = "data-error-message-value-missing";
       }
       FormValidation.prototype.initialize = function () {
           var _this = this;
           var inputElements = this.map(document.getElementsByTagName("input"), function (x) { return x; }).filter(function (x) { return x.willValidate; });
           for (var x = 0; x < inputElements.length; ++x) {
               if (inputElements[x].type.toUpperCase() === "RADIO"
                   || inputElements[x].type.toUpperCase() === "CHECKBOX") {
                   inputElements[x].addEventListener("change", function (y) { return _this.inputHandler(y.target); });
               }
               else {
                   inputElements[x].addEventListener("input", function (y) { return _this.inputHandler(y.target); });
               }
               inputElements[x].addEventListener("invalid", function (y) { return _this.invalidInputHandler(y.target); });
           }
           var textAreaElements = this.map(document.getElementsByTagName("textarea"), function (x) { return x; }).filter(function (x) { return x.willValidate; });
           for (var x = 0; x < textAreaElements.length; ++x) {
               textAreaElements[x].addEventListener("change", function (y) { return _this.textAreaHandler(y.target); });
               textAreaElements[x].addEventListener("invalid", function (y) { return _this.invalidTextAreaHandler(y.target); });
           }
           var selectElements = this.map(document.getElementsByTagName("select"), function (x) { return x; }).filter(function (x) { return x.willValidate; });
           for (var x = 0; x < selectElements.length; ++x) {
               selectElements[x].addEventListener("change", function (y) { return _this.selectHandler(y.target); });
               selectElements[x].addEventListener("invalid", function (y) { return _this.invalidSelectHandler(y.target); });
           }
       };
       FormValidation.prototype.map = function (elements, callback) {
           var ReturnValues = [];
           for (var x = 0; x < elements.length; ++x) {
               ReturnValues = ReturnValues.concat(callback(elements[x]));
           }
           return ReturnValues;
       };
       FormValidation.prototype.filter = function (elements, callback) {
           var ReturnValues = [];
           for (var x = 0; x < elements.length; ++x) {
               if (callback(elements[x])) {
                   ReturnValues = ReturnValues.concat(elements[x]);
               }
           }
           return ReturnValues;
       };
       FormValidation.prototype.initializeForm = function (form) {
           var _this = this;
           var inputElements = this.map(form.getElementsByTagName("input"), function (x) { return x; }).filter(function (x) { return x.willValidate; });
           for (var x = 0; x < inputElements.length; ++x) {
               if (inputElements[x].type.toUpperCase() === "RADIO"
                   || inputElements[x].type.toUpperCase() === "CHECKBOX") {
                   inputElements[x].addEventListener("change", function (y) { return _this.inputHandler(y.target); });
               }
               else {
                   inputElements[x].addEventListener("input", function (y) { return _this.inputHandler(y.target); });
               }
               inputElements[x].addEventListener("invalid", function (y) { return _this.invalidInputHandler(y.target); });
           }
           var textAreaElements = this.map(form.getElementsByTagName("textarea"), function (x) { return x; }).filter(function (x) { return x.willValidate; });
           for (var x = 0; x < textAreaElements.length; ++x) {
               textAreaElements[x].addEventListener("change", function (y) { return _this.textAreaHandler(y.target); });
               textAreaElements[x].addEventListener("invalid", function (y) { return _this.invalidTextAreaHandler(y.target); });
           }
           var selectElements = this.map(form.getElementsByTagName("select"), function (x) { return x; }).filter(function (x) { return x.willValidate; });
           for (var x = 0; x < selectElements.length; ++x) {
               selectElements[x].addEventListener("change", function (y) { return _this.selectHandler(y.target); });
               selectElements[x].addEventListener("invalid", function (y) { return _this.invalidSelectHandler(y.target); });
           }
       };
       FormValidation.prototype.invalidInputHandler = function (input) {
           if (!input.validity.valid) {
               var errorMessages = this.getErrorMessages(input, input.validity);
               if (errorMessages.length > 0) {
                   input.setCustomValidity(errorMessages.join("\n"));
               }
           }
       };
       FormValidation.prototype.invalidTextAreaHandler = function (textarea) {
           if (!textarea.validity.valid) {
               var errorMessages = this.getErrorMessages(textarea, textarea.validity);
               if (errorMessages.length > 0) {
                   textarea.setCustomValidity(errorMessages.join("\n"));
               }
           }
       };
       FormValidation.prototype.invalidSelectHandler = function (select) {
           if (!select.validity.valid) {
               var errorMessages = this.getErrorMessages(select, select.validity);
               if (errorMessages.length > 0) {
                   select.setCustomValidity(errorMessages.join("\n"));
               }
           }
       };
       FormValidation.prototype.inputHandler = function (input) {
           if (input.type.toUpperCase() === "RADIO") {
               var radioGroup = document.getElementsByName(input.name).map(function (x) { return x; });
               for (var x = 0; x < radioGroup.length; ++x) {
                   radioGroup[x].setCustomValidity("");
               }
           }
           else {
               input.setCustomValidity("");
           }
           input.checkValidity();
       };
       FormValidation.prototype.textAreaHandler = function (textarea) {
           textarea.setCustomValidity("");
           textarea.checkValidity();
       };
       FormValidation.prototype.selectHandler = function (select) {
           select.setCustomValidity("");
           select.checkValidity();
       };
       FormValidation.prototype.validate = function () {
           var _this = this;
           var result = true;
           this.errors = [];
           var inputElements = this.filter(document.getElementsByTagName("input"), function (x) { return !_this.validateInput(x); });
           result = result && inputElements.length === 0;
           var selectElements = this.filter(document.getElementsByTagName("select"), function (x) { return !_this.validateSelect(x); });
           result = result && selectElements.length === 0;
           var textareaElements = this.filter(document.getElementsByTagName("textarea"), function (x) { return !_this.validateTextArea(x); });
           result = result && textareaElements.length === 0;
           return result;
       };
       FormValidation.prototype.validateForm = function (form) {
           var _this = this;
           var result = [];
           this.errors = [];
           var inputElements = this.filter(form.getElementsByTagName("input"), function (x) { return !_this.validateInput(x); })
               .map(function (x) { return _this.getErrorMessages(x, x.validity); })
               .filter(function (x) { return x.length !== 0; });
           for (var x = 0; x < inputElements.length; ++x) {
               result = result.concat(inputElements[x]);
           }
           var selectElements = this.filter(form.getElementsByTagName("select"), function (x) { return !_this.validateSelect(x); })
               .map(function (x) { return _this.getErrorMessages(x, x.validity); })
               .filter(function (x) { return x.length !== 0; });
           for (var x = 0; x < selectElements.length; ++x) {
               result = result.concat(selectElements[x]);
           }
           var textareaElements = this.filter(form.getElementsByTagName("textarea"), function (x) { return !_this.validateTextArea(x); })
               .map(function (x) { return _this.getErrorMessages(x, x.validity); })
               .filter(function (x) { return x.length !== 0; });
           for (var x = 0; x < textareaElements.length; ++x) {
               result = result.concat(textareaElements[x]);
           }
           return result;
       };
       FormValidation.prototype.validateElement = function (element) {
           var result = [];
           if (element.tagName === "INPUT" && !this.validateInput(element)) {
               var tempResults = this.getErrorMessages(element, element.validity)
                   .filter(function (x) { return x.length !== 0; });
               for (var x = 0; x < tempResults.length; ++x) {
                   result = result.concat(tempResults[x]);
               }
           }
           else if (element.tagName === "SELECT" && !this.validateSelect(element)) {
               var tempResults = this.getErrorMessages(element, element.validity)
                   .filter(function (x) { return x.length !== 0; });
               for (var x = 0; x < tempResults.length; ++x) {
                   result = result.concat(tempResults[x]);
               }
           }
           else if (element.tagName === "TEXTAREA" && !this.validateTextArea(element)) {
               var tempResults = this.getErrorMessages(element, element.validity)
                   .filter(function (x) { return x.length !== 0; });
               for (var x = 0; x < tempResults.length; ++x) {
                   result = result.concat(tempResults[x]);
               }
           }
           return result;
       };
       FormValidation.prototype.validateSelect = function (select) {
           if (!select.checkValidity()) {
               var tempValue = this.getErrorMessages(select, select.validity);
               if (tempValue.length !== 0) {
                   this.errors = this.errors.concat(tempValue);
               }
               return false;
           }
           return true;
       };
       FormValidation.prototype.validateTextArea = function (textarea) {
           if (!textarea.checkValidity()) {
               var tempValue = this.getErrorMessages(textarea, textarea.validity);
               if (tempValue.length !== 0) {
                   this.errors = this.errors.concat(tempValue);
               }
               return false;
           }
           return true;
       };
       FormValidation.prototype.getErrorMessages = function (element, validity) {
           var tempValue = [];
           for (var key in this.messageAttributes) {
               if (validity[key]) {
                   var message = element.attribute(this.messageAttributes[key]);
                   if (message !== null) {
                       tempValue = tempValue.concat(message);
                   }
               }
           }
           if (tempValue.length === 0) {
               var generalMessage = element.attribute("data-error-message");
               if (generalMessage !== null) {
                   tempValue = tempValue.concat(generalMessage);
               }
               else {
                   tempValue = tempValue.concat(element.validationMessage);
               }
           }
           return tempValue;
       };
       FormValidation.prototype.validateInput = function (input) {
           if (!input.checkValidity()) {
               var tempValue = this.getErrorMessages(input, input.validity);
               if (tempValue.length !== 0) {
                   this.errors = this.errors.concat(tempValue);
               }
               return false;
           }
           return true;
       };
       return FormValidation;
   }());

   var ErrorLogging = (function () {
       function ErrorLogging() {
           this.logError = function (ex, stack) { };
       }
       ErrorLogging.prototype.setLoggingFunction = function (logger) {
           this.logError = logger;
       };
       ErrorLogging.prototype.onError = function (message, filename, lineno, colno, error) {
           this.logError(message, arguments.callee.trace());
       };
       return ErrorLogging;
   }());

   var PageHistory = (function () {
       function PageHistory() {
       }
       PageHistory.prototype.back = function (delta) {
           if (delta === undefined) {
               delta = 1;
           }
           window.history.go(-1 * delta);
       };
       PageHistory.prototype.forward = function (delta) {
           if (delta === undefined) {
               delta = 1;
           }
           window.history.go(delta);
       };
       PageHistory.prototype.push = function (state, url, title) {
           window.history.pushState(state, title, url);
       };
       PageHistory.prototype.replace = function (state, url, title) {
           window.history.replaceState(state, title, url);
       };
       Object.defineProperty(PageHistory.prototype, "state", {
           get: function () {
               return window.history.state;
           },
           enumerable: true,
           configurable: true
       });
       Object.defineProperty(PageHistory.prototype, "length", {
           get: function () {
               return window.history.length;
           },
           enumerable: true,
           configurable: true
       });
       return PageHistory;
   }());

   var LocalStorage = (function () {
       function LocalStorage() {
       }
       LocalStorage.prototype.set = function (key, value) {
           localStorage.setItem(key, value);
       };
       LocalStorage.prototype.setObject = function (key, value) {
           this.set(key, JSON.stringify(value));
       };
       LocalStorage.prototype.get = function (key, defaultValue) {
           if (defaultValue === void 0) { defaultValue = ""; }
           return localStorage.getItem(key) || defaultValue;
       };
       LocalStorage.prototype.has = function (key) {
           return this.get(key, null) !== null;
       };
       LocalStorage.prototype.remove = function (key) {
           localStorage.removeItem(key);
       };
       LocalStorage.prototype.clear = function () {
           localStorage.clear();
       };
       Object.defineProperty(LocalStorage.prototype, "length", {
           get: function () {
               return localStorage.length;
           },
           enumerable: true,
           configurable: true
       });
       LocalStorage.prototype.key = function (index) {
           return localStorage.key(index);
       };
       LocalStorage.prototype.getObject = function (key, defaultValue) {
           if (defaultValue === void 0) { defaultValue = null; }
           var value = this.get(key);
           return (value && JSON.parse(value)) || defaultValue;
       };
       return LocalStorage;
   }());

   var SessionStorage = (function () {
       function SessionStorage() {
       }
       SessionStorage.prototype.set = function (key, value) {
           sessionStorage.setItem(key, value);
       };
       SessionStorage.prototype.setObject = function (key, value) {
           this.set(key, JSON.stringify(value));
       };
       SessionStorage.prototype.get = function (key, defaultValue) {
           if (defaultValue === void 0) { defaultValue = ""; }
           return sessionStorage.getItem(key) || defaultValue;
       };
       SessionStorage.prototype.has = function (key) {
           return this.get(key, null) !== null;
       };
       SessionStorage.prototype.remove = function (key) {
           sessionStorage.removeItem(key);
       };
       SessionStorage.prototype.clear = function () {
           sessionStorage.clear();
       };
       Object.defineProperty(SessionStorage.prototype, "length", {
           get: function () {
               return sessionStorage.length;
           },
           enumerable: true,
           configurable: true
       });
       SessionStorage.prototype.key = function (index) {
           return sessionStorage.key(index);
       };
       SessionStorage.prototype.getObject = function (key, defaultValue) {
           if (defaultValue === void 0) { defaultValue = null; }
           var value = this.get(key);
           return (value && JSON.parse(value)) || defaultValue;
       };
       return SessionStorage;
   }());

   var Request = (function () {
       function Request(method, url, data) {
           this.url = url;
           this.method = method.toUpperCase();
           this.data = data;
           this.headers = {};
           if (this.method !== "GET"
               && this.method !== "HEAD"
               && this.method !== "DELETE"
               && this.method !== "TRACE") {
               this.headers["Content-Type"] = "application/json";
           }
           this.headers["Accept"] = "application/json";
           this.parser = function (x) { return JSON.parse(x); };
           this.serializer = function (x) { return JSON.stringify(x); };
           this.cacheStorage = new LocalStorage();
       }
       Request.get = function (url, data) {
           return new Request("GET", url, data);
       };
       Request.makeRequest = function (method, url, data) {
           return new Request(method, url, data);
       };
       Request.post = function (url, data) {
           return new Request("POST", url, data);
       };
       Request.put = function (url, data) {
           return new Request("PUT", url, data);
       };
       Request.delete = function (url, data) {
           return new Request("DELETE", url, data);
       };
       Request.prototype.onSuccess = function (callback) {
           this.success = callback;
           return this;
       };
       Request.prototype.onError = function (callback) {
           this.error = callback;
           return this;
       };
       Request.prototype.onException = function (callback) {
           this.exception = callback;
           return this;
       };
       Request.prototype.set = function (key, value) {
           this.headers[key] = value;
           return this;
       };
       Request.prototype.type = function (value) {
           return this.set("Content-Type", value);
       };
       Request.prototype.accept = function (value) {
           return this.set("Accept", value);
       };
       Request.prototype.setParser = function (parser) {
           this.parser = parser;
           return this;
       };
       Request.prototype.useCache = function (cacheKey) {
           this.cacheKey = cacheKey;
           return this;
       };
       Request.prototype.setSerializer = function (serializer) {
           this.serializer = serializer;
           return this;
       };
       Request.prototype.setCache = function (cache) {
           this.cacheStorage = cache;
           return this;
       };
       Request.prototype.setCredentials = function (user, password) {
           this.user = user;
           this.password = password;
           return this;
       };
       Request.prototype.send = function () {
           var _this = this;
           if (this.error === undefined || this.error === null) {
               this.error = function (x) { };
           }
           if (this.success === undefined || this.success === null) {
               this.success = function (x) { };
           }
           if (this.exception === undefined || this.exception === null) {
               this.exception = function (x) { throw x; };
           }
           if (this.cacheStorage === undefined || this.cacheStorage === null) {
               this.cacheStorage = new LocalStorage();
           }
           if (this.cacheKey !== null && this.cacheKey !== undefined && this.cacheStorage.has(this.cacheKey)) {
               this.success(this.parser(this.cacheStorage.get(this.cacheKey, "")));
               return;
           }
           var request = new XMLHttpRequest();
           request.open(this.method, encodeURI(this.url), true, this.user, this.password);
           for (var property in this.headers) {
               if (this.headers.hasOwnProperty(property)) {
                   request.setRequestHeader(property, this.headers[property]);
               }
           }
           request.addEventListener("load", function (x) {
               try {
                   if (request.status === 200) {
                       if (_this.cacheKey !== null && _this.cacheKey !== undefined) {
                           _this.cacheStorage.set(_this.cacheKey, request.responseText);
                       }
                       return _this.success(_this.parser(request.responseText));
                   }
                   return _this.error(_this.parser(request.responseText));
               }
               catch (exception) {
                   return _this.exception(exception);
               }
           });
           request.addEventListener("error", function (x) {
               try {
                   return _this.error(_this.parser(request.responseText));
               }
               catch (exception) {
                   return _this.exception(exception);
               }
           });
           if (this.data !== undefined) {
               request.send(this.serializer(this.data));
           }
           else {
               request.send();
           }
       };
       return Request;
   }());

   var Closer = (function () {
       function Closer() {
           var _this = this;
           this.map(document.getElementsByClassName("close"), function (x) {
               x.addEventListener("click", function (y) { return _this.close(y.target); });
               return x;
           });
       }
       Closer.prototype.close = function (target) {
           var elementToClose = target.attribute("data-close");
           var element = target.getParentByClass(elementToClose);
           if (!element) {
               return;
           }
           element.hide();
       };
       Closer.prototype.map = function (elements, callback) {
           var ReturnValues = [];
           for (var x = 0; x < elements.length; ++x) {
               ReturnValues = ReturnValues.concat(callback(elements[x]));
           }
           return ReturnValues;
       };
       return Closer;
   }());

   var DropDown = (function () {
       function DropDown() {
           this.map(document.getElementsByClassName("drop-down"), function (x) {
               x.firstElementChild
                   .addEventListener("click", function (y) {
                   y.preventDefault();
                   var parentElement = y.target.getParentByClass("drop-down");
                   if (parentElement.hasClass("active")) {
                       parentElement.removeClass("active");
                   }
                   else {
                       parentElement.addClass("active");
                   }
                   return false;
               });
               return x;
           });
           window.addEventListener("click", function (x) {
               var elements = document.getElementsByClassName("drop-down");
               for (var y = 0; y < elements.length; ++y) {
                   if (x.target.getParentByClass("drop-down") !== elements[y]) {
                       elements[y].className = elements[y].className.replace("active", "");
                   }
               }
           });
       }
       DropDown.prototype.map = function (elements, callback) {
           var ReturnValues = [];
           for (var x = 0; x < elements.length; ++x) {
               ReturnValues = ReturnValues.concat(callback(elements[x]));
           }
           return ReturnValues;
       };
       return DropDown;
   }());

   var Mobile = (function () {
       function Mobile() {
           var _this = this;
           Mobile.menuElements = [];
           this.map(document.getElementsByClassName("mobile"), function (x) {
               var tempElement = x;
               if (tempElement.hasClass("menu")) {
                   var id_1 = tempElement.id;
                   var item = tempElement;
                   Mobile.menuElements = Mobile.menuElements.concat({ key: item.id, value: item });
                   var menuElement = document.createElement("a");
                   menuElement.href = "#";
                   menuElement.className = "fa-bars hidden-on-desktop display-on-tablet-landscape extra-large mobile-toggler";
                   menuElement.addEventListener("click", function (y) {
                       (y.target).addClass("hidden");
                       Mobile.show(id_1);
                       y.preventDefault();
                   });
                   tempElement.parentElement.appendChild(menuElement);
               }
           });
           window.addEventListener("click", function (x) {
               var tempElement = x.target;
               if (tempElement.getParentByClass("mobile") == null
                   && tempElement.getParentByClass("mobile-toggler") == null
                   && !tempElement.hasClass("mobile-toggler")) {
                   _this.map(document.getElementsByClassName("mobile"), function (y) { return y.removeClass("show"); });
                   _this.map(document.getElementsByClassName("mobile-toggler"), function (y) { return y.removeClass("hidden"); });
               }
           });
       }
       Mobile.prototype.map = function (elements, callback) {
           var ReturnValues = [];
           for (var x = 0; x < elements.length; ++x) {
               ReturnValues = ReturnValues.concat(callback(elements[x]));
           }
           return ReturnValues;
       };
       Mobile.show = function (id) {
           Mobile.menuElements.filter(function (x) { return x.key === id; }).forEach(function (x) { return x.value.show(); });
       };
       Mobile.hide = function (id) {
           Mobile.menuElements.filter(function (x) { return x.key === id; }).forEach(function (x) { return x.value.hide(); });
       };
       return Mobile;
   }());

   var script = Vue.extend({
       data: function () {
           return {
               classes: this.cssClasses,
           };
       },
       methods: {
           closeModal: function () {
               this.showModal = false;
               this.$emit("close");
           },
       },
       props: {
           cssClasses: String,
           showModal: {
               default: false,
               type: Boolean,
           },
       }
   });

   function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
       if (typeof shadowMode !== 'boolean') {
           createInjectorSSR = createInjector;
           createInjector = shadowMode;
           shadowMode = false;
       }
       // Vue.extend constructor export interop.
       const options = typeof script === 'function' ? script.options : script;
       // render functions
       if (template && template.render) {
           options.render = template.render;
           options.staticRenderFns = template.staticRenderFns;
           options._compiled = true;
           // functional template
           if (isFunctionalTemplate) {
               options.functional = true;
           }
       }
       // scopedId
       if (scopeId) {
           options._scopeId = scopeId;
       }
       let hook;
       if (moduleIdentifier) {
           // server build
           hook = function (context) {
               // 2.3 injection
               context =
                   context || // cached call
                       (this.$vnode && this.$vnode.ssrContext) || // stateful
                       (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
               // 2.2 with runInNewContext: true
               if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                   context = __VUE_SSR_CONTEXT__;
               }
               // inject component styles
               if (style) {
                   style.call(this, createInjectorSSR(context));
               }
               // register component module identifier for async chunk inference
               if (context && context._registeredComponents) {
                   context._registeredComponents.add(moduleIdentifier);
               }
           };
           // used by ssr in case component is cached and beforeCreate
           // never gets called
           options._ssrRegister = hook;
       }
       else if (style) {
           hook = shadowMode
               ? function (context) {
                   style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
               }
               : function (context) {
                   style.call(this, createInjector(context));
               };
       }
       if (hook) {
           if (options.functional) {
               // register for functional component in vue file
               const originalRender = options.render;
               options.render = function renderWithStyleInjection(h, context) {
                   hook.call(context);
                   return originalRender(h, context);
               };
           }
           else {
               // inject component registration as beforeCreate hook
               const existing = options.beforeCreate;
               options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
           }
       }
       return script;
   }

   /* script */
   const __vue_script__ = script;

   /* template */
   var __vue_render__ = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", { class: { modal: true, show: _vm.showModal } }, [
       _c("div", { class: ["panel", _vm.classes] }, [
         _c("header", [_vm._t("header", [_vm._v("Header")])], 2),
         _vm._v(" "),
         _c("div", { staticClass: "body" }, [_vm._t("body", [_vm._v("Body")])], 2),
         _vm._v(" "),
         _c(
           "footer",
           [
             _vm._t("footer", [
               _c("input", {
                 staticClass: "close right",
                 attrs: { type: "button", value: "Close" },
                 on: { click: _vm.closeModal }
               }),
               _c("br", { staticClass: "clear" })
             ])
           ],
           2
         )
       ])
     ])
   };
   var __vue_staticRenderFns__ = [];
   __vue_render__._withStripped = true;

     /* style */
     const __vue_inject_styles__ = undefined;
     /* scoped */
     const __vue_scope_id__ = undefined;
     /* module identifier */
     const __vue_module_identifier__ = undefined;
     /* functional template */
     const __vue_is_functional_template__ = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__ = normalizeComponent(
       { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
       __vue_inject_styles__,
       __vue_script__,
       __vue_scope_id__,
       __vue_is_functional_template__,
       __vue_module_identifier__,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$1 = Vue.extend({
       beforeMount: function () {
           this.switchSelected(this.initialSectionPicked);
       },
       data: function () {
           var tempSectionPicked = this.initialSectionPicked;
           if (tempSectionPicked === undefined && this.sections && this.sections.length > 0) {
               tempSectionPicked = this.sections[0];
           }
           return {
               sectionPicked: tempSectionPicked,
           };
       },
       methods: {
           switchSelected: function (item) {
               this.sectionPicked = item;
               this.switchTabs();
               this.$emit("section-changed", this.sectionPicked);
           },
           switchTabs: function () {
               var _this = this;
               if (this.sections === undefined) {
                   return;
               }
               if (!this.sections.some(function (x) { return x === _this.sectionPicked; })) {
                   this.sectionPicked = this.sections[0];
               }
               if (this.sectionPicked === undefined) {
                   return;
               }
               this.sectionPicked.selected = true;
               for (var x = 0; x < this.sections.length; ++x) {
                   if (this.sectionPicked !== this.sections[x]) {
                       this.sections[x].selected = false;
                   }
               }
           },
       },
       props: {
           initialSectionPicked: Object,
           sections: Array,
       },
       watch: {
           sections: function (value) {
               this.switchSelected(this.sectionPicked);
           },
       },
   });

   /* script */
   const __vue_script__$1 = script$1;

   /* template */
   var __vue_render__$1 = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", { staticClass: "tabs" }, [
       _c("header", [
         _c(
           "ul",
           { staticClass: "row flex align-items-stretch" },
           _vm._l(_vm.sections, function(section, index) {
             return _c("li", { key: index, staticClass: "flex-item" }, [
               _c(
                 "a",
                 {
                   staticClass: "tab",
                   class: { selected: section.selected },
                   attrs: { href: "#!" },
                   on: {
                     click: function($event) {
                       $event.stopPropagation();
                       $event.preventDefault();
                       return _vm.switchSelected(section)
                     }
                   }
                 },
                 [
                   _c("span", { class: [section.icon] }),
                   _vm._v(
                     "\n                        " +
                       _vm._s(section.name) +
                       "\n                "
                   )
                 ]
               )
             ])
           }),
           0
         )
       ]),
       _vm._v(" "),
       _c("section", [_vm._t("default")], 2)
     ])
   };
   var __vue_staticRenderFns__$1 = [];
   __vue_render__$1._withStripped = true;

     /* style */
     const __vue_inject_styles__$1 = undefined;
     /* scoped */
     const __vue_scope_id__$1 = undefined;
     /* module identifier */
     const __vue_module_identifier__$1 = undefined;
     /* functional template */
     const __vue_is_functional_template__$1 = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$1 = normalizeComponent(
       { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
       __vue_inject_styles__$1,
       __vue_script__$1,
       __vue_scope_id__$1,
       __vue_is_functional_template__$1,
       __vue_module_identifier__$1,
       false,
       undefined,
       undefined,
       undefined
     );

   var dateRegex = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
   var script$2 = Vue.extend({
       computed: {
           filteredData: function () {
               var sortKey = this.sortKey;
               var filterKey = this.filterKey && this.filterKey.toLowerCase();
               var order = this.sortOrders[sortKey] || 1;
               var data = this.data;
               if (filterKey) {
                   data = data.filter(function (row) {
                       return Object.keys(row).some(function (key) {
                           return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
                       });
                   });
               }
               if (sortKey) {
                   var sortFunction = this.guessDataType(data);
                   if (sortFunction === "string") {
                       data = data.sort(this.sortString);
                   }
                   else if (sortFunction === "number") {
                       data = data.sort(this.sortNumber);
                   }
                   else if (sortFunction === "date") {
                       data = data.sort(this.sortDate);
                   }
                   else if (sortFunction === "MMDD Date") {
                       data = data.sort(this.sortMMDDDate);
                   }
                   else if (sortFunction === "DDMM Date") {
                       data = data.sort(this.sortDDMMDate);
                   }
                   if (order === 1) {
                       this.data.reverse();
                   }
               }
               return data;
           },
       },
       data: function () {
           var sortOrders = {};
           this.columns.forEach(function (key) {
               key = key.replace(/\s+/g, "").trim();
               sortOrders[key.toString()] = 1;
           });
           return {
               sortKey: "",
               sortOrders: sortOrders,
           };
       },
       methods: {
           filteredColumn: function (key) {
               return key.replace(/\s+/g, "").trim();
           },
           getHeader: function (key) {
               return key.replace("_", " ").replace("-", " ").replace(/([a-z])([A-Z])/g, "$1 $2");
           },
           guessDataType: function (data) {
               var tempDiv = document.createElement("div");
               var returnValue = "string";
               for (var x = 0; x < data.length; ++x) {
                   var cellText = data[x][this.sortKey].toString();
                   tempDiv.innerHTML = cellText;
                   cellText = (tempDiv.textContent || tempDiv.innerText || "").replace(/^\s+|\s+$/g, "");
                   if (cellText !== "") {
                       if (cellText.match(/^-?[£$¤]?[\d,.]+%?$/)) {
                           return "number";
                       }
                       var dateParts = cellText.match(dateRegex);
                       if (dateParts) {
                           var first = parseInt(dateParts[1], 10);
                           var second = parseInt(dateParts[2], 10);
                           if (first > 12) {
                               return "DDMM Date";
                           }
                           else if (second > 12) {
                               return "MMDD Date";
                           }
                           else {
                               returnValue = "MMDD Date";
                           }
                       }
                   }
               }
               return returnValue;
           },
           sortBy: function (key) {
               key = this.filteredColumn(key);
               this.sortKey = key;
               var tempSortOrder = {};
               if (!(key in this.sortOrders)) {
                   tempSortOrder[key] = 1;
               }
               else {
                   tempSortOrder[key] = this.sortOrders[key];
               }
               tempSortOrder[key] = tempSortOrder[key] * -1;
               this.sortOrders = tempSortOrder;
           },
           sortDDMMDate: function (val1, val2) {
               var actualValue1 = this.stripHTML(val1[this.sortKey].toString());
               var actualValue2 = this.stripHTML(val2[this.sortKey].toString());
               var match = actualValue1.match(dateRegex);
               var year = match[3], day = match[1], month = match[2];
               if (month.length === 1) {
                   month = "0" + month;
               }
               if (day.length === 1) {
                   day = "0" + day;
               }
               var value1 = year + month + day;
               match = actualValue2.match(dateRegex);
               year = match[3];
               day = match[1];
               month = match[2];
               if (month.length === 1) {
                   month = "0" + month;
               }
               if (day.length === 1) {
                   day = "0" + day;
               }
               var value2 = year + month + day;
               if (value1 === value2) {
                   return 0;
               }
               if (value1 < value2) {
                   return -1;
               }
               return 1;
           },
           sortDate: function (val1, val2) {
               var actualValue1 = this.stripHTML(val1[this.sortKey].toString());
               var actualValue2 = this.stripHTML(val2[this.sortKey].toString());
               var value1 = new Date(actualValue1);
               var value2 = new Date(actualValue2);
               if (isNaN(value1.getTime())) {
                   value1 = new Date(0);
               }
               if (isNaN(value2.getTime())) {
                   value2 = new Date(0);
               }
               if (value1 === value2) {
                   return 0;
               }
               if (value1 < value2) {
                   return -1;
               }
               return 1;
           },
           sortMMDDDate: function (value1, value2) {
               var actualValue1 = this.stripHTML(value1[this.sortKey].toString());
               var actualValue2 = this.stripHTML(value2[this.sortKey].toString());
               var match = actualValue1.match(dateRegex);
               var year = match[3], day = match[2], month = match[1];
               if (month.length === 1) {
                   month = "0" + month;
               }
               if (day.length === 1) {
                   day = "0" + day;
               }
               var val1 = year + month + day;
               match = actualValue2.match(dateRegex);
               year = match[3];
               day = match[2];
               month = match[1];
               if (month.length === 1) {
                   month = "0" + month;
               }
               if (day.length === 1) {
                   day = "0" + day;
               }
               var val2 = year + month + day;
               if (val1 === val2) {
                   return 0;
               }
               if (val1 < val2) {
                   return -1;
               }
               return 1;
           },
           sortNumber: function (value1, value2) {
               var actualValue1 = parseFloat(this.stripHTML(value1[this.sortKey].toString()).replace(/[^0-9.-]/g, ""));
               var actualValue2 = parseFloat(this.stripHTML(value2[this.sortKey].toString()).replace(/[^0-9.-]/g, ""));
               if (isNaN(actualValue1)) {
                   actualValue1 = 0;
               }
               if (isNaN(actualValue2)) {
                   actualValue2 = 0;
               }
               return actualValue1 - actualValue2;
           },
           sortString: function (value1, value2) {
               var actualValue1 = this.stripHTML(value1[this.sortKey].toString());
               var actualValue2 = this.stripHTML(value2[this.sortKey].toString());
               if (actualValue1 === actualValue2) {
                   return 0;
               }
               if (actualValue1 < actualValue2) {
                   return -1;
               }
               return 1;
           },
           stripHTML: function (value) {
               var tempDiv = document.createElement("div");
               tempDiv.innerHTML = value;
               return (tempDiv.textContent || tempDiv.innerText || "").replace(/^\s+|\s+$/g, "");
           },
       },
       props: {
           columns: Array,
           data: Array,
           filterKey: String,
       }
   });

   /* script */
   const __vue_script__$2 = script$2;

   /* template */
   var __vue_render__$2 = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("table", { staticClass: "sortable" }, [
       _c("thead", [
         _c(
           "tr",
           _vm._l(_vm.columns, function(key) {
             return _c(
               "th",
               {
                 key: key,
                 class: {
                   active: _vm.sortKey == _vm.filteredColumn(key),
                   headerSortUp:
                     _vm.sortKey == _vm.filteredColumn(key) &&
                     _vm.sortOrders[_vm.filteredColumn(key)] > 0,
                   headerSortDown:
                     _vm.sortKey == _vm.filteredColumn(key) &&
                     _vm.sortOrders[_vm.filteredColumn(key)] < 0
                 },
                 on: {
                   click: function($event) {
                     return _vm.sortBy(key)
                   }
                 }
               },
               [
                 _vm._v(
                   "\n          " +
                     _vm._s(_vm._f("capitalize")(_vm.getHeader(key))) +
                     "\n          "
                 )
               ]
             )
           }),
           0
         )
       ]),
       _vm._v(" "),
       _c(
         "tbody",
         _vm._l(_vm.filteredData, function(entry, index) {
           return _c(
             "tr",
             { key: index },
             _vm._l(_vm.columns, function(key) {
               return _c("td", {
                 key: key,
                 domProps: { innerHTML: _vm._s(entry[_vm.filteredColumn(key)]) }
               })
             }),
             0
           )
         }),
         0
       )
     ])
   };
   var __vue_staticRenderFns__$2 = [];
   __vue_render__$2._withStripped = true;

     /* style */
     const __vue_inject_styles__$2 = undefined;
     /* scoped */
     const __vue_scope_id__$2 = undefined;
     /* module identifier */
     const __vue_module_identifier__$2 = undefined;
     /* functional template */
     const __vue_is_functional_template__$2 = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$2 = normalizeComponent(
       { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
       __vue_inject_styles__$2,
       __vue_script__$2,
       __vue_scope_id__$2,
       __vue_is_functional_template__$2,
       __vue_module_identifier__$2,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$3 = Vue.extend({
       data: function () {
           return {
               errorMessages: [],
           };
       },
       mounted: function () {
           this.$nextTick(function () {
               this.revalidate();
           });
       },
       methods: {
           revalidate: function () {
               if (this.$el === null || this.$el === undefined) {
                   return true;
               }
               var FormElement = this.getParentForm(this.$el);
               if (FormElement !== null && window.clarity.validation.validateForm(FormElement).length > 0) {
                   this.errorMessages = window.clarity.validation.validateForm(FormElement);
                   return false;
               }
               else if (FormElement === null && !window.clarity.validation.validate()) {
                   this.errorMessages = window.clarity.validation.errors;
                   return false;
               }
               else {
                   this.errorMessages = [];
                   return true;
               }
           },
           getParentForm: function (element) {
               var CurrentParent = element.parentNode;
               if (CurrentParent.nodeName === "FORM" || CurrentParent === null) {
                   return CurrentParent;
               }
               else {
                   return this.getParentForm(CurrentParent);
               }
           },
       }
   });

   /* script */
   const __vue_script__$3 = script$3;

   /* template */
   var __vue_render__$3 = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c(
       "div",
       {
         directives: [
           {
             name: "show",
             rawName: "v-show",
             value: _vm.errorMessages.length > 0,
             expression: "errorMessages.length > 0"
           }
         ],
         staticClass: "panel error"
       },
       [
         _c("a", { attrs: { name: "errorSection" } }),
         _vm._v(" "),
         _c(
           "header",
           [_vm._t("default", [_vm._v("Some Errors Were Discovered")])],
           2
         ),
         _vm._v(" "),
         _c(
           "ul",
           _vm._l(_vm.errorMessages, function(errorMessage) {
             return _c("li", { key: errorMessage }, [_vm._v(_vm._s(errorMessage))])
           }),
           0
         )
       ]
     )
   };
   var __vue_staticRenderFns__$3 = [];
   __vue_render__$3._withStripped = true;

     /* style */
     const __vue_inject_styles__$3 = undefined;
     /* scoped */
     const __vue_scope_id__$3 = undefined;
     /* module identifier */
     const __vue_module_identifier__$3 = undefined;
     /* functional template */
     const __vue_is_functional_template__$3 = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$3 = normalizeComponent(
       { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
       __vue_inject_styles__$3,
       __vue_script__$3,
       __vue_scope_id__$3,
       __vue_is_functional_template__$3,
       __vue_module_identifier__$3,
       false,
       undefined,
       undefined,
       undefined
     );

   function RegisterFilters$1() {
       Vue.filter("moment", function (date, format) {
           if (!date) {
               return "N/A";
           }
           return moment(date, "YYYY-MM-DDThh:mm:ss").format(format);
       });
       Vue.filter("capitalize", function (str) {
           if (!str) {
               return "";
           }
           return str.charAt(0).toUpperCase() + str.slice(1);
       });
   }

   var clickOutside$1 = {
       bind: function (el) {
           clickOutside$1.onEventBound = clickOutside$1.onEvent.bind({ el: el });
           document.addEventListener("click", clickOutside$1.onEventBound);
       },
       cb: function (event) {
           return;
       },
       onEvent: function (event) {
           if (event.target === this.el || this.el.contains(event.target) || clickOutside$1.cb) {
               clickOutside$1.cb(event);
           }
       },
       onEventBound: function () {
           return;
       },
       unbind: function () {
           document.removeEventListener("click", clickOutside$1.onEventBound);
       },
       update: function (el, binding) {
           if (typeof binding.value !== "function") {
               throw new Error("Argument must be a function");
           }
           clickOutside$1.cb = binding.value;
       },
   };
   function RegisterDirectives$1() {
       Vue.directive("click-outside", clickOutside$1);
   }

   var script$4 = Vue.extend({
       props: {
           model: Object,
           schema: Object,
           idSuffix: String,
           label: {
               default: true,
               type: Boolean,
           },
       },
       methods: {
           getFieldID: function () {
               var result = "";
               if (this.schema.id) {
                   result = this.schema.id;
               }
               else {
                   result = this.schema.model.slugify();
               }
               if (this.idSuffix) {
                   result += this.idSuffix;
               }
               return result;
           },
           changed: function (newValue) {
               this.$emit("changed", newValue, this.schema);
           },
           getList: function () {
               if (this.schema.datalist !== undefined) {
                   return this.getFieldID() + "-list";
               }
               else {
                   return null;
               }
           },
       }
   });

   /* script */
   const __vue_script__$4 = script$4;

   /* template */
   var __vue_render__$4 = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", [
       !_vm.schema.label && _vm.label
         ? _c(
             "label",
             { class: _vm.schema.labelClasses, attrs: { for: _vm.getFieldID() } },
             [
               _vm._v(
                 "\n        " +
                   _vm._s(_vm._f("capitalize")(_vm.schema.model)) +
                   "\n        "
               ),
               _vm.schema.required
                 ? _c("span", { staticClass: "error clear-background" }, [
                     _vm._v("*")
                   ])
                 : _vm._e(),
               _vm._v(" "),
               _vm.schema.hint
                 ? _c(
                     "i",
                     {
                       staticClass:
                         "clear-background info fa-info-circle no-border small"
                     },
                     [_vm._v(_vm._s(_vm.schema.hint))]
                   )
                 : _vm._e()
             ]
           )
         : _vm._e(),
       _vm._v(" "),
       _vm.schema.label && _vm.label
         ? _c(
             "label",
             { class: _vm.schema.labelClasses, attrs: { for: _vm.getFieldID() } },
             [
               _vm._v("\n        " + _vm._s(_vm.schema.label) + "\n        "),
               _vm.schema.required
                 ? _c("span", { staticClass: "error clear-background" }, [
                     _vm._v("*")
                   ])
                 : _vm._e(),
               _vm._v(" "),
               _vm.schema.hint
                 ? _c(
                     "i",
                     {
                       staticClass:
                         "clear-background info fa-info-circle no-border small"
                     },
                     [_vm._v(_vm._s(_vm.schema.hint))]
                   )
                 : _vm._e()
             ]
           )
         : _vm._e(),
       _vm._v(" "),
       _vm.schema.inputType === "checkbox"
         ? _c("input", {
             directives: [
               {
                 name: "model",
                 rawName: "v-model",
                 value: _vm.model,
                 expression: "model"
               }
             ],
             class: _vm.schema.inputClasses,
             attrs: {
               id: _vm.getFieldID(),
               disabled: _vm.schema.disabled,
               accept: _vm.schema.accept,
               alt: _vm.schema.alt,
               autocomplete: _vm.schema.autocomplete,
               dirname: _vm.schema.dirname,
               formaction: _vm.schema.formaction,
               formenctype: _vm.schema.formenctype,
               formmethod: _vm.schema.formmethod,
               formnovalidate: _vm.schema.formnovalidate,
               formtarget: _vm.schema.formtarget,
               height: _vm.schema.height,
               list: _vm.getList(),
               max: _vm.schema.max,
               maxlength: _vm.schema.maxlength,
               min: _vm.schema.min,
               minlength: _vm.schema.minlength,
               multiple: _vm.schema.multiple,
               name: _vm.schema.inputName || _vm.getFieldID(),
               pattern: _vm.schema.pattern,
               placeholder: _vm.schema.placeholder,
               title: _vm.schema.placeholder,
               readonly: _vm.schema.readonly,
               required: _vm.schema.required,
               size: _vm.schema.size,
               src: _vm.schema.src,
               step: _vm.schema.step,
               width: _vm.schema.width,
               files: _vm.schema.files,
               "data-error-message-value-missing":
                 _vm.schema.errorMessageValueMissing,
               "data-error-message-pattern-mismatch":
                 _vm.schema.errorMessagePatternMismatch,
               "data-error-message-range-overflow":
                 _vm.schema.errorMessageRangeOverflow,
               "data-error-message-range-underflow":
                 _vm.schema.errorMessageRangeUnderflow,
               "data-error-message-step-mismatch":
                 _vm.schema.errorMessageStepMismatch,
               "data-error-message-too-long": _vm.schema.errorMessageTooLong,
               "data-error-message-too-short": _vm.schema.errorMessageTooShort,
               "data-error-message-bad-input": _vm.schema.errorMessageBadInput,
               "data-error-message-type-mismatch":
                 _vm.schema.errorMessageTypeMismatch,
               type: "checkbox"
             },
             domProps: {
               checked: _vm.schema.checked,
               checked: Array.isArray(_vm.model)
                 ? _vm._i(_vm.model, null) > -1
                 : _vm.model
             },
             on: {
               input: function($event) {
                 return _vm.changed($event.target.value)
               },
               change: function($event) {
                 var $$a = _vm.model,
                   $$el = $event.target,
                   $$c = $$el.checked ? true : false;
                 if (Array.isArray($$a)) {
                   var $$v = null,
                     $$i = _vm._i($$a, $$v);
                   if ($$el.checked) {
                     $$i < 0 && (_vm.model = $$a.concat([$$v]));
                   } else {
                     $$i > -1 &&
                       (_vm.model = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                   }
                 } else {
                   _vm.model = $$c;
                 }
               }
             }
           })
         : _vm.schema.inputType === "radio"
         ? _c("input", {
             directives: [
               {
                 name: "model",
                 rawName: "v-model",
                 value: _vm.model,
                 expression: "model"
               }
             ],
             class: _vm.schema.inputClasses,
             attrs: {
               id: _vm.getFieldID(),
               disabled: _vm.schema.disabled,
               accept: _vm.schema.accept,
               alt: _vm.schema.alt,
               autocomplete: _vm.schema.autocomplete,
               dirname: _vm.schema.dirname,
               formaction: _vm.schema.formaction,
               formenctype: _vm.schema.formenctype,
               formmethod: _vm.schema.formmethod,
               formnovalidate: _vm.schema.formnovalidate,
               formtarget: _vm.schema.formtarget,
               height: _vm.schema.height,
               list: _vm.getList(),
               max: _vm.schema.max,
               maxlength: _vm.schema.maxlength,
               min: _vm.schema.min,
               minlength: _vm.schema.minlength,
               multiple: _vm.schema.multiple,
               name: _vm.schema.inputName || _vm.getFieldID(),
               pattern: _vm.schema.pattern,
               placeholder: _vm.schema.placeholder,
               title: _vm.schema.placeholder,
               readonly: _vm.schema.readonly,
               required: _vm.schema.required,
               size: _vm.schema.size,
               src: _vm.schema.src,
               step: _vm.schema.step,
               width: _vm.schema.width,
               files: _vm.schema.files,
               "data-error-message-value-missing":
                 _vm.schema.errorMessageValueMissing,
               "data-error-message-pattern-mismatch":
                 _vm.schema.errorMessagePatternMismatch,
               "data-error-message-range-overflow":
                 _vm.schema.errorMessageRangeOverflow,
               "data-error-message-range-underflow":
                 _vm.schema.errorMessageRangeUnderflow,
               "data-error-message-step-mismatch":
                 _vm.schema.errorMessageStepMismatch,
               "data-error-message-too-long": _vm.schema.errorMessageTooLong,
               "data-error-message-too-short": _vm.schema.errorMessageTooShort,
               "data-error-message-bad-input": _vm.schema.errorMessageBadInput,
               "data-error-message-type-mismatch":
                 _vm.schema.errorMessageTypeMismatch,
               type: "radio"
             },
             domProps: {
               checked: _vm.schema.checked,
               checked: _vm._q(_vm.model, null)
             },
             on: {
               input: function($event) {
                 return _vm.changed($event.target.value)
               },
               change: function($event) {
                 _vm.model = null;
               }
             }
           })
         : _c("input", {
             directives: [
               {
                 name: "model",
                 rawName: "v-model",
                 value: _vm.model,
                 expression: "model"
               }
             ],
             class: _vm.schema.inputClasses,
             attrs: {
               id: _vm.getFieldID(),
               disabled: _vm.schema.disabled,
               accept: _vm.schema.accept,
               alt: _vm.schema.alt,
               autocomplete: _vm.schema.autocomplete,
               dirname: _vm.schema.dirname,
               formaction: _vm.schema.formaction,
               formenctype: _vm.schema.formenctype,
               formmethod: _vm.schema.formmethod,
               formnovalidate: _vm.schema.formnovalidate,
               formtarget: _vm.schema.formtarget,
               height: _vm.schema.height,
               list: _vm.getList(),
               max: _vm.schema.max,
               maxlength: _vm.schema.maxlength,
               min: _vm.schema.min,
               minlength: _vm.schema.minlength,
               multiple: _vm.schema.multiple,
               name: _vm.schema.inputName || _vm.getFieldID(),
               pattern: _vm.schema.pattern,
               placeholder: _vm.schema.placeholder,
               title: _vm.schema.placeholder,
               readonly: _vm.schema.readonly,
               required: _vm.schema.required,
               size: _vm.schema.size,
               src: _vm.schema.src,
               step: _vm.schema.step,
               width: _vm.schema.width,
               files: _vm.schema.files,
               "data-error-message-value-missing":
                 _vm.schema.errorMessageValueMissing,
               "data-error-message-pattern-mismatch":
                 _vm.schema.errorMessagePatternMismatch,
               "data-error-message-range-overflow":
                 _vm.schema.errorMessageRangeOverflow,
               "data-error-message-range-underflow":
                 _vm.schema.errorMessageRangeUnderflow,
               "data-error-message-step-mismatch":
                 _vm.schema.errorMessageStepMismatch,
               "data-error-message-too-long": _vm.schema.errorMessageTooLong,
               "data-error-message-too-short": _vm.schema.errorMessageTooShort,
               "data-error-message-bad-input": _vm.schema.errorMessageBadInput,
               "data-error-message-type-mismatch":
                 _vm.schema.errorMessageTypeMismatch,
               type: _vm.schema.inputType
             },
             domProps: { checked: _vm.schema.checked, value: _vm.model },
             on: {
               input: [
                 function($event) {
                   if ($event.target.composing) {
                     return
                   }
                   _vm.model = $event.target.value;
                 },
                 function($event) {
                   return _vm.changed($event.target.value)
                 }
               ]
             }
           }),
       _vm._v(" "),
       _vm.schema.inputType === "color" || _vm.schema.inputType === "range"
         ? _c("div", { staticClass: "text-center" }, [_vm._v(_vm._s(_vm.model))])
         : _vm._e(),
       _vm._v(" "),
       _vm.schema.datalist
         ? _c(
             "datalist",
             { attrs: { id: _vm.getList() } },
             _vm._l(_vm.schema.datalist, function(item, index) {
               return _c("option", { key: index, domProps: { value: item } })
             }),
             0
           )
         : _vm._e()
     ])
   };
   var __vue_staticRenderFns__$4 = [];
   __vue_render__$4._withStripped = true;

     /* style */
     const __vue_inject_styles__$4 = undefined;
     /* scoped */
     const __vue_scope_id__$4 = undefined;
     /* module identifier */
     const __vue_module_identifier__$4 = undefined;
     /* functional template */
     const __vue_is_functional_template__$4 = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$4 = normalizeComponent(
       { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
       __vue_inject_styles__$4,
       __vue_script__$4,
       __vue_scope_id__$4,
       __vue_is_functional_template__$4,
       __vue_module_identifier__$4,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$5 = Vue.extend({
       props: {
           model: Object,
           schema: Object,
           label: {
               default: true,
               type: Boolean,
           },
           idSuffix: String,
       },
       methods: {
           getFieldID: function () {
               var result = "";
               if (this.schema.id) {
                   result = this.schema.id;
               }
               else {
                   result = this.schema.model.slugify();
               }
               if (this.idSuffix) {
                   result += this.idSuffix;
               }
               return result;
           },
           changed: function (newValue) {
               this.$emit("changed", newValue, this.schema);
           },
           isSelected: function (value) {
               return this.model === value.key;
           },
       }
   });

   /* script */
   const __vue_script__$5 = script$5;

   /* template */
   var __vue_render__$5 = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", [
       !_vm.schema.label && _vm.label
         ? _c(
             "label",
             { class: _vm.schema.labelClasses, attrs: { for: _vm.getFieldID() } },
             [
               _vm._v(
                 "\n        " +
                   _vm._s(_vm._f("capitalize")(_vm.schema.model)) +
                   "\n        "
               ),
               _vm.schema.required
                 ? _c("span", { staticClass: "error clear-background" }, [
                     _vm._v("*")
                   ])
                 : _vm._e()
             ]
           )
         : _vm._e(),
       _vm._v(" "),
       _vm.schema.label && _vm.label
         ? _c(
             "label",
             { class: _vm.schema.labelClasses, attrs: { for: _vm.getFieldID() } },
             [
               _vm._v("\n        " + _vm._s(_vm.schema.label) + "\n        "),
               _vm.schema.required
                 ? _c("span", { staticClass: "error clear-background" }, [
                     _vm._v("*")
                   ])
                 : _vm._e()
             ]
           )
         : _vm._e(),
       _vm._v(" "),
       _c(
         "select",
         {
           directives: [
             {
               name: "model",
               rawName: "v-model",
               value: _vm.model,
               expression: "model"
             }
           ],
           class: _vm.schema.inputClasses,
           attrs: {
             disabled: _vm.schema.disabled,
             name: _vm.schema.inputName || _vm.getFieldID(),
             height: _vm.schema.height,
             id: _vm.getFieldID(),
             readonly: _vm.schema.readonly,
             required: _vm.schema.required,
             multiple: _vm.schema.multiple,
             width: _vm.schema.width,
             "data-error-message-value-missing":
               _vm.schema.errorMessageValueMissing
           },
           on: {
             change: [
               function($event) {
                 var $$selectedVal = Array.prototype.filter
                   .call($event.target.options, function(o) {
                     return o.selected
                   })
                   .map(function(o) {
                     var val = "_value" in o ? o._value : o.value;
                     return val
                   });
                 _vm.model = $event.target.multiple
                   ? $$selectedVal
                   : $$selectedVal[0];
               },
               function($event) {
                 return _vm.changed(_vm.model)
               }
             ]
           }
         },
         _vm._l(_vm.schema.values, function(value) {
           return _c(
             "option",
             {
               key: value.key,
               domProps: { value: value.key, selected: _vm.isSelected(value) }
             },
             [_vm._v("\n            " + _vm._s(value.value) + "\n        ")]
           )
         }),
         0
       )
     ])
   };
   var __vue_staticRenderFns__$5 = [];
   __vue_render__$5._withStripped = true;

     /* style */
     const __vue_inject_styles__$5 = undefined;
     /* scoped */
     const __vue_scope_id__$5 = undefined;
     /* module identifier */
     const __vue_module_identifier__$5 = undefined;
     /* functional template */
     const __vue_is_functional_template__$5 = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$5 = normalizeComponent(
       { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
       __vue_inject_styles__$5,
       __vue_script__$5,
       __vue_scope_id__$5,
       __vue_is_functional_template__$5,
       __vue_module_identifier__$5,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$6 = Vue.extend({
       props: {
           model: Object,
           schema: Object,
           idSuffix: String,
       },
       methods: {
           getFieldID: function () {
               var result = "";
               if (this.schema.id) {
                   result = this.schema.id;
               }
               else {
                   result = this.schema.model.slugify();
               }
               if (this.idSuffix) {
                   result += this.idSuffix;
               }
               return result;
           },
           changed: function (newValue) {
               this.$emit("changed", newValue, this.schema);
           },
       }
   });

   /* script */
   const __vue_script__$6 = script$6;

   /* template */
   var __vue_render__$6 = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", [
       _c("input", {
         class: _vm.schema.inputClasses,
         attrs: {
           id: _vm.getFieldID(),
           type: "checkbox",
           disabled: _vm.schema.disabled,
           dirname: _vm.schema.dirname,
           name: _vm.schema.inputName || _vm.getFieldID(),
           readonly: _vm.schema.readonly,
           required: _vm.schema.required,
           "data-error-message-value-missing": _vm.schema.errorMessageValueMissing
         },
         domProps: { checked: _vm.model },
         on: {
           click: function($event) {
             return _vm.changed($event.target.checked)
           }
         }
       }),
       _vm._v(" "),
       !_vm.schema.label
         ? _c(
             "label",
             { class: _vm.schema.labelClasses, attrs: { for: _vm.getFieldID() } },
             [
               _vm._v(
                 "\n        " +
                   _vm._s(_vm._f("capitalize")(_vm.schema.model)) +
                   "\n        "
               ),
               _vm.schema.required
                 ? _c("span", { staticClass: "error clear-background" }, [
                     _vm._v("*")
                   ])
                 : _vm._e()
             ]
           )
         : _vm._e(),
       _vm._v(" "),
       _vm.schema.label
         ? _c(
             "label",
             { class: _vm.schema.labelClasses, attrs: { for: _vm.getFieldID() } },
             [
               _vm._v("\n        " + _vm._s(_vm.schema.label) + "\n        "),
               _vm.schema.required
                 ? _c("span", { staticClass: "error clear-background" }, [
                     _vm._v("*")
                   ])
                 : _vm._e()
             ]
           )
         : _vm._e()
     ])
   };
   var __vue_staticRenderFns__$6 = [];
   __vue_render__$6._withStripped = true;

     /* style */
     const __vue_inject_styles__$6 = undefined;
     /* scoped */
     const __vue_scope_id__$6 = undefined;
     /* module identifier */
     const __vue_module_identifier__$6 = undefined;
     /* functional template */
     const __vue_is_functional_template__$6 = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$6 = normalizeComponent(
       { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
       __vue_inject_styles__$6,
       __vue_script__$6,
       __vue_scope_id__$6,
       __vue_is_functional_template__$6,
       __vue_module_identifier__$6,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$7 = Vue.extend({
       props: {
           model: Object,
           schema: Object,
           idSuffix: String,
       },
       methods: {
           getFieldID: function (value) {
               var result = "";
               if (this.schema.id) {
                   result = this.schema.id;
               }
               else {
                   result = this.schema.model.slugify();
               }
               result += "-" + value;
               if (this.idSuffix) {
                   result += this.idSuffix;
               }
               return result;
           },
           getFieldName: function () {
               if (this.schema.id) {
                   return this.schema.id;
               }
               return this.schema.model.slugify();
           },
           changed: function (newValue) {
               this.model = newValue;
               this.$emit("changed", newValue, this.schema);
           },
           isItemChecked: function (item) {
               return this.getItemValue(item) === this.model;
           },
           getItemValue: function (item) {
               return item;
           },
       }
   });

   /* script */
   const __vue_script__$7 = script$7;

   /* template */
   var __vue_render__$7 = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c(
       "div",
       { staticClass: "flex row text-center" },
       _vm._l(_vm.schema.values, function(value, index) {
         return _c("div", { key: index, staticClass: "flex-item" }, [
           _c("input", {
             class: _vm.schema.inputClasses,
             attrs: {
               id: _vm.getFieldID(value),
               type: "radio",
               disabled: _vm.schema.disabled,
               name: _vm.schema.inputName || _vm.getFieldName(),
               readonly: _vm.schema.readonly
             },
             domProps: { checked: _vm.isItemChecked(value) },
             on: {
               click: function($event) {
                 return _vm.changed(value)
               }
             }
           }),
           _vm._v(" "),
           _c("label", { attrs: { for: _vm.getFieldID(value) } }, [
             _vm._v(
               "\n            " +
                 _vm._s(_vm._f("capitalize")(value)) +
                 "\n        "
             )
           ])
         ])
       }),
       0
     )
   };
   var __vue_staticRenderFns__$7 = [];
   __vue_render__$7._withStripped = true;

     /* style */
     const __vue_inject_styles__$7 = undefined;
     /* scoped */
     const __vue_scope_id__$7 = undefined;
     /* module identifier */
     const __vue_module_identifier__$7 = undefined;
     /* functional template */
     const __vue_is_functional_template__$7 = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$7 = normalizeComponent(
       { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
       __vue_inject_styles__$7,
       __vue_script__$7,
       __vue_scope_id__$7,
       __vue_is_functional_template__$7,
       __vue_module_identifier__$7,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$8 = Vue.extend({
       props: {
           model: Object,
           schema: Object,
           idSuffix: String,
           label: {
               default: true,
               type: Boolean,
           },
       },
       methods: {
           getFieldID: function () {
               var result = "";
               if (this.schema.id) {
                   result = this.schema.id;
               }
               else {
                   result = this.schema.model.slugify();
               }
               if (this.idSuffix) {
                   result += this.idSuffix;
               }
               return result;
           },
           changed: function (newValue) {
               this.$emit("changed", newValue, this.schema);
           },
       }
   });

   /* script */
   const __vue_script__$8 = script$8;

   /* template */
   var __vue_render__$8 = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", [
       !_vm.schema.label && _vm.label
         ? _c(
             "label",
             { class: _vm.schema.labelClasses, attrs: { for: _vm.getFieldID() } },
             [
               _vm._v(
                 "\n        " +
                   _vm._s(_vm._f("capitalize")(_vm.schema.model)) +
                   "\n        "
               ),
               _vm.schema.required
                 ? _c("span", { staticClass: "error clear-background" }, [
                     _vm._v("*")
                   ])
                 : _vm._e(),
               _vm._v(" "),
               _vm.schema.hint
                 ? _c(
                     "i",
                     {
                       staticClass:
                         "clear-background info fa-info-circle no-border small"
                     },
                     [_vm._v(_vm._s(_vm.schema.hint))]
                   )
                 : _vm._e()
             ]
           )
         : _vm._e(),
       _vm._v(" "),
       _vm.schema.label && _vm.label
         ? _c(
             "label",
             { class: _vm.schema.labelClasses, attrs: { for: _vm.getFieldID() } },
             [
               _vm._v("\n        " + _vm._s(_vm.schema.label) + "\n        "),
               _vm.schema.required
                 ? _c("span", { staticClass: "error clear-background" }, [
                     _vm._v("*")
                   ])
                 : _vm._e(),
               _vm._v(" "),
               _vm.schema.hint
                 ? _c(
                     "i",
                     {
                       staticClass:
                         "clear-background info fa-info-circle no-border small"
                     },
                     [_vm._v(_vm._s(_vm.schema.hint))]
                   )
                 : _vm._e()
             ]
           )
         : _vm._e(),
       _vm._v(" "),
       _c("textarea", {
         directives: [
           {
             name: "model",
             rawName: "v-model",
             value: _vm.model,
             expression: "model"
           }
         ],
         class: _vm.schema.inputClasses,
         attrs: {
           id: _vm.getFieldID(),
           disabled: _vm.schema.disabled,
           height: _vm.schema.height,
           maxlength: _vm.schema.maxlength,
           minlength: _vm.schema.minlength,
           name: _vm.schema.inputName || _vm.getFieldID(),
           placeholder: _vm.schema.placeholder,
           title: _vm.schema.placeholder,
           readonly: _vm.schema.readonly,
           required: _vm.schema.required,
           width: _vm.schema.width,
           rows: _vm.schema.rows || 3,
           "data-error-message-value-missing": _vm.schema.errorMessageValueMissing,
           "data-error-message-too-long": _vm.schema.errorMessageTooLong,
           "data-error-message-too-short": _vm.schema.errorMessageTooShort
         },
         domProps: { value: _vm.model },
         on: {
           input: [
             function($event) {
               if ($event.target.composing) {
                 return
               }
               _vm.model = $event.target.value;
             },
             function($event) {
               return _vm.changed($event.target.value)
             }
           ]
         }
       }),
       _vm._v(" "),
       _vm.schema.maxlength
         ? _c(
             "div",
             { staticClass: "clear-background fa-info-circle info right small" },
             [
               _vm._v(
                 "\n        " +
                   _vm._s(_vm.schema.maxlength - _vm.model.length) +
                   " characters remaining (" +
                   _vm._s(_vm.schema.maxlength) +
                   " max)\n    "
               )
             ]
           )
         : _vm._e(),
       _vm._v(" "),
       _c("br", { staticClass: "clear" })
     ])
   };
   var __vue_staticRenderFns__$8 = [];
   __vue_render__$8._withStripped = true;

     /* style */
     const __vue_inject_styles__$8 = undefined;
     /* scoped */
     const __vue_scope_id__$8 = undefined;
     /* module identifier */
     const __vue_module_identifier__$8 = undefined;
     /* functional template */
     const __vue_is_functional_template__$8 = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$8 = normalizeComponent(
       { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
       __vue_inject_styles__$8,
       __vue_script__$8,
       __vue_scope_id__$8,
       __vue_is_functional_template__$8,
       __vue_module_identifier__$8,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$9 = Vue.extend({
       props: {
           model: Object,
           schema: Object,
           idSuffix: String,
       },
       methods: {}
   });

   /* script */
   const __vue_script__$9 = script$9;

   /* template */
   var __vue_render__$9 = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", {
       class: _vm.schema.classes,
       domProps: { innerHTML: _vm._s(_vm.model || _vm.schema.model) }
     })
   };
   var __vue_staticRenderFns__$9 = [];
   __vue_render__$9._withStripped = true;

     /* style */
     const __vue_inject_styles__$9 = undefined;
     /* scoped */
     const __vue_scope_id__$9 = undefined;
     /* module identifier */
     const __vue_module_identifier__$9 = undefined;
     /* functional template */
     const __vue_is_functional_template__$9 = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$9 = normalizeComponent(
       { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
       __vue_inject_styles__$9,
       __vue_script__$9,
       __vue_scope_id__$9,
       __vue_is_functional_template__$9,
       __vue_module_identifier__$9,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$a = Vue.extend({
       data: function () {
           return {
               files: [],
               ready: false,
               filesAdded: 0,
           };
       },
       props: {
           model: Object,
           schema: Object,
           idSuffix: String,
       },
       methods: {
           getFieldID: function () {
               var result = "";
               if (this.schema.id) {
                   result = this.schema.id;
               }
               else {
                   result = this.schema.model.slugify();
               }
               if (this.idSuffix) {
                   result += this.idSuffix;
               }
               return result;
           },
           changed: function (event) {
               var that = this;
               that.filesAdded = that.filesAdded + event.target.files.length;
               that.ready = false;
               var _loop_1 = function (x) {
                   var reader = new FileReader();
                   reader.onload = (function (file) {
                       return function (readerEvent) {
                           that.files = that.files.concat({ filename: file, data: that.base64ArrayBuffer(reader.result) });
                           if (that.files.length === that.filesAdded) {
                               that.ready = true;
                           }
                       };
                   })(event.target.files[x].name);
                   reader.readAsArrayBuffer(event.target.files[x]);
               };
               for (var x = 0; x < event.target.files.length; ++x) {
                   _loop_1(x);
               }
               this.check();
           },
           base64ArrayBuffer: function (buffer) {
               var binary = "";
               var bytes = new Uint8Array(buffer);
               var len = bytes.byteLength;
               for (var x = 0; x < len; ++x) {
                   binary += String.fromCharCode(bytes[x]);
               }
               return window.btoa(binary);
           },
           check: function () {
               if (this.ready === true) {
                   this.$emit("changed", this.files, this.schema);
                   return;
               }
               setTimeout(this.check, 100);
           },
           removeFile: function (file) {
               var index = this.files.indexOf(file);
               this.files.splice(index, 1);
               this.filesAdded--;
           },
       }
   });

   /* script */
   const __vue_script__$a = script$a;

   /* template */
   var __vue_render__$a = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", [
       !_vm.schema.label
         ? _c(
             "label",
             { class: _vm.schema.labelClasses, attrs: { for: _vm.getFieldID() } },
             [
               _vm._v(
                 "\n        " +
                   _vm._s(_vm._f("capitalize")(_vm.schema.model)) +
                   "\n        "
               ),
               _vm.schema.required
                 ? _c("span", { staticClass: "error clear-background" }, [
                     _vm._v("*")
                   ])
                 : _vm._e(),
               _vm._v(" "),
               _vm.schema.hint
                 ? _c(
                     "i",
                     {
                       staticClass:
                         "clear-background info fa-info-circle no-border small"
                     },
                     [_vm._v(_vm._s(_vm.schema.hint))]
                   )
                 : _vm._e()
             ]
           )
         : _vm._e(),
       _vm._v(" "),
       _vm.schema.label
         ? _c(
             "label",
             { class: _vm.schema.labelClasses, attrs: { for: _vm.getFieldID() } },
             [
               _vm._v("\n        " + _vm._s(_vm.schema.label) + "\n        "),
               _vm.schema.required
                 ? _c("span", { staticClass: "error clear-background" }, [
                     _vm._v("*")
                   ])
                 : _vm._e(),
               _vm._v(" "),
               _vm.schema.hint
                 ? _c(
                     "i",
                     {
                       staticClass:
                         "clear-background info fa-info-circle no-border small"
                     },
                     [_vm._v(_vm._s(_vm.schema.hint))]
                   )
                 : _vm._e()
             ]
           )
         : _vm._e(),
       _vm._v(" "),
       _c("div", { staticClass: "file-upload", class: _vm.schema.inputClasses }, [
         _vm._v("\n        " + _vm._s(_vm.schema.placeholder) + "\n        "),
         _c("input", {
           attrs: {
             accept: _vm.schema.accept,
             id: _vm.getFieldID(),
             multiple: _vm.schema.multiple,
             name: _vm.schema.inputName || _vm.getFieldID(),
             required: _vm.schema.required,
             type: "file",
             "data-error-message-value-missing":
               _vm.schema.errorMessageValueMissing
           },
           on: {
             change: function($event) {
               return _vm.changed($event)
             }
           }
         })
       ]),
       _vm._v(" "),
       _c(
         "div",
         { staticClass: "flex" },
         _vm._l(_vm.files, function(file, index) {
           return _c(
             "div",
             {
               key: index,
               staticClass: "flex-item upload-preview panel",
               class: _vm.schema.previewClasses
             },
             [
               _c("header", [
                 _c(
                   "div",
                   {
                     staticClass: "header",
                     on: {
                       click: function($event) {
                         return _vm.removeFile(file)
                       }
                     }
                   },
                   [_vm._v("×")]
                 ),
                 _vm._v(" ")
               ]),
               _vm._v(" "),
               _c("div", { staticClass: "body" }, [
                 _vm._v(
                   "\n                " + _vm._s(file.filename) + "\n            "
                 )
               ])
             ]
           )
         }),
         0
       )
     ])
   };
   var __vue_staticRenderFns__$a = [];
   __vue_render__$a._withStripped = true;

     /* style */
     const __vue_inject_styles__$a = undefined;
     /* scoped */
     const __vue_scope_id__$a = undefined;
     /* module identifier */
     const __vue_module_identifier__$a = undefined;
     /* functional template */
     const __vue_is_functional_template__$a = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$a = normalizeComponent(
       { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
       __vue_inject_styles__$a,
       __vue_script__$a,
       __vue_scope_id__$a,
       __vue_is_functional_template__$a,
       __vue_module_identifier__$a,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$b = Vue.extend({
       props: {
           model: Object,
           schema: Object,
           idSuffix: String,
       },
       methods: {
           click: function (event, button) {
               this.$emit("click", event, button);
               return false;
           },
       }
   });

   /* script */
   const __vue_script__$b = script$b;

   /* template */
   var __vue_render__$b = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", { staticClass: "controls" }, [
       _c(
         "div",
         { staticClass: "input-group" },
         _vm._l(_vm.schema.buttons, function(button, index) {
           return _c("input", {
             key: index,
             class: button.classes,
             attrs: { type: button.type },
             domProps: { value: button.value },
             on: {
               click: function($event) {
                 return _vm.click($event, button)
               }
             }
           })
         }),
         0
       )
     ])
   };
   var __vue_staticRenderFns__$b = [];
   __vue_render__$b._withStripped = true;

     /* style */
     const __vue_inject_styles__$b = undefined;
     /* scoped */
     const __vue_scope_id__$b = undefined;
     /* module identifier */
     const __vue_module_identifier__$b = undefined;
     /* functional template */
     const __vue_is_functional_template__$b = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$b = normalizeComponent(
       { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
       __vue_inject_styles__$b,
       __vue_script__$b,
       __vue_scope_id__$b,
       __vue_is_functional_template__$b,
       __vue_module_identifier__$b,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$c = Vue.extend({
       props: {
           model: Object,
           schema: Object,
           idSuffix: String,
       },
       methods: {
           getFieldType: function (field) {
               return "clarity-form-field-" + field.type;
           },
           getModelValue: function (field) {
               return this.model[field.model];
           },
           setModelValue: function (newValue, field) {
               this.model[field.model] = newValue;
               this.$emit("changed", this.model, this.schema);
           },
           buttonClicked: function (event, field) {
               this.$emit("click", event, field);
           },
           getSchema: function (field) {
               if (field.type.startsWith("complex")) {
                   if (field.schema.model === undefined) {
                       field.schema.model = field.model;
                   }
                   return field.schema;
               }
               return field;
           },
           getIDSuffix: function (field) {
               return this.idSuffix;
           },
       }
   });

   /* script */
   const __vue_script__$c = script$c;

   /* template */
   var __vue_render__$c = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", [
       _vm.model.display
         ? _c(
             "div",
             _vm._l(_vm.schema.fields, function(item, index) {
               return _c(
                 "div",
                 { key: index },
                 [
                   _c(_vm.getFieldType(item), {
                     tag: "component",
                     attrs: {
                       schema: _vm.getSchema(item),
                       model: _vm.getModelValue(item),
                       idSuffix: _vm.getIDSuffix(item)
                     },
                     on: { changed: _vm.setModelValue, click: _vm.buttonClicked }
                   })
                 ],
                 1
               )
             }),
             0
           )
         : _vm._e()
     ])
   };
   var __vue_staticRenderFns__$c = [];
   __vue_render__$c._withStripped = true;

     /* style */
     const __vue_inject_styles__$c = undefined;
     /* scoped */
     const __vue_scope_id__$c = undefined;
     /* module identifier */
     const __vue_module_identifier__$c = undefined;
     /* functional template */
     const __vue_is_functional_template__$c = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$c = normalizeComponent(
       { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
       __vue_inject_styles__$c,
       __vue_script__$c,
       __vue_scope_id__$c,
       __vue_is_functional_template__$c,
       __vue_module_identifier__$c,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$d = Vue.extend({
       data: function () {
           var DefaultItem = {};
           for (var property in this.model[0]) {
               if (this.model[0].hasOwnProperty(property)) {
                   DefaultItem[property] = "";
               }
           }
           return {
               defaultItem: DefaultItem,
           };
       },
       props: {
           model: Object,
           schema: Object,
           idSuffix: String,
       },
       methods: {
           getFieldType: function (field) {
               return "clarity-form-field-" + field.type;
           },
           getModelValue: function (field, item) {
               return item[field.model];
           },
           setModelValue: function (field, item, newValue) {
               item[field.model] = newValue;
               this.$emit("changed", this.model, this.schema);
           },
           buttonClicked: function (event, field) {
               this.$emit("click", event, field);
           },
           getSchema: function (field) {
               if (field.type.startsWith("complex")) {
                   if (field.schema.model === undefined) {
                       field.schema.model = field.model;
                   }
                   return field.schema;
               }
               return field;
           },
           removeItem: function (item) {
               if (this.schema.confirmRemoval && !confirm("Are you sure you want to remove this item?")) {
                   return;
               }
               if (!this.model) {
                   this.model = [];
               }
               var Index = this.model.indexOf(item);
               this.model.splice(Index, 1);
               this.$emit("changed", this.model, this.schema);
           },
           addItem: function (item) {
               if (!this.model) {
                   this.model = [];
               }
               this.model = this.model.concat(Object.assign({}, this.defaultItem));
               this.$emit("changed", this.model, this.schema);
           },
           getIDSuffix: function (field, index) {
               return this.idSuffix + index;
           },
       }
   });

   /* script */
   const __vue_script__$d = script$d;

   /* template */
   var __vue_render__$d = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", [
       _c("table", { staticClass: "form-table", class: _vm.schema.tableClasses }, [
         _c("thead", [
           _c(
             "tr",
             [
               _vm._l(_vm.schema.fields, function(item, index) {
                 return _c("th", { key: index }, [
                   item.label
                     ? _c("span", [
                         _vm._v(
                           "\n                        " +
                             _vm._s(_vm._f("capitalize")(item.label)) +
                             "\n                    "
                         )
                       ])
                     : _c("span", [
                         _vm._v(
                           "\n                        " +
                             _vm._s(_vm._f("capitalize")(item.model)) +
                             "\n                    "
                         )
                       ]),
                   _vm._v(" "),
                   _vm.getSchema(item).hint
                     ? _c(
                         "span",
                         {
                           attrs: {
                             "data-tooltip": _vm.getSchema(item).hint,
                             "data-tooltip-size": "extra-large"
                           }
                         },
                         [
                           _c("span", {
                             staticClass: "fa-info-circle no-border small"
                           })
                         ]
                       )
                     : _vm._e()
                 ])
               }),
               _vm._v(" "),
               _c("th")
             ],
             2
           )
         ]),
         _vm._v(" "),
         _c(
           "tbody",
           _vm._l(_vm.model, function(item, index) {
             return _c(
               "tr",
               { key: index },
               [
                 _vm._l(_vm.schema.fields, function(field, fieldindex) {
                   return _c(
                     "td",
                     { key: fieldindex },
                     [
                       _c(_vm.getFieldType(field), {
                         tag: "component",
                         attrs: {
                           schema: _vm.getSchema(field),
                           model: _vm.getModelValue(field, item),
                           label: false,
                           idSuffix: _vm.getIDSuffix(field, index)
                         },
                         on: {
                           changed: function(newValue) {
                             return _vm.setModelValue(field, item, newValue)
                           },
                           click: _vm.buttonClicked
                         }
                       })
                     ],
                     1
                   )
                 }),
                 _vm._v(" "),
                 _c("td", [
                   _c("a", {
                     staticClass: "fa-minus-circle",
                     on: {
                       click: function($event) {
                         $event.stopPropagation();
                         $event.preventDefault();
                         return _vm.removeItem(item)
                       }
                     }
                   })
                 ])
               ],
               2
             )
           }),
           0
         ),
         _vm._v(" "),
         _c("tfoot", [
           _c("tr", [
             _c("td", { attrs: { colspan: _vm.schema.fields.length + 1 } }, [
               _c(
                 "a",
                 {
                   staticClass: "fa-plus-circle",
                   on: {
                     click: function($event) {
                       $event.stopPropagation();
                       $event.preventDefault();
                       return _vm.addItem($event)
                     }
                   }
                 },
                 [_vm._v("Add More")]
               )
             ])
           ])
         ])
       ])
     ])
   };
   var __vue_staticRenderFns__$d = [];
   __vue_render__$d._withStripped = true;

     /* style */
     const __vue_inject_styles__$d = undefined;
     /* scoped */
     const __vue_scope_id__$d = undefined;
     /* module identifier */
     const __vue_module_identifier__$d = undefined;
     /* functional template */
     const __vue_is_functional_template__$d = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$d = normalizeComponent(
       { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
       __vue_inject_styles__$d,
       __vue_script__$d,
       __vue_scope_id__$d,
       __vue_is_functional_template__$d,
       __vue_module_identifier__$d,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$e = Vue.extend({
       data: function () {
           return {
               tabPicked: this.schema.tabs[0],
           };
       },
       props: {
           model: Object,
           schema: Object,
           idSuffix: String,
       },
       methods: {
           getFieldType: function (field) {
               return "clarity-form-field-" + field.type;
           },
           getModelValue: function (field) {
               return this.model[field.model];
           },
           setModelValue: function (newValue, field) {
               this.model[field.model] = newValue;
               this.$emit("changed", this.model, this.schema);
           },
           buttonClicked: function (event, field) {
               this.$emit("click", event, field);
           },
           getSchema: function (field) {
               if (field.type.startsWith("complex")) {
                   if (field.schema.model === undefined) {
                       field.schema.model = field.model;
                   }
                   return field.schema;
               }
               return field;
           },
           tabChanged: function (pickedTab) {
               this.tabPicked = pickedTab;
           },
           getFields: function () {
               return this.tabPicked.fields;
           },
           getIDSuffix: function (field) {
               return this.idSuffix;
           },
       }
   });

   /* script */
   const __vue_script__$e = script$e;

   /* template */
   var __vue_render__$e = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c(
       "div",
       [
         _c(
           "clarity-tabs",
           {
             class: _vm.schema.tabClasses,
             attrs: { sections: _vm.schema.tabs },
             on: { "section-changed": _vm.tabChanged }
           },
           _vm._l(_vm.getFields(), function(item, index) {
             return _c(
               "div",
               { key: index },
               [
                 _c(_vm.getFieldType(item), {
                   tag: "component",
                   attrs: {
                     schema: _vm.getSchema(item),
                     model: _vm.getModelValue(item),
                     idSuffix: _vm.getIDSuffix(item)
                   },
                   on: { changed: _vm.setModelValue, click: _vm.buttonClicked }
                 })
               ],
               1
             )
           }),
           0
         )
       ],
       1
     )
   };
   var __vue_staticRenderFns__$e = [];
   __vue_render__$e._withStripped = true;

     /* style */
     const __vue_inject_styles__$e = undefined;
     /* scoped */
     const __vue_scope_id__$e = undefined;
     /* module identifier */
     const __vue_module_identifier__$e = undefined;
     /* functional template */
     const __vue_is_functional_template__$e = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$e = normalizeComponent(
       { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
       __vue_inject_styles__$e,
       __vue_script__$e,
       __vue_scope_id__$e,
       __vue_is_functional_template__$e,
       __vue_module_identifier__$e,
       false,
       undefined,
       undefined,
       undefined
     );

   var script$f = Vue.extend({
       props: {
           model: Object,
           schema: Object,
           idSuffix: String,
       },
       methods: {
           getFieldType: function (field) {
               return "clarity-form-field-" + field.type;
           },
           getModelValue: function (field) {
               return this.model[field.model];
           },
           setModelValue: function (newValue, field) {
               this.model[field.model] = newValue;
               this.$emit("changed", this.model, this.schema);
           },
           buttonClicked: function (event, field) {
               this.$emit("click", event, field);
           },
           getSchema: function (field) {
               if (field.type.startsWith("complex")) {
                   if (field.schema.model === undefined) {
                       field.schema.model = field.model;
                   }
                   return field.schema;
               }
               return field;
           },
           getIDSuffix: function (field) {
               return this.idSuffix;
           },
       }
   });

   /* script */
   const __vue_script__$f = script$f;

   /* template */
   var __vue_render__$f = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c(
       "div",
       _vm._l(_vm.schema.fields, function(item, index) {
         return _c(
           "div",
           { key: index },
           [
             _c(_vm.getFieldType(item), {
               tag: "component",
               attrs: {
                 schema: _vm.getSchema(item),
                 model: _vm.getModelValue(item),
                 idSuffix: _vm.getIDSuffix(item)
               },
               on: { changed: _vm.setModelValue, click: _vm.buttonClicked }
             })
           ],
           1
         )
       }),
       0
     )
   };
   var __vue_staticRenderFns__$f = [];
   __vue_render__$f._withStripped = true;

     /* style */
     const __vue_inject_styles__$f = undefined;
     /* scoped */
     const __vue_scope_id__$f = undefined;
     /* module identifier */
     const __vue_module_identifier__$f = undefined;
     /* functional template */
     const __vue_is_functional_template__$f = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$f = normalizeComponent(
       { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
       __vue_inject_styles__$f,
       __vue_script__$f,
       __vue_scope_id__$f,
       __vue_is_functional_template__$f,
       __vue_module_identifier__$f,
       false,
       undefined,
       undefined,
       undefined
     );

   Vue.component('clarity-form-field-complex', __vue_component__$f);
   Vue.component('clarity-form-field-complex-conditional', __vue_component__$c);
   Vue.component('clarity-form-field-complex-list', __vue_component__$d);
   Vue.component('clarity-form-field-complex-tabs', __vue_component__$e);
   Vue.component('clarity-form-field-input', __vue_component__$4);
   Vue.component('clarity-form-field-select', __vue_component__$5);
   Vue.component('clarity-form-field-checkbox', __vue_component__$6);
   Vue.component('clarity-form-field-radio', __vue_component__$7);
   Vue.component('clarity-form-field-textarea', __vue_component__$8);
   Vue.component('clarity-form-field-text', __vue_component__$9);
   Vue.component('clarity-form-field-upload', __vue_component__$a);
   Vue.component('clarity-form-field-buttons', __vue_component__$b);
   RegisterFilters$1();
   RegisterDirectives$1();
   var script$g = Vue.extend({
       components: {
           "clarity-form-field-complex": __vue_component__$f
       },
       props: {
           schema: Object,
           model: Object,
           action: {
               default: "",
               type: String,
           },
           ajaxAction: {
               default: "",
               type: String,
           },
       },
       methods: {
           revalidate: function () {
               return this.$refs.validation.revalidate();
           },
           setModelValue: function (newValue, field) {
               this.model = newValue;
               this.revalidate();
               this.$emit("changed", this.model);
           },
           buttonClicked: function (event, field) {
               this.revalidate();
               this.$emit("click", event, field);
           },
           reset: function () {
               var that = this;
               setTimeout(function () {
                   that.revalidate();
               }, 100);
           },
           submit: function (event) {
               if (!this.revalidate()) {
                   event.preventDefault();
                   return false;
               }
               if (this.ajaxAction) {
                   var that_1 = this;
                   Request.post(this.ajaxAction, this.model)
                       .onSuccess(function (x) {
                       that_1.$emit("success", x);
                   })
                       .onError(function (x) {
                       that_1.$emit("error", x);
                   })
                       .onException(function (x) {
                       that_1.$emit("exception", x);
                   })
                       .send();
                   event.preventDefault();
                   return false;
               }
               return true;
           },
           getIDSuffix: function () {
               return "";
           },
       },
       watch: {
           model: function (newModel, oldModel) {
               var _this = this;
               if (oldModel === newModel) {
                   return;
               }
               if (newModel !== null) {
                   this.$nextTick(function () {
                       _this.revalidate();
                   });
               }
           },
       }
   });

   /* script */
   const __vue_script__$g = script$g;

   /* template */
   var __vue_render__$g = function() {
     var _vm = this;
     var _h = _vm.$createElement;
     var _c = _vm._self._c || _h;
     return _c("div", {}, [
       _c(
         "form",
         {
           staticClass: "stacked",
           attrs: { action: _vm.action, method: "post" },
           on: { reset: _vm.reset, submit: _vm.submit }
         },
         [
           _c(
             "clarity-form-validator",
             { ref: "validation" },
             [
               _vm._t("validationHeader", [
                 _vm._v("The following errors were found")
               ])
             ],
             2
           ),
           _vm._v(" "),
           _c("clarity-form-field-complex", {
             attrs: {
               schema: _vm.schema,
               model: _vm.model,
               idSuffix: _vm.getIDSuffix()
             },
             on: { changed: _vm.setModelValue, click: _vm.buttonClicked }
           })
         ],
         1
       )
     ])
   };
   var __vue_staticRenderFns__$g = [];
   __vue_render__$g._withStripped = true;

     /* style */
     const __vue_inject_styles__$g = undefined;
     /* scoped */
     const __vue_scope_id__$g = undefined;
     /* module identifier */
     const __vue_module_identifier__$g = undefined;
     /* functional template */
     const __vue_is_functional_template__$g = false;
     /* style inject */
     
     /* style inject SSR */
     
     /* style inject shadow dom */
     

     
     const __vue_component__$g = normalizeComponent(
       { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
       __vue_inject_styles__$g,
       __vue_script__$g,
       __vue_scope_id__$g,
       __vue_is_functional_template__$g,
       __vue_module_identifier__$g,
       false,
       undefined,
       undefined,
       undefined
     );

   var Clarity = (function () {
       function Clarity() {
           var _this = this;
           this.hotkeys = new Hotkeys();
           this.router = new Router();
           this.validation = new FormValidation();
           this.errorLogger = new ErrorLogging();
           this.history = new PageHistory();
           this.localStorage = new LocalStorage();
           this.sessionStorage = new SessionStorage();
           this.request = new Request("", "");
           this.components = [new Closer(), new DropDown(), new Mobile()];
           window.addEventListener("keydown", function (x) { return _this.hotkeys.press(x); });
           window.addEventListener("load", function (x) { return _this.validation.initialize(); }, false);
           window.onerror = function (msg, url, ln, col, error) {
               _this.errorLogger.onError(msg.toString(), url, ln, col, error);
           };
           this.errorLogger.setLoggingFunction(function (message, stack) { console.log(message); });
           Vue.component('clarity-modal', __vue_component__);
           Vue.component('clarity-tabs', __vue_component__$1);
           Vue.component('clarity-grid', __vue_component__$2);
           Vue.component('clarity-form-validator', __vue_component__$3);
           Vue.component('clarity-form-generator', __vue_component__$g);
       }
       return Clarity;
   }());
   window.clarity = window.clarity || new Clarity();

   exports.BrowserUtils = BrowserUtils;
   exports.Clarity = Clarity;
   exports.RegisterDirectives = RegisterDirectives;
   exports.RegisterFilters = RegisterFilters;
   exports.Request = Request;

   Object.defineProperty(exports, '__esModule', { value: true });

})));
