
<template>
    <div>
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
            {{ $filters.capitalize(schema.model) }}
            <span class="error clear-background" v-if="schema.required">*</span>
        </label>
        <label :for="getFieldID()" v-if="schema.label" :class="schema.labelClasses">
            {{ schema.label }}
            <span class="error clear-background" v-if="schema.required">*</span>
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.defineComponent({
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
            if (this.idSuffix!==undefined) {
                result += this.idSuffix;
            }
            return result;
        },
        changed: function(newValue: any) {
            this.$emit("changed", newValue, this.schema);
        },
    }
});

</script>