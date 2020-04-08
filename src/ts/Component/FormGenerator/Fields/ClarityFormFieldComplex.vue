
<template>
    <div>
        <div v-for="(item, index) in schema.fields" v-bind:key="index">
            <component :is="getFieldType(item)"
                    :schema="getSchema(item)"
                    :model="getModelValue(item)"
                    :idSuffix="getIDSuffix(item)"
                    @changed="setModelValue"
                    @click="buttonClicked"
                    @error="error"
                    @exception="exception">
            </component>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
        error: function(errorCode: any){
            this.$emit("error", errorCode);
        },
        exception: function(errorCode: any){
            this.$emit("exception", errorCode);
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
        getIDSuffix: function(field: any) {
            return this.idSuffix;
        },
    }
});

</script>