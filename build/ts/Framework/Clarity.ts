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

/// <reference path="./Hotkey/Hotkeys.ts" />
/// <reference path="./Router/Router.ts" />
/// <reference path="./Validation/FormValidation.ts" />
/// <reference path="./Logging/ErrorLogging.ts" />
/// <reference path="./Router/Interfaces/IRouter.ts" />
/// <reference path="./Interfaces/IRouteConfiguration.ts" />
/// <reference path="./Interfaces/IHotkeyConfiguration.ts" />
/// <reference path="../Types/StringDictionary.ts" />
/// <reference path="./History/PageHistory.ts" />
/// <reference path="./WebStorage/LocalStorage.ts" />
/// <reference path="./WebStorage/SessionStorage.ts" />
/// <reference path="../Component/Closer/Closer.ts" />
/// <reference path="../Component/DropDown/DropDown.ts" />
/// <reference path="../Component/Mobile/Mobile.ts" />
/// <reference path="../Component/Tabs/Tabs.ts" />

module Framework {

    // Starts up and generally manages the framework
    export class Clarity {
        // constructor
        constructor() {
            this.hotkeys = new Hotkey.Hotkeys();
            this.router = new Router.Router();
            this.validation = new Validation.FormValidation();
            this.errorLogger = new Logging.ErrorLogging();
            this.history = new History.PageHistory();
            this.localStorage = new WebStorage.LocalStorage();
            this.sessionStorage = new WebStorage.SessionStorage();

            this.closer = new Closer.Closer();
            this.dropDown = new DropDown.DropDown();
            this.mobile = new Mobile.Mobile();
            // this.modal = new Modal.Modal();
            this.tabs = new Tabs.Tabs();

            window.addEventListener("keydown", x => this.hotkeys.press(x));
            window.addEventListener("load", x => this.validation.initialize(), false);
            window.onerror = (msg, url, ln, col, error) => {
                this.errorLogger.onError(msg, url, ln, col, error);
            };
        }

        // the tabs component
        private tabs: Tabs.Tabs;

        // the modal component
        // private modal: Modal.Modal;

        // the mobile component
        private mobile: Mobile.Mobile;

        // the drop down component
        private dropDown: DropDown.DropDown;

        // the closer component
        private closer: Closer.Closer;

        // the hotkeys object
        public hotkeys: Hotkey.Hotkeys;

        // The router object
        public router: Router.Router;

        // The form validation object
        public validation: Validation.FormValidation;

        // The error logging object
        public errorLogger: Logging.ErrorLogging;

        // The page history object
        public history: History.PageHistory;

        // The local storage object
        public localStorage: WebStorage.LocalStorage;

        // The session storage object
        public sessionStorage: WebStorage.SessionStorage;
    }
}

// Adding clarity to the window interface
interface Window {
    // The clarity object
    clarity: Framework.Clarity;
}

window.clarity = window.clarity || new Framework.Clarity();