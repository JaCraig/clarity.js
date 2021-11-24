
<template>
    <div :class="schema.classes" v-html="model || schema.model"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.defineComponent({
    props: {
        model: Object,
        schema: Object,
        idSuffix: String,
    },
    methods: {
    }
});

</script>