
<template>
  <div v-show="errorMessages.length > 0" class="panel error" v-cloak>
    <a name="errorSection"></a>
    <header><slot>Some Errors Were Discovered</slot></header>
    <ul>
        <li v-for="errorMessage in errorMessages" v-bind:key="errorMessage">{{ errorMessage }}</li>
    </ul>
</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.defineComponent({
    data() {
        return {
            errorMessages: <string[]>[],
        };
    },
    mounted() {
        this.$nextTick(function () {
            this.revalidate();
        });
    },
    methods: {
        revalidate: function () {
            if (this.$el == null) {
                return true;
            }
            let FormElement = this.getParentForm(this.$el);
            if (FormElement !== null && window.clarity.instance.validation.validateForm(FormElement).length > 0) {
                this.errorMessages = window.clarity.instance.validation.validateForm(FormElement);
                return false;
            } else if (FormElement === null && !window.clarity.instance.validation.validate()) {
                this.errorMessages = window.clarity.instance.validation.errors;
                return false;
            } else {
                this.errorMessages = [];
                return true;
            }
        },
        getParentForm: function (element: any) {
            let CurrentParent = element.parentNode;
            if (CurrentParent.nodeName === "FORM" || CurrentParent === null) {
                return CurrentParent;
            } else {
                return this.getParentForm(CurrentParent);
            }
        },
    }
});
</script>