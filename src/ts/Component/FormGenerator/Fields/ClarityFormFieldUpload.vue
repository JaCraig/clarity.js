
<template>
    <div>
        <label :for="getFieldID()" v-if="!schema.label" :class="schema.labelClasses">
            {{ schema.model | capitalize }}
            <span class="error clear-background" v-if="schema.required">*</span>
            <i class="clear-background info fa-info-circle no-border small" v-if="schema.hint">{{ schema.hint }}</i>
        </label>
        <label :for="getFieldID()" v-if="schema.label" :class="schema.labelClasses">
            {{ schema.label }}
            <span class="error clear-background" v-if="schema.required">*</span>
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
            <div class="flex-item upload-preview panel" v-for="(file, index) in files" :class="schema.previewClasses" v-bind:key="index">
                <header><div class="header" @click="removeFile(file)">×</div>&nbsp;</header>
                <div class="body">
                    {{ file.filename }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            files: [],
            ready: false,
            filesAdded: 0,
        };
    },
    props: {
        model: Object,
        schema: Object,
        idSuffix: String,
    },
    methods: {
        getFieldID: function() {
            let result = "";
            if (this.schema.id) {
                result = this.schema.id;
            } else {
                result = this.schema.model.slugify();
            }
            if (this.idSuffix) {
                result += this.idSuffix;
            }
            return result;
        },
        changed: function(event: any) {
            let that = this;
            that.filesAdded = that.filesAdded + event.target.files.length;
            that.ready = false;
            for (let x = 0; x < event.target.files.length; ++x) {
                let reader = new FileReader();
                reader.onload = (function(file) {
                    return function(readerEvent: any) {
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
        base64ArrayBuffer: function(buffer: ArrayBuffer) {
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
        removeFile: function(file: any) {
            let index = this.files.indexOf(file);
            this.files.splice(index, 1);
            this.filesAdded--;
        },
    }
});

</script>