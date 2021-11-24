/**
 * Bundle of clarity
 * Generated: 2021-11-24
 * Version: 2.0.0
 * License: Apache-2.0
 * Author: James Craig
 */

import Vue, { openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, createTextVNode, Fragment, renderList, withModifiers, toDisplayString, withDirectives, vModelText, createCommentVNode, vModelSelect, vModelDynamic, createStaticVNode, vShow, createBlock, resolveDynamicComponent, resolveComponent, createVNode, withCtx, Transition } from 'vue';
import moment from 'moment';
import showdown from 'showdown';

HTMLElement.prototype.getParentByClass = function (className) {
    let element = this.parentElement;
    while (element && !element.hasClass(className)) {
        element = element.parentElement;
    }
    return element;
};
HTMLElement.prototype.hasClass = function (className) {
    return (" " + this.className + " ").indexOf(" " + className + " ") > -1;
};
HTMLElement.prototype.replaceClass = function (originalClassName, newClassName) {
    let tempClassName = " " + this.className + " ";
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
HTMLElement.prototype.attribute = function (name, value = null) {
    if (value != null) {
        this.setAttribute(name, value);
        return value;
    }
    return this.getAttribute(name);
};

NodeList.prototype.map = function (callback) {
    let ReturnValues = [];
    for (let x = 0; x < this.length; ++x) {
        ReturnValues = ReturnValues.concat(callback(this[x]));
    }
    return ReturnValues;
};
NodeList.prototype.filter = function (callback) {
    let ReturnValues = [];
    for (let x = 0; x < this.length; ++x) {
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
            let to = Object(target);
            for (let index = 1; index < arguments.length; index++) {
                let nextSource = arguments[index];
                if (nextSource != null) {
                    for (let nextKey in nextSource) {
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
String.prototype.stripHTML = function () {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = this;
    return (tempDiv.textContent || tempDiv.innerText || "").replace(/^\s+|\s+$/g, "");
};
String.prototype.toNumber = function () {
    if (this == null)
        return 0;
    return parseFloat(this.stripHTML().replace(/[^0-9.-]/g, ""));
};

class Globals {
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

class Keypress {
    constructor(keys) {
        this.keys = this.getKeys(keys);
    }
    getKeys(keyCode) {
        return keyCode.toUpperCase().split(/-(?!$)/).map(x => Globals.keyMappings[x] || x.charCodeAt(0));
    }
    isPressed(keyCode) {
        let keysPressed = keyCode;
        if (keysPressed.length !== this.keys.length) {
            return false;
        }
        for (let x = 0; x < keysPressed.length; ++x) {
            if (this.keys.indexOf(keysPressed[x]) === -1) {
                return false;
            }
        }
        return true;
    }
}

class Sequence {
    constructor(keyCodes, callback) {
        this.keyCodeSequence = keyCodes.toUpperCase();
        this.keyCodes = keyCodes.toUpperCase().split(" ").map(x => new Keypress(x));
        this.callback = callback;
        this.length = this.keyCodes.length;
        this.isDefault = "<*>" === keyCodes;
    }
    call(keyCodes, event, scope) {
        this.callback(event, { scope: scope, keysPressed: keyCodes });
        return true;
    }
    press(keyCodes, event, scope) {
        let individualCodes = keyCodes;
        if (individualCodes.length !== this.length) {
            return false;
        }
        for (let x = 0; x < this.keyCodes.length; ++x) {
            if (!this.keyCodes[x].isPressed(individualCodes[x])) {
                return false;
            }
        }
        return this.call(keyCodes, event, scope);
    }
    isPartial(keyCodes) {
        let individualCodes = keyCodes;
        if (individualCodes.length > this.length) {
            return false;
        }
        for (let x = 0; x < individualCodes.length; ++x) {
            if (!this.keyCodes[x].isPressed(individualCodes[x])) {
                return false;
            }
        }
        return true;
    }
}

class Scope {
    constructor(name) {
        this.name = name;
        this.sequences = [];
    }
    press(keyCodes, event) {
        this.sequences = this.sequences.sort((x, y) => x.length > y.length ? 1 : -1);
        for (let x = 0; x < this.sequences.length; ++x) {
            if (this.sequences[x].press(keyCodes, event, this)) {
                return true;
            }
        }
        return false;
    }
    callDefault(keyCodes, event) {
        let defaultItems = this.sequences.filter(x => x.isDefault);
        if (defaultItems.length === 0) {
            return false;
        }
        return defaultItems[0].call(keyCodes, event, this);
    }
    isPartial(keyCodes) {
        for (let x = 0; x < this.sequences.length; ++x) {
            if (this.sequences[x].isPartial(keyCodes)) {
                return true;
            }
        }
        return false;
    }
    addSequence(keyCodes, callback) {
        this.removeSequence(keyCodes);
        this.sequences.push(new Sequence(keyCodes, callback));
        return this;
    }
    removeSequence(keyCodes) {
        this.sequences = this.sequences.filter(x => x.keyCodeSequence !== keyCodes.toUpperCase());
        return this;
    }
    clear() {
        this.sequences = [];
        return this;
    }
}

class Hotkeys {
    constructor() {
        this.scopes = {};
        this.scopes["Default"] = new Scope("Default");
        this.currentScope = this.scopes["Default"];
        this.filter = x => {
            let tagName = (x.target || x.srcElement).tagName;
            return tagName !== "INPUT"
                && tagName !== "SELECT"
                && tagName !== "TEXTAREA";
        };
        this.latestKeys = [];
    }
    setScope(name) {
        let scope = this.addScope(name);
        this.currentScope = scope;
        return scope;
    }
    addScope(name) {
        let tempScope = this.scopes[name];
        if (tempScope !== undefined) {
            return tempScope;
        }
        tempScope = new Scope(name);
        this.scopes[name] = tempScope;
        return tempScope;
    }
    removeScope(name) {
        this.scopes[name] = undefined;
        if (name === "Default") {
            this.scopes["Default"] = new Scope("Default");
        }
        if (this.currentScope.name === name) {
            this.currentScope = this.scopes["Default"];
        }
        return this;
    }
    clear() {
        this.scopes = {};
        this.scopes["Default"] = new Scope("Default");
        this.currentScope = this.scopes["Default"];
        this.latestKeys = [];
        return this;
    }
    bind(keyCodes, callback) {
        this.currentScope.addSequence(keyCodes, callback);
        return this;
    }
    unbind(keyCodes) {
        this.currentScope.removeSequence(keyCodes);
        return this;
    }
    press(event) {
        if (!(this.filter(event))) {
            return;
        }
        let currentKey = this.getKeys(event);
        this.latestKeys.push(currentKey);
        let tempArray = this.latestKeys.slice();
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
    }
    getKeys(event) {
        let returnValue = [];
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
    }
}

class StringDictionary {
}

class PathPart {
    constructor(part, defaultValues) {
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
    isMatch(part) {
        if (part === undefined || part === null) {
            return this.optional;
        }
        part = part;
        if (this.variable) {
            return this.optional || part !== '';
        }
        return this.optional || part.toUpperCase() === this.part.toUpperCase();
    }
    getValue(part) {
        if (!this.variable) {
            return part || this.defaultValue;
        }
        if (part !== undefined) {
            return part || this.defaultValue;
        }
        else {
            return this.defaultValue;
        }
    }
    setValue(part, parameters) {
        this.getValue(part);
        parameters[this.part] = this.getValue(part);
    }
}

class QueryPart {
    constructor(part, defaultValues) {
        let tempParts = part.split("=", 2);
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
    isMatch(part) {
        if (part === undefined || part === null) {
            return false;
        }
        let tempParts = part.split("=", 2);
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
    }
    getValue(part) {
        if (part === undefined || part === null) {
            return this.defaultValue;
        }
        let tempParts = part.split("=", 2);
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
    }
    setValue(part, parameters) {
        this.getValue(part);
        parameters[this.key] = this.getValue(part);
    }
}

class HashPart {
    constructor(part, defaultValues) {
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
    isMatch(part) {
        if (part === undefined || part === null) {
            return this.optional;
        }
        part = part.replace(/[#!]/g, "");
        if (this.variable) {
            return this.optional || part !== "";
        }
        return this.optional || part.toUpperCase() === this.part.toUpperCase();
    }
    getValue(part) {
        if (!this.variable) {
            return part || this.defaultValue;
        }
        if (part !== undefined) {
            return part || this.defaultValue;
        }
        else {
            return this.defaultValue;
        }
    }
    setValue(part, parameters) {
        part = part ? part : "";
        part = part.replace(/[#!]/g, "");
        parameters[this.part] = this.getValue(part);
    }
}

class Route {
    constructor(url, callback, defaultValues) {
        if (defaultValues === undefined) {
            defaultValues = new StringDictionary();
        }
        this.url = this.fixUrl(url);
        this.pathParts = this.getPathParts(this.url).map(x => new PathPart(x, defaultValues));
        this.pathParts = this.pathParts ? this.pathParts : [];
        this.queryParts = this.getQueryParts(this.url).map(x => new QueryPart(x, defaultValues));
        this.queryParts = this.queryParts ? this.queryParts : [];
        this.hashParts = this.getHashParts(this.url).map(x => new HashPart(x, defaultValues));
        this.hashParts = this.hashParts ? this.hashParts : [];
        this.callbacks = [callback];
        this.defaultValues = defaultValues;
    }
    isRoute(url) {
        return this.url === this.fixUrl(url);
    }
    addCallback(callback) {
        this.callbacks.push(callback);
    }
    removeCallback(callback) {
        this.callbacks = this.callbacks.filter(x => x !== callback);
    }
    fixUrl(url) {
        if (!url.length) {
            return url;
        }
        return url.replace(/^\//, "").replace(/\/+/g, "/").replace(/^\/|\/($|\?)/, "").replace(/\/\#/g, "#");
    }
    getPathParts(url) {
        return url.split("?", 2)[0].split("#", 2)[0].split("/");
    }
    getHashParts(url) {
        let urlSplit = url.split("?", 2)[0].split("#", 2);
        return (urlSplit.length < 2) ? [] : [urlSplit[1].replace("!", "")];
    }
    getQueryParts(url) {
        let urlSplit = url.split("?", 2);
        if (urlSplit.length < 2) {
            return [];
        }
        url = urlSplit[1];
        return url ? url.split("&") : [];
    }
    getParametersFromUrl(pathParts, queryParts, hashParts) {
        let parameters = new StringDictionary();
        for (let x = 0; x < pathParts.length; ++x) {
            this.pathParts[x].setValue(pathParts[x], parameters);
        }
        for (let x = 0; x < queryParts.length; ++x) {
            this.queryParts[x].setValue(queryParts[x], parameters);
        }
        for (let x = 0; x < hashParts.length; ++x) {
            this.hashParts[x].setValue(hashParts[x], parameters);
        }
        if (this.pathParts.length > pathParts.length) {
            for (let x = pathParts.length; x < this.pathParts.length; ++x) {
                this.pathParts[x].setValue("", parameters);
            }
        }
        if (this.queryParts.length > queryParts.length) {
            for (let x = queryParts.length; x < this.queryParts.length; ++x) {
                this.queryParts[x].setValue("", parameters);
            }
        }
        if (this.hashParts.length > hashParts.length) {
            for (let x = hashParts.length; x < this.hashParts.length; ++x) {
                this.hashParts[x].setValue("", parameters);
            }
        }
        return parameters;
    }
    isMatch(pathParts, queryParts, hashParts) {
        if (this.pathParts.length < pathParts.length) {
            return false;
        }
        for (let x = 0; x < pathParts.length; ++x) {
            if (!this.pathParts[x].isMatch(pathParts[x])) {
                return false;
            }
        }
        if (this.pathParts.length > pathParts.length) {
            for (let x = pathParts.length; x < this.pathParts.length; ++x) {
                if (!this.pathParts[x].isMatch("")) {
                    return false;
                }
            }
        }
        if (this.queryParts.length < queryParts.length) {
            return false;
        }
        for (let x = 0; x < queryParts.length; ++x) {
            if (!this.queryParts[x].isMatch(queryParts[x])) {
                return false;
            }
        }
        if (this.queryParts.length > queryParts.length) {
            for (let x = queryParts.length; x < this.queryParts.length; ++x) {
                if (!this.queryParts[x].isMatch("")) {
                    return false;
                }
            }
        }
        if (this.hashParts.length < hashParts.length) {
            return false;
        }
        for (let x = 0; x < hashParts.length; ++x) {
            if (!this.hashParts[x].isMatch(hashParts[x])) {
                return false;
            }
        }
        if (this.hashParts.length > hashParts.length) {
            for (let x = hashParts.length; x < this.hashParts.length; ++x) {
                if (!this.hashParts[x].isMatch("")) {
                    return false;
                }
            }
        }
        return true;
    }
    run(url) {
        url = this.fixUrl(url);
        let pathParts = this.getPathParts(url);
        let queryParts = this.getQueryParts(url);
        let hashParts = this.getHashParts(url);
        if (!this.isMatch(pathParts, queryParts, hashParts)) {
            return false;
        }
        let parameters = this.getParametersFromUrl(pathParts, queryParts, hashParts);
        parameters["url"] = url;
        this.callbacks.forEach(x => x(parameters));
        return true;
    }
}

class Router {
    constructor() {
        this.routes = [];
    }
    map(route) {
        for (let x = 0; x < route.length; ++x) {
            this.addRoute(route[x].url, route[x].action, route[x].defaultValues);
        }
    }
    addRoute(url, callback, defaultValues) {
        let routes = this.routes.filter(x => x.isRoute(url));
        if (routes.length === 0) {
            this.routes.push(new Route(url, callback, defaultValues));
        }
        else {
            routes[0].addCallback(callback);
        }
        return this;
    }
    run(url) {
        for (let x = 0; x < this.routes.length; ++x) {
            if (this.routes[x].run(url)) {
                return true;
            }
        }
        return false;
    }
}

class FormValidation {
    constructor() {
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
    initialize() {
        let inputElements = this.map(document.getElementsByTagName("input"), x => x).filter(x => x.willValidate);
        for (let x = 0; x < inputElements.length; ++x) {
            if (inputElements[x].type.toUpperCase() === "RADIO"
                || inputElements[x].type.toUpperCase() === "CHECKBOX") {
                inputElements[x].addEventListener("change", y => this.inputHandler(y.target));
            }
            else {
                inputElements[x].addEventListener("input", y => this.inputHandler(y.target));
            }
            inputElements[x].addEventListener("invalid", y => this.invalidInputHandler(y.target));
        }
        let textAreaElements = this.map(document.getElementsByTagName("textarea"), x => x).filter(x => x.willValidate);
        for (let x = 0; x < textAreaElements.length; ++x) {
            textAreaElements[x].addEventListener("change", y => this.textAreaHandler(y.target));
            textAreaElements[x].addEventListener("invalid", y => this.invalidTextAreaHandler(y.target));
        }
        let selectElements = this.map(document.getElementsByTagName("select"), x => x).filter(x => x.willValidate);
        for (let x = 0; x < selectElements.length; ++x) {
            selectElements[x].addEventListener("change", y => this.selectHandler(y.target));
            selectElements[x].addEventListener("invalid", y => this.invalidSelectHandler(y.target));
        }
    }
    map(elements, callback) {
        let ReturnValues = [];
        for (let x = 0; x < elements.length; ++x) {
            ReturnValues = ReturnValues.concat(callback(elements[x]));
        }
        return ReturnValues;
    }
    filter(elements, callback) {
        let ReturnValues = [];
        for (let x = 0; x < elements.length; ++x) {
            if (callback(elements[x])) {
                ReturnValues = ReturnValues.concat(elements[x]);
            }
        }
        return ReturnValues;
    }
    initializeForm(form) {
        if (form == null) {
            return;
        }
        let inputElements = this.map(form.getElementsByTagName("input"), x => x).filter(x => x.willValidate);
        for (let x = 0; x < inputElements.length; ++x) {
            if (inputElements[x].type.toUpperCase() === "RADIO"
                || inputElements[x].type.toUpperCase() === "CHECKBOX") {
                inputElements[x].addEventListener("change", y => this.inputHandler(y.target));
            }
            else {
                inputElements[x].addEventListener("input", y => this.inputHandler(y.target));
            }
            inputElements[x].addEventListener("invalid", y => this.invalidInputHandler(y.target));
        }
        let textAreaElements = this.map(form.getElementsByTagName("textarea"), x => x).filter(x => x.willValidate);
        for (let x = 0; x < textAreaElements.length; ++x) {
            textAreaElements[x].addEventListener("change", y => this.textAreaHandler(y.target));
            textAreaElements[x].addEventListener("invalid", y => this.invalidTextAreaHandler(y.target));
        }
        let selectElements = this.map(form.getElementsByTagName("select"), x => x).filter(x => x.willValidate);
        for (let x = 0; x < selectElements.length; ++x) {
            selectElements[x].addEventListener("change", y => this.selectHandler(y.target));
            selectElements[x].addEventListener("invalid", y => this.invalidSelectHandler(y.target));
        }
    }
    invalidInputHandler(input) {
        if (!input.validity.valid) {
            let errorMessages = this.getErrorMessages(input, input.validity);
            if (errorMessages.length > 0) {
                input.setCustomValidity(errorMessages.join("\n"));
            }
        }
    }
    invalidTextAreaHandler(textarea) {
        if (!textarea.validity.valid) {
            let errorMessages = this.getErrorMessages(textarea, textarea.validity);
            if (errorMessages.length > 0) {
                textarea.setCustomValidity(errorMessages.join("\n"));
            }
        }
    }
    invalidSelectHandler(select) {
        if (!select.validity.valid) {
            let errorMessages = this.getErrorMessages(select, select.validity);
            if (errorMessages.length > 0) {
                select.setCustomValidity(errorMessages.join("\n"));
            }
        }
    }
    inputHandler(input) {
        if (input.type.toUpperCase() === "RADIO") {
            let radioGroup = document.getElementsByName(input.name).map(x => x);
            for (let x = 0; x < radioGroup.length; ++x) {
                radioGroup[x].setCustomValidity("");
            }
        }
        else {
            input.setCustomValidity("");
        }
        input.checkValidity();
    }
    textAreaHandler(textarea) {
        textarea.setCustomValidity("");
        textarea.checkValidity();
    }
    selectHandler(select) {
        select.setCustomValidity("");
        select.checkValidity();
    }
    validate() {
        let result = true;
        this.errors = [];
        let inputElements = this.filter(document.getElementsByTagName("input"), x => !this.validateInput(x));
        result = result && inputElements.length === 0;
        let selectElements = this.filter(document.getElementsByTagName("select"), x => !this.validateSelect(x));
        result = result && selectElements.length === 0;
        let textareaElements = this.filter(document.getElementsByTagName("textarea"), x => !this.validateTextArea(x));
        result = result && textareaElements.length === 0;
        return result;
    }
    validateForm(form) {
        if (form == null) {
            return [];
        }
        let result = [];
        this.errors = [];
        let inputElements = this.filter(form.getElementsByTagName("input"), x => !this.validateInput(x))
            .map(x => this.getErrorMessages(x, x.validity))
            .filter(x => x.length !== 0);
        for (let x = 0; x < inputElements.length; ++x) {
            result = result.concat(inputElements[x]);
        }
        let selectElements = this.filter(form.getElementsByTagName("select"), x => !this.validateSelect(x))
            .map(x => this.getErrorMessages(x, x.validity))
            .filter(x => x.length !== 0);
        for (let x = 0; x < selectElements.length; ++x) {
            result = result.concat(selectElements[x]);
        }
        let textareaElements = this.filter(form.getElementsByTagName("textarea"), x => !this.validateTextArea(x))
            .map(x => this.getErrorMessages(x, x.validity))
            .filter(x => x.length !== 0);
        for (let x = 0; x < textareaElements.length; ++x) {
            result = result.concat(textareaElements[x]);
        }
        return result;
    }
    validateElement(element) {
        if (element == null) {
            return [];
        }
        let result = [];
        if (element.tagName === "INPUT" && !this.validateInput(element)) {
            let tempResults = this.getErrorMessages(element, element.validity)
                .filter(x => x.length !== 0);
            for (let x = 0; x < tempResults.length; ++x) {
                result = result.concat(tempResults[x]);
            }
        }
        else if (element.tagName === "SELECT" && !this.validateSelect(element)) {
            let tempResults = this.getErrorMessages(element, element.validity)
                .filter(x => x.length !== 0);
            for (let x = 0; x < tempResults.length; ++x) {
                result = result.concat(tempResults[x]);
            }
        }
        else if (element.tagName === "TEXTAREA" && !this.validateTextArea(element)) {
            let tempResults = this.getErrorMessages(element, element.validity)
                .filter(x => x.length !== 0);
            for (let x = 0; x < tempResults.length; ++x) {
                result = result.concat(tempResults[x]);
            }
        }
        return result;
    }
    validateSelect(select) {
        if (!select.checkValidity()) {
            let tempValue = this.getErrorMessages(select, select.validity);
            if (tempValue.length !== 0) {
                this.errors = this.errors.concat(tempValue);
            }
            return false;
        }
        return true;
    }
    validateTextArea(textarea) {
        if (!textarea.checkValidity()) {
            let tempValue = this.getErrorMessages(textarea, textarea.validity);
            if (tempValue.length !== 0) {
                this.errors = this.errors.concat(tempValue);
            }
            return false;
        }
        return true;
    }
    getErrorMessages(element, validity) {
        let tempValue = [];
        for (let key in this.messageAttributes) {
            if (validity[key]) {
                let message = element.attribute(this.messageAttributes[key]);
                if (message !== null) {
                    tempValue = tempValue.concat(message);
                }
            }
        }
        if (tempValue.length === 0) {
            let generalMessage = element.attribute("data-error-message");
            if (generalMessage !== null) {
                tempValue = tempValue.concat(generalMessage);
            }
            else {
                tempValue = tempValue.concat(element.validationMessage);
            }
        }
        return tempValue;
    }
    validateInput(input) {
        if (!input.checkValidity()) {
            let tempValue = this.getErrorMessages(input, input.validity);
            if (tempValue.length !== 0) {
                this.errors = this.errors.concat(tempValue);
            }
            return false;
        }
        return true;
    }
}

class Signature {
    constructor() {
        this.params = [];
    }
    toString() {
        let params = this.params.length > 0
            ? "'" + this.params.join("', '") + "'"
            : "";
        return this.name + "(" + params + ")";
    }
}

Function.prototype.trace = function () {
    var trace = [];
    var curr = this;
    while (curr) {
        trace.push(curr.signature());
        curr = curr.caller;
    }
    return trace;
};
Function.prototype.signature = function () {
    var signature = new Signature();
    signature.name = this.getName();
    if (this.arguments) {
        for (var i = 0; i < this.arguments.length; i++) {
            signature.params.push(this.arguments[i]);
        }
    }
    return signature;
};
Function.prototype.getName = function () {
    if (this.name) {
        return this.name;
    }
    var definition = this.toString().split("\n")[0];
    var exp = /^function ([^\s(]+).+/;
    if (exp.test(definition)) {
        return definition.split("\n")[0].replace(exp, "$1") || "anonymous";
    }
    return "anonymous";
};

class ErrorLogging {
    constructor() {
        this.logError = (ex, stack) => { };
    }
    setLoggingFunction(logger) {
        this.logError = logger;
    }
    onError(message, filename, lineno, colno, error) {
        var _a;
        this.logError(message, (_a = error === null || error === void 0 ? void 0 : error.stack) !== null && _a !== void 0 ? _a : "");
    }
}

class PageHistory {
    back(delta) {
        if (delta === undefined) {
            delta = 1;
        }
        window.history.go(-1 * delta);
    }
    forward(delta) {
        if (delta === undefined) {
            delta = 1;
        }
        window.history.go(delta);
    }
    push(state, url, title) {
        window.history.pushState(state, title, url);
    }
    replace(state, url, title) {
        window.history.replaceState(state, title, url);
    }
    get state() {
        return window.history.state;
    }
    get length() {
        return window.history.length;
    }
}

class LocalStorage {
    set(key, value) {
        localStorage.setItem(key, value);
    }
    setObject(key, value) {
        this.set(key, JSON.stringify(value));
    }
    get(key, defaultValue = "") {
        return localStorage.getItem(key) || defaultValue;
    }
    has(key) {
        return this.get(key, null) !== null;
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
    get length() {
        return localStorage.length;
    }
    key(index) {
        return localStorage.key(index);
    }
    getObject(key, defaultValue = null) {
        let value = this.get(key);
        return (value && JSON.parse(value)) || defaultValue;
    }
}

class SessionStorage {
    set(key, value) {
        sessionStorage.setItem(key, value);
    }
    setObject(key, value) {
        this.set(key, JSON.stringify(value));
    }
    get(key, defaultValue = "") {
        return sessionStorage.getItem(key) || defaultValue;
    }
    has(key) {
        return this.get(key, null) !== null;
    }
    remove(key) {
        sessionStorage.removeItem(key);
    }
    clear() {
        sessionStorage.clear();
    }
    get length() {
        return sessionStorage.length;
    }
    key(index) {
        return sessionStorage.key(index);
    }
    getObject(key, defaultValue = null) {
        let value = this.get(key);
        return (value && JSON.parse(value)) || defaultValue;
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class DatabaseConnection {
    constructor(dbName, tables, version) {
        this.DBName = dbName;
        this.Version = version;
        let request = indexedDB.open(dbName, version);
        request.onupgradeneeded = (ev) => {
            this.database = ev.target.result;
            for (let x = 0; x < tables.length; ++x) {
                let table = tables[x];
                if (this.database.objectStoreNames.contains(table)) {
                    this.database.deleteObjectStore(table);
                }
                this.database.createObjectStore(table);
            }
        };
        request.onsuccess = (ev) => {
            this.database = ev.target.result;
        };
    }
    openDatabase(onsuccess) {
        let request = indexedDB.open(this.DBName, this.Version);
        request.onsuccess = (ev) => {
            this.database = ev.target.result;
            return onsuccess(this);
        };
    }
    add(table, obj, key) {
        this.database.transaction(table, "readwrite").objectStore(table).put(obj, key);
    }
    remove(table, key) {
        this.database.transaction(table, "readwrite").objectStore(table).delete(key);
    }
    getByKey(table, key, onSuccess) {
        let req = this.database.transaction(table, "readwrite").objectStore(table).get(key);
        req.onsuccess = onSuccess;
    }
    getKeys(table, onSuccess) {
        let req = this.database.transaction(table, "readwrite").objectStore(table).getAllKeys();
        req.onsuccess = onSuccess;
    }
    get(table, query, onSuccess) {
        let req = this.database.transaction(table, "readwrite").objectStore(table).get(query);
        req.onsuccess = onSuccess;
    }
    getAll(table, onSuccess, query) {
        let req = this.database.transaction(table, "readwrite").objectStore(table).getAll(query);
        req.onsuccess = onSuccess;
    }
}

class Request {
    constructor(method, url, data) {
        this.url = url;
        this.method = method.toUpperCase();
        this.data = data;
        this.headers = new Headers();
        if (this.method !== "GET" &&
            this.method !== "HEAD" &&
            this.method !== "DELETE" &&
            this.method !== "TRACE") {
            this.type("application/json");
        }
        this.accept("application/json");
        this.parser = x => x.json();
        this.serializer = x => JSON.stringify(x);
        this.storageMode = StorageMode.NetworkOnly;
        this.databaseName = "ClarityStorage";
        this.cacheKey = this.url + this.serializer(this.data);
        this.credentials = "same-origin";
    }
    static get(url, data) {
        return Request.makeRequest("GET", url, data);
    }
    static makeRequest(method, url, data) {
        return new Request(method, url, data);
    }
    static post(url, data) {
        return Request.makeRequest("POST", url, data);
    }
    static put(url, data) {
        return Request.makeRequest("PUT", url, data);
    }
    static delete(url, data) {
        return Request.makeRequest("DELETE", url, data);
    }
    onSuccess(callback) {
        this.success = callback;
        return this;
    }
    onError(callback) {
        this.error = callback;
        return this;
    }
    setHeader(key, value) {
        this.headers.set(key, value);
        return this;
    }
    setCacheKey(key) {
        this.cacheKey = key;
        return this;
    }
    setCredentials(type) {
        this.credentials = type;
        return this;
    }
    type(value) {
        return this.setHeader("Content-Type", value);
    }
    accept(value) {
        return this.setHeader("Accept", value);
    }
    setParser(parser) {
        this.parser = parser;
        return this;
    }
    setMode(storageMode, databaseName = "ClarityStorage") {
        this.databaseName = databaseName;
        this.storageMode = storageMode;
        return this;
    }
    setSerializer(serializer) {
        this.serializer = serializer;
        return this;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.error == null) {
                this.error = x => { };
            }
            if (this.success == null) {
                this.success = x => { };
            }
            let serializedData = this.serializer(this.data);
            if (this.storageMode === StorageMode.StorageFirst) {
                Request.returnValueFromDB(this.cacheKey, this.databaseName, this.success);
                this.queryNetwork(serializedData, this.cacheKey, this.databaseName, response => { }, response => {
                    Request.saveValueToDB(response, this.cacheKey, this.databaseName);
                });
                yield Promise.resolve("A");
            }
            if (this.storageMode === StorageMode.StorageAndUpdate) {
                Request.returnValueFromDB(this.cacheKey, this.databaseName, this.success);
                this.queryNetwork(serializedData, this.cacheKey, this.databaseName, response => { }, response => {
                    Request.saveValueToDB(response, this.cacheKey, this.databaseName);
                    this.success(response);
                });
                return;
            }
            if (this.storageMode === StorageMode.NetworkFirst) {
                this.queryNetwork(serializedData, this.cacheKey, this.databaseName, this.success, response => {
                    Request.saveValueToDB(response, this.cacheKey, this.databaseName);
                    this.success(response);
                });
                return;
            }
            this.queryNetwork(serializedData, this.cacheKey, this.databaseName, x => { }, this.success);
        });
    }
    static saveValueToDB(data, dataKey, databaseName) {
        new DatabaseConnection(databaseName, ["cache", "cacheExpirations"], 1)
            .openDatabase(database => {
            if (data === undefined) {
                return;
            }
            database.add("cache", data, dataKey);
            database.add("cacheExpirations", Date.now(), dataKey);
        });
    }
    queryNetwork(serializedData, dataKey, databaseName, offlineCallback, onlineCallback) {
        if (!navigator.onLine) {
            if (this.storageMode === StorageMode.NetworkFirst) {
                Request.returnValueFromDB(dataKey, databaseName, offlineCallback);
            }
            return;
        }
        fetch(this.url, {
            credentials: this.credentials,
            method: this.method,
            body: serializedData,
            headers: this.headers
        })
            .then(this.parser)
            .then(onlineCallback)
            .catch(this.error);
    }
    static returnValueFromDB(dataKey, databaseName, callback) {
        new DatabaseConnection(databaseName, ["cache", "cacheExpirations"], 1)
            .openDatabase(database => {
            database.getByKey("cache", dataKey, event => {
                let result = event.target.result;
                if (result === undefined) {
                    return;
                }
                callback(result);
            });
        });
    }
}
var StorageMode;
(function (StorageMode) {
    StorageMode[StorageMode["NetworkFirst"] = 0] = "NetworkFirst";
    StorageMode[StorageMode["StorageFirst"] = 1] = "StorageFirst";
    StorageMode[StorageMode["NetworkOnly"] = 2] = "NetworkOnly";
    StorageMode[StorageMode["StorageAndUpdate"] = 3] = "StorageAndUpdate";
})(StorageMode || (StorageMode = {}));

function SetupPolyfills() {
    if (!String.prototype.startsWith) {
        Object.defineProperty(String.prototype, 'startsWith', {
            value: function (search, rawPos) {
                var pos = rawPos > 0 ? rawPos | 0 : 0;
                return this.substring(pos, pos + search.length) === search;
            }
        });
    }
    if (!String.prototype.replaceAll) {
        Object.defineProperty(String.prototype, 'replaceAll', {
            value: function (search, replace) {
                return this.replace(new RegExp(search, 'g'), replace);
            }
        });
    }
    Array.prototype.find = Array.prototype.find || function (callback) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        else if (typeof callback !== 'function') {
            throw new TypeError('callback must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        for (var i = 0; i < length; i++) {
            var element = list[i];
            if (callback.call(thisArg, element, i, list)) {
                return element;
            }
        }
    };
    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function (search, this_len) {
            if (this_len === undefined || this_len > this.length) {
                this_len = this.length;
            }
            return this.substring(this_len - search.length, this_len) === search;
        };
    }
}

class BrowserUtils {
    static get domain() {
        return window.location.protocol + "//" + window.location.host + "/";
    }
    static get isLocal() {
        return (/^https?:\/\/localhost:\d{1,5}\/$/).test(BrowserUtils.domain);
    }
    static GetQueryString(field) {
        let href = window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var string = reg.exec(href);
        return string ? string[1] : null;
    }
    static get HashBang() {
        return window.location.hash.replace("#!", "");
    }
    static get Id() {
        return window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    }
}

class Downloader {
    static exportData(data, columns, fileName = BrowserUtils.Id, type = FileTypes.CSV) {
        if (data.length == 0) {
            return;
        }
        fileName = fileName || BrowserUtils.Id;
        let returnValue = "";
        if (type === FileTypes.CSV) {
            returnValue = this.exportCSV(data, columns, fileName);
        }
        else {
            returnValue = data.join(",");
        }
        this.download(returnValue, fileName);
    }
    static capitalize(str) {
        if (!str) {
            return "";
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    static exportCSV(data, columns, fileName) {
        var _a, _b;
        let returnValue = "";
        let columnNames = Object.keys(data[0]);
        let splitter = "";
        for (let z = 0; z < columnNames.length; ++z) {
            let columnName = columnNames[z];
            let actualName = columns.filter(function (column) {
                return column.property === columnName;
            });
            if (actualName.length === 0) {
                actualName = [{ display: columnName, property: columnName }];
            }
            let header = ((_a = actualName[0]) === null || _a === void 0 ? void 0 : _a.display) || ((_b = actualName[0]) === null || _b === void 0 ? void 0 : _b.property) || columnName;
            returnValue += splitter + "\"" + this.capitalize(header) + "\"";
            splitter = ",";
        }
        returnValue += "\n";
        for (let x = 0; x < data.length; ++x) {
            let row = data[x];
            let columns = Object.keys(row);
            splitter = "";
            for (let y = 0; y < columns.length; ++y) {
                returnValue += splitter + "\"" + row[columns[y]].replaceAll("\"", "'") + "\"";
                splitter = ",";
            }
            returnValue += "\n";
        }
        return returnValue;
    }
    static download(data, fileName) {
        if (data == null) {
            return;
        }
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(new Blob([data]), fileName);
            return;
        }
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}
var FileTypes;
(function (FileTypes) {
    FileTypes[FileTypes["CSV"] = 0] = "CSV";
})(FileTypes || (FileTypes = {}));

var script$k = Vue.defineComponent({
    data() {
        return {};
    },
    methods: {
        closeModal: function () {
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

const _hoisted_1$i = /*#__PURE__*/createTextVNode("Header");
const _hoisted_2$d = { class: "body" };
const _hoisted_3$c = /*#__PURE__*/createTextVNode("Body");
const _hoisted_4$8 = /*#__PURE__*/createElementVNode("br", { class: "clear" }, null, -1 /* HOISTED */);

function render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass({'clarity-modal': true, 'show': _ctx.showModal})
  }, [
    createElementVNode("div", {
      class: normalizeClass(['panel', _ctx.cssClasses])
    }, [
      createElementVNode("header", null, [
        renderSlot(_ctx.$slots, "header", {}, () => [
          _hoisted_1$i
        ])
      ]),
      createElementVNode("div", _hoisted_2$d, [
        renderSlot(_ctx.$slots, "body", {}, () => [
          _hoisted_3$c
        ])
      ]),
      createElementVNode("footer", null, [
        renderSlot(_ctx.$slots, "footer", {}, () => [
          createElementVNode("input", {
            type: "button",
            class: "close right",
            value: "Close",
            onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.closeModal && _ctx.closeModal(...args)))
          }),
          _hoisted_4$8
        ])
      ])
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

script$k.render = render$k;
script$k.__file = "src/ts/Component/Modal/ClarityModal.vue";

var script$j = Vue.defineComponent({
    methods: {
        findTab: function (tabName) {
            if (!this.sections || this.sections.length === 0) {
                return null;
            }
            if (!tabName) {
                tabName = this.sections[0].name;
            }
            return this.sections.filter((x) => x.name === tabName)[0];
        },
        switchSelected: function (item) {
            this.sectionPicked = this.findTab(item);
            this.switchTabs();
            this.$emit("section-changed", this.sectionPicked);
        },
        switchTabs: function () {
            if (!this.sections || this.sections.length === 0) {
                return;
            }
            if (!this.sections.some((x) => x === this.sectionPicked)) {
                this.sectionPicked = this.sections[0];
            }
            if (!this.sectionPicked) {
                return;
            }
            for (let x = 0; x < this.sections.length; ++x) {
                this.sections[x].selected = false;
            }
            this.sectionPicked.selected = true;
        },
    },
    props: {
        initialSectionPicked: {
            type: Object,
            default: {}
        },
        sections: {
            type: Array,
            default: []
        }
    },
    watch: {
        sections: function (value) {
            this.switchSelected(this.sectionPicked);
        },
        initialSectionPicked: function (value) {
            this.switchSelected(this.initialSectionPicked);
        }
    },
    data() {
        return {
            sectionPicked: this.findTab(this.initialSectionPicked),
        };
    },
    beforeMount: function () {
        this.switchSelected(this.initialSectionPicked);
    }
});

const _hoisted_1$h = { class: "clarity-tabs" };
const _hoisted_2$c = { class: "row flex align-items-stretch" };
const _hoisted_3$b = ["onClick"];

function render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$h, [
    createElementVNode("header", null, [
      createElementVNode("ul", _hoisted_2$c, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sections, (section, index) => {
          return (openBlock(), createElementBlock("li", { key: index }, [
            createElementVNode("a", {
              href: "#!",
              onClick: withModifiers($event => (_ctx.switchSelected(section.name)), ["stop","prevent"]),
              class: normalizeClass(["tab", { selected: section.selected }])
            }, [
              createElementVNode("span", {
                class: normalizeClass([section.icon])
              }, null, 2 /* CLASS */),
              createTextVNode(" " + toDisplayString(section.name), 1 /* TEXT */)
            ], 10 /* CLASS, PROPS */, _hoisted_3$b)
          ]))
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ]),
    createElementVNode("section", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]))
}

script$j.render = render$j;
script$j.__file = "src/ts/Component/Tabs/ClarityTabs.vue";

var Grid;
(function (Grid) {
    (function (ColumnDataType) {
        ColumnDataType[ColumnDataType["String"] = 0] = "String";
        ColumnDataType[ColumnDataType["Image"] = 1] = "Image";
        ColumnDataType[ColumnDataType["Link"] = 2] = "Link";
        ColumnDataType[ColumnDataType["Number"] = 3] = "Number";
        ColumnDataType[ColumnDataType["Date"] = 4] = "Date";
    })(Grid.ColumnDataType || (Grid.ColumnDataType = {}));
    (function (FilterType) {
        FilterType[FilterType["Dropdown"] = 0] = "Dropdown";
        FilterType[FilterType["Textbox"] = 1] = "Textbox";
    })(Grid.FilterType || (Grid.FilterType = {}));
    (function (ComparisonType) {
        ComparisonType[ComparisonType["StartsWith"] = 0] = "StartsWith";
        ComparisonType[ComparisonType["Contains"] = 1] = "Contains";
        ComparisonType[ComparisonType["EndsWith"] = 2] = "EndsWith";
        ComparisonType[ComparisonType["Equals"] = 3] = "Equals";
        ComparisonType[ComparisonType["After"] = 4] = "After";
        ComparisonType[ComparisonType["AfterOrEqual"] = 5] = "AfterOrEqual";
        ComparisonType[ComparisonType["Before"] = 6] = "Before";
        ComparisonType[ComparisonType["BeforeOrEqual"] = 7] = "BeforeOrEqual";
    })(Grid.ComparisonType || (Grid.ComparisonType = {}));
})(Grid || (Grid = {}));

class ColumnFilter {
    constructor() {
        this.value = "";
        this.comparison = Grid.ComparisonType.Contains;
        this.type = Grid.FilterType.Textbox;
        this.filtered = false;
    }
}

class DatabaseSettings {
    constructor(saveFilters = true, sourceName = "filteredTable") {
        this.saveFilters = true;
        this.sourceName = "filteredTable";
        this.saveFilters = saveFilters;
        this.sourceName = sourceName;
    }
}

class ColumnData {
    constructor(source, data, databaseSettings) {
        this.display = "";
        this.dataType = Grid.ColumnDataType.String;
        this.sum = false;
        this.locales = "en-US";
        this.url = "";
        this.filter = new ColumnFilter();
        this.sort = false;
        this.sortDirection = 1;
        this.default = "";
        this.show = true;
        if (source == null || data == null) {
            return;
        }
        if (databaseSettings == null) {
            databaseSettings = new DatabaseSettings();
        }
        if (typeof source === "string") {
            let tempSource = new ColumnData();
            tempSource.property = source.replace(ColumnData.MultipleSpacesRegex, "").trim();
            tempSource.display = ColumnData.fixHeader(source);
            tempSource.dataType = ColumnData.guessDataType(source, data);
            source = tempSource;
        }
        if ("property" in source) {
            this.property = source.property.replace(ColumnData.MultipleSpacesRegex, "").trim();
        }
        let propertiesToCopy = [
            { name: 'display', default: (column) => ColumnData.fixHeader(column.property) },
            { name: 'property', default: (column) => column.display.replace(ColumnData.MultipleSpacesRegex, "").trim() },
            { name: 'dataType', default: (column) => ColumnData.guessDataType(column.property, data) },
            { name: 'sum', default: (column) => false },
            { name: 'locales', default: (column) => "en-US" },
            { name: 'format', default: (column) => { return {}; } },
            { name: 'url', default: (column) => "" },
            { name: 'filter', default: (column) => new ColumnFilter() },
            { name: 'sort', default: (column) => false },
            { name: 'sortDirection', default: (column) => 1 },
            { name: 'default', default: (column) => "" },
            { name: 'show', default: (column) => false }
        ];
        for (let x = 0; x < propertiesToCopy.length; ++x) {
            let property = propertiesToCopy[x];
            if (source.hasOwnProperty(property.name)) {
                this[property.name] = source[property.name];
            }
            else {
                this[property.name] = property.default(this);
            }
        }
        if ("filter" in source) {
            let propertiesToCopy = [
                { name: 'value', default: (column) => "" },
                { name: 'comparison', default: (column) => Grid.ComparisonType.Contains },
                { name: 'type', default: (column) => Grid.FilterType.Textbox },
                { name: 'filtered', default: (column) => false }
            ];
            for (let x = 0; x < propertiesToCopy.length; ++x) {
                let property = propertiesToCopy[x];
                if (source.filter.hasOwnProperty(property.name)) {
                    this.filter[property.name] = source.filter[property.name];
                }
                else {
                    this.filter[property.name] = property.default(this.filter);
                }
            }
            ColumnData.returnValueFromDB(this.property, databaseSettings, (data) => this.filter.value = data);
        }
    }
    saveFilter(databaseSettings) {
        ColumnData.saveValueToDB(this.filter.value, this.property, databaseSettings);
    }
    formatValue(value) {
        if (value == null || value === "") {
            value = this.default;
        }
        if (value === "") {
            return value;
        }
        if (this.dataType === Grid.ColumnDataType.String) {
            return (value === null || value === void 0 ? void 0 : value.toString().replace(/\n/gi, "<br />")) || "";
        }
        let valueType = typeof value;
        if (this.dataType === Grid.ColumnDataType.Number) {
            if (valueType === "number") {
                return new Intl.NumberFormat(this.locales, this.format).format(value);
            }
            if (valueType === "string") {
                return new Intl.NumberFormat(this.locales, this.format).format(ColumnData.getNumber(value.stripHTML()));
            }
        }
        else if (this.dataType === Grid.ColumnDataType.Date) {
            if (valueType === "number") {
                return new Intl.DateTimeFormat(this.locales, this.format).format(value);
            }
            if (valueType === "string") {
                value = value.stripHTML();
                if (moment(value).year() === 1900) {
                    return "";
                }
                return new Intl.DateTimeFormat(this.locales, this.format).format(Date.parse(value));
            }
        }
        else if (this.dataType === Grid.ColumnDataType.Link) {
            value = value.stripHTML();
            return "<a href='" + value + "'>" + value + "</a>";
        }
        else if (this.dataType === Grid.ColumnDataType.Image) {
            value = value.stripHTML();
            return "<img src='" + value + "' alt='" + value + "'" + (this.default ? " onerror='this.src=\"" + this.default + "\"'" : "") + " />";
        }
        return value;
    }
    passesFilter(cellData) {
        var filterString = (this.filter.value || "").toLowerCase();
        if (filterString === "") {
            return true;
        }
        if (cellData === "") {
            return false;
        }
        cellData = cellData.toLowerCase();
        if (this.dataType === Grid.ColumnDataType.Date) {
            let momentEntry = moment(cellData);
            let filterValue = moment(filterString);
            if (this.filter.comparison === Grid.ComparisonType.After) {
                return momentEntry.isAfter(filterValue);
            }
            else if (this.filter.comparison === Grid.ComparisonType.AfterOrEqual) {
                return momentEntry.isSameOrAfter(filterValue);
            }
            else if (this.filter.comparison === Grid.ComparisonType.BeforeOrEqual) {
                return momentEntry.isSameOrBefore(filterValue);
            }
            else if (this.filter.comparison === Grid.ComparisonType.Before) {
                return momentEntry.isBefore(filterValue);
            }
            return momentEntry.isSame(filterValue);
        }
        if (this.filter.comparison === Grid.ComparisonType.After) {
            return cellData > filterString;
        }
        else if (this.filter.comparison === Grid.ComparisonType.AfterOrEqual) {
            return cellData >= filterString;
        }
        else if (this.filter.comparison === Grid.ComparisonType.BeforeOrEqual) {
            return cellData <= filterString;
        }
        else if (this.filter.comparison === Grid.ComparisonType.Before) {
            return cellData < filterString;
        }
        else if (this.filter.comparison === Grid.ComparisonType.Contains) {
            return cellData.indexOf(filterString) > -1;
        }
        else if (this.filter.comparison === Grid.ComparisonType.EndsWith) {
            return cellData.endsWith(filterString);
        }
        else if (this.filter.comparison === Grid.ComparisonType.StartsWith) {
            return cellData.startsWith(filterString);
        }
        else if (this.filter.comparison === Grid.ComparisonType.Equals) {
            return cellData === filterString;
        }
        return true;
    }
    static fixHeader(column) {
        return column.replace("_", " ").replace("-", " ").replace(/([a-z])([A-Z])/g, "$1 $2");
    }
    static getNumber(value) {
        if (!value) {
            return 0;
        }
        return parseFloat(value.toString().replace(/[^0-9.-]/g, ""));
    }
    static guessDataType(column, data) {
        let tempDiv = document.createElement("div");
        for (let x = 0; x < data.length; ++x) {
            if (!(column in data[x])) {
                continue;
            }
            let cellText = data[x][column].toString();
            tempDiv.innerHTML = cellText;
            cellText = (tempDiv.textContent || tempDiv.innerText || "").replace(this.isWhiteSpaceRegex, "");
            if (cellText === "") {
                continue;
            }
            if (cellText.match(this.imageRegex)) {
                return Grid.ColumnDataType.Image;
            }
            if (cellText.match(this.urlRegex)) {
                return Grid.ColumnDataType.Link;
            }
            if (cellText.match(this.numberRegex) && !cellText.match(this.phoneRegex)) {
                return Grid.ColumnDataType.Number;
            }
            if (cellText.match(this.dateRegex)) {
                return Grid.ColumnDataType.Date;
            }
        }
        return Grid.ColumnDataType.String;
    }
    static returnValueFromDB(dataKey, databaseSettings, callback) {
        if (!databaseSettings.saveFilters) {
            return;
        }
        new DatabaseConnection(databaseSettings.sourceName, ["cache", "cacheExpirations"], 1)
            .openDatabase(database => {
            database.getByKey("cache", dataKey, event => {
                let result = event.target.result;
                if (result === undefined) {
                    return;
                }
                callback(result);
            });
        });
    }
    static saveValueToDB(data, dataKey, databaseSettings) {
        if (!databaseSettings.saveFilters) {
            return;
        }
        new DatabaseConnection(databaseSettings.sourceName, ["cache", "cacheExpirations"], 1)
            .openDatabase(database => {
            if (data === undefined) {
                return;
            }
            database.add("cache", data, dataKey);
            database.add("cacheExpirations", Date.now(), dataKey);
        });
    }
}
ColumnData.dateRegex = /^((\d\d)?\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)(T\d\d:\d\d:\d\dZ?)?$/ig;
ColumnData.numberRegex = /^-?[£$¤]?[\d,.]+%?$/;
ColumnData.phoneRegex = /^\d\d\d.\d\d\d.\d\d\d\d$/;
ColumnData.urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
ColumnData.imageRegex = /^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/;
ColumnData.isWhiteSpaceRegex = /^\s+|\s+$/g;
ColumnData.MultipleSpacesRegex = /\s+/g;

class Entry {
    constructor(value, column) {
        let property = column.property.split('.').pop();
        let finalValue = value[property];
        this.value = column.formatValue(this.replaceProperties(finalValue, value));
        this.url = this.getUrl(column.url, value);
    }
    getUrl(url, value) {
        if (url === "" || value == null) {
            return "";
        }
        let returnValue = this.replaceProperties(url, value);
        while (returnValue.indexOf('{') > -1 && returnValue.indexOf('}') > -1) {
            returnValue = this.replaceProperties(returnValue, value);
        }
        return returnValue;
    }
    replaceProperties(value, properties) {
        if (typeof value !== "string" || value.indexOf("{") === -1 || value.indexOf("}") === -1) {
            return value;
        }
        let keys = value.match(/{([^}]*)}/g);
        for (let x = 0; x < keys.length; ++x) {
            let key = keys[x].replace("{", "").replace("}", "");
            let currentItem = this.stripHTML(properties[key]) || "";
            value = value.replaceAll("{" + key + "}", currentItem);
        }
        return value;
    }
    stripHTML(value) {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = value;
        return (tempDiv.textContent || tempDiv.innerText || "").replace(/^\s+|\s+$/g, "");
    }
}

class RowValue {
    constructor(column, data) {
        this.column = column;
        this.data = this.getItems(data, column);
    }
    getItems(row, column) {
        let parents = this.getParentProperties(row, column.property);
        let finalValues = [];
        for (let x = 0; x < parents.length; ++x) {
            let parent = parents[x];
            finalValues.push(new Entry(parent, column));
        }
        return finalValues;
    }
    getParentProperties(value, property) {
        if (!property) {
            return [];
        }
        let properties = property.split('.');
        let propertyName = properties[0];
        let finalProperty = value[propertyName];
        if (properties.length === 1) {
            if (Array.isArray(value)) {
                return value;
            }
            return [value];
        }
        let nextProperties = properties.slice(1, properties.length).join(".");
        if (Array.isArray(finalProperty)) {
            let returnValues = [];
            for (let y = 0; y < finalProperty.length; ++y) {
                returnValues = returnValues.concat(this.getParentProperties(finalProperty[y], nextProperties));
            }
            return returnValues;
        }
        return this.getParentProperties(finalProperty, nextProperties);
    }
}

class RowData {
    constructor(data, columns) {
        this.columns = [];
        this.originalData = [];
        this.originalData = data;
        for (let y = 0; y < columns.length; ++y) {
            this.columns.push(new RowValue(columns[y], data));
        }
    }
}

class SortFunc {
    static sortDate(val1, val2) {
        let value1 = moment(val1);
        let value2 = moment(val2);
        if (!value1.isValid()) {
            value1 = moment(new Date(0));
        }
        if (!value2.isValid()) {
            value2 = moment(new Date(0));
        }
        if (value1.isBefore(value2))
            return -1;
        if (value1.isAfter(value2))
            return 1;
        return 0;
    }
    static sortNumber(val1, val2) {
        if (isNaN(val1)) {
            val1 = 0;
        }
        if (isNaN(val2)) {
            val2 = 0;
        }
        return val1 - val2;
    }
    static sortString(val1, val2) {
        if (val1 === val2) {
            return 0;
        }
        if (val1 < val2) {
            return -1;
        }
        return 1;
    }
}

var script$i = Vue.defineComponent({
    watch: {
        columns: function (newColumns, oldColumns) {
            this.internalColumns.length = 0;
            this.internalColumns = this.getColumnInfos(newColumns, this.data, this.databaseSettings);
            this.internalData = this.getData(this.internalData.map((row) => row.originalData), this.internalColumns);
            this.filterChanged();
        },
        data: function (newData, oldData) {
            this.internalData.length = 0;
            this.internalData = this.getData(newData, this.internalColumns);
            this.filterChanged();
        }
    },
    computed: {
        anySum: function () {
            return this.internalColumns.some((item) => {
                return item.sum;
            });
        },
        endPage: function () {
            let tempPage = (Math.floor((this.page - 1) / 10) * 10) + 10;
            if (tempPage > this.finalPage)
                return this.finalPage;
            return tempPage;
        },
        filteredGroups: function () {
            var _a;
            if (!this.groupBy)
                return [""];
            let tempData = this.filteredData;
            let returnData = [];
            for (let x = 0; x < tempData.length; ++x) {
                let row = tempData[x];
                let groupValue = row.originalData[this.groupBy];
                if (!groupValue) {
                    continue;
                }
                if (Array.isArray(groupValue)) {
                    for (let y = 0; y < groupValue.length; ++y) {
                        let contentText = groupValue[y].toString();
                        if (returnData.indexOf(contentText) === -1) {
                            returnData.push(contentText);
                        }
                    }
                    continue;
                }
                let contentText = groupValue.toString();
                if (returnData.indexOf(contentText) === -1) {
                    returnData.push(contentText);
                }
            }
            let filter = (_a = this.filterKey) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            return returnData.filter((value) => value.toLowerCase().indexOf(filter) !== -1)
                .sort(function (a, b) {
                if (a === b) {
                    return 0;
                }
                if (a < b) {
                    return -1;
                }
                return 1;
            });
        },
        filteredData: function () {
            var _a;
            let data = this.filter(this.internalData, (_a = this.filterKey) === null || _a === void 0 ? void 0 : _a.toLowerCase());
            return this.sort(data, this.internalColumns, this.sortKey);
        },
        finalPage: function () {
            if (this.pageSize === -1) {
                return 1;
            }
            return Math.ceil(this.total / this.pageSize);
        },
        pageable: function () {
            return this.paged && this.pageSize > 0 && this.filteredData.length > this.pageSize;
        },
        startPage: function () {
            return (Math.floor((this.page - 1) / 10) * 10);
        },
    },
    data: function () {
        let that = this;
        let databaseSettings = new DatabaseSettings(this.saveFilters);
        let internalColumns = that.getColumnInfos(this.columns, this.data, databaseSettings);
        let sortMethods = [];
        sortMethods[Grid.ColumnDataType.String] = this.sortString;
        sortMethods[Grid.ColumnDataType.Number] = this.sortNumber;
        sortMethods[Grid.ColumnDataType.Date] = this.sortDate;
        return {
            sortKey: -1,
            draggedColumn: null,
            internalColumns: internalColumns,
            databaseSettings: databaseSettings,
            filterKey: that.filterValue,
            internalData: that.getData(this.data, internalColumns),
            sortMethods: sortMethods
        };
    },
    methods: {
        exportData: function (type) {
            let returnValue = [];
            if (this.groupBy === "") {
                let data = this.filteredData;
                for (let x = 0; x < data.length; ++x) {
                    let row = data[x];
                    let newItem = {};
                    for (let y = 0; y < row.columns.length; ++y) {
                        let column = row.columns[y].column;
                        newItem[column.property] = row.columns[y].data.map((value) => value.value).join(', ');
                    }
                    returnValue.push(newItem);
                }
            }
            else {
                let groups = this.filteredGroups;
                for (let x = 0; x < groups.length; ++x) {
                    let group = groups[x];
                    let data = this.getEntriesInGroup(group);
                    let tempHeader = {};
                    tempHeader[data[0].columns[0].column.property] = group;
                    for (let y = 1; y < data[0].columns.length; ++y) {
                        let column = data[0].columns[y].column;
                        tempHeader[column.property] = "";
                    }
                    returnValue.push(tempHeader);
                    for (let x = 0; x < data.length; ++x) {
                        let row = data[x];
                        let newItem = {};
                        for (let y = 0; y < row.columns.length; ++y) {
                            let column = row.columns[y].column;
                            newItem[column.property] = row.columns[y].data.map((value) => value.value).join(', ');
                        }
                        returnValue.push(newItem);
                    }
                }
            }
            Downloader.exportData(returnValue, this.columns, this.exportInfo.fileName + "." + type, FileTypes.CSV);
        },
        filter: function (data, filterKey) {
            if (filterKey && this.groupBy === "") {
                data = data.filter((row) => row.columns.some((column) => column.data.some((item) => item.value.toLowerCase().indexOf(filterKey) > -1)));
            }
            return data.filter((row) => row.columns.every((column) => column.data.map((cell) => cell.value).some((cell) => column.column.passesFilter(cell))));
        },
        filterChanged: function () {
            this.$emit("data-updated", { data: this.filteredData });
        },
        getColumnInfos: function (columns, data, databaseSettings) {
            return columns.map(column => new ColumnData(column, data, databaseSettings));
        },
        getData: function (data, columns) {
            return data.map(row => new RowData(row, columns));
        },
        getDistinctValues: function (column) {
            var _a;
            let returnValue = [''];
            let finalData = this.filteredData;
            for (let x = 0; x < finalData.length; ++x) {
                let entries = ((_a = finalData[x].columns
                    .find((tempColumn) => tempColumn.column.property === column.property)) === null || _a === void 0 ? void 0 : _a.data.map((data) => data.value)) || [];
                for (let y = 0; y < entries.length; ++y) {
                    if (returnValue.indexOf(entries[y]) === -1) {
                        returnValue.push(entries[y]);
                    }
                }
            }
            return returnValue.sort(SortFunc.sortString);
        },
        getEntriesInGroup: function (group) {
            let data = this.filteredData;
            let that = this;
            if (that.groupBy === "") {
                return data;
            }
            return data.filter(row => that.isInGroup(row.originalData[that.groupBy], group));
        },
        isInGroup: function (value, groupName) {
            let that = this;
            if (Array.isArray(value)) {
                return value.some(item => that.isInGroup(item, groupName));
            }
            return (value === null || value === void 0 ? void 0 : value.toString()) === groupName;
        },
        rowClicked: function (entry) {
            for (let x = 0; x < this.internalColumns.length; ++x) {
                let internalColumn = this.internalColumns[x];
                if (!internalColumn.filter || internalColumn.filter.value === undefined) {
                    continue;
                }
                internalColumn.saveFilter(this.databaseSettings);
            }
            this.$emit("row-clicked", { entry: entry });
        },
        setPage: function (currentPage) {
            if (currentPage > this.finalPage)
                currentPage = this.finalPage;
            else if (currentPage < 1)
                currentPage = 1;
            let sortedColumn = this.internalColumns[this.sortKey];
            let direction = (sortedColumn === null || sortedColumn === void 0 ? void 0 : sortedColumn.sortDirection) || 0;
            this.$emit("pagechange", { page: currentPage, filter: this.filterKey, sort: this.sortKey, direction: direction });
        },
        sort: function (data, columns, sortKey) {
            if (!this.sortable) {
                return data;
            }
            let tempSortKey = this.sortKey;
            for (let x = 0; x < columns.length; ++x) {
                let internalColumn = columns[x];
                if (!internalColumn.sort) {
                    continue;
                }
                this.sortKey = x;
                data = data.sort(this.sortMethods[internalColumn.dataType]);
            }
            this.sortKey = tempSortKey;
            if (sortKey === -1) {
                return data;
            }
            let sortedColumn = columns[sortKey];
            data = data.sort(this.sortMethods[sortedColumn.dataType]);
            if (sortedColumn.sortDirection === 1) {
                return data.reverse();
            }
            return data;
        },
        sortBy: function (column, index) {
            this.sortKey = index;
            column.sortDirection = column.sortDirection * -1;
            this.$emit("pagechange", { page: this.page, filter: this.filterKey, sort: this.sortKey, direction: column.sortDirection });
        },
        sortDate: function (val1, val2) {
            var _a, _b;
            let actualValue1 = (((_a = val1.columns[this.sortKey].data[0]) === null || _a === void 0 ? void 0 : _a.value) || "");
            let actualValue2 = (((_b = val2.columns[this.sortKey].data[0]) === null || _b === void 0 ? void 0 : _b.value) || "");
            return SortFunc.sortDate(new Date(actualValue1), new Date(actualValue2));
        },
        sortNumber: function (val1, val2) {
            var _a, _b;
            let actualValue1 = (((_a = val1.columns[this.sortKey].data[0]) === null || _a === void 0 ? void 0 : _a.value) || "").toString().toNumber();
            let actualValue2 = (((_b = val2.columns[this.sortKey].data[0]) === null || _b === void 0 ? void 0 : _b.value) || "").toString().toNumber();
            return SortFunc.sortNumber(actualValue1, actualValue2);
        },
        sortString: function (val1, val2) {
            var _a, _b;
            let actualValue1 = ((_a = val1.columns[this.sortKey].data[0]) === null || _a === void 0 ? void 0 : _a.value) || "";
            let actualValue2 = ((_b = val2.columns[this.sortKey].data[0]) === null || _b === void 0 ? void 0 : _b.value) || "";
            return SortFunc.sortString(actualValue1, actualValue2);
        },
        sumColumn: function (groupName, column) {
            if (!column.sum) {
                return "";
            }
            let data = this.getEntriesInGroup(groupName);
            return column.formatValue(data.map((row) => { var _a; return (_a = row.originalData[column.property]) === null || _a === void 0 ? void 0 : _a.toString().toNumber(); })
                .reduce((val1, val2) => val1 + val2));
        },
    },
    props: {
        columns: {
            default: [], type: Array
        },
        data: {
            default: [], type: Array
        },
        groupBy: {
            default: "", type: String
        },
        page: {
            default: 1, type: Number
        },
        paged: {
            default: false, type: Boolean
        },
        pageSize: {
            default: -1, type: Number
        },
        total: {
            default: 0, type: Number
        },
        saveFilters: {
            default: true, type: Boolean
        },
        searchable: {
            default: true, type: Boolean
        },
        showCount: {
            default: true, type: Boolean
        },
        sortable: {
            default: true, type: Boolean
        },
        quickNav: {
            default: false, type: Boolean
        },
        filterValue: {
            default: "", type: String
        },
        exportInfo: {
            default: { exportable: true, fileName: BrowserUtils.Id }, type: Object
        }
    }
});

const _hoisted_1$g = { class: "clarity-grid" };
const _hoisted_2$b = { class: "panel" };
const _hoisted_3$a = { class: "body" };
const _hoisted_4$7 = {
  key: 0,
  class: "right do-not-print flex column"
};
const _hoisted_5$7 = { class: "no-border" };
const _hoisted_6$6 = /*#__PURE__*/createElementVNode("td", null, " Search: ", -1 /* HOISTED */);
const _hoisted_7$5 = /*#__PURE__*/createElementVNode("td", null, " Export: ", -1 /* HOISTED */);
const _hoisted_8$5 = {
  key: 1,
  class: "do-not-print"
};
const _hoisted_9$4 = /*#__PURE__*/createTextVNode(" Show ");
const _hoisted_10$4 = /*#__PURE__*/createStaticVNode("<option value=\"10\">10</option><option value=\"25\">25</option><option value=\"50\">50</option><option value=\"100\">100</option><option value=\"200\">200</option><option value=\"-1\">All</option>", 6);
const _hoisted_16$1 = [
  _hoisted_10$4
];
const _hoisted_17$1 = /*#__PURE__*/createTextVNode(" entries ");
const _hoisted_18$1 = {
  key: 2,
  class: "quick-nav do-not-print"
};
const _hoisted_19$1 = { class: "inline" };
const _hoisted_20$1 = /*#__PURE__*/createElementVNode("li", null, "Quick nav:", -1 /* HOISTED */);
const _hoisted_21$1 = ["href"];
const _hoisted_22 = /*#__PURE__*/createElementVNode("br", { class: "clear" }, null, -1 /* HOISTED */);
const _hoisted_23 = {
  class: "sortable",
  id: "filteredTable"
};
const _hoisted_24 = ["onClick", "columnName"];
const _hoisted_25 = { key: 0 };
const _hoisted_26 = {
  key: 0,
  class: "do-not-print"
};
const _hoisted_27 = ["type", "placeholder", "onUpdate:modelValue", "list"];
const _hoisted_28 = ["id"];
const _hoisted_29 = {
  key: 1,
  class: "do-not-print"
};
const _hoisted_30 = ["onUpdate:modelValue"];
const _hoisted_31 = {
  key: 0,
  class: "grid-group-header"
};
const _hoisted_32 = ["colspan"];
const _hoisted_33 = ["id"];
const _hoisted_34 = ["onClick"];
const _hoisted_35 = ["innerHTML"];
const _hoisted_36 = ["innerHTML", "href"];
const _hoisted_37 = {
  key: 1,
  class: "grid-group-footer"
};
const _hoisted_38 = ["colspan"];
const _hoisted_39 = {
  key: 2,
  class: "grid-group-footer"
};
const _hoisted_40 = ["innerHTML"];
const _hoisted_41 = {
  key: 0,
  class: "do-not-print"
};
const _hoisted_42 = ["colspan"];
const _hoisted_43 = { class: "right" };
const _hoisted_44 = { class: "paged" };
const _hoisted_45 = ["onClick"];
const _hoisted_46 = {
  key: 0,
  class: "do-not-print"
};

function render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$g, [
    createElementVNode("div", _hoisted_2$b, [
      createElementVNode("div", _hoisted_3$a, [
        (_ctx.searchable)
          ? (openBlock(), createElementBlock("div", _hoisted_4$7, [
              createElementVNode("table", _hoisted_5$7, [
                createElementVNode("tbody", null, [
                  createElementVNode("tr", null, [
                    _hoisted_6$6,
                    createElementVNode("td", null, [
                      withDirectives(createElementVNode("input", {
                        type: "text",
                        placeholder: "Filter Entries",
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.filterKey) = $event)),
                        onKeyup: _cache[1] || (_cache[1] = (...args) => (_ctx.filterChanged && _ctx.filterChanged(...args)))
                      }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
                        [vModelText, _ctx.filterKey]
                      ])
                    ])
                  ]),
                  createElementVNode("tr", null, [
                    _hoisted_7$5,
                    createElementVNode("td", null, [
                      (_ctx.exportInfo.exportable)
                        ? (openBlock(), createElementBlock("a", {
                            key: 0,
                            href: "#!",
                            class: "fas fa-file-csv",
                            onClick: _cache[2] || (_cache[2] = $event => (_ctx.exportData('CSV')))
                          }))
                        : createCommentVNode("v-if", true)
                    ])
                  ])
                ])
              ])
            ]))
          : createCommentVNode("v-if", true),
        (_ctx.paged)
          ? (openBlock(), createElementBlock("span", _hoisted_8$5, [
              _hoisted_9$4,
              withDirectives(createElementVNode("select", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.pageSize) = $event))
              }, _hoisted_16$1, 512 /* NEED_PATCH */), [
                [vModelSelect, _ctx.pageSize]
              ]),
              _hoisted_17$1
            ]))
          : createCommentVNode("v-if", true),
        (_ctx.quickNav && _ctx.filteredGroups)
          ? (openBlock(), createElementBlock("div", _hoisted_18$1, [
              createElementVNode("ul", _hoisted_19$1, [
                _hoisted_20$1,
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filteredGroups, (group) => {
                  return (openBlock(), createElementBlock("li", { key: group }, [
                    createElementVNode("a", {
                      href: '#'+group
                    }, toDisplayString(group), 9 /* TEXT, PROPS */, _hoisted_21$1)
                  ]))
                }), 128 /* KEYED_FRAGMENT */))
              ])
            ]))
          : createCommentVNode("v-if", true),
        _hoisted_22
      ])
    ]),
    createElementVNode("table", _hoisted_23, [
      createElementVNode("thead", null, [
        createElementVNode("tr", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.internalColumns, (column, index) => {
            return (openBlock(), createElementBlock("th", {
              key: column,
              onClick: $event => (_ctx.sortBy(column, index)),
              class: normalizeClass({ active: _ctx.sortKey == index,headerSortUp: _ctx.sortKey==index && column.sortDirection > 0,headerSortDown: _ctx.sortKey == index && column.sortDirection < 0 }),
              columnName: column.property
            }, [
              createTextVNode(toDisplayString(_ctx.$filters.capitalize(column.display)) + " ", 1 /* TEXT */),
              (column.filter.filtered)
                ? (openBlock(), createElementBlock("div", _hoisted_25, [
                    (column.filter.type == 1)
                      ? (openBlock(), createElementBlock("div", _hoisted_26, [
                          withDirectives(createElementVNode("input", {
                            type: column.filter.type,
                            placeholder: column.filter.placeholder,
                            "onUpdate:modelValue": $event => ((column.filter.value) = $event),
                            list: column.property,
                            onClick: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop","prevent"])),
                            onKeyup: _cache[5] || (_cache[5] = (...args) => (_ctx.filterChanged && _ctx.filterChanged(...args)))
                          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_27), [
                            [vModelDynamic, column.filter.value]
                          ]),
                          createElementVNode("datalist", {
                            id: column.property
                          }, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getDistinctValues(column), (value) => {
                              return (openBlock(), createElementBlock("option", { key: value }, toDisplayString(value), 1 /* TEXT */))
                            }), 128 /* KEYED_FRAGMENT */))
                          ], 8 /* PROPS */, _hoisted_28)
                        ]))
                      : createCommentVNode("v-if", true),
                    (column.filter.type == 0)
                      ? (openBlock(), createElementBlock("div", _hoisted_29, [
                          withDirectives(createElementVNode("select", {
                            "onUpdate:modelValue": $event => ((column.filter.value) = $event),
                            onClick: _cache[6] || (_cache[6] = withModifiers(() => {}, ["stop","prevent"])),
                            onChange: _cache[7] || (_cache[7] = (...args) => (_ctx.filterChanged && _ctx.filterChanged(...args)))
                          }, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getDistinctValues(column), (value) => {
                              return (openBlock(), createElementBlock("option", { key: value }, toDisplayString(value), 1 /* TEXT */))
                            }), 128 /* KEYED_FRAGMENT */))
                          ], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_30), [
                            [vModelSelect, column.filter.value]
                          ])
                        ]))
                      : createCommentVNode("v-if", true)
                  ]))
                : createCommentVNode("v-if", true)
            ], 10 /* CLASS, PROPS */, _hoisted_24))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ]),
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filteredGroups, (group) => {
        return (openBlock(), createElementBlock("tbody", { key: group }, [
          (group!=='')
            ? (openBlock(), createElementBlock("tr", _hoisted_31, [
                createElementVNode("td", {
                  colspan: _ctx.internalColumns.length
                }, [
                  createElementVNode("a", { id: group }, null, 8 /* PROPS */, _hoisted_33),
                  createTextVNode(toDisplayString(group), 1 /* TEXT */)
                ], 8 /* PROPS */, _hoisted_32)
              ]))
            : createCommentVNode("v-if", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getEntriesInGroup(group), (entry, index) => {
            return (openBlock(), createElementBlock("tr", {
              key: index,
              onClick: $event => (_ctx.rowClicked(entry))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(entry.columns, (column) => {
                return (openBlock(), createElementBlock("td", {
                  key: column,
                  class: normalizeClass(entry.style)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(column.data, (item) => {
                    return (openBlock(), createElementBlock("div", { key: item }, [
                      (!item.url)
                        ? (openBlock(), createElementBlock("div", {
                            key: 0,
                            innerHTML: item.value
                          }, null, 8 /* PROPS */, _hoisted_35))
                        : createCommentVNode("v-if", true),
                      (item.url)
                        ? (openBlock(), createElementBlock("a", {
                            key: 1,
                            innerHTML: item.value,
                            href: item.url
                          }, null, 8 /* PROPS */, _hoisted_36))
                        : createCommentVNode("v-if", true)
                    ]))
                  }), 128 /* KEYED_FRAGMENT */))
                ], 2 /* CLASS */))
              }), 128 /* KEYED_FRAGMENT */))
            ], 8 /* PROPS */, _hoisted_34))
          }), 128 /* KEYED_FRAGMENT */)),
          (_ctx.anySum)
            ? (openBlock(), createElementBlock("tr", _hoisted_37, [
                createElementVNode("td", {
                  colspan: _ctx.internalColumns.length
                }, "Totals:", 8 /* PROPS */, _hoisted_38)
              ]))
            : createCommentVNode("v-if", true),
          (_ctx.anySum)
            ? (openBlock(), createElementBlock("tr", _hoisted_39, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.internalColumns, (key) => {
                  return (openBlock(), createElementBlock("td", {
                    innerHTML: _ctx.sumColumn(group, key),
                    key: key
                  }, null, 8 /* PROPS */, _hoisted_40))
                }), 128 /* KEYED_FRAGMENT */))
              ]))
            : createCommentVNode("v-if", true)
        ]))
      }), 128 /* KEYED_FRAGMENT */)),
      (_ctx.pageable)
        ? (openBlock(), createElementBlock("tfoot", _hoisted_41, [
            createElementVNode("tr", null, [
              createElementVNode("td", {
                colspan: _ctx.internalColumns.length
              }, [
                createElementVNode("div", _hoisted_43, "Page " + toDisplayString(_ctx.page) + " of " + toDisplayString(_ctx.finalPage), 1 /* TEXT */),
                createElementVNode("ul", _hoisted_44, [
                  createElementVNode("li", {
                    class: normalizeClass(["cursor-pointer fas fa-fast-backward text-center", { 'disabled': (_ctx.page==1) }]),
                    onClick: _cache[8] || (_cache[8] = $event => (_ctx.setPage(1)))
                  }, null, 2 /* CLASS */),
                  createElementVNode("li", {
                    class: normalizeClass(["cursor-pointer fas fa-step-backward text-center", { 'disabled': (_ctx.page==1) }]),
                    onClick: _cache[9] || (_cache[9] = $event => (_ctx.setPage(_ctx.page-1)))
                  }, null, 2 /* CLASS */),
                  (openBlock(true), createElementBlock(Fragment, null, renderList((_ctx.endPage-_ctx.startPage), (n) => {
                    return (openBlock(), createElementBlock("li", {
                      class: normalizeClass(["cursor-pointer text-center", { 'active': (_ctx.page==(_ctx.startPage+n)) }]),
                      onClick: $event => (_ctx.setPage(_ctx.startPage+n)),
                      key: n
                    }, toDisplayString(_ctx.startPage+n), 11 /* TEXT, CLASS, PROPS */, _hoisted_45))
                  }), 128 /* KEYED_FRAGMENT */)),
                  createElementVNode("li", {
                    class: normalizeClass(["cursor-pointer fas fa-step-forward text-center", { 'disabled': (_ctx.page==_ctx.finalPage) }]),
                    onClick: _cache[10] || (_cache[10] = $event => (_ctx.setPage(_ctx.page+1)))
                  }, null, 2 /* CLASS */),
                  createElementVNode("li", {
                    class: normalizeClass(["cursor-pointer fas fa-fast-forward text-center", { 'disabled': (_ctx.page==_ctx.finalPage) }]),
                    onClick: _cache[11] || (_cache[11] = $event => (_ctx.setPage(_ctx.finalPage)))
                  }, null, 2 /* CLASS */)
                ])
              ], 8 /* PROPS */, _hoisted_42)
            ])
          ]))
        : createCommentVNode("v-if", true)
    ]),
    (_ctx.showCount)
      ? (openBlock(), createElementBlock("div", _hoisted_46, " Filtered count: " + toDisplayString(_ctx.filteredData.length), 1 /* TEXT */))
      : createCommentVNode("v-if", true)
  ]))
}

