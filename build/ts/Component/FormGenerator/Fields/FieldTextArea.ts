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

    Vue.component("clarity-form-field-textarea", {
        props: {
            model: Object,
            schema: Object,
            idSuffix: String,
            label: {
                default: true,
                type: Boolean,
            },
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
        },
        template: `<div>
                        <label :for="getFieldID()" v-if="!schema.label && label" :class="schema.labelClasses">
                            {{ schema.model | capitalize }}
                            <span class="error clear-background" v-if="schema.required">*</span>
                            <i class="clear-background info fa-info-circle no-border small" v-if="schema.hint">{{ schema.hint }}</i>
                        </label>
                        <label :for="getFieldID()" v-if="schema.label && label" :class="schema.labelClasses">
                            {{ schema.label }}
                            <span class="error clear-background" v-if="schema.required">*</span>
                            <i class="clear-background info fa-info-circle no-border small" v-if="schema.hint">{{ schema.hint }}</i>
                        </label>
                        <textarea :id="getFieldID()"
                                v-model="model"
                                @input="changed($event.target.value)"
                                :disabled="schema.disabled"
                                :height="schema.height"
                                :maxlength="schema.maxlength"
                                :minlength="schema.minlength"
                                :name="schema.inputName || getFieldID()"
                                :placeholder="schema.placeholder"
                                :title="schema.placeholder"
                                :readonly="schema.readonly"
                                :class="schema.inputClasses"
                                :required="schema.required"
                                :width="schema.width"
                                :rows="schema.rows || 3"
                                :data-error-message-value-missing="schema.errorMessageValueMissing"
                                :data-error-message-too-long="schema.errorMessageTooLong"
                                :data-error-message-too-short="schema.errorMessageTooShort">
                        </textarea>
                        <div class="clear-background fa-info-circle info right small" v-if="schema.maxlength">
                            {{ schema.maxlength - model.length }} characters remaining ({{ schema.maxlength }} max)
                        </div>
                        <br class="clear" />
                    </div>`,
    });
}
