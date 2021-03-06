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

import { Hotkeys } from "./Hotkey/Hotkeys";
import { Router } from "./Router/Router";
import { FormValidation } from "./Validation/FormValidation";
import { ErrorLogging } from "./Logging/ErrorLogging";
import { PageHistory } from "./History/PageHistory";
import { LocalStorage } from "./WebStorage/LocalStorage";
import { SessionStorage } from "./WebStorage/SessionStorage";
import { Request, StorageMode } from "./AJAX/Request";
import { DatabaseConnection } from "./Database/Database";
import { Closer } from "../Component/Closer/Closer";
import { DropDown } from "../Component/DropDown/DropDown";
import { Mobile } from "../Component/Mobile/Mobile";
import { IComponent } from "../Component/Interfaces/IComponent";

import ClarityModal from "../Component/Modal/ClarityModal.vue";
import ClarityTabs from "../Component/Tabs/ClarityTabs.vue";
import ClarityGrid from "../Component/Grid/ClarityGrid.vue";
import ClarityFormValidator from "../Component/FormValidation/ClarityFormValidator.vue";
import ClarityFormGenerator from "../Component/FormGenerator/ClarityFormGenerator.vue";
import Vue from 'vue';

// Starts up and generally manages the framework
class Clarity {
    // constructor
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

        this.components = [ new Closer(), new DropDown(), new Mobile() ];

        window.addEventListener("keydown", x => this.hotkeys.press(x));
        window.addEventListener("load", x => this.validation.initialize(), false);
        window.onerror = (msg, url, ln, col, error) => {
            this.errorLogger.onError(msg.toString(), url, ln, col, error);
        };
        this.errorLogger.setLoggingFunction((message:string, stack: string) => { console.log(message); });

        Vue.component('clarity-modal', ClarityModal);
        Vue.component('clarity-tabs', ClarityTabs);
        Vue.component('clarity-grid', ClarityGrid);
        Vue.component('clarity-form-validator', ClarityFormValidator);
        Vue.component('clarity-form-generator', ClarityFormGenerator);
    }

    // the various components
    private components: Array<IComponent>;

    // the hotkeys object
    public hotkeys: Hotkeys;

    // AJAX request object
    public request: Request;

    // The router object
    public router: Router;

    // The form validation object
    public validation: FormValidation;

    // The error logging object
    public errorLogger: ErrorLogging;

    // The page history object
    public history: PageHistory;

    // The local storage object
    public localStorage: LocalStorage;

    // The session storage object
    public sessionStorage: SessionStorage;
}

declare global {
    // Adding clarity to the window interface
    interface Window {
        // The clarity object
        clarity: Clarity;
    }
}

function init() {
    window.clarity = window.clarity || new Clarity();
}

export { Request, DatabaseConnection , init, StorageMode };