script$i.render = render$i;
script$i.__file = "src/ts/Component/Grid/ClarityGrid.vue";

var script$h = Vue.defineComponent({
    data() {
        return {
            errorMessages: [],
            formValidator: new FormValidation()
        };
    },
    mounted() {
        this.$nextTick(function () {
            this.revalidate();
        });
    },
    methods: {
        revalidate: function () {
            if (this.$el == null) {
                return true;
            }
            let FormElement = this.getParentForm(this.$el);
            if (FormElement == null && !this.formValidator.validate()) {
                this.errorMessages = this.formValidator.errors;
                return false;
            }
            let Errors = this.formValidator.validateForm(FormElement);
            if (Errors.length > 0) {
                this.errorMessages = Errors;
                return false;
            }
            this.errorMessages = [];
            return true;
        },
        getParentForm: function (element) {
            let CurrentParent = element.parentNode;
            if (CurrentParent.nodeName === "FORM" || CurrentParent === null) {
                return CurrentParent;
            }
            else {
                return this.getParentForm(CurrentParent);
            }
        },
    }
});

const _hoisted_1$f = { class: "panel error clarity-validator" };
const _hoisted_2$a = /*#__PURE__*/createElementVNode("a", { name: "errorSection" }, null, -1 /* HOISTED */);
const _hoisted_3$9 = /*#__PURE__*/createTextVNode("Some Errors Were Discovered");

