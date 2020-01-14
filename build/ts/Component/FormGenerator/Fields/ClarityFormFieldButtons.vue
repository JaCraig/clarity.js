
<template>
    <div class="controls">
        <div class="input-group">
            <input v-for="(button, index) in schema.buttons"
                    v-bind:key="index"
                    :type="button.type"
                    :value="button.value"
                    :class="button.classes"
                    @click="click($event,button)" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue.js'

export default Vue.extend({
    props: {
        model: Object,
        schema: Object,
        idSuffix: String,
    },
    methods: {
        click: function(event, button) {
            this.$emit("click", event, button);
            return false;
        },
    }
});


</script>