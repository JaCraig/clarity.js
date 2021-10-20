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
    // Returns the current domain.
    static get domain(): string {
        return window.location.protocol + "//" + window.location.host + "/";
    }

    // Determines if this is being run locally or in production.
    static get isLocal(): boolean {
        return (/^https?:\/\/localhost:\d{1,5}\/$/).test(BrowserUtils.domain);
    }

    // Gets a value from the query string.
    public static GetQueryString(field: string): string {
        let href = window.location.href;
        var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
        var string = reg.exec(href);
        return string ? string[1] : null;
    }

    // Gets the hash without the hash bang.
    static get HashBang(): string {
        return window.location.hash.replace("#!", "");
    }

    // Gets the text after the last slash. Presumably the ID needed.
    static get Id(): string {
        return window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    }
}