function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", _hoisted_1$f, [
    _hoisted_2$a,
    createElementVNode("header", null, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        _hoisted_3$9
      ])
    ]),
    createElementVNode("ul", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.errorMessages, (errorMessage) => {
        return (openBlock(), createElementBlock("li", { key: errorMessage }, toDisplayString(errorMessage), 1 /* TEXT */))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ], 512 /* NEED_PATCH */)), [
    [vShow, _ctx.errorMessages.length > 0]
  ])
}

script$h.render = render$h;
script$h.__file = "src/ts/Component/FormValidation/ClarityFormValidator.vue";

var script$g = Vue.defineComponent({
    data: function () {
        let returnedModel;
        if (this.schema.inputType === "date"
            || this.schema.inputType === "datetime-local"
            || this.schema.inputType === "datetime"
            || this.schema.inputType === "month") {
            let tempDate = moment(this.model);
            if (this.schema.isUTC) {
                tempDate = moment.utc(this.model).local();
            }
            if (this.schema.inputType === "date") {
                returnedModel = tempDate.format('YYYY-MM-DD');
            }
            else if (this.schema.inputType === "datetime-local" || this.schema.inputType === "datetime") {
                returnedModel = tempDate.format('YYYY-MM-DDTHH:mm');
            }
            else if (this.schema.inputType === "month") {
                returnedModel = tempDate.format('YYYY-MM');
            }
        }
        else {
            returnedModel = this.model;
        }
        return {
            count: 0,
            timer: 0,
            internalmodel: returnedModel
        };
    },
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
            let result = "";
            if (this.schema.id) {
                result = this.schema.id;
            }
            else {
                result = this.schema.model.slugify();
            }
            if (this.idSuffix !== undefined) {
                result += this.idSuffix;
            }
            return result;
        },
        changed: function (newValue) {
            let that = this;
            if (that.schema.datalistUrl) {
                if (that.timer !== 0) {
                    clearTimeout(that.timer);
                }
                that.timer = setTimeout(function () {
                    Request.post(that.schema.datalistUrl, { value: newValue, queryCount: ++that.count })
                        .onSuccess(function (ev) {
                        if (!ev) {
                            return;
                        }
                        else if (ev.queryCount && ev.queryCount == that.count) {
                            that.schema.datalist = ev.value;
                        }
                        else if (!ev.queryCount) {
                            that.schema.datalist = ev;
                        }
                    })
                        .onError(function (x) {
                        that.$emit("error", x);
                    })
                        .send();
                }, 100);
            }
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
        generateGuid: function (item) {
            let Key = item.key;
            if (Key) {
                return Key;
            }
            let result = '';
            for (let j = 0; j < 32; j++) {
                let i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            item.key = result;
            return item.key;
        },
    }
});

