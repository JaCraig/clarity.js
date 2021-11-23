<template>
    <div class="clarity-content-loader" v-html="content" v-cloak :data-loaded="loaded">
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Request, StorageMode } from "../../Framework/AJAX/Request";

    export default Vue.defineComponent({
        data: function() {
            return {
                content: "",
                loaded: false
            };
        },
        props: {
            url: {
                type: String,
                default: ""
            }
        },
        beforeMount: function() {
            if(!this.url) {
                return;
            }
            let that = this;
            let url = this.url;
            let tag = '';
            let split_match = url.match(/[\s#]/);
            let split_index = (split_match != null) ? split_match.index : -1;
            if (split_index != -1) {
                tag = url.substring(split_index + (split_match[0] == " " ? 1 : 0));
                url = url.substring(0, split_index);
            }
            if(!url) {
                return;
            }
            Request.get(url)
                    .type("text/html")
                    .setParser(response => response.text())
                    .setMode(StorageMode.StorageAndUpdate)
                    .onSuccess(msg => {
                        if (tag.length) {
                            let tempDiv = document.createElement("div");
                            tempDiv.innerHTML = msg;
                            let items = tempDiv.querySelectorAll(tag);
                            if(items.length > 0) {
                                that.content = items[0].outerHTML;
                                return;
                            }
                        }
                        that.content = msg;
                        that.loaded = true;
                    })
                    .send();						
        }
    });
</script>