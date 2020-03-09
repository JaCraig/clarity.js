
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
import Vue from 'vue';

export default Vue.extend({
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
        getFieldType: function(field: any) {
            return "clarity-form-field-" + field.type;
        },
        getModelValue: function(field: any) {
            return this.model[field.model];
        },
        setModelValue: function(newValue: any, field: any) {
            this.model[field.model] = newValue;
            this.$emit("changed", this.model, this.schema);
        },
        buttonClicked: function(event: any, field: any) {
            this.$emit("click", event, field);
        },
        getSchema: function(field: any) {
            if (field.type.startsWith("complex")) {
                if (field.schema.model === undefined) {
                    field.schema.model = field.model;
                }
                return field.schema;
            }
            return field;
        },
        tabChanged: function(pickedTab: any) {
            this.tabPicked = pickedTab;
        },
        getFields: function() {
            return this.tabPicked.fields;
        },
        getIDSuffix: function(field: any) {
            return this.idSuffix;
        },
    }
});

</script>