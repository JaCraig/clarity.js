
<template>
    <div>
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
            <option v-for="(item, index) in schema.datalist" :value="item" v-bind:key="index" />
        </datalist>
    </div>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue.js'

export default Vue.extend({
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
        changed: function(newValue) {
            this.$emit("changed", newValue, this.schema);
        },
        getList: function() {
            if (this.schema.datalist !== undefined) {
                return this.getFieldID() + "-list";
            } else {
                return null;
            }
        },
    }
});

</script>