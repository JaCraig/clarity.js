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

    Vue.component("clarity-form-field-complex-conditional", {
        props: {
            model: Object,
            schema: Object,
            idSuffix: String,
        },
        methods: {
            getFieldType: function(field) {
                return "clarity-form-field-" + field.type;
            },
            getModelValue: function(field) {
                return this.model[field.model];
            },
            setModelValue: function(newValue, field) {
                this.model[field.model] = newValue;
                this.$emit("changed", this.model, this.schema);
            },
            buttonClicked: function(event, field) {
                this.$emit("click", event, field);
            },
            getSchema: function(field) {
                if (field.type.startsWith("complex")) {
                    if (field.schema.model === undefined) {
                        field.schema.model = field.model;
                    }
                    return field.schema;
                }
                return field;
            },
            getIDSuffix: function(field) {
                return this.idSuffix;
            },
        },
        template: `<div>
                        <div v-if="model.display">
                            <div v-for="item in schema.fields">
                                <component :is="getFieldType(item)"
                                        :schema="getSchema(item)"
                                        :model="getModelValue(item)"
                                        :idSuffix="getIDSuffix(item)"
                                        @changed="setModelValue"
                                        @click="buttonClicked">
                                </component>
                            </div>
                        </div>
                    </div>`,
    });
}