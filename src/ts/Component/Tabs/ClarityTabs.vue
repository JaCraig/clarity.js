<template>
    <div class="tabs" v-cloak>
        <header>
            <ul class="row flex align-items-stretch">
                <li class="flex-item" v-for="(section, index) in sections" v-bind:key="index">
                    <a href="#!"
                        v-on:click.stop.prevent="switchSelected(section.name)"
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
import Vue from 'vue'

export default Vue.extend({
    methods: {
        findTab: function(tabName: string) {
            if(!this.sections || this.sections.length === 0) {
                return null;
            }
            if(!tabName || tabName === undefined){
                tabName = this.sections[0].name;
            }
            return this.sections.filter((x:any) =>  x.name === tabName)[0];
        },
        switchSelected: function (item: string) {
            this.sectionPicked = this.findTab(item);
            this.switchTabs();
            this.$emit("section-changed", this.sectionPicked);
        },
        switchTabs: function() {
            if (this.sections === undefined) {
                return;
            }
            if (!this.sections.some((x: any) => x === this.sectionPicked)) {
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
        initialSectionPicked: function(value) {
            this.switchSelected(this.initialSectionPicked);
        }
    },
    data() {
        let tempSectionPicked = this.findTab(this.initialSectionPicked);
        return {
            sectionPicked: tempSectionPicked,
        };
    },
    beforeMount: function() {
        this.switchSelected(this.initialSectionPicked);
    }
});
</script>