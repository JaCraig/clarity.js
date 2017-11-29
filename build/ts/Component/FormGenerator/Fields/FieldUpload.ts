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

    Vue.component("clarity-form-field-upload", {
        data: function() {
            return {
                files: [],
                ready: false,
                filesAdded: 0,
            };
        },
        props: {
            model: Object,
            schema: Object,
        },
        methods: {
            getFieldID: function() {
                if (this.schema.id) {
                    return this.schema.id;
                }
                return this.schema.model.slugify();
            },
            changed: function(event) {
                let that = this;
                that.filesAdded = that.filesAdded + event.target.files.length;
                that.ready = false;
                for (let x = 0; x < event.target.files.length; ++x) {
                    let reader = new FileReader();
                    reader.onload = (function(file) {
                        return function(readerEvent) {
                            that.files = that.files.concat({ filename: file, data: that.base64ArrayBuffer(reader.result) });
                            if (that.files.length === that.filesAdded) {
                                that.ready = true;
                            }
                        };
                    })(event.target.files[x].name);
                    reader.readAsArrayBuffer(event.target.files[x]);
                }
                this.check();
            },
            base64ArrayBuffer: function(buffer) {
                let binary = "";
                let bytes = new Uint8Array( buffer );
                let len = bytes.byteLength;
                for (let x = 0; x < len; ++x) {
                    binary += String.fromCharCode(bytes[x]);
                }
                return window.btoa( binary );
            },
            check: function() {
                if (this.ready === true) {
                    this.$emit("changed", this.files, this.schema);
                    return;
                }
                setTimeout(this.check, 100);
            },
            removeFile: function(file) {
                let index = this.files.indexOf(file);
                this.files.splice(index, 1);
                this.filesAdded--;
            },
        },
        template: `<div>
                        <label :for="getFieldID()" v-if="!schema.label" :class="schema.labelClasses">
                            {{ schema.model | capitalize }}
                            <i class="clear-background info fa-info-circle no-border small" v-if="schema.hint">{{ schema.hint }}</i>
                        </label>
                        <label :for="getFieldID()" v-if="schema.label" :class="schema.labelClasses">
                            {{ schema.label }}
                            <i class="clear-background info fa-info-circle no-border small" v-if="schema.hint">{{ schema.hint }}</i>
                        </label>
                        <div class="file-upload" :class="schema.inputClasses">
                            {{ schema.placeholder }}
                            <input :accept="schema.accept"
                                :id="getFieldID()"
                                @change="changed($event)"
                                :multiple="schema.multiple"
                                :name="schema.inputName || getFieldID()"
                                :required="schema.required"
                                type="file"
                                :data-error-message-value-missing="schema.errorMessageValueMissing" />
                        </div>
                        <div class="flex">
                            <div class="flex-item upload-preview panel" v-for="file in files" :class="schema.previewClasses">
                                <header><div class="header" @click="removeFile(file)">×</div>&nbsp;</header>
                                <div class="body">
                                    {{ file.filename }}
                                </div>
                            </div>
                        </div>
                    </div>`,
    });
}