const _hoisted_1$e = ["for"];
const _hoisted_2$9 = {
  key: 0,
  class: "error clear-background"
};
const _hoisted_3$8 = {
  key: 1,
  class: "clear-background active no-border small"
};
const _hoisted_4$6 = /*#__PURE__*/createElementVNode("span", { class: "fas fa-info-circle" }, null, -1 /* HOISTED */);
const _hoisted_5$6 = ["for"];
const _hoisted_6$5 = {
  key: 0,
  class: "error clear-background"
};
const _hoisted_7$4 = {
  key: 1,
  class: "clear-background active no-border small"
};
const _hoisted_8$4 = /*#__PURE__*/createElementVNode("span", { class: "fas fa-info-circle" }, null, -1 /* HOISTED */);
const _hoisted_9$3 = ["id", "type", "disabled", "accept", "alt", "autocomplete", "checked", "dirname", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "height", "list", "max", "maxlength", "min", "minlength", "multiple", "name", "pattern", "placeholder", "title", "readonly", "required", "size", "src", "step", "width", "files", "data-error-message-value-missing", "data-error-message-pattern-mismatch", "data-error-message-range-overflow", "data-error-message-range-underflow", "data-error-message-step-mismatch", "data-error-message-too-long", "data-error-message-too-short", "data-error-message-bad-input", "data-error-message-type-mismatch"];
const _hoisted_10$3 = {
  key: 2,
  class: "text-center"
};
const _hoisted_11$3 = ["id"];
const _hoisted_12$3 = ["value"];

