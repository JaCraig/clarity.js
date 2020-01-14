
<template>
    <div>
        <clarity-tabs
            :sections="schema.tabs"
            v-on:section-changed="tabChanged"
            :class="schema.tabClasses">
            <div v-for="(item, index) in getFields()" v-bind:key="index">
                <component :is="getFieldType(item)"
                        :schema="getSchema(item)"
                        :model="getModelValue(item)"
                        :idSuffix="getIDSuffix(item)"
                        @changed="setModelValue"
                        @click="buttonClicked">
                </component>
            </div>
        </clarity-tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue.js';
import ClarityFormFieldInput from './ClarityFormFieldInput.vue';
import ClarityFormFieldSelect from './ClarityFormFieldSelect.vue';
import ClarityFormFieldCheckbox from './ClarityFormFieldCheckbox.vue';
import ClarityFormFieldRadio from './ClarityFormFieldRadio.vue';
import ClarityFormFieldTextarea from './ClarityFormFieldTextarea.vue';
import ClarityFormFieldText from './ClarityFormFieldText.vue';
import ClarityFormFieldUpload from './ClarityFormFieldUpload.vue';
import ClarityFormFieldButtons from './ClarityFormFieldButtons.vue';
import ClarityFormFieldComplexConditional from './ClarityFormFieldComplexConditional.vue';
import ClarityFormFieldComplex from './ClarityFormFieldComplex.vue';
import ClarityFormFieldComplexList from './ClarityFormFieldComplexList.vue';

let ClarityFormFieldComplexTabs=Vue.extend({
    components: {
        'clarity-form-field-input': ClarityFormFieldInput,
        'clarity-form-field-select': ClarityFormFieldSelect,
        'clarity-form-field-checkbox': ClarityFormFieldCheckbox,
        'clarity-form-field-radio': ClarityFormFieldRadio,
        'clarity-form-field-textarea': ClarityFormFieldTextarea,
        'clarity-form-field-text': ClarityFormFieldText,
        'clarity-form-field-upload': ClarityFormFieldUpload,
        'clarity-form-field-buttons': ClarityFormFieldButtons,
        'clarity-form-field-complex': ClarityFormFieldComplex,
        'clarity-form-field-complex-list':ClarityFormFieldComplexList,
        'clarity-form-field-complex-conditional': ClarityFormFieldComplexConditional,
    },
    data() {
        return {
            tabPicked: this.schema.tabs[0],
        };
    },
    props: {
        model: Object,
        schema: Object,
        idSuffix: String,
    },
    methods: {
        getFieldType: function(field) {
            return "clarity-form-field-" + field.type;
        },
        getModelValue: function(field) {
            return this.model[field.model];
        },
        setModelValue: function(newValue, field) {
            this.model[field.model] = newValue;
            this.$emit("changed", this.model, this.schema);
        },
        buttonClicked: function(event, field) {
            this.$emit("click", event, field);
        },
        getSchema: function(field) {
            if (field.type.startsWith("complex")) {
                if (field.schema.model === undefined) {
                    field.schema.model = field.model;
                }
                return field.schema;
            }
            return field;
        },
        tabChanged: function(pickedTab) {
            this.tabPicked = pickedTab;
        },
        getFields: function() {
            return this.tabPicked.fields;
        },
        getIDSuffix: function(field) {
            return this.idSuffix;
        },
    }
});



Vue.component('clarity-form-field-complex-tabs',ClarityFormFieldComplexTabs);

export default ClarityFormFieldComplexTabs;

</script>