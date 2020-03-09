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

module Components {

    declare var Vue: any;

    Vue.component("clarity-form-field-select", {
        props: {
            model: Object,
            schema: Object,
            label: {
                default: true,
                type: Boolean,
            },
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
            changed: function(newValue: any) {
                this.$emit("changed", newValue, this.schema);
            },
            isSelected: function(value: any) {
                return this.model === value.key;
            },
        },
        template: `<div>
                        <label :for="getFieldID()" v-if="!schema.label && label" :class="schema.labelClasses">
                            {{ schema.model | capitalize }}
                            <span class="error clear-background" v-if="schema.required">*</span>
                        </label>
                        <label :for="getFieldID()" v-if="schema.label && label" :class="schema.labelClasses">
                            {{ schema.label }}
                            <span class="error clear-background" v-if="schema.required">*</span>
                        </label>
                        <select v-model="model"
                            :disabled="schema.disabled"
                            :name="schema.inputName || getFieldID()"
                            :height="schema.height"
                            :id="getFieldID()"
                            @change="changed(model)"
                            :readonly="schema.readonly"
                            :required="schema.required"
                            :multiple="schema.multiple"
                            :class="schema.inputClasses"
                            :width="schema.width"
                            :data-error-message-value-missing="schema.errorMessageValueMissing">
                            <option v-for="value in schema.values" :value="value.key" :selected="isSelected(value)">
                                {{ value.value }}
                            </option>
                        </select>
                    </div>`,
    });
}
