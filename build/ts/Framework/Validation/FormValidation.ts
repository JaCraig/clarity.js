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

/// <reference path="../../Extensions/NodeList.ts" />
/// <reference path="../../Extensions/HTMLCollection.ts" />
/// <reference path="../../Extensions/HTMLElement.ts" />
/// <reference path="../../Types/StringDictionary.ts" />

module Framework.Validation {
    // Class to help with form validation
    export class FormValidation {
        constructor() {
            this.errors = [];
            this.messageAttributes = { };
            this.messageAttributes["patternMismatch"] = "data-error-message-pattern-mismatch";
            this.messageAttributes["rangeOverflow"] = "data-error-message-range-overflow";
            this.messageAttributes["rangeUnderflow"] = "data-error-message-range-underflow";
            this.messageAttributes["stepMismatch"] = "data-error-message-step-mismatch";
            this.messageAttributes["tooLong"] = "data-error-message-too-long";  
            this.messageAttributes["badInput"] = "data-error-message-bad-input";
            this.messageAttributes["typeMismatch"] = "data-error-message-type-mismatch";
            this.messageAttributes["valueMissing"] = "data-error-message-value-missing";
        }

        // The errors found when validating
        public errors: string[];

        // message attribute dictionary
        private messageAttributes: Types.StringDictionary<string>;

        // initializes the validation system for adding custom error messages
        public initialize(): void {
            let inputElements = document.getElementsByTagName("input").map(x => <HTMLInputElement>x).filter(x => x.willValidate);
            for (let x = 0; x < inputElements.length; ++x) {
                if (inputElements[x].type.toUpperCase() === "RADIO"
                    || inputElements[x].type.toUpperCase() === "CHECKBOX") {
                    inputElements[x].addEventListener("change", x => this.inputHandler(<HTMLInputElement>x.target));
                } else {
                    inputElements[x].addEventListener("input", x => this.inputHandler(<HTMLInputElement>x.target));
                }
                inputElements[x].addEventListener("invalid", x => this.invalidInputHandler(<HTMLInputElement>x.target));
            }
            let textAreaElements = document.getElementsByTagName("textarea").map(x => <HTMLTextAreaElement>x).filter(x => x.willValidate);
            for (let x = 0; x < textAreaElements.length; ++x) {
                textAreaElements[x].addEventListener("change", x => this.textAreaHandler(<HTMLTextAreaElement>x.target));
                textAreaElements[x].addEventListener("invalid", x => this.invalidTextAreaHandler(<HTMLTextAreaElement>x.target));
            }
            let selectElements = document.getElementsByTagName("select").map(x => <HTMLSelectElement>x).filter(x => x.willValidate);
            for (let x = 0; x < selectElements.length; ++x) {
                selectElements[x].addEventListener("change", x => this.selectHandler(<HTMLSelectElement>x.target));
                selectElements[x].addEventListener("invalid", x => this.invalidSelectHandler(<HTMLSelectElement>x.target));
            }
        }

        // Initialize an individual form
        public initializeForm(form: HTMLFormElement): void {
            let inputElements = form.getElementsByTagName("input").map(x => <HTMLInputElement>x).filter(x => x.willValidate);
            for (let x = 0; x < inputElements.length; ++x) {
                if (inputElements[x].type.toUpperCase() === "RADIO"
                    || inputElements[x].type.toUpperCase() === "CHECKBOX") {
                    inputElements[x].addEventListener("change", x => this.inputHandler(<HTMLInputElement>x.target));
                } else {
                    inputElements[x].addEventListener("input", x => this.inputHandler(<HTMLInputElement>x.target));
                }
                inputElements[x].addEventListener("invalid", x => this.invalidInputHandler(<HTMLInputElement>x.target));
            }
            let textAreaElements = form.getElementsByTagName("textarea").map(x => <HTMLTextAreaElement>x).filter(x => x.willValidate);
            for (let x = 0; x < textAreaElements.length; ++x) {
                textAreaElements[x].addEventListener("change", x => this.textAreaHandler(<HTMLTextAreaElement>x.target));
                textAreaElements[x].addEventListener("invalid", x => this.invalidTextAreaHandler(<HTMLTextAreaElement>x.target));
            }
            let selectElements = form.getElementsByTagName("select").map(x => <HTMLSelectElement>x).filter(x => x.willValidate);
            for (let x = 0; x < selectElements.length; ++x) {
                selectElements[x].addEventListener("change", x => this.selectHandler(<HTMLSelectElement>x.target));
                selectElements[x].addEventListener("invalid", x => this.invalidSelectHandler(<HTMLSelectElement>x.target));
            }
        }

