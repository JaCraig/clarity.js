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

    Vue.component("clarity-form-field-input", {
        props: {
            model: Object,
            schema: Object,
            formOptions: Array,
            disabled: Boolean,
        },
        methods: {
            getFieldID: function() {
                if (this.schema.id) {
                    return this.schema.id;
                }
                return this.schema.model.slugify();
            },
        },
        template: `<div>
                        <label :for="getFieldID()" v-if="!schema.label" :class="schema.labelClasses">
                            {{ schema.model | capitalize }}
                        </label>
                        <label :for="getFieldID()" v-if="schema.label" :class="schema.labelClasses">
                            {{ schema.label }}
                        </label>
                        <input :id="getFieldID()" />
                    </div>`,
    });
}
