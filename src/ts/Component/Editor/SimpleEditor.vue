<template>
    <div class="flex row clarity-simple-editor">
        <div class="flex-item flex justify-space-between column wrap" id="editorRawInput">
            <nav class="menu pill flex-item">
                <ul>
                    <li class="item has-children">
                        <a href="#!">Header</a>
                        <ul>
                            <li><h1><a href="#!" @click.stop.prevent="tag('#')">Header 1</a></h1></li>
                            <li><h2><a href="#!" @click.stop.prevent="tag('##')">Header 2</a></h2></li>
                            <li><h3><a href="#!" @click.stop.prevent="tag('###')">Header 3</a></h3></li>
                            <li><h4><a href="#!" @click.stop.prevent="tag('####')">Header 4</a></h4></li>
                            <li><h5><a href="#!" @click.stop.prevent="tag('#####')">Header 5</a></h5></li>
                            <li><h6><a href="#!" @click.stop.prevent="tag('######')">Header 6</a></h6></li>
                        </ul>
                    </li>
                    <li class="item has-children">
                        <a href="#!">Format</a>
                        <ul>
                            <li><strong><a href="#!" @click.stop.prevent="symmetricTag('**')">Bold</a></strong></li>
                            <li><em><a href="#!" @click.stop.prevent="symmetricTag('*')">Italics</a></em></li>
                            <li><del><a href="#!" @click.stop.prevent="symmetricTag('~~')">Strikethrough</a></del></li>
                            <li><u><a href="#!" @click.stop.prevent="symmetricTag('__')">Underline</a></u></li>
                            <li><a href="#!" @click.stop.prevent="tag('>')">Quote</a></li>
                        </ul>
                    </li>
                    <li><a href="#!" @click.stop.prevent="tag('\n\n-------\n\n')">HR</a></li>
                    <li class="item has-children">
                        <a href="#!">List</a>
                        <ul>
                            <li><a href="#!" @click.stop.prevent="tag('1. ')" class="fas fa-list-ol">Ordered</a></li>
                            <li><a href="#!" @click.stop.prevent="tag('* ')" class="fas fa-list-ul">Unordered</a></li>
                        </ul>
                    </li>
                    <li class="item has-children">
                        <a href="#!">File</a>
                        <ul>
                            <li><a href="#!" @click.stop.prevent="showImageFrame()" class="fas fa-image">Image</a></li>
                            <li><a href="#!" @click.stop.prevent="showFileFrame()" class="fas fa-link">File</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <textarea v-model="currentContent" id="editorInput" name="editorInput" class="flex-item" style="min-height:500px" @keyup="keyup"></textarea>
        </div>
        <div class="flex-item panel" id="editorCompiledInput" v-if="displayPreview">
            <div class="body">
                <h1>{{ currentTitle }}</h1>
                <div v-html="compiledMarkdown"></div>
            </div>
        </div>
        <clarity-modal :show-modal="displayFrame" :css-classes="'primary'">
            <template v-slot:header>
                <div v-if="IsImageInsert">Image Insert</div>
                <div v-if="IsFileInsert">File Insert</div>
            </template>
            <template v-slot:body>
                <iframe :src="iframeSrc" v-if="iframeSrc"></iframe>
                <div v-if="!iframeSrc">
                    <label>
                        URL:
                        <input type="url" v-model="insertLink" />
                    </label>
                    <br />
                    <input type="button" value="Insert" @click="insert" />
                </div>
            </template>
            <template v-slot:footer>
                <input type="button" class="close right" value="Close" @click="displayFrame = false" /><br class="clear" />
            </template>
        </clarity-modal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import showdown from 'showdown';
    import ClarityModal from "../Modal/ClarityModal.vue";
    import { InsertType } from "./InsertType";

    export default Vue.defineComponent({
        components: {
            'clarity-modal': ClarityModal
        },
        props: {
            title: {
                type: String,
                default: ""
            },
            content: {
                type: String,
                default: ""
            },
            iframeImageSrc: {
                type: String,
                default: ""
            },
            iframeFileSrc: {
                type: String,
                default: ""
            },
            preview: {
                type: Boolean,
                default: true
            },
            mentionsFormat: {
                type: String,
                default: ""
            }
        },
        data: function () {
            return {
                currentTitle: this.title,
                currentContent: this.content,
                displayFrame: false,
                iframeSrc: "",
                displayPreview: this.preview,
                converter: new showdown.Converter({ tables: true, strikethrough: true, emoji: true, underline: true, ghMentions: !!this.mentionsFormat, ghMentionsLink: this.mentionsFormat }),
                insertType: InsertType.Image,
                insertLink: ""
            };
        },
        mounted: function () {
            let that = this;
            window.addEventListener('message', function (message) {
                if (typeof message.data !== 'string') return;

                let command = JSON.parse(message.data);
                that.insertLink = command.href;
                that.insert();
            });
        },
        computed: {
            compiledMarkdown: function () {
                return this.markdown(this.currentContent);
            },
            IsImageInsert: function() {
                return this.insertType == InsertType.Image;
            },
            IsFileInsert: function() {
                return this.insertType == InsertType.File;
            }
        },
        methods: {
            insert: function() {
                this.displayFrame = false;
                if(!this.insertLink) {
                    return;
                }
                if (this.insertType == InsertType.Image) {
                    this.imageTag(this.insertLink);
                } else {
                    this.linkTag(this.insertLink);
                }
            },
            showImageFrame: function() {
                this.showFrame(InsertType.Image);
            },
            showFileFrame: function() {
                this.showFrame(InsertType.File);
            },
            showFrame: function (type: InsertType) {
                this.displayFrame = true;
                this.insertType = type;
                if(type === InsertType.Image){
                    this.iframeSrc = this.iframeImageSrc;
                } else {
                    this.iframeSrc = this.iframeFileSrc;
                }
            },
            markdown: function (content: string) {
                if (!content) {
                    return content;
                }
                return this.converter.makeHtml(content);
            },
            keyup: function () {
                this.$emit("keyup", {
                    content: this.currentContent
                });
            },
            cancel: function() {
                this.$emit("cancel");
            },
            tag: function (tag: string) {
                let editor = <HTMLTextAreaElement>document.getElementById('editorInput');
                if (!editor) {
                    return;
                }
                let start = editor.selectionStart;
                let end = editor.selectionEnd;
                let tagText = tag + this.currentContent.substring(start, end);
                this.currentContent = this.currentContent.substring(0, start) + tagText + this.currentContent.substring(end, this.currentContent.length);
                editor.focus();
            },
            symmetricTag: function (tag: string) {
                let editor = <HTMLTextAreaElement>document.getElementById('editorInput');
                if (!editor) {
                    return;
                }
                let start = editor.selectionStart;
                let end = editor.selectionEnd;
                let tagText = tag + this.currentContent.substring(start, end) + tag;
                this.currentContent = this.currentContent.substring(0, start) + tagText + this.currentContent.substring(end, this.currentContent.length);
                editor.focus();
            },
            linkTag: function (href: string) {
                let editor = <HTMLTextAreaElement>document.getElementById('editorInput');
                if (!editor) {
                    return;
                }
                let start = editor.selectionStart;
                let end = editor.selectionEnd;
                let tagText = "[" + this.currentContent.substring(start, end) + "](" + href + ")";
                this.currentContent = this.currentContent.substring(0, start) + tagText + this.currentContent.substring(end, this.currentContent.length);
                editor.focus();
            },
            imageTag: function (href: string) {
                let editor = <HTMLTextAreaElement>document.getElementById('editorInput');
                if (!editor) {
                    return;
                }
                let start = editor.selectionStart;
                let end = editor.selectionEnd;
                let tagText = "![" + this.currentContent.substring(start, end) + "](" + href + ")";
                this.currentContent = this.currentContent.substring(0, start) + tagText + this.currentContent.substring(end, this.currentContent.length);
                editor.focus();
            }
        },
    });
</script>