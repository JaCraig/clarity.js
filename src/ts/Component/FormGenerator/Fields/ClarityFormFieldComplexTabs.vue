
<template>
    <div>
        <clarity-tabs
            :sections="schema.tabs"
            v-on:section-changed="tabChanged"
            :class="schema.tabClasses">
            <div v-for="(item) in getFields()" v-bind:key="generateGuid(item)">
                <component :is="getFieldType(item)"
                        :schema="getSchema(item)"
                        :model="getModelValue(item)"
                        :id-suffix="getIDSuffix(item)"
                        @changed="setModelValue"
                        @click="buttonClicked"
                        @error="error"
                        @exception="exception">
                </component>
            </div>
        </clarity-tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.defineComponent({
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
        error: function(errorCode: any){
            this.$emit("error", errorCode);
        },
        exception: function(errorCode: any){
            this.$emit("exception", errorCode);
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
            if(this.idSuffix === undefined) {
                return "";
            }
            return this.idSuffix;
        },
        generateGuid: function (item: any) {
            let Key = item.key;
            if(Key) {
                return Key;
            }
            let result = ''
            for (let j = 0; j < 32; j++) {
                let i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            item.key = result;
            return item.key;
        },
    }
});

</script>