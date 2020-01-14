
<template>
    <div class="tabs" v-cloak>
        <header>
            <ul class="row flex align-items-stretch">
                <li class="flex-item" v-for="(section, index) in sections" v-bind:key="index">
                    <a href="#!"
                        v-on:click.stop.prevent="switchSelected(section)"
                        class="tab"
                        v-bind:class="{ selected: section.selected }">
                            <span v-bind:class="[section.icon]"></span>
                            {{section.name}}
                    </a>
                </li>
            </ul>
        </header>
        <section>
            <slot></slot>
        </section>
    </div>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue.js'

export default Vue.extend({
    beforeMount: function() {
        this.switchSelected(this.initialSectionPicked);
    },
    data() {
        let tempSectionPicked = this.initialSectionPicked;
        if (tempSectionPicked === undefined && this.sections && this.sections.length > 0) {
            tempSectionPicked = this.sections[0];
        }
        return {
            sectionPicked: tempSectionPicked,
        };
    },
    methods: {
        switchSelected: function (item) {
            this.sectionPicked = item;
            this.switchTabs();
            this.$emit("section-changed", this.sectionPicked);
        },
        switchTabs: function() {
            if (this.sections === undefined) {
                return;
            }
            if (!this.sections.some(x => x === this.sectionPicked)) {
                this.sectionPicked = this.sections[0];
            }
            if (this.sectionPicked === undefined) {
                return;
            }
            this.sectionPicked.selected = true;
            for (let x = 0; x < this.sections.length; ++x) {
                if (this.sectionPicked !== this.sections[x]) {
                    this.sections[x].selected = false;
                }
            }
        },
    },
    props: {
        initialSectionPicked: Object,
        sections: Array,
    },
    watch: {
        sections: function(value) {
            this.switchSelected(this.sectionPicked);
        },
    },
});
</script>