        // invalid input handler
        private invalidInputHandler(input: HTMLInputElement): void {
            if (!input.validity.valid) {
                let errorMessages = this.getErrorMessages(input, input.validity);
                if (errorMessages.length > 0) {
                    input.setCustomValidity(errorMessages.join("\n"));
                }
            }
        }

        // invalid text area handler
        private invalidTextAreaHandler(textarea: HTMLTextAreaElement): void {
            if (!textarea.validity.valid) {
                let errorMessages = this.getErrorMessages(textarea, textarea.validity);
                if (errorMessages.length > 0) {
                    textarea.setCustomValidity(errorMessages.join("\n"));
                }
            }
        }

        // invalid select handler
        private invalidSelectHandler(select: HTMLSelectElement): void {
            if (!select.validity.valid) {
                let errorMessages = this.getErrorMessages(select, select.validity);
                if (errorMessages.length > 0) {
                    select.setCustomValidity(errorMessages.join("\n"));
                }
            }
        }

        // Input handler
        private inputHandler(input: HTMLInputElement): void {
            if (input.type.toUpperCase() === "RADIO") {
                let radioGroup = document.getElementsByName(input.name).map(x => <HTMLInputElement>x);
                for (let x = 0; x < radioGroup.length; ++x) {
                    radioGroup[x].setCustomValidity("");
                }
            } else {
                input.setCustomValidity("");
            }
            input.checkValidity();
        }

        // text area handler
        private textAreaHandler(textarea: HTMLTextAreaElement): void {
            textarea.setCustomValidity("");
            textarea.checkValidity();
        }

        // select handler
        private selectHandler(select: HTMLSelectElement): void {
            select.setCustomValidity("");
            select.checkValidity();
        }

        // Validates all elements, returning false if there are errors, true otherwise.
        public validate(): boolean {
            let result = true;
            this.errors = [];
            let inputElements = document.getElementsByTagName("input")
                                    .filter(x => !this.validateInput((<HTMLInputElement>x)));
            result = result && inputElements.length === 0;
            let selectElements = document.getElementsByTagName("select")
                                     .filter(x => !this.validateSelect((<HTMLSelectElement>x)));
            result = result && selectElements.length === 0;
            let textareaElements = document.getElementsByTagName("textarea")
                                     .filter(x => !this.validateTextArea((<HTMLTextAreaElement>x)));
            result = result && textareaElements.length === 0;
            return result;
        }

        // Validates all elements in the form, returning false if there are errors, true otherwise.
        public validateForm(form: HTMLFormElement): boolean {
            let result = true;
            this.errors = [];
            let inputElements = form.getElementsByTagName("input")
                                    .filter(x => !this.validateInput((<HTMLInputElement>x)));
            result = result && inputElements.length === 0;
            let selectElements = form.getElementsByTagName("select")
                                     .filter(x => !this.validateSelect((<HTMLSelectElement>x)));
            result = result && selectElements.length === 0;
            let textareaElements = form.getElementsByTagName("textarea")
                                     .filter(x => !this.validateTextArea((<HTMLTextAreaElement>x)));
            result = result && textareaElements.length === 0;
            return result;
        }

        // validates a select object
        private validateSelect(select: HTMLSelectElement): boolean {
            if (!select.checkValidity()) {
                let tempValue = this.getErrorMessages(select, select.validity);
                if (tempValue.length !== 0) {
                    this.errors = this.errors.concat(tempValue);
                }
                return false;
            }
            return true;
        }

        // validates a text area object
        private validateTextArea(textarea: HTMLTextAreaElement): boolean {
            if (!textarea.checkValidity()) {
                let tempValue = this.getErrorMessages(textarea, textarea.validity);
                if (tempValue.length !== 0) {
                    this.errors = this.errors.concat(tempValue);
                }
                return false;
            }
            return true;
        }

        // gets the error messages based on the validation state and element's defined error messages
        private getErrorMessages(element: HTMLElement, validity: ValidityState): string[] {
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
                } else {
                    tempValue = tempValue.concat((<HTMLInputElement>element).validationMessage);
                }
            }
            return tempValue;
        }

        // validates an input object
        private validateInput(input: HTMLInputElement): boolean {
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
}