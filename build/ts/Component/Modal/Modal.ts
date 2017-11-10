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

module Components {

declare var Vue: any;

    Vue.component("clarity-modal", {
        data: function() {
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
        },
        template: `<div :class="{'modal': true, 'show': showModal}">
            <div :class="['panel', classes]">
                <header><slot name="header">Header</slot></header>
                <div class="body"><slot name="body">Body</slot></div>
                <footer>
                    <slot name="footer">
                        <input type="button" class="close right" value="Close" @click="closeModal" /><br class="clear" />
                    </slot>
                </footer>
            </div>
        </div>`,
    });
}