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

    Vue.component("clarity-form-field-input", {
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
            getList: function() {
                if (this.schema.datalist !== undefined) {
                    return this.getFieldID() + "-list";
                } else {
                    return null;
                }
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
                        <input :id="getFieldID()"
                               :type="schema.inputType"
                               v-model="model"
                               @input="changed($event.target.value)"
                               :disabled="schema.disabled"
                               :accept="schema.accept"
                               :alt="schema.alt"
                               :autocomplete="schema.autocomplete"
                               :checked="schema.checked"
                               :dirname="schema.dirname"
                               :formaction="schema.formaction"
                               :formenctype="schema.formenctype"
                               :formmethod="schema.formmethod"
                               :formnovalidate="schema.formnovalidate"
                               :formtarget="schema.formtarget"
                               :height="schema.height"
                               :list="getList()"
                               :max="schema.max"
                               :maxlength="schema.maxlength"
                               :min="schema.min"
                               :minlength="schema.minlength"
                               :multiple="schema.multiple"
                               :name="schema.inputName || getFieldID()"
                               :pattern="schema.pattern"
                               :placeholder="schema.placeholder"
                               :title="schema.placeholder"
                               :readonly="schema.readonly"
                               :required="schema.required"
                               :size="schema.size"
                               :src="schema.src"
                               :step="schema.step"
                               :width="schema.width"
                               :files="schema.files"
                               :class="schema.inputClasses"
                               :data-error-message-value-missing="schema.errorMessageValueMissing"
                               :data-error-message-pattern-mismatch="schema.errorMessagePatternMismatch"
                               :data-error-message-range-overflow="schema.errorMessageRangeOverflow"
                               :data-error-message-range-underflow="schema.errorMessageRangeUnderflow"
                               :data-error-message-step-mismatch="schema.errorMessageStepMismatch"
                               :data-error-message-too-long="schema.errorMessageTooLong"
                               :data-error-message-too-short="schema.errorMessageTooShort"
                               :data-error-message-bad-input="schema.errorMessageBadInput"
                               :data-error-message-type-mismatch="schema.errorMessageTypeMismatch"
                               />
                        <div class="text-center" v-if="schema.inputType === 'color' || schema.inputType === 'range'">{{ model }}</div>
                        <datalist v-if="schema.datalist" :id="getList()">
                            <option v-for="item in schema.datalist" :value="item" />
                        </datalist>
                    </div>`,
    });
}
