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
// A set of browser/window related util functions.
export class BrowserUtils {
    // Is this running on OSX?
    static get isOSX(): boolean {
        return ~navigator.userAgent.indexOf("Mac OS X") !== -1;
    }

    // Returns the current domain.
    static get domain(): string {
        return "http://" + window.location.host;
    }

    // Determines if this is being run locally or in production.
    static get isLocal(): boolean {
        return (/^http:\/\/localhost:\d{5}$/).test(BrowserUtils.domain);
    }

    // Gets the URL parameter specified, unencoded.
    public static getURLParameter(name: string): string {
        return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search)
                || [, ""])[1].replace(/\+/g, "%20")) || null;
    }

    // Gets the hash without the hash bang.
    static get HashBang(): string {
        return window.location.hash.replace("#!", "");
    }

    // Gets the text after the last slash. Presumably the ID needed.
    static get Id(): string {
        return window.location.pathname.split("/").pop();
    }
}