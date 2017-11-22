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
                errorMessages: [],
            };
        },
        beforeMount: function () {
            this.revalidate();
        },
        mounted: function () {
            this.$nextTick(function () {
                this.revalidate();
            });
        },
        methods: {
            revalidate: function () {
                if (!window.clarity.validation.validate()) {
                    this.errorMessages = window.clarity.validation.errors;
                    return false;
                } else {
                    this.errorMessages = [];
                    return true;
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
