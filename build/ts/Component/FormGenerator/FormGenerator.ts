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

/// <reference path="../FormValidation/FormValidator.ts" />

module Components {

    declare var Vue: any;

    Vue.component("clarity-form-generator", {
        props: {
            schema: Object,
            model: Object,
        },
        methods: {
            revalidate: function() {
                return this.$refs.validation.revalidate();
            },
            getFieldType: function(field) {
                return "clarity-form-field-" + field.type;
            },
            getModelValue: function(field) {
                return this.model[field.model];
            },
            setModelValue: function(newValue, field) {
                this.model[field.model] = newValue;
                this.revalidate();
                this.$emit("changed", this.model);
            },
        },
        watch: {
            model: function(newModel, oldModel) {
                if (oldModel === newModel) {
                    return;
                }
                if (newModel !== null) {
                    this.$nextTick(() => {
                        this.revalidate();
                    });
                }
            },
        },
        template: `<div v-cloak>
                        <clarity-form-validator ref="validation">
                            <slot name="validationHeader">The following errors were found</slot>
                        </clarity-form-validator>
                        <div v-for="item in schema.fields">
                            <component :is="getFieldType(item)"
                                       :schema="item"
                                       :model="getModelValue(item)"
                                       @changed="setModelValue">
                            </component>
                        </div>
                    </div>`,
    });
}