function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    (!_ctx.schema.label && _ctx.label)
      ? (openBlock(), createElementBlock("label", {
          key: 0,
          for: _ctx.getFieldID(),
          class: normalizeClass(_ctx.schema.labelClasses)
        }, [
          createTextVNode(toDisplayString(_ctx.$filters.capitalize(_ctx.schema.model)) + " ", 1 /* TEXT */),
          (_ctx.schema.required)
            ? (openBlock(), createElementBlock("span", _hoisted_2$9, "*"))
            : createCommentVNode("v-if", true),
          (_ctx.schema.hint)
            ? (openBlock(), createElementBlock("i", _hoisted_3$8, [
                _hoisted_4$6,
                createTextVNode(toDisplayString(_ctx.schema.hint), 1 /* TEXT */)
              ]))
            : createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_1$e))
      : createCommentVNode("v-if", true),
    (_ctx.schema.label && _ctx.label)
      ? (openBlock(), createElementBlock("label", {
          key: 1,
          for: _ctx.getFieldID(),
          class: normalizeClass(_ctx.schema.labelClasses)
        }, [
          createTextVNode(toDisplayString(_ctx.schema.label) + " ", 1 /* TEXT */),
          (_ctx.schema.required)
            ? (openBlock(), createElementBlock("span", _hoisted_6$5, "*"))
            : createCommentVNode("v-if", true),
          (_ctx.schema.hint)
            ? (openBlock(), createElementBlock("i", _hoisted_7$4, [
                _hoisted_8$4,
                createTextVNode(toDisplayString(_ctx.schema.hint), 1 /* TEXT */)
              ]))
            : createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_5$6))
      : createCommentVNode("v-if", true),
    withDirectives(createElementVNode("input", {
      id: _ctx.getFieldID(),
      type: _ctx.schema.inputType,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.internalmodel) = $event)),
      onInput: _cache[1] || (_cache[1] = $event => (_ctx.changed($event.target.value))),
      disabled: _ctx.schema.disabled,
      accept: _ctx.schema.accept,
      alt: _ctx.schema.alt,
      autocomplete: _ctx.schema.autocomplete,
      checked: _ctx.schema.checked,
      dirname: _ctx.schema.dirname,
      formaction: _ctx.schema.formaction,
      formenctype: _ctx.schema.formenctype,
      formmethod: _ctx.schema.formmethod,
      formnovalidate: _ctx.schema.formnovalidate,
      formtarget: _ctx.schema.formtarget,
      height: _ctx.schema.height,
      list: _ctx.getList(),
      max: _ctx.schema.max,
      maxlength: _ctx.schema.maxlength,
      min: _ctx.schema.min,
      minlength: _ctx.schema.minlength,
      multiple: _ctx.schema.multiple,
      name: _ctx.schema.inputName || _ctx.getFieldID(),
      pattern: _ctx.schema.pattern,
      placeholder: _ctx.schema.placeholder,
      title: _ctx.schema.placeholder,
      readonly: _ctx.schema.readonly,
      required: _ctx.schema.required,
      size: _ctx.schema.size,
      src: _ctx.schema.src,
      step: _ctx.schema.step,
      width: _ctx.schema.width,
      files: _ctx.schema.files,
      class: normalizeClass(_ctx.schema.inputClasses),
      "data-error-message-value-missing": _ctx.schema.errorMessageValueMissing,
      "data-error-message-pattern-mismatch": _ctx.schema.errorMessagePatternMismatch,
      "data-error-message-range-overflow": _ctx.schema.errorMessageRangeOverflow,
      "data-error-message-range-underflow": _ctx.schema.errorMessageRangeUnderflow,
      "data-error-message-step-mismatch": _ctx.schema.errorMessageStepMismatch,
      "data-error-message-too-long": _ctx.schema.errorMessageTooLong,
      "data-error-message-too-short": _ctx.schema.errorMessageTooShort,
      "data-error-message-bad-input": _ctx.schema.errorMessageBadInput,
      "data-error-message-type-mismatch": _ctx.schema.errorMessageTypeMismatch
    }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_9$3), [
      [vModelDynamic, _ctx.internalmodel]
    ]),
    (_ctx.schema.inputType === 'color' || _ctx.schema.inputType === 'range')
      ? (openBlock(), createElementBlock("div", _hoisted_10$3, toDisplayString(_ctx.internalmodel), 1 /* TEXT */))
      : createCommentVNode("v-if", true),
    (_ctx.schema.datalist)
      ? (openBlock(), createElementBlock("datalist", {
          key: 3,
          id: _ctx.getList()
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.schema.datalist, (item) => {
            return (openBlock(), createElementBlock("option", {
              value: item,
              key: item
            }, null, 8 /* PROPS */, _hoisted_12$3))
          }), 128 /* KEYED_FRAGMENT */))
        ], 8 /* PROPS */, _hoisted_11$3))
      : createCommentVNode("v-if", true)
  ]))
}

script$g.render = render$g;
script$g.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldInput.vue";

