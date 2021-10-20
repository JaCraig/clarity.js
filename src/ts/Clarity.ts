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

import { Hotkeys } from "./Framework/Hotkey/Hotkeys";
import { Router } from "./Framework/Router/Router";
import { FormValidation } from "./Framework/Validation/FormValidation";
import { ErrorLogging } from "./Framework/Logging/ErrorLogging";
import { PageHistory } from "./Framework/History/PageHistory";
import { LocalStorage } from "./Framework/WebStorage/LocalStorage";
import { SessionStorage } from "./Framework/WebStorage/SessionStorage";
import { Request, StorageMode } from "./Framework/AJAX/Request";
import { DatabaseConnection } from "./Framework/Database/Database";
import { Closer } from "./Component/Closer/Closer";
import { DropDown } from "./Component/DropDown/DropDown";
import { Mobile } from "./Component/Mobile/Mobile";
import { IComponent } from "./Component/Interfaces/IComponent";

import ClarityModal from "./Component/Modal/ClarityModal.vue";
import ClarityTabs from "./Component/Tabs/ClarityTabs.vue";
import ClarityGrid from "./Component/Grid/ClarityGrid.vue";
import ClarityFormValidator from "./Component/FormValidation/ClarityFormValidator.vue";
import ClarityFormGenerator from "./Component/FormGenerator/ClarityFormGenerator.vue";

import ClarityFormFieldInput from './Component/FormGenerator/Fields/ClarityFormFieldInput.vue';
import ClarityFormFieldSelect from './Component/FormGenerator/Fields/ClarityFormFieldSelect.vue';
import ClarityFormFieldCheckbox from './Component/FormGenerator/Fields/ClarityFormFieldCheckbox.vue';
import ClarityFormFieldRadio from './Component/FormGenerator/Fields/ClarityFormFieldRadio.vue';
import ClarityFormFieldTextarea from './Component/FormGenerator/Fields/ClarityFormFieldTextarea.vue';
import ClarityFormFieldText from './Component/FormGenerator/Fields/ClarityFormFieldText.vue';
import ClarityFormFieldUpload from './Component/FormGenerator/Fields/ClarityFormFieldUpload.vue';
import ClarityFormFieldButtons from './Component/FormGenerator/Fields/ClarityFormFieldButtons.vue';
import ClarityFormFieldComplexConditional from './Component/FormGenerator/Fields/ClarityFormFieldComplexConditional.vue';
import ClarityFormFieldComplexList from './Component/FormGenerator/Fields/ClarityFormFieldComplexList.vue';
import ClarityFormFieldComplexTabs from './Component/FormGenerator/Fields/ClarityFormFieldComplexTabs.vue';
import ClarityFormFieldComplex from './Component/FormGenerator/Fields/ClarityFormFieldComplex.vue';
import ClarityFormFieldRepeater from './Component/FormGenerator/Fields/ClarityFormFieldComplexRepeater.vue';

import { RegisterDirectives } from "./Component/VueExtensions/VueDirectives";
import { RegisterFilters } from "./Component/VueExtensions/VueFilters";
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

    // Sets up Vue components
    public SetupComponents (app: Vue.App<Element>): Vue.App<Element> {
        app.component('clarity-modal', ClarityModal);
        app.component('clarity-tabs', ClarityTabs);
        app.component('clarity-grid', ClarityGrid);
        app.component('clarity-form-validator', ClarityFormValidator);
        app.component('clarity-form-generator', ClarityFormGenerator);
        app.component("clarity-form-field-complex", ClarityFormFieldComplex);
        app.component('clarity-form-field-complex-conditional',ClarityFormFieldComplexConditional);
        app.component('clarity-form-field-complex-list',ClarityFormFieldComplexList);
        app.component('clarity-form-field-complex-tabs',ClarityFormFieldComplexTabs);
        app.component('clarity-form-field-input', ClarityFormFieldInput);
        app.component('clarity-form-field-select', ClarityFormFieldSelect);
        app.component('clarity-form-field-checkbox', ClarityFormFieldCheckbox);
        app.component('clarity-form-field-radio', ClarityFormFieldRadio);
        app.component('clarity-form-field-textarea', ClarityFormFieldTextarea);
        app.component('clarity-form-field-text', ClarityFormFieldText);
        app.component('clarity-form-field-upload', ClarityFormFieldUpload);
        app.component('clarity-form-field-buttons', ClarityFormFieldButtons);
        app.component('clarity-form-field-complex-repeater', ClarityFormFieldRepeater);
        app.component('clarity-form-validator', ClarityFormValidator);
        RegisterFilters(app);
        return RegisterDirectives(app);
    }

    public get instance():Clarity{
        return this;
    }

    public set instance(val: Clarity){

    }
}

declare global {
    // Adding clarity to the window interface
    interface Window {
        // The clarity object
        clarity: Clarity;
    }
}

function init() {
    window.clarity.instance = window.clarity.instance || new Clarity();
}

export { Request, DatabaseConnection , init, StorageMode,Hotkeys, Clarity };