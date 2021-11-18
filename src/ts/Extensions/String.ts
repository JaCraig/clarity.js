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


declare global {
    interface String {
        slugify(): string;
        stripHTML(): string;
        toNumber(): number;
    }
}

// "slugifies" the string.
String.prototype.slugify = function(): string {
    return this.trim().replace(/ /g, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").replace(/([^a-zA-Z0-9-_/./:]+)/g, "");
};

// Strips out HTML
String.prototype.stripHTML = function(): string {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = this;
    return (tempDiv.textContent || tempDiv.innerText || "").replace(/^\s+|\s+$/g, "");
};

// Converts it to a number, stripping out non numeric values
String.prototype.toNumber = function(): number {
    if (this == null)
        return 0;
    return parseFloat(this.stripHTML().replace(/[^0-9.-]/g, ""));
};

export {}