var script$f = Vue.defineComponent({
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
            let result = "";
            if (this.schema.id) {
                result = this.schema.id;
            }
            else {
                result = this.schema.model.slugify();
            }
            if (this.idSuffix !== undefined) {
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
        getValues: function (data) {
            if (!data) {
                return null;
            }
            let itemToCheck = data;
            if (Array.isArray(data)) {
                itemToCheck = data[0];
            }
            let propertyNames = Object.getOwnPropertyNames(itemToCheck);
            for (let x = 0; x < propertyNames.length; ++x) {
                if (propertyNames[x] === "key") {
                    return data;
                }
                let tempData = this.getValues(itemToCheck[propertyNames[x]]);
                if (tempData) {
                    return tempData;
                }
            }
            return null;
        }
    },
    beforeMount: function () {
        if (!this.schema.valuesUrl) {
            return;
        }
        let that = this;
        Request.post(that.schema.valuesUrl, that.schema.valuesUrlData)
            .onSuccess(function (ev) {
            if (!ev) {
                return;
            }
            let values = that.getValues(ev);
            if (values) {
                that.schema.values = values;
            }
        })
            .onError(function (x) {
            that.$emit("error", x);
        })
            .send();
    }
});

const _hoisted_1$d = ["for"];
const _hoisted_2$8 = {
  key: 0,
  class: "error clear-background"
};
const _hoisted_3$7 = ["for"];
const _hoisted_4$5 = {
  key: 0,
  class: "error clear-background"
};
const _hoisted_5$5 = ["disabled", "name", "height", "id", "readonly", "required", "multiple", "width", "data-error-message-value-missing"];
const _hoisted_6$4 = ["value", "selected"];

function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    (!_ctx.schema.label && _ctx.label)
      ? (openBlock(), createElementBlock("label", {
          key: 0,
          for: _ctx.getFieldID(),
          class: normalizeClass(_ctx.schema.labelClasses)
        }, [
          createTextVNode(toDisplayString(_ctx.$filters.capitalize(_ctx.schema.model)) + " ", 1 /* TEXT */),
          (_ctx.schema.required)
            ? (openBlock(), createElementBlock("span", _hoisted_2$8, "*"))
            : createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_1$d))
      : createCommentVNode("v-if", true),
    (_ctx.schema.label && _ctx.label)
      ? (openBlock(), createElementBlock("label", {
          key: 1,
          for: _ctx.getFieldID(),
          class: normalizeClass(_ctx.schema.labelClasses)
        }, [
          createTextVNode(toDisplayString(_ctx.schema.label) + " ", 1 /* TEXT */),
          (_ctx.schema.required)
            ? (openBlock(), createElementBlock("span", _hoisted_4$5, "*"))
            : createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_3$7))
      : createCommentVNode("v-if", true),
    withDirectives(createElementVNode("select", {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.model) = $event)),
      disabled: _ctx.schema.disabled,
      name: _ctx.schema.inputName || _ctx.getFieldID(),
      height: _ctx.schema.height,
      id: _ctx.getFieldID(),
      onChange: _cache[1] || (_cache[1] = $event => (_ctx.changed(_ctx.model))),
      readonly: _ctx.schema.readonly,
      required: _ctx.schema.required,
      multiple: _ctx.schema.multiple,
      class: normalizeClass(_ctx.schema.inputClasses),
      width: _ctx.schema.width,
      "data-error-message-value-missing": _ctx.schema.errorMessageValueMissing
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.schema.values, (value) => {
        return (openBlock(), createElementBlock("option", {
          value: value.key,
          selected: _ctx.isSelected(value),
          key: value.key
        }, toDisplayString(value.value), 9 /* TEXT, PROPS */, _hoisted_6$4))
      }), 128 /* KEYED_FRAGMENT */))
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_5$5), [
      [vModelSelect, _ctx.model]
    ])
  ]))
}

script$f.render = render$f;
script$f.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldSelect.vue";

var script$e = Vue.defineComponent({
    props: {
        model: Object,
        schema: Object,
        idSuffix: String,
    },
    methods: {
        getFieldID: function () {
            let result = "";
            if (this.schema.id) {
                result = this.schema.id;
            }
            else {
                result = this.schema.model.slugify();
            }
            if (this.idSuffix !== undefined) {
                result += this.idSuffix;
            }
            return result;
        },
        changed: function (newValue) {
            this.$emit("changed", newValue, this.schema);
        },
    }
});

const _hoisted_1$c = ["id", "checked", "disabled", "dirname", "name", "readonly", "required", "data-error-message-value-missing"];
const _hoisted_2$7 = ["for"];
const _hoisted_3$6 = {
  key: 0,
  class: "error clear-background"
};
const _hoisted_4$4 = ["for"];
const _hoisted_5$4 = {
  key: 0,
  class: "error clear-background"
};

function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    createElementVNode("input", {
      id: _ctx.getFieldID(),
      type: "checkbox",
      checked: _ctx.model,
      onClick: _cache[0] || (_cache[0] = $event => (_ctx.changed($event.target.checked))),
      disabled: _ctx.schema.disabled,
      dirname: _ctx.schema.dirname,
      name: _ctx.schema.inputName || _ctx.getFieldID(),
      readonly: _ctx.schema.readonly,
      required: _ctx.schema.required,
      "data-error-message-value-missing": _ctx.schema.errorMessageValueMissing,
      class: normalizeClass(_ctx.schema.inputClasses)
    }, null, 10 /* CLASS, PROPS */, _hoisted_1$c),
    (!_ctx.schema.label)
      ? (openBlock(), createElementBlock("label", {
          key: 0,
          for: _ctx.getFieldID(),
          class: normalizeClass(_ctx.schema.labelClasses)
        }, [
          createTextVNode(toDisplayString(_ctx.$filters.capitalize(_ctx.schema.model)) + " ", 1 /* TEXT */),
          (_ctx.schema.required)
            ? (openBlock(), createElementBlock("span", _hoisted_3$6, "*"))
            : createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_2$7))
      : createCommentVNode("v-if", true),
    (_ctx.schema.label)
      ? (openBlock(), createElementBlock("label", {
          key: 1,
          for: _ctx.getFieldID(),
          class: normalizeClass(_ctx.schema.labelClasses)
        }, [
          createTextVNode(toDisplayString(_ctx.schema.label) + " ", 1 /* TEXT */),
          (_ctx.schema.required)
            ? (openBlock(), createElementBlock("span", _hoisted_5$4, "*"))
            : createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_4$4))
      : createCommentVNode("v-if", true)
  ]))
}

script$e.render = render$e;
script$e.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldCheckbox.vue";

var script$d = Vue.defineComponent({
    props: {
        model: Object,
        schema: Object,
        idSuffix: String,
    },
    methods: {
        getFieldID: function (value) {
            let result = "";
            if (this.schema.id) {
                result = this.schema.id;
            }
            else {
                result = this.schema.model.slugify();
            }
            result += "-" + value;
            if (this.idSuffix !== undefined) {
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
        generateGuid: function (item) {
            let Key = item.key;
            if (Key) {
                return Key;
            }
            let result = '';
            for (let j = 0; j < 32; j++) {
                let i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            item.key = result;
            return item.key;
        },
    }
});

const _hoisted_1$b = { class: "flex row text-center" };
const _hoisted_2$6 = ["id", "checked", "onClick", "disabled", "name", "readonly"];
const _hoisted_3$5 = ["for"];

function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$b, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.schema.values, (value) => {
      return (openBlock(), createElementBlock("div", { key: value }, [
        createElementVNode("input", {
          id: _ctx.getFieldID(value),
          type: "radio",
          checked: _ctx.isItemChecked(value),
          onClick: $event => (_ctx.changed(value)),
          disabled: _ctx.schema.disabled,
          name: _ctx.schema.inputName || _ctx.getFieldName(),
          readonly: _ctx.schema.readonly,
          class: normalizeClass(_ctx.schema.inputClasses)
        }, null, 10 /* CLASS, PROPS */, _hoisted_2$6),
        createElementVNode("label", {
          for: _ctx.getFieldID(value)
        }, toDisplayString(_ctx.$filters.capitalize(value)), 9 /* TEXT, PROPS */, _hoisted_3$5)
      ]))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}

script$d.render = render$d;
script$d.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldRadio.vue";

var script$c = Vue.defineComponent({
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
            let result = "";
            if (this.schema.id) {
                result = this.schema.id;
            }
            else {
                result = this.schema.model.slugify();
            }
            if (this.idSuffix !== undefined) {
                result += this.idSuffix;
            }
            return result;
        },
        changed: function (newValue) {
            this.$emit("changed", newValue, this.schema);
        },
    }
});

const _hoisted_1$a = ["for"];
const _hoisted_2$5 = {
  key: 0,
  class: "error clear-background"
};
const _hoisted_3$4 = {
  key: 1,
  class: "clear-background active no-border small"
};
const _hoisted_4$3 = /*#__PURE__*/createElementVNode("span", { class: "fas fa-info-circle" }, null, -1 /* HOISTED */);
const _hoisted_5$3 = ["for"];
const _hoisted_6$3 = {
  key: 0,
  class: "error clear-background"
};
const _hoisted_7$3 = {
  key: 1,
  class: "clear-background active no-border small"
};
const _hoisted_8$3 = /*#__PURE__*/createElementVNode("span", { class: "fas fa-info-circle" }, null, -1 /* HOISTED */);
const _hoisted_9$2 = ["id", "disabled", "height", "maxlength", "minlength", "name", "placeholder", "title", "readonly", "required", "width", "rows", "data-error-message-value-missing", "data-error-message-too-long", "data-error-message-too-short"];
const _hoisted_10$2 = {
  key: 2,
  class: "clear-background active right small"
};
const _hoisted_11$2 = /*#__PURE__*/createElementVNode("span", { class: "fas fa-info-circle" }, null, -1 /* HOISTED */);
const _hoisted_12$2 = /*#__PURE__*/createElementVNode("br", { class: "clear" }, null, -1 /* HOISTED */);

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    (!_ctx.schema.label && _ctx.label)
      ? (openBlock(), createElementBlock("label", {
          key: 0,
          for: _ctx.getFieldID(),
          class: normalizeClass(_ctx.schema.labelClasses)
        }, [
          createTextVNode(toDisplayString(_ctx.$filters.capitalize(_ctx.schema.model)) + " ", 1 /* TEXT */),
          (_ctx.schema.required)
            ? (openBlock(), createElementBlock("span", _hoisted_2$5, "*"))
            : createCommentVNode("v-if", true),
          (_ctx.schema.hint)
            ? (openBlock(), createElementBlock("i", _hoisted_3$4, [
                _hoisted_4$3,
                createTextVNode(toDisplayString(_ctx.schema.hint), 1 /* TEXT */)
              ]))
            : createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_1$a))
      : createCommentVNode("v-if", true),
    (_ctx.schema.label && _ctx.label)
      ? (openBlock(), createElementBlock("label", {
          key: 1,
          for: _ctx.getFieldID(),
          class: normalizeClass(_ctx.schema.labelClasses)
        }, [
          createTextVNode(toDisplayString(_ctx.schema.label) + " ", 1 /* TEXT */),
          (_ctx.schema.required)
            ? (openBlock(), createElementBlock("span", _hoisted_6$3, "*"))
            : createCommentVNode("v-if", true),
          (_ctx.schema.hint)
            ? (openBlock(), createElementBlock("i", _hoisted_7$3, [
                _hoisted_8$3,
                createTextVNode(toDisplayString(_ctx.schema.hint), 1 /* TEXT */)
              ]))
            : createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_5$3))
      : createCommentVNode("v-if", true),
    withDirectives(createElementVNode("textarea", {
      id: _ctx.getFieldID(),
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.model) = $event)),
      onInput: _cache[1] || (_cache[1] = $event => (_ctx.changed($event.target.value))),
      disabled: _ctx.schema.disabled,
      height: _ctx.schema.height,
      maxlength: _ctx.schema.maxlength,
      minlength: _ctx.schema.minlength,
      name: _ctx.schema.inputName || _ctx.getFieldID(),
      placeholder: _ctx.schema.placeholder,
      title: _ctx.schema.placeholder,
      readonly: _ctx.schema.readonly,
      class: normalizeClass(_ctx.schema.inputClasses),
      required: _ctx.schema.required,
      width: _ctx.schema.width,
      rows: _ctx.schema.rows || 3,
      "data-error-message-value-missing": _ctx.schema.errorMessageValueMissing,
      "data-error-message-too-long": _ctx.schema.errorMessageTooLong,
      "data-error-message-too-short": _ctx.schema.errorMessageTooShort
    }, "\r\n        ", 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_9$2), [
      [vModelText, _ctx.model]
    ]),
    (_ctx.schema.maxlength)
      ? (openBlock(), createElementBlock("div", _hoisted_10$2, [
          _hoisted_11$2,
          createTextVNode(" " + toDisplayString(_ctx.schema.maxlength - _ctx.model.length) + " characters remaining (" + toDisplayString(_ctx.schema.maxlength) + " max) ", 1 /* TEXT */)
        ]))
      : createCommentVNode("v-if", true),
    _hoisted_12$2
  ]))
}

script$c.render = render$c;
script$c.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldTextarea.vue";

var script$b = Vue.defineComponent({
    props: {
        model: Object,
        schema: Object,
        idSuffix: String,
    },
    methods: {}
});

const _hoisted_1$9 = ["innerHTML"];

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.schema.classes),
    innerHTML: _ctx.model || _ctx.schema.model
  }, null, 10 /* CLASS, PROPS */, _hoisted_1$9))
}

script$b.render = render$b;
script$b.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldText.vue";

