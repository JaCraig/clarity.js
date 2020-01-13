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
/// <reference path="../../../Extensions/Object.ts" />

import Vue from 'vue/dist/vue.js'

Vue.component("clarity-form-field-complex-list", {
    data: function() {
        let DefaultItem = {};
        for (let property in this.model[0]) {
            if (this.model[0].hasOwnProperty(property)) {
                DefaultItem[property] = "";
            }
        }
        return {
            defaultItem: DefaultItem,
        };
    },
    props: {
        model: Object,
        schema: Object,
        idSuffix: String,
    },
    methods: {
        getFieldType: function(field) {
            return "clarity-form-field-" + field.type;
        },
        getModelValue: function(field, item) {
            return item[field.model];
        },
        setModelValue: function(field, item, newValue) {
            item[field.model] = newValue;
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
        removeItem: function(item) {
            if (this.schema.confirmRemoval && !confirm("Are you sure you want to remove this item?")) {
                return;
            }
            if (!this.model) {
                this.model = [];
            }
            let Index = this.model.indexOf(item);
            this.model.splice(Index, 1);
            this.$emit("changed", this.model, this.schema);
        },
        addItem: function(item) {
            if (!this.model) {
                this.model = [];
            }
            this.model = this.model.concat(Object.assign({}, this.defaultItem));
            this.$emit("changed", this.model, this.schema);
        },
        getIDSuffix: function(field, index) {
            return this.idSuffix + index;
        },
    },
    template: `<div>
                    <table class="form-table" :class="schema.tableClasses">
                        <thead>
                            <tr>
                                <th v-for="item in schema.fields">
                                    <span v-if="item.label">
                                        {{ item.label | capitalize }}
                                    </span>
                                    <span v-else>
                                        {{ item.model | capitalize }}
                                    </span>
                                    <span v-if="getSchema(item).hint"
                                        :data-tooltip="getSchema(item).hint"
                                        data-tooltip-size="extra-large">
                                        <span class="fa-info-circle no-border small"></span>
                                    </span>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in model">
                                <td v-for="field in schema.fields">
                                    <component :is="getFieldType(field)"
                                                :schema="getSchema(field)"
                                                :model="getModelValue(field,item)"
                                                :label="false"
                                                :idSuffix="getIDSuffix(field,index)"
                                                @changed="newValue => setModelValue(field,item,newValue)"
                                                @click="buttonClicked">
                                    </component>
                                </td>
                                <td>
                                    <a class="fa-minus-circle" @click.stop.prevent="removeItem(item)"></a>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td :colspan="schema.fields.length + 1">
                                    <a class="fa-plus-circle" @click.stop.prevent="addItem">Add More</a>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>`,
});
