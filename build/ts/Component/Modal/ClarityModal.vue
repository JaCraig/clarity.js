
<template>
    <div :class="{'modal': true, 'show': showModal}" v-cloak>
        <div :class="['panel', classes]">
            <header><slot name="header">Header</slot></header>
            <div class="body"><slot name="body">Body</slot></div>
            <footer>
                <slot name="footer">
                    <input type="button" class="close right" value="Close" @click="closeModal" /><br class="clear" />
                </slot>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue.js'

export default Vue.extend({
    data() {
        return {
            classes: this.cssClasses,
        };
    },
    methods: {
        closeModal: function() {
            this.showModal = false;
            this.$emit("close");
        },
    },
    props: {
        cssClasses: String,
        showModal: {
            default: false,
            type: Boolean,
        },
    }
});
</script>