var script$a = Vue.defineComponent({
    data() {
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
            let result = "";
            if (this.schema.id) {
                result = this.schema.id;
            }
            else {
                result = this.schema.model.slugify();
            }
            if (this.idSuffix !== undefined) {
                result += this.idSuffix;
            }
            return result;
        },
        changed: function (event) {
            let that = this;
            that.filesAdded = that.filesAdded + event.target.files.length;
            that.ready = false;
            for (let x = 0; x < event.target.files.length; ++x) {
                let reader = new FileReader();
                reader.onload = (function (file) {
                    return function (readerEvent) {
                        that.files = that.files.concat({ filename: file, data: that.base64ArrayBuffer(reader.result) });
                        if (that.files.length === that.filesAdded) {
                            that.ready = true;
                        }
                    };
                })(event.target.files[x].name);
                reader.readAsArrayBuffer(event.target.files[x]);
            }
            this.check();
        },
        base64ArrayBuffer: function (buffer) {
            let binary = "";
            let bytes = new Uint8Array(buffer);
            let len = bytes.byteLength;
            for (let x = 0; x < len; ++x) {
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
            let index = this.files.indexOf(file);
            this.files.splice(index, 1);
            this.filesAdded--;
        },
        generateGuid: function (item) {
            let Key = item.key;
            if (Key) {
                return Key;
            }
            let result = '';
            for (let j = 0; j < 32; j++) {
                let i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            item.key = result;
            return item.key;
        },
    }
});

const _hoisted_1$8 = ["for"];
const _hoisted_2$4 = {
  key: 0,
  class: "error clear-background"
};
const _hoisted_3$3 = {
  key: 1,
  class: "clear-background active no-border small"
};
const _hoisted_4$2 = /*#__PURE__*/createElementVNode("span", { class: "fas fa-info-circle" }, null, -1 /* HOISTED */);
const _hoisted_5$2 = ["for"];
const _hoisted_6$2 = {
  key: 0,
  class: "error clear-background"
};
const _hoisted_7$2 = {
  key: 1,
  class: "clear-background active no-border small"
};
const _hoisted_8$2 = /*#__PURE__*/createElementVNode("span", { class: "fas fa-info-circle" }, null, -1 /* HOISTED */);
const _hoisted_9$1 = ["accept", "id", "multiple", "name", "required", "data-error-message-value-missing"];
const _hoisted_10$1 = { class: "flex" };
const _hoisted_11$1 = ["onClick"];
const _hoisted_12$1 = /*#__PURE__*/createTextVNode(" ");
const _hoisted_13$1 = { class: "body" };

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    (!_ctx.schema.label)
      ? (openBlock(), createElementBlock("label", {
          key: 0,
          for: _ctx.getFieldID(),
          class: normalizeClass(_ctx.schema.labelClasses)
        }, [
          createTextVNode(toDisplayString(_ctx.$filters.capitalize(_ctx.schema.model)) + " ", 1 /* TEXT */),
          (_ctx.schema.required)
            ? (openBlock(), createElementBlock("span", _hoisted_2$4, "*"))
            : createCommentVNode("v-if", true),
          (_ctx.schema.hint)
            ? (openBlock(), createElementBlock("i", _hoisted_3$3, [
                _hoisted_4$2,
                createTextVNode(toDisplayString(_ctx.schema.hint), 1 /* TEXT */)
              ]))
            : createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_1$8))
      : createCommentVNode("v-if", true),
    (_ctx.schema.label)
      ? (openBlock(), createElementBlock("label", {
          key: 1,
          for: _ctx.getFieldID(),
          class: normalizeClass(_ctx.schema.labelClasses)
        }, [
          createTextVNode(toDisplayString(_ctx.schema.label) + " ", 1 /* TEXT */),
          (_ctx.schema.required)
            ? (openBlock(), createElementBlock("span", _hoisted_6$2, "*"))
            : createCommentVNode("v-if", true),
          (_ctx.schema.hint)
            ? (openBlock(), createElementBlock("i", _hoisted_7$2, [
                _hoisted_8$2,
                createTextVNode(toDisplayString(_ctx.schema.hint), 1 /* TEXT */)
              ]))
            : createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_5$2))
      : createCommentVNode("v-if", true),
    createElementVNode("div", {
      class: normalizeClass(["file-upload", _ctx.schema.inputClasses])
    }, [
      createTextVNode(toDisplayString(_ctx.schema.placeholder) + " ", 1 /* TEXT */),
      createElementVNode("input", {
        accept: _ctx.schema.accept,
        id: _ctx.getFieldID(),
        onChange: _cache[0] || (_cache[0] = $event => (_ctx.changed($event))),
        multiple: _ctx.schema.multiple,
        name: _ctx.schema.inputName || _ctx.getFieldID(),
        required: _ctx.schema.required,
        type: "file",
        "data-error-message-value-missing": _ctx.schema.errorMessageValueMissing
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_9$1)
    ], 2 /* CLASS */),
    createElementVNode("div", _hoisted_10$1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.files, (file) => {
        return (openBlock(), createElementBlock("div", {
          class: normalizeClass(["upload-preview panel", _ctx.schema.previewClasses]),
          key: _ctx.generateGuid(file)
        }, [
          createElementVNode("header", null, [
            createElementVNode("div", {
              class: "header",
              onClick: $event => (_ctx.removeFile(file))
            }, "×", 8 /* PROPS */, _hoisted_11$1),
            _hoisted_12$1
          ]),
          createElementVNode("div", _hoisted_13$1, toDisplayString(file.filename), 1 /* TEXT */)
        ], 2 /* CLASS */))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

script$a.render = render$a;
script$a.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldUpload.vue";

var script$9 = Vue.defineComponent({
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
        generateGuid: function (item) {
            let Key = item.key;
            if (Key) {
                return Key;
            }
            let result = '';
            for (let j = 0; j < 32; j++) {
                let i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            item.key = result;
            return item.key;
        },
    }
});

const _hoisted_1$7 = { class: "controls" };
const _hoisted_2$3 = { class: "input-group" };
const _hoisted_3$2 = ["type", "value", "onClick"];

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$7, [
    createElementVNode("div", _hoisted_2$3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.schema.buttons, (button) => {
        return (openBlock(), createElementBlock("input", {
          key: _ctx.generateGuid(button),
          type: button.type,
          value: button.value,
          class: normalizeClass(button.classes),
          onClick: $event => (_ctx.click($event,button))
        }, null, 10 /* CLASS, PROPS */, _hoisted_3$2))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

script$9.render = render$9;
script$9.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldButtons.vue";

var script$8 = Vue.defineComponent({
    props: {
        model: Object,
        schema: Object,
        idSuffix: String,
    },
    methods: {
        show: function (method) {
            if (typeof method === 'function') {
                return method();
            }
            return method;
        },
        getFieldType: function (field) {
            return "clarity-form-field-" + field.type;
        },
        getModelValue: function (field) {
            return this.model[field.model];
        },
        error: function (errorCode) {
            this.$emit("error", errorCode);
        },
        exception: function (errorCode) {
            this.$emit("exception", errorCode);
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
            if (this.idSuffix === undefined) {
                return "";
            }
            return this.idSuffix;
        },
        generateGuid: function (item) {
            let Key = item.key;
            if (Key) {
                return Key;
            }
            let result = '';
            for (let j = 0; j < 32; j++) {
                let i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            item.key = result;
            return item.key;
        },
    }
});

const _hoisted_1$6 = { key: 0 };

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    (_ctx.show(_ctx.model.display || _ctx.schema.display))
      ? (openBlock(), createElementBlock("div", _hoisted_1$6, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.schema.fields, (item) => {
            return (openBlock(), createElementBlock("div", {
              key: _ctx.generateGuid(item)
            }, [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.getFieldType(item)), {
                schema: _ctx.getSchema(item),
                model: _ctx.getModelValue(item),
                "id-suffix": _ctx.getIDSuffix(item),
                onChanged: _ctx.setModelValue,
                onClick: _ctx.buttonClicked,
                onError: _ctx.error,
                onException: _ctx.exception
              }, null, 8 /* PROPS */, ["schema", "model", "id-suffix", "onChanged", "onClick", "onError", "onException"]))
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : createCommentVNode("v-if", true)
  ]))
}

script$8.render = render$8;
script$8.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldComplexConditional.vue";

var script$7 = Vue.defineComponent({
    data: function () {
        let DefaultItem = {};
        for (let property in this.model[0]) {
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
        error: function (errorCode) {
            this.$emit("error", errorCode);
        },
        exception: function (errorCode) {
            this.$emit("exception", errorCode);
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
            let Index = this.model.indexOf(item);
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
            if (this.idSuffix === undefined) {
                return index;
            }
            return this.idSuffix + index;
        },
        generateGuid: function (item) {
            let Key = item.key;
            if (Key) {
                return Key;
            }
            let result = '';
            for (let j = 0; j < 32; j++) {
                let i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            item.key = result;
            return item.key;
        },
    }
});

const _hoisted_1$5 = { key: 0 };
const _hoisted_2$2 = { key: 1 };
const _hoisted_3$1 = ["data-tooltip"];
const _hoisted_4$1 = /*#__PURE__*/createElementVNode("span", { class: "fas fa-info-circle no-border small" }, null, -1 /* HOISTED */);
const _hoisted_5$1 = [
  _hoisted_4$1
];
const _hoisted_6$1 = /*#__PURE__*/createElementVNode("th", null, null, -1 /* HOISTED */);
const _hoisted_7$1 = ["onClick"];
const _hoisted_8$1 = ["colspan"];

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    createElementVNode("table", {
      class: normalizeClass(["form-table", _ctx.schema.tableClasses])
    }, [
      createElementVNode("thead", null, [
        createElementVNode("tr", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.schema.fields, (item) => {
            return (openBlock(), createElementBlock("th", {
              key: _ctx.generateGuid(item)
            }, [
              (item.label)
                ? (openBlock(), createElementBlock("span", _hoisted_1$5, toDisplayString(_ctx.$filters.capitalize(item.label)), 1 /* TEXT */))
                : (openBlock(), createElementBlock("span", _hoisted_2$2, toDisplayString(_ctx.$filters.capitalize(item.model)), 1 /* TEXT */)),
              (_ctx.getSchema(item).hint)
                ? (openBlock(), createElementBlock("span", {
                    key: 2,
                    "data-tooltip": _ctx.getSchema(item).hint,
                    "data-tooltip-size": "extra-large"
                  }, _hoisted_5$1, 8 /* PROPS */, _hoisted_3$1))
                : createCommentVNode("v-if", true)
            ]))
          }), 128 /* KEYED_FRAGMENT */)),
          _hoisted_6$1
        ])
      ]),
      createElementVNode("tbody", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model, (item, index) => {
          return (openBlock(), createElementBlock("tr", {
            key: _ctx.generateGuid(item)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.schema.fields, (field) => {
              return (openBlock(), createElementBlock("td", {
                key: _ctx.generateGuid(field)
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(_ctx.getFieldType(field)), {
                  schema: _ctx.getSchema(field),
                  model: _ctx.getModelValue(field,item),
                  label: false,
                  "id-suffix": _ctx.getIDSuffix(field,index),
                  onChanged: newValue => _ctx.setModelValue(field,item,newValue),
                  onClick: _ctx.buttonClicked,
                  onError: _ctx.error,
                  onException: _ctx.exception
                }, null, 8 /* PROPS */, ["schema", "model", "id-suffix", "onChanged", "onClick", "onError", "onException"]))
              ]))
            }), 128 /* KEYED_FRAGMENT */)),
            createElementVNode("td", null, [
              createElementVNode("a", {
                class: "fas fa-minus-circle",
                onClick: withModifiers($event => (_ctx.removeItem(item)), ["stop","prevent"])
              }, null, 8 /* PROPS */, _hoisted_7$1)
            ])
          ]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      createElementVNode("tfoot", null, [
        createElementVNode("tr", null, [
          createElementVNode("td", {
            colspan: _ctx.schema.fields.length + 1
          }, [
            createElementVNode("a", {
              class: "fas fa-plus-circle",
              onClick: _cache[0] || (_cache[0] = withModifiers((...args) => (_ctx.addItem && _ctx.addItem(...args)), ["stop","prevent"]))
            }, "Add More")
          ], 8 /* PROPS */, _hoisted_8$1)
        ])
      ])
    ], 2 /* CLASS */)
  ]))
}

script$7.render = render$7;
script$7.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldComplexList.vue";

var script$6 = Vue.defineComponent({
    data() {
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
        error: function (errorCode) {
            this.$emit("error", errorCode);
        },
        exception: function (errorCode) {
            this.$emit("exception", errorCode);
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
            if (this.idSuffix === undefined) {
                return "";
            }
            return this.idSuffix;
        },
        generateGuid: function (item) {
            let Key = item.key;
            if (Key) {
                return Key;
            }
            let result = '';
            for (let j = 0; j < 32; j++) {
                let i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            item.key = result;
            return item.key;
        },
    }
});

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_clarity_tabs = resolveComponent("clarity-tabs");

  return (openBlock(), createElementBlock("div", null, [
    createVNode(_component_clarity_tabs, {
      sections: _ctx.schema.tabs,
      onSectionChanged: _ctx.tabChanged,
      class: normalizeClass(_ctx.schema.tabClasses)
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getFields(), (item) => {
          return (openBlock(), createElementBlock("div", {
            key: _ctx.generateGuid(item)
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.getFieldType(item)), {
              schema: _ctx.getSchema(item),
              model: _ctx.getModelValue(item),
              "id-suffix": _ctx.getIDSuffix(item),
              onChanged: _ctx.setModelValue,
              onClick: _ctx.buttonClicked,
              onError: _ctx.error,
              onException: _ctx.exception
            }, null, 8 /* PROPS */, ["schema", "model", "id-suffix", "onChanged", "onClick", "onError", "onException"]))
          ]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["sections", "onSectionChanged", "class"])
  ]))
}

script$6.render = render$6;
script$6.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldComplexTabs.vue";

var script$5 = Vue.defineComponent({
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
        error: function (errorCode) {
            this.$emit("error", errorCode);
        },
        exception: function (errorCode) {
            this.$emit("exception", errorCode);
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
            if (this.idSuffix === undefined) {
                return "";
            }
            return this.idSuffix;
        },
        generateGuid: function (item) {
            let Key = item.key;
            if (Key) {
                return Key;
            }
            let result = '';
            for (let j = 0; j < 32; j++) {
                let i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            item.key = result;
            return item.key;
        },
    }
});

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.schema.fields, (item) => {
      return (openBlock(), createElementBlock("div", {
        key: _ctx.generateGuid(item)
      }, [
        (openBlock(), createBlock(resolveDynamicComponent(_ctx.getFieldType(item)), {
          schema: _ctx.getSchema(item),
          model: _ctx.getModelValue(item),
          "id-suffix": _ctx.getIDSuffix(item),
          onChanged: _ctx.setModelValue,
          onClick: _ctx.buttonClicked,
          onError: _ctx.error,
          onException: _ctx.exception
        }, null, 8 /* PROPS */, ["schema", "model", "id-suffix", "onChanged", "onClick", "onError", "onException"]))
      ]))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}

script$5.render = render$5;
script$5.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldComplex.vue";

var script$4 = Vue.defineComponent({
    data: function () {
        let DefaultItem = {};
        for (let property in this.model[0]) {
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
        error: function (errorCode) {
            this.$emit("error", errorCode);
        },
        exception: function (errorCode) {
            this.$emit("exception", errorCode);
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
            let Index = this.model.indexOf(item);
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
            if (this.idSuffix === undefined) {
                return index;
            }
            return this.idSuffix + index;
        },
        generateGuid: function (item) {
            let Key = item.key;
            if (Key) {
                return Key;
            }
            let result = '';
            for (let j = 0; j < 32; j++) {
                let i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            item.key = result;
            return item.key;
        },
    }
});

const _hoisted_1$4 = ["onClick"];

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model, (item, index) => {
      return (openBlock(), createElementBlock("div", {
        key: _ctx.generateGuid(item),
        class: "border-bottom"
      }, [
        createElementVNode("a", {
          class: "fas fa-minus-circle right",
          onClick: withModifiers($event => (_ctx.removeItem(item)), ["stop","prevent"])
        }, null, 8 /* PROPS */, _hoisted_1$4),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.schema.fields, (field) => {
          return (openBlock(), createElementBlock("div", {
            key: _ctx.generateGuid(field)
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.getFieldType(field)), {
              schema: _ctx.getSchema(field),
              model: _ctx.getModelValue(field,item),
              label: true,
              "id-suffix": _ctx.getIDSuffix(field,index),
              onChanged: newValue => _ctx.setModelValue(field,item,newValue),
              onClick: _ctx.buttonClicked,
              onError: _ctx.error,
              onException: _ctx.exception
            }, null, 8 /* PROPS */, ["schema", "model", "id-suffix", "onChanged", "onClick", "onError", "onException"]))
          ]))
        }), 128 /* KEYED_FRAGMENT */))
      ]))
    }), 128 /* KEYED_FRAGMENT */)),
    createElementVNode("a", {
      class: "fas fa-plus-circle",
      onClick: _cache[0] || (_cache[0] = withModifiers((...args) => (_ctx.addItem && _ctx.addItem(...args)), ["stop","prevent"]))
    }, "Add More")
  ]))
}

script$4.render = render$4;
script$4.__file = "src/ts/Component/FormGenerator/Fields/ClarityFormFieldComplexRepeater.vue";

var script$3 = Vue.defineComponent({
    components: {
        "clarity-form-field-complex": script$5,
        'clarity-form-field-complex-conditional': script$8,
        'clarity-form-field-complex-list': script$7,
        'clarity-form-field-complex-tabs': script$6,
        'clarity-form-field-input': script$g,
        'clarity-form-field-select': script$f,
        'clarity-form-field-checkbox': script$e,
        'clarity-form-field-radio': script$d,
        'clarity-form-field-textarea': script$c,
        'clarity-form-field-text': script$b,
        'clarity-form-field-upload': script$a,
        'clarity-form-field-buttons': script$9,
        'clarity-form-field-complex-repeater': script$4,
        'clarity-form-validator': script$h
    },
    data: function () {
        return {
            submitting: false
        };
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
        error: function (errorCode) {
            this.$emit("error", errorCode);
        },
        exception: function (errorCode) {
            this.$emit("exception", errorCode);
        },
        buttonClicked: function (event, field) {
            this.revalidate();
            this.$emit("click", event, field);
        },
        reset: function () {
            let that = this;
            setTimeout(function () {
                that.revalidate();
            }, 100);
        },
        submit: function (event) {
            let that = this;
            if (!that.revalidate() || that.submitting) {
                event.preventDefault();
                return false;
            }
            that.submitting = true;
            if (that.ajaxAction) {
                Request.post(that.ajaxAction, that.model)
                    .onSuccess(function (x) {
                    that.submitting = false;
                    that.$emit("success", x);
                })
                    .onError(function (x) {
                    that.submitting = false;
                    that.$emit("error", x);
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
            if (oldModel === newModel) {
                return;
            }
            if (newModel !== null) {
                this.$nextTick(() => {
                    this.revalidate();
                });
            }
        },
    }
});

const _hoisted_1$3 = ["action"];
const _hoisted_2$1 = /*#__PURE__*/createTextVNode("The following errors were found");

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_clarity_form_validator = resolveComponent("clarity-form-validator");
  const _component_clarity_form_field_complex = resolveComponent("clarity-form-field-complex");

  return (openBlock(), createElementBlock("form", {
    action: _ctx.action,
    class: "stacked clarity-form",
    onReset: _cache[0] || (_cache[0] = (...args) => (_ctx.reset && _ctx.reset(...args))),
    onSubmit: _cache[1] || (_cache[1] = (...args) => (_ctx.submit && _ctx.submit(...args))),
    method: "post"
  }, [
    createVNode(_component_clarity_form_validator, { ref: "validation" }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "validationHeader", {}, () => [
          _hoisted_2$1
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 512 /* NEED_PATCH */),
    createVNode(_component_clarity_form_field_complex, {
      schema: _ctx.schema,
      model: _ctx.model,
      idSuffix: _ctx.getIDSuffix(),
      onChanged: _ctx.setModelValue,
      onClick: _ctx.buttonClicked,
      onError: _ctx.error,
      onException: _ctx.exception
    }, null, 8 /* PROPS */, ["schema", "model", "idSuffix", "onChanged", "onClick", "onError", "onException"])
  ], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1$3))
}

script$3.render = render$3;
script$3.__file = "src/ts/Component/FormGenerator/ClarityFormGenerator.vue";

var script$2 = Vue.defineComponent({
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
});

const _hoisted_1$2 = { class: "clarity-alert alert" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, { name: "fade" }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", _hoisted_1$2, [
        renderSlot(_ctx.$slots, "default")
      ], 512 /* NEED_PATCH */), [
        [vShow, _ctx.show]
      ])
    ]),
    _: 3 /* FORWARDED */
  }))
}

script$2.render = render$2;
script$2.__file = "src/ts/Component/Alert/ClarityAlert.vue";

var script$1 = Vue.defineComponent({
    data: function () {
        return {
            content: "",
            loaded: false
        };
    },
    props: {
        url: {
            type: String,
            default: ""
        }
    },
    beforeMount: function () {
        if (!this.url) {
            return;
        }
        let that = this;
        let url = this.url;
        let tag = '';
        let split_match = url.match(/[\s#]/);
        let split_index = (split_match != null) ? split_match.index : -1;
        if (split_index != -1) {
            tag = url.substring(split_index + (split_match[0] == " " ? 1 : 0));
            url = url.substring(0, split_index);
        }
        if (!url) {
            return;
        }
        Request.get(url)
            .type("text/html")
            .setParser(response => response.text())
            .setMode(StorageMode.StorageAndUpdate)
            .onSuccess(msg => {
            if (tag.length) {
                let tempDiv = document.createElement("div");
                tempDiv.innerHTML = msg;
                let items = tempDiv.querySelectorAll(tag);
                if (items.length > 0) {
                    that.content = items[0].outerHTML;
                    return;
                }
            }
            that.content = msg;
            that.loaded = true;
        })
            .send();
    }
});

const _hoisted_1$1 = ["innerHTML", "data-loaded"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: "clarity-content-loader",
    innerHTML: _ctx.content,
    "data-loaded": _ctx.loaded
  }, null, 8 /* PROPS */, _hoisted_1$1))
}

