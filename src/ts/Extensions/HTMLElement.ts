/*
   Copyright 2016 James Craig

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
interface HTMLElement {
    replaceClass(originalClassName: string, newClassName: string): void;
    toggleClass(originalClassName: string, newClassName: string): void;
    removeClass(className: string): void;
    addClass(className: string): void;
    show(): void;
    hide(): void;
    attribute(name: string, value ?: string): string;
    hasClass(className: string): boolean;
    getParentByClass(className: string): HTMLElement;
}

/**
 * Determines a parent object that has the class name specified
 * 
 * @param {string} className 
 * @returns {HTMLElement} 
 */
HTMLElement.prototype.getParentByClass = function (className: string): HTMLElement {
    let element = this.parentElement;
    while (element && !element.hasClass(className)) {
        element = element.parentElement;
    }
    return element;
};

/**
 * Determines if a CSS class is present
 * 
 * @param {string} className 
 * @returns {boolean} 
 */
HTMLElement.prototype.hasClass = function (className: string): boolean {
    return (" " + this.className + " ").indexOf(" " + className + " ") > -1;
};

/**
 * Replaces a CSS class in the element
 * 
 * @param {string} originalClassName 
 * @param {string} newClassName 
 */
HTMLElement.prototype.replaceClass = function (originalClassName: string, newClassName: string): void {
    let tempClassName = " " + this.className + " ";
    if (newClassName === "") {
        this.className = tempClassName.replace(new RegExp(" " + originalClassName + " ", "gi"), " ").trim();
    } else {
        this.className = tempClassName.replace(new RegExp(" " + originalClassName + " ", "gi"), " " + newClassName + " ").trim();
    }
};

/**
 * Toggles between two CSS classes.
 * 
 * @param {string} originalClassName 
 * @param {string} newClassName 
 * @returns {void} 
 */
HTMLElement.prototype.toggleClass = function (originalClassName: string, newClassName: string): void {
    if (this.hasClass(originalClassName)) {
        this.replaceClass(originalClassName, newClassName);
        return;
    }
    this.replaceClass(newClassName, originalClassName);
};

/**
 * Removes a CSS class from the element
 * 
 * @param {string} className 
 */
HTMLElement.prototype.removeClass = function (className: string): void {
    this.replaceClass(className, "");
};

/**
 * Adds a CSS class to the element
 * 
 * @param {string} className 
 */
HTMLElement.prototype.addClass = function (className: string): void {
    if (!this.hasClass(className)) {
        this.className += " " + className;
    }
};

/**
 * Shows the element
 *
 */
HTMLElement.prototype.show = function (): void {
    this.replaceClass("hidden", "show");
    this.addClass("show");
};

/**
 * Hides the element
 */
HTMLElement.prototype.hide = function (): void {
    this.replaceClass("show", "hidden");
    this.addClass("hidden");
};

/**
 * Gets or sets an attribute of the element based on the name specified.
 *
 * @param {string} name
 * @param {string} [value=null]
 * @returns {string}
 */
HTMLElement.prototype.attribute = function (name: string, value: string = null): string {
    if (value != null) {
        this.setAttribute(name, value);
        return value;
    }
    return this.getAttribute(name);
};
