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

/// <reference path="../../Framework/Clarity.ts" />

module Components {

    declare var Vue: any;

    Vue.component("clarity-form-validator", {
        data: function () {
            return {
                errorMessages: <any[]>[],
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
                let FormElement = this.getParentForm(this.$el);
                if (FormElement !== null && window.clarity.validation.validateForm(FormElement).length > 0) {
                    this.errorMessages = window.clarity.validation.validateForm(FormElement);
                    return false;
                } else if (FormElement === null && !window.clarity.validation.validate()) {
                    this.errorMessages = window.clarity.validation.errors;
                    return false;
                } else {
                    this.errorMessages = [];
                    return true;
                }
            },
            getParentForm: function (element: any) {
                let CurrentParent = element.parentNode;
                if (CurrentParent.nodeName === "FORM" || CurrentParent === null) {
                    return CurrentParent;
                } else {
                    return this.getParentForm(CurrentParent);
                }
            },
        },
        template: `<div v-show="errorMessages.length > 0" class="panel error" v-cloak>
                        <a name="errorSection"></a>
                        <header><slot>Some Errors Were Discovered</slot></header>
                        <ul>
                            <li v-for="errorMessage in errorMessages">{{ errorMessage }}</li>
                        </ul>
                    </div>`,
    });
}