script$1.render = render$1;
script$1.__file = "src/ts/Component/ContentLoader/ClarityContentLoader.vue";

var InsertType;
(function (InsertType) {
    InsertType[InsertType["Image"] = 0] = "Image";
    InsertType[InsertType["File"] = 1] = "File";
})(InsertType || (InsertType = {}));

var script = Vue.defineComponent({
    components: {
        'clarity-modal': script$k
    },
    props: {
        title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        },
        iframeImageSrc: {
            type: String,
            default: ""
        },
        iframeFileSrc: {
            type: String,
            default: ""
        },
        preview: {
            type: Boolean,
            default: true
        },
        mentionsFormat: {
            type: String,
            default: ""
        }
    },
    data: function () {
        return {
            currentTitle: this.title,
            currentContent: this.content,
            displayFrame: false,
            iframeSrc: "",
            displayPreview: this.preview,
            converter: new showdown.Converter({ tables: true, strikethrough: true, emoji: true, underline: true, ghMentions: !!this.mentionsFormat, ghMentionsLink: this.mentionsFormat }),
            insertType: InsertType.Image,
            insertLink: ""
        };
    },
    mounted: function () {
        let that = this;
        window.addEventListener('message', function (message) {
            if (typeof message.data !== 'string')
                return;
            let command = JSON.parse(message.data);
            that.insertLink = command.href;
            that.insert();
        });
    },
    computed: {
        compiledMarkdown: function () {
            return this.markdown(this.currentContent);
        },
        IsImageInsert: function () {
            return this.insertType == InsertType.Image;
        },
        IsFileInsert: function () {
            return this.insertType == InsertType.File;
        }
    },
    methods: {
        insert: function () {
            this.displayFrame = false;
            if (!this.insertLink) {
                return;
            }
            if (this.insertType == InsertType.Image) {
                this.imageTag(this.insertLink);
            }
            else {
                this.linkTag(this.insertLink);
            }
        },
        showImageFrame: function () {
            this.showFrame(InsertType.Image);
        },
        showFileFrame: function () {
            this.showFrame(InsertType.File);
        },
        showFrame: function (type) {
            this.displayFrame = true;
            this.insertType = type;
            if (type === InsertType.Image) {
                this.iframeSrc = this.iframeImageSrc;
            }
            else {
                this.iframeSrc = this.iframeFileSrc;
            }
        },
        markdown: function (content) {
            if (!content) {
                return content;
            }
            return this.converter.makeHtml(content);
        },
        keyup: function () {
            this.$emit("keyup", {
                content: this.currentContent
            });
        },
        cancel: function () {
            this.$emit("cancel");
        },
        tag: function (tag) {
            let editor = document.getElementById('editorInput');
            if (!editor) {
                return;
            }
            let start = editor.selectionStart;
            let end = editor.selectionEnd;
            let tagText = tag + this.currentContent.substring(start, end);
            this.currentContent = this.currentContent.substring(0, start) + tagText + this.currentContent.substring(end, this.currentContent.length);
            editor.focus();
        },
        symmetricTag: function (tag) {
            let editor = document.getElementById('editorInput');
            if (!editor) {
                return;
            }
            let start = editor.selectionStart;
            let end = editor.selectionEnd;
            let tagText = tag + this.currentContent.substring(start, end) + tag;
            this.currentContent = this.currentContent.substring(0, start) + tagText + this.currentContent.substring(end, this.currentContent.length);
            editor.focus();
        },
        linkTag: function (href) {
            let editor = document.getElementById('editorInput');
            if (!editor) {
                return;
            }
            let start = editor.selectionStart;
            let end = editor.selectionEnd;
            let tagText = "[" + this.currentContent.substring(start, end) + "](" + href + ")";
            this.currentContent = this.currentContent.substring(0, start) + tagText + this.currentContent.substring(end, this.currentContent.length);
            editor.focus();
        },
        imageTag: function (href) {
            let editor = document.getElementById('editorInput');
            if (!editor) {
                return;
            }
            let start = editor.selectionStart;
            let end = editor.selectionEnd;
            let tagText = "![" + this.currentContent.substring(start, end) + "](" + href + ")";
            this.currentContent = this.currentContent.substring(0, start) + tagText + this.currentContent.substring(end, this.currentContent.length);
            editor.focus();
        }
    },
});

const _hoisted_1 = { class: "flex row clarity-simple-editor" };
const _hoisted_2 = {
  class: "flex-item flex justify-space-between column wrap",
  id: "editorRawInput"
};
const _hoisted_3 = { class: "menu pill flex-item" };
const _hoisted_4 = { class: "item has-children" };
const _hoisted_5 = /*#__PURE__*/createElementVNode("a", { href: "#!" }, "Header", -1 /* HOISTED */);
const _hoisted_6 = { class: "item has-children" };
const _hoisted_7 = /*#__PURE__*/createElementVNode("a", { href: "#!" }, "Format", -1 /* HOISTED */);
const _hoisted_8 = { class: "item has-children" };
const _hoisted_9 = /*#__PURE__*/createElementVNode("a", { href: "#!" }, "List", -1 /* HOISTED */);
const _hoisted_10 = { class: "item has-children" };
const _hoisted_11 = /*#__PURE__*/createElementVNode("a", { href: "#!" }, "File", -1 /* HOISTED */);
const _hoisted_12 = {
  key: 0,
  class: "flex-item panel",
  id: "editorCompiledInput"
};
const _hoisted_13 = { class: "body" };
const _hoisted_14 = ["innerHTML"];
const _hoisted_15 = { key: 0 };
const _hoisted_16 = { key: 1 };
const _hoisted_17 = ["src"];
const _hoisted_18 = { key: 1 };
const _hoisted_19 = /*#__PURE__*/createTextVNode(" URL: ");
const _hoisted_20 = /*#__PURE__*/createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_21 = /*#__PURE__*/createElementVNode("br", { class: "clear" }, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_clarity_modal = resolveComponent("clarity-modal");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      createElementVNode("nav", _hoisted_3, [
        createElementVNode("ul", null, [
          createElementVNode("li", _hoisted_4, [
            _hoisted_5,
            createElementVNode("ul", null, [
              createElementVNode("li", null, [
                createElementVNode("h1", null, [
                  createElementVNode("a", {
                    href: "#!",
                    onClick: _cache[0] || (_cache[0] = withModifiers($event => (_ctx.tag('#')), ["stop","prevent"]))
                  }, "Header 1")
                ])
              ]),
              createElementVNode("li", null, [
                createElementVNode("h2", null, [
                  createElementVNode("a", {
                    href: "#!",
                    onClick: _cache[1] || (_cache[1] = withModifiers($event => (_ctx.tag('##')), ["stop","prevent"]))
                  }, "Header 2")
                ])
              ]),
              createElementVNode("li", null, [
                createElementVNode("h3", null, [
                  createElementVNode("a", {
                    href: "#!",
                    onClick: _cache[2] || (_cache[2] = withModifiers($event => (_ctx.tag('###')), ["stop","prevent"]))
                  }, "Header 3")
                ])
              ]),
              createElementVNode("li", null, [
                createElementVNode("h4", null, [
                  createElementVNode("a", {
                    href: "#!",
                    onClick: _cache[3] || (_cache[3] = withModifiers($event => (_ctx.tag('####')), ["stop","prevent"]))
                  }, "Header 4")
                ])
              ]),
              createElementVNode("li", null, [
                createElementVNode("h5", null, [
                  createElementVNode("a", {
                    href: "#!",
                    onClick: _cache[4] || (_cache[4] = withModifiers($event => (_ctx.tag('#####')), ["stop","prevent"]))
                  }, "Header 5")
                ])
              ]),
              createElementVNode("li", null, [
                createElementVNode("h6", null, [
                  createElementVNode("a", {
                    href: "#!",
                    onClick: _cache[5] || (_cache[5] = withModifiers($event => (_ctx.tag('######')), ["stop","prevent"]))
                  }, "Header 6")
                ])
              ])
            ])
          ]),
          createElementVNode("li", _hoisted_6, [
            _hoisted_7,
            createElementVNode("ul", null, [
              createElementVNode("li", null, [
                createElementVNode("strong", null, [
                  createElementVNode("a", {
                    href: "#!",
                    onClick: _cache[6] || (_cache[6] = withModifiers($event => (_ctx.symmetricTag('**')), ["stop","prevent"]))
                  }, "Bold")
                ])
              ]),
              createElementVNode("li", null, [
                createElementVNode("em", null, [
                  createElementVNode("a", {
                    href: "#!",
                    onClick: _cache[7] || (_cache[7] = withModifiers($event => (_ctx.symmetricTag('*')), ["stop","prevent"]))
                  }, "Italics")
                ])
              ]),
              createElementVNode("li", null, [
                createElementVNode("del", null, [
                  createElementVNode("a", {
                    href: "#!",
                    onClick: _cache[8] || (_cache[8] = withModifiers($event => (_ctx.symmetricTag('~~')), ["stop","prevent"]))
                  }, "Strikethrough")
                ])
              ]),
              createElementVNode("li", null, [
                createElementVNode("u", null, [
                  createElementVNode("a", {
                    href: "#!",
                    onClick: _cache[9] || (_cache[9] = withModifiers($event => (_ctx.symmetricTag('__')), ["stop","prevent"]))
                  }, "Underline")
                ])
              ]),
              createElementVNode("li", null, [
                createElementVNode("a", {
                  href: "#!",
                  onClick: _cache[10] || (_cache[10] = withModifiers($event => (_ctx.tag('>')), ["stop","prevent"]))
                }, "Quote")
              ])
            ])
          ]),
          createElementVNode("li", null, [
            createElementVNode("a", {
              href: "#!",
              onClick: _cache[11] || (_cache[11] = withModifiers($event => (_ctx.tag('\n\n-------\n\n')), ["stop","prevent"]))
            }, "HR")
          ]),
          createElementVNode("li", _hoisted_8, [
            _hoisted_9,
            createElementVNode("ul", null, [
              createElementVNode("li", null, [
                createElementVNode("a", {
                  href: "#!",
                  onClick: _cache[12] || (_cache[12] = withModifiers($event => (_ctx.tag('1. ')), ["stop","prevent"])),
                  class: "fas fa-list-ol"
                }, "Ordered")
              ]),
              createElementVNode("li", null, [
                createElementVNode("a", {
                  href: "#!",
                  onClick: _cache[13] || (_cache[13] = withModifiers($event => (_ctx.tag('* ')), ["stop","prevent"])),
                  class: "fas fa-list-ul"
                }, "Unordered")
              ])
            ])
          ]),
          createElementVNode("li", _hoisted_10, [
            _hoisted_11,
            createElementVNode("ul", null, [
              createElementVNode("li", null, [
                createElementVNode("a", {
                  href: "#!",
                  onClick: _cache[14] || (_cache[14] = withModifiers($event => (_ctx.showImageFrame()), ["stop","prevent"])),
                  class: "fas fa-image"
                }, "Image")
              ]),
              createElementVNode("li", null, [
                createElementVNode("a", {
                  href: "#!",
                  onClick: _cache[15] || (_cache[15] = withModifiers($event => (_ctx.showFileFrame()), ["stop","prevent"])),
                  class: "fas fa-link"
                }, "File")
              ])
            ])
          ])
        ])
      ]),
      withDirectives(createElementVNode("textarea", {
        "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => ((_ctx.currentContent) = $event)),
        id: "editorInput",
        name: "editorInput",
        class: "flex-item",
        style: {"min-height":"500px"},
        onKeyup: _cache[17] || (_cache[17] = (...args) => (_ctx.keyup && _ctx.keyup(...args)))
      }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
        [vModelText, _ctx.currentContent]
      ])
    ]),
    (_ctx.displayPreview)
      ? (openBlock(), createElementBlock("div", _hoisted_12, [
          createElementVNode("div", _hoisted_13, [
            createElementVNode("h1", null, toDisplayString(_ctx.currentTitle), 1 /* TEXT */),
            createElementVNode("div", { innerHTML: _ctx.compiledMarkdown }, null, 8 /* PROPS */, _hoisted_14)
          ])
        ]))
      : createCommentVNode("v-if", true),
    createVNode(_component_clarity_modal, {
      "show-modal": _ctx.displayFrame,
      "css-classes": 'primary'
    }, {
      header: withCtx(() => [
        (_ctx.IsImageInsert)
          ? (openBlock(), createElementBlock("div", _hoisted_15, "Image Insert"))
          : createCommentVNode("v-if", true),
        (_ctx.IsFileInsert)
          ? (openBlock(), createElementBlock("div", _hoisted_16, "File Insert"))
          : createCommentVNode("v-if", true)
      ]),
      body: withCtx(() => [
        (_ctx.iframeSrc)
          ? (openBlock(), createElementBlock("iframe", {
              key: 0,
              src: _ctx.iframeSrc
            }, null, 8 /* PROPS */, _hoisted_17))
          : createCommentVNode("v-if", true),
        (!_ctx.iframeSrc)
          ? (openBlock(), createElementBlock("div", _hoisted_18, [
              createElementVNode("label", null, [
                _hoisted_19,
                withDirectives(createElementVNode("input", {
                  type: "url",
                  "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => ((_ctx.insertLink) = $event))
                }, null, 512 /* NEED_PATCH */), [
                  [vModelText, _ctx.insertLink]
                ])
              ]),
              _hoisted_20,
              createElementVNode("input", {
                type: "button",
                value: "Insert",
                onClick: _cache[19] || (_cache[19] = (...args) => (_ctx.insert && _ctx.insert(...args)))
              })
            ]))
          : createCommentVNode("v-if", true)
      ]),
      footer: withCtx(() => [
        createElementVNode("input", {
          type: "button",
          class: "close right",
          value: "Close",
          onClick: _cache[20] || (_cache[20] = $event => (_ctx.displayFrame = false))
        }),
        _hoisted_21
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["show-modal"])
  ]))
}

script.render = render;
script.__file = "src/ts/Component/Editor/SimpleEditor.vue";

let clickOutside = {
    bind: function (el) {
        clickOutside.onEventBound = clickOutside.onEvent.bind({ el });
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
function RegisterDirectives(app) {
    app.directive("click-outside", clickOutside);
    return app;
}

function RegisterFilters(app) {
    app.config.globalProperties.$filters = {
        moment: function (date, format) {
            if (!date) {
                return "N/A";
            }
            format = format || "MM/D/YYYY h:mm:ss A";
            return moment(date, "YYYY-MM-DDThh:mm:ss").format(format);
        },
        capitalize: function (str) {
            if (!str) {
                return "";
            }
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        maxsize: function (value, size) {
            if (!value) {
                return "";
            }
            return value.substr(0, size) + "...";
        },
        currency: function (value, locales, format) {
            if (!value) {
                return "";
            }
            locales = locales || "en-US";
            format = format || { style: 'currency', currency: 'USD' };
            return Intl.NumberFormat(locales, format).format(value);
        }
    };
    return app;
}

class Clarity {
    constructor() {
        this.hotkeys = new Hotkeys();
        this.router = new Router();
        this.validation = new FormValidation();
        this.validation.initialize();
        this.errorLogger = new ErrorLogging();
        this.history = new PageHistory();
        this.localStorage = new LocalStorage();
        this.sessionStorage = new SessionStorage();
        this.request = new Request("", "");
        window.addEventListener("keydown", x => this.hotkeys.press(x));
        window.addEventListener("load", x => this.validation.initialize(), false);
        window.onerror = (msg, url, ln, col, error) => {
            this.errorLogger.onError(msg.toString(), url, ln, col, error);
        };
        this.errorLogger.setLoggingFunction((message, stack) => { console.log(message); });
        SetupPolyfills();
    }
    SetupComponents(app) {
        app.component('clarity-modal', script$k);
        app.component('clarity-tabs', script$j);
        app.component('clarity-grid', script$i);
        app.component('clarity-form-validator', script$h);
        app.component('clarity-form-generator', script$3);
        app.component("clarity-form-field-complex", script$5);
        app.component('clarity-form-field-complex-conditional', script$8);
        app.component('clarity-form-field-complex-list', script$7);
        app.component('clarity-form-field-complex-tabs', script$6);
        app.component('clarity-form-field-input', script$g);
        app.component('clarity-form-field-select', script$f);
        app.component('clarity-form-field-checkbox', script$e);
        app.component('clarity-form-field-radio', script$d);
        app.component('clarity-form-field-textarea', script$c);
        app.component('clarity-form-field-text', script$b);
        app.component('clarity-form-field-upload', script$a);
        app.component('clarity-form-field-buttons', script$9);
        app.component('clarity-form-field-complex-repeater', script$4);
        app.component('clarity-form-validator', script$h);
        app.component('clarity-alert', script$2);
        app.component('clarity-content-loader', script$1);
        app.component("clarity-simple-editor", script);
        RegisterFilters(app);
        return RegisterDirectives(app);
    }
    get instance() {
        return this;
    }
    set instance(val) {
    }
}
function init() {
    window.clarity.instance = window.clarity.instance || new Clarity();
}

export { Clarity, DatabaseConnection, Downloader, Grid, Hotkeys, Request, StorageMode, init };
