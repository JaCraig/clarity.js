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
    
        Vue.component("clarity-form-field-radio", {
            props: {
                model: Object,
                schema: Object,
                formOptions: Array,
            },
            methods: {
                getFieldID: function(value) {
                    if (this.schema.id) {
                        return this.schema.id + "-" + value;
                    }
                    return this.schema.model.slugify() + "-" + value;
                },
                getFieldName: function() {
                    if (this.schema.id) {
                        return this.schema.id;
                    }
                    return this.schema.model.slugify();
                },
                changed: function(newValue) {
                    this.model = newValue;
                    this.$emit("changed", newValue, this.schema);
                },
                isItemChecked: function(item) {
                    return this.getItemValue(item) === this.model;
                },
                getItemValue: function(item) {
                    return item;
                },
            },
            template: `<div class="flex row text-center">
                            <div class="flex-item" v-for="value in schema.values">
                                <input :id="getFieldID(value)"
                                    type="radio"
                                    :checked="isItemChecked(value)"
                                    @click="changed(value)"
                                    :disabled="schema.disabled"
                                    :name="schema.inputName || getFieldName()"
                                    :readonly="schema.readonly"
                                    :class="schema.inputClasses"
                                    />
                                <label :for="getFieldID(value)">
                                    {{ value | capitalize }}
                                </label>
                            </div>
                        </div>`,
        });
    }