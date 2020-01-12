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

/// <reference path="../../../Extensions/String.ts" />

module Components {

    declare var Vue: any;

    Vue.component("clarity-form-field-buttons", {
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
        },
        template: `<div class="controls">
                        <div class="input-group">
                            <input v-for="button in schema.buttons"
                                    :type="button.type"
                                    :value="button.value"
                                    :class="button.classes"
                                    @click="click($event,button)" />
                        </div>
                    </div>`,
    });
}