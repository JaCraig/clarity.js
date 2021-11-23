<template>
    <transition name="fade">    
        <div class="clarity-alert alert" v-show="show" v-cloak>
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.defineComponent({
        props: {
            show: {
                type: Boolean,
                default: false
            }
        }
    });
</script>