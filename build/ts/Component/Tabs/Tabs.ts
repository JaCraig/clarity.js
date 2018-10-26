/*
   Copyright 2016 James Craig

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
/// <reference path="../Interfaces/IComponent.ts" />
/// <reference path="../../Extensions/HTMLElement.ts" />
/// <reference path="../../Extensions/NodeList.ts" />

module Components {
    declare var Vue: any;

    Vue.component("clarity-tabs", {
        beforeMount: function() {
            this.switchSelected(this.initialSectionPicked);
        },
        data: function() {
            if (this.initialSectionPicked === undefined && this.section && this.section.length > 0) {
                this.initialSectionPicked = this.sections[0];
            }
            return {
                sectionPicked: this.initialSectionPicked,
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
        template: `<div class="tabs" v-cloak>
                        <header>
                            <ul class="row flex align-items-stretch">
                                <li class="flex-item" v-for="section in sections">
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
                    </div>`,
        watch: {
            sections: function(value) {
                this.switchSelected(this.sectionPicked);
            },
        },
    });
}
