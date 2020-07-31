
<template>
  <div v-cloak>
        <form :action="action" class="stacked" @reset="reset" @submit="submit" method="post">
            <clarity-form-validator ref="validation">
                <slot name="validationHeader">The following errors were found</slot>
            </clarity-form-validator>
            <clarity-form-field-complex
                :schema="schema"
                :model="model"
                :idSuffix="getIDSuffix()"
                @changed="setModelValue"
                @click="buttonClicked"
                @error="error"
                @exception="exception">
            </clarity-form-field-complex>
        </form>
    </div>
</template>

<script lang="ts">
import { Request } from '../../Framework/AJAX/Request'
import Vue from 'vue'
import ClarityFormValidator from '../FormValidation/ClarityFormValidator.vue'
import { RegisterFilters } from '../VueExtensions/VueFilters'
import { RegisterDirectives } from '../VueExtensions/VueDirectives'
import ClarityFormFieldInput from './Fields/ClarityFormFieldInput.vue';
import ClarityFormFieldSelect from './Fields/ClarityFormFieldSelect.vue';
import ClarityFormFieldCheckbox from './Fields/ClarityFormFieldCheckbox.vue';
import ClarityFormFieldRadio from './Fields/ClarityFormFieldRadio.vue';
import ClarityFormFieldTextarea from './Fields/ClarityFormFieldTextarea.vue';
import ClarityFormFieldText from './Fields/ClarityFormFieldText.vue';
import ClarityFormFieldUpload from './Fields/ClarityFormFieldUpload.vue';
import ClarityFormFieldButtons from './Fields/ClarityFormFieldButtons.vue';
import ClarityFormFieldComplexConditional from './Fields/ClarityFormFieldComplexConditional.vue';
import ClarityFormFieldComplexList from './Fields/ClarityFormFieldComplexList.vue';
import ClarityFormFieldComplexTabs from './Fields/ClarityFormFieldComplexTabs.vue';
import ClarityFormFieldComplex from './Fields/ClarityFormFieldComplex.vue';
import ClarityFormFieldRepeater from './Fields/ClarityFormFieldComplexRepeater.vue';


Vue.component('clarity-form-field-complex',ClarityFormFieldComplex);
Vue.component('clarity-form-field-complex-conditional',ClarityFormFieldComplexConditional);
Vue.component('clarity-form-field-complex-list',ClarityFormFieldComplexList);
Vue.component('clarity-form-field-complex-tabs',ClarityFormFieldComplexTabs);
Vue.component('clarity-form-field-input', ClarityFormFieldInput);
Vue.component('clarity-form-field-select', ClarityFormFieldSelect);
Vue.component('clarity-form-field-checkbox', ClarityFormFieldCheckbox);
Vue.component('clarity-form-field-radio', ClarityFormFieldRadio);
Vue.component('clarity-form-field-textarea', ClarityFormFieldTextarea);
Vue.component('clarity-form-field-text', ClarityFormFieldText);
Vue.component('clarity-form-field-upload', ClarityFormFieldUpload);
Vue.component('clarity-form-field-buttons', ClarityFormFieldButtons);
Vue.component('clarity-form-field-complex-repeater', ClarityFormFieldRepeater);

RegisterFilters();
RegisterDirectives();

export default Vue.extend({
    components: {
        "clarity-form-field-complex": ClarityFormFieldComplex
    },
    data: function(){
        return {
            submitting: false
        };
    },
    props: {
        schema: Object,
        model: Object,
        action: {
            default: "",
            type: String,
        },
        ajaxAction: {
            default: "",
            type: String,
        },
    },
    methods: {
        revalidate: function() {
            return this.$refs.validation.revalidate();
        },
        setModelValue: function(newValue: any, field: any) {
            this.model = newValue;
            this.revalidate();
            this.$emit("changed", this.model);
        },
        error: function(errorCode: any){
            this.$emit("error", errorCode);
        },
        exception: function(errorCode: any){
            this.$emit("exception", errorCode);
        },
        buttonClicked: function(event: any, field: any) {
            this.revalidate();
            this.$emit("click", event, field);
        },
        reset: function() {
            let that = this;
            setTimeout(function() {
                that.revalidate();
            }, 100);
        },
        submit: function(event: any) {
            let that = this;
            if (!that.revalidate() || that.submitting) {
                event.preventDefault();
                return false;
            }
            that.submitting = true;
            if (that.ajaxAction) {
                Request.post(that.ajaxAction, that.model)
                        .onSuccess(function (x) {
                            that.submitting = false;
                            that.$emit("success", x);
                        })
                        .onError(function (x) {
                            that.submitting = false;
                            that.$emit("error", x);
                        })
                        .onException(function (x) {
                            that.submitting = false;
                            that.$emit("exception", x);
                        })
                        .send();
                event.preventDefault();
                return false;
            }
            return true;
        },
        getIDSuffix: function() {
            return "";
        },
    },
    watch: {
        model: function(newModel, oldModel) {
            if (oldModel === newModel) {
                return;
            }
            if (newModel !== null) {
                this.$nextTick(() => {
                    this.revalidate();
                });
            }
        },
    }
});

</script>