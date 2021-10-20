
<template>
    <div>
        <label :for="getFieldID()" v-if="!schema.label && label" :class="schema.labelClasses">
            {{ $filters.capitalize(schema.model) }}
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
import { Request } from '../../../Framework/AJAX/Request'

export default Vue.defineComponent({
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
            if (this.idSuffix !== undefined) {
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
        getValues: function(data: any) {
            if(!data) {
                return null;
            }
            let itemToCheck=data;
            if(Array.isArray(data)) {
                itemToCheck = data[0];
            }
            let propertyNames = Object.getOwnPropertyNames(itemToCheck);
            for(let x=0;x<propertyNames.length;++x) {
                if(propertyNames[x]==="key"){
                    return data;
                }
                let tempData=this.getValues(itemToCheck[propertyNames[x]]);
                if(tempData) {
                    return tempData;
                }
            }
            return null;
        }
    },
    beforeMount: function() {
        if(!this.schema.valuesUrl) {
            return;
        }
        let that = this;
        Request.post(that.schema.valuesUrl,that.schema.valuesUrlData)
            .onSuccess(function(ev:any){
                if(!ev){
                    return;
                }
                let values = that.getValues(ev);
                if(values){
                    that.schema.values = values;
                }
            })
            .onError(function (x) {
                that.$emit("error", x);
            })
            .send();
    }
});

</script>