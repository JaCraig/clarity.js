
<template>
    <div>
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
            <option v-for="value in schema.values" :value="value.key" :selected="isSelected(value)" v-bind:key="value.key">
                {{ value.value }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
    }
});

</script>