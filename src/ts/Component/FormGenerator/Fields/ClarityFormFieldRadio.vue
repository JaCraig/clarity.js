
<template>
    <div class="flex row text-center">
        <div class="flex-item" v-for="(value, index) in schema.values" v-bind:key="index">
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
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        model: Object,
        schema: Object,
        idSuffix: String,
    },
    methods: {
        getFieldID: function(value: any) {
            let result = "";
            if (this.schema.id) {
                result = this.schema.id;
            } else {
                result = this.schema.model.slugify();
            }
            result += "-" + value;
            if (this.idSuffix) {
                result += this.idSuffix;
            }
            return result;
        },
        getFieldName: function() {
            if (this.schema.id) {
                return this.schema.id;
            }
            return this.schema.model.slugify();
        },
        changed: function(newValue: any) {
            this.model = newValue;
            this.$emit("changed", newValue, this.schema);
        },
        isItemChecked: function(item: any) {
            return this.getItemValue(item) === this.model;
        },
        getItemValue: function(item: any) {
            return item;
        },
    }
});


</script>