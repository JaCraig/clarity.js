
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
                @click="buttonClicked">
            </clarity-form-field-complex>
        </form>
    </div>
</template>

<script lang="ts">
import { Request } from '../../Framework/AJAX/Request'
import Vue from 'vue/dist/vue.js'
import ClarityFormValidator from '../FormValidation/ClarityFormValidator.vue'
import ClarityFormFieldComplex from './Fields/ClarityFormFieldComplex.vue'
import { RegisterFilters } from '../VueExtensions/VueFilters'
import { RegisterDirectives } from '../VueExtensions/VueDirectives'

RegisterFilters();
RegisterDirectives();

export default Vue.extend({
    components: {
        "clarity-form-field-complex": ClarityFormFieldComplex
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
        setModelValue: function(newValue, field) {
            this.model = newValue;
            this.revalidate();
            this.$emit("changed", this.model);
        },
        buttonClicked: function(event, field) {
            this.revalidate();
            this.$emit("click", event, field);
        },
        reset: function() {
            let that = this;
            setTimeout(function() {
                that.revalidate();
            }, 100);
        },
        submit: function(event) {
            if (!this.revalidate()) {
                event.preventDefault();
                return false;
            }
            if (this.ajaxAction) {
                let that = this;
                Request.post(this.ajaxAction, this.model)
                                        .onSuccess(function (x) {
                                            that.$emit("success", x);
                                        })
                                        .onError(function (x) {
                                            that.$emit("error", x);
                                        })
                                        .onException(function (x) {
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