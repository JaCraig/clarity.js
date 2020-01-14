
<template>
    <div>
        <table class="form-table" :class="schema.tableClasses">
            <thead>
                <tr>
                    <th v-for="(item, index) in schema.fields" v-bind:key="index">
                        <span v-if="item.label">
                            {{ item.label | capitalize }}
                        </span>
                        <span v-else>
                            {{ item.model | capitalize }}
                        </span>
                        <span v-if="getSchema(item).hint"
                            :data-tooltip="getSchema(item).hint"
                            data-tooltip-size="extra-large">
                            <span class="fa-info-circle no-border small"></span>
                        </span>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in model"  v-bind:key="index">
                    <td v-for="(field, fieldindex) in schema.fields"  v-bind:key="fieldindex">
                        <component :is="getFieldType(field)"
                                    :schema="getSchema(field)"
                                    :model="getModelValue(field,item)"
                                    :label="false"
                                    :idSuffix="getIDSuffix(field,index)"
                                    @changed="newValue => setModelValue(field,item,newValue)"
                                    @click="buttonClicked">
                        </component>
                    </td>
                    <td>
                        <a class="fa-minus-circle" @click.stop.prevent="removeItem(item)"></a>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td :colspan="schema.fields.length + 1">
                        <a class="fa-plus-circle" @click.stop.prevent="addItem">Add More</a>
                    </td>
                </tr>
            </tfoot>
        </table>
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
import ClarityFormFieldComplexTabs from './ClarityFormFieldComplexTabs.vue';

let ClarityFormFieldComplexList=Vue.extend({
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
        'clarity-form-field-complex-conditional': ClarityFormFieldComplexConditional,
        'clarity-form-field-complex-tabs': ClarityFormFieldComplexTabs
    },    
    data: function() {
        let DefaultItem = {};
        for (let property in this.model[0]) {
            if (this.model[0].hasOwnProperty(property)) {
                DefaultItem[property] = "";
            }
        }
        return {
            defaultItem: DefaultItem,
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
        getModelValue: function(field, item) {
            return item[field.model];
        },
        setModelValue: function(field, item, newValue) {
            item[field.model] = newValue;
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
        removeItem: function(item) {
            if (this.schema.confirmRemoval && !confirm("Are you sure you want to remove this item?")) {
                return;
            }
            if (!this.model) {
                this.model = [];
            }
            let Index = this.model.indexOf(item);
            this.model.splice(Index, 1);
            this.$emit("changed", this.model, this.schema);
        },
        addItem: function(item) {
            if (!this.model) {
                this.model = [];
            }
            this.model = this.model.concat(Object.assign({}, this.defaultItem));
            this.$emit("changed", this.model, this.schema);
        },
        getIDSuffix: function(field, index) {
            return this.idSuffix + index;
        },
    }
});


Vue.component('clarity-form-field-complex-list',ClarityFormFieldComplexList);

export default ClarityFormFieldComplexList;

</script>