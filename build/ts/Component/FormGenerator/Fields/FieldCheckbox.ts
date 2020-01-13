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

/// <reference path="../../../Extensions/String.ts" />

import Vue from 'vue/dist/vue.js'

Vue.component("clarity-form-field-checkbox", {
    props: {
        model: Object,
        schema: Object,
        idSuffix: String,
    },
    methods: {
        getFieldID: function() {
            let result = "";
            if (this.schema.id) {
                result = this.schema.id;
            } else {
                result = this.schema.model.slugify();
            }
            if (this.idSuffix) {
                result += this.idSuffix;
            }
            return result;
        },
        changed: function(newValue) {
            this.$emit("changed", newValue, this.schema);
        },
    },
    template: `<div>
                    <input :id="getFieldID()"
                            type="checkbox"
                            :checked="model"
                            @click="changed($event.target.checked)"
                            :disabled="schema.disabled"
                            :dirname="schema.dirname"
                            :name="schema.inputName || getFieldID()"
                            :readonly="schema.readonly"
                            :required="schema.required"
                            :data-error-message-value-missing="schema.errorMessageValueMissing"
                            :class="schema.inputClasses"
                            />
                        <label :for="getFieldID()" v-if="!schema.label" :class="schema.labelClasses">
                            {{ schema.model | capitalize }}
                            <span class="error clear-background" v-if="schema.required">*</span>
                        </label>
                        <label :for="getFieldID()" v-if="schema.label" :class="schema.labelClasses">
                            {{ schema.label }}
                            <span class="error clear-background" v-if="schema.required">*</span>
                        </label>
                </div>`,
});
