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

/// <reference path="../FormValidation/ClarityFormValidator.vue" />
/// <reference path="../../Extensions/Object.ts" />

import { Request } from '../../Framework/AJAX/Request'
import Vue from 'vue/dist/vue.js'
// import ClarityFormValidator from '../FormValidation/ClarityFormValidator.vue'

Vue.component("clarity-form-generator", {
    props: {
        schema: Object,
        model: Object,
        action: {
            default: "",
            type: String,
        },
        ajaxAction: {
            default: "",
            type: String,
        },
    },
    methods: {
        revalidate: function() {
            return this.$refs.validation.revalidate();
        },
        setModelValue: function(newValue, field) {
            this.model = newValue;
            this.revalidate();
            this.$emit("changed", this.model);
        },
        buttonClicked: function(event, field) {
            this.revalidate();
            this.$emit("click", event, field);
        },
        reset: function() {
            let that = this;
            setTimeout(function() {
                that.revalidate();
            }, 100);
        },
        submit: function(event) {
            if (!this.revalidate()) {
                event.preventDefault();
                return false;
            }
            if (this.ajaxAction) {
                let that = this;
                Request.post(this.ajaxAction, this.model)
                                        .onSuccess(function (x) {
                                            that.$emit("success", x);
                                        })
                                        .onError(function (x) {
                                            that.$emit("error", x);
                                        })
                                        .onException(function (x) {
                                            that.$emit("exception", x);
                                        })
                                        .send();
                event.preventDefault();
                return false;
            }
            return true;
        },
        getIDSuffix: function() {
            return "";
        },
    },
    watch: {
        model: function(newModel, oldModel) {
            if (oldModel === newModel) {
                return;
            }
            if (newModel !== null) {
                this.$nextTick(() => {
                    this.revalidate();
                });
            }
        },
    },
    template: `<div v-cloak>
                    <form :action="action" class="stacked" @reset="reset" @submit="submit" method="post">
                        <clarity-form-validator ref="validation">
                            <slot name="validationHeader">The following errors were found</slot>
                        </clarity-form-validator>
                        <clarity-form-field-complex
                            :schema="schema"
                            :model="model"
                            :idSuffix="getIDSuffix()"
                            @changed="setModelValue"
                            @click="buttonClicked">
                        </clarity-form-field-complex>
                    </form>
                </div>`,
});
