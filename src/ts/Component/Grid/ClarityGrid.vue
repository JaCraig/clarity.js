
<template>
  <table class="sortable" v-cloak>
        <thead>
            <tr>
                <th v-for="key in columns" v-bind:key="key"
                @click="sortBy(key)"
                :class="{ active: sortKey == filteredColumn(key),
                            headerSortUp: sortKey == filteredColumn(key) && sortOrders[filteredColumn(key)] > 0,
                            headerSortDown: sortKey == filteredColumn(key) && sortOrders[filteredColumn(key)] < 0 }">
                {{ getHeader(key) | capitalize }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(entry, index) in filteredData" v-bind:key="index">
                <td v-for="key in columns" v-html="entry[filteredColumn(key)]" v-bind:key="key">
                </td>
            </tr>
        </tbody>
        <tfoot v-if="pageable">
            <tr>
                <td :colspan="columns.length">
                    <div class="right">Page {{ page }} of {{ finalPage }}</div>
                    <ul class="paged">
                        <li class="cursor-pointer fa-fast-backward text-center" v-on:click="setPage(1)" v-bind:class="{ 'disabled': (page==1) }"></li>
                        <li class="cursor-pointer fa-step-backward text-center" v-on:click="setPage(page-1)" v-bind:class="{ 'disabled': (page==1) }"></li>
                        <li class="cursor-pointer text-center" v-for="n in (endPage-startPage)" v-on:click="setPage(startPage+n)" v-bind:class="{ 'active': (page==(startPage+n)) }">{{ startPage+n }}</li> 
                        <li class="cursor-pointer fa-step-forward text-center" v-on:click="setPage(page+1)" v-bind:class="{ 'disabled': (page==finalPage) }"></li>
                        <li class="cursor-pointer fa-fast-forward text-center" v-on:click="setPage(finalPage)" v-bind:class="{ 'disabled': (page==finalPage) }"></li>
                    </ul>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import Vue from 'vue'

let dateRegex = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;

export default Vue.extend({
    computed: {
        finalPage: function() {
            return Math.ceil(this.total/this.pageSize);
        },
        startPage: function() {
            return (Math.floor((this.page-1)/10)*10);
        },
        endPage: function() {
            let tempPage= (Math.floor((this.page-1)/10)*10)+10;
            if(tempPage>this.finalPage)
                return this.finalPage;
            return tempPage;
        },
        filteredData: function () {
            let sortKey = this.sortKey;
            let filterKey = this.filterKey && this.filterKey.toLowerCase();
            let order = this.sortOrders[sortKey] || 1;
            let data = this.data;
            if (filterKey) {
                data = data.filter(function (row: any) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
                    });
                });
            }
            if (sortKey) {
                let sortFunction = this.guessDataType(data);
                if (sortFunction === "string") {
                    data = data.sort(this.sortString);
                } else if (sortFunction === "number") {
                    data = data.sort(this.sortNumber);
                } else if (sortFunction === "date") {
                    data = data.sort(this.sortDate);
                } else if (sortFunction === "MMDD Date") {
                    data = data.sort(this.sortMMDDDate);
                } else if (sortFunction === "DDMM Date") {
                    data = data.sort(this.sortDDMMDate);
                }
                if (order === 1) {
                    this.data.reverse();
                }
            }
            return data;
        },
    },
    data: function () {
        let that = this;
        let sortOrders: any = {};
        this.columns.forEach(function (key: String) {
            key = key.replace(/\s+/g, "").trim();
            sortOrders[key.toString()] = 1;
        });
        return {
            sortKey: "",
            sortOrders: sortOrders,
            direction: 0
        };
    },
    methods: {
        filteredColumn: function(key: string) {
            return key.replace(/\s+/g, "").trim();
        },
        getHeader: function(key: string) {
            return key.replace("_", " ").replace("-", " ").replace(/([a-z])([A-Z])/g, "$1 $2");
        },
        guessDataType: function(data: Array<any>): string {
            let tempDiv = document.createElement("div");
            let returnValue = "string";
            for (let x = 0; x < data.length; ++x) {
                let cellText = data[x][this.sortKey].toString();
                tempDiv.innerHTML = cellText;
                cellText = (tempDiv.textContent || tempDiv.innerText || "").replace(/^\s+|\s+$/g, "");
                if (cellText !== "") {
                    if (cellText.match(/^-?[£$¤]?[\d,.]+%?$/)) {
                        return "number";
                    }
                    let dateParts = cellText.match(dateRegex);
                    if (dateParts) {
                        let first = parseInt(dateParts[1], 10);
                        let second = parseInt(dateParts[2], 10);
                        if (first > 12) {
                            return "DDMM Date";
                        } else if (second > 12) {
                            return "MMDD Date";
                        } else {
                            returnValue = "MMDD Date";
                        }
                    }
                }
            }
            return returnValue;
        },
        setPage: function(currentPage: Number) {
            if(currentPage>this.finalPage)
                this.page=this.finalPage;
            else if(currentPage<1)
                this.page=1;
            else
                this.page=currentPage;
            this.$emit("pagechange", { page: this.page, filter: this.filterKey, sortKey: this.sortKey, direction: this.direction });
        },
        sortBy: function (key: string) {
            key = this.filteredColumn(key);
            this.sortKey = key;
            let tempSortOrder: any = {};
            if (!(key in this.sortOrders)) {
                tempSortOrder[key] = 1;
            } else {
                tempSortOrder[key] = this.sortOrders[key];
            }
            tempSortOrder[key] = tempSortOrder[key] * -1;
            this.direction = tempSortOrder[key];
            this.sortOrders = tempSortOrder;
            this.$emit("pagechange", { page: this.page, filter: this.filterKey, sortKey: this.sortKey, direction: this.direction });
        },
        sortDDMMDate: function(val1: any, val2: any): number {
            let actualValue1 = this.stripHTML(val1[this.sortKey].toString());
            let actualValue2 = this.stripHTML(val2[this.sortKey].toString());
            let match = actualValue1.match(dateRegex);
            let year = match[3], day = match[1], month = match[2];
            if (month.length === 1) { month = "0" + month; }
            if (day.length === 1) { day = "0" + day; }
            let value1 = year + month + day;

            match = actualValue2.match(dateRegex);
            year = match[3];
            day = match[1];
            month = match[2];
            if (month.length === 1) { month = "0" + month; }
            if (day.length === 1) { day = "0" + day; }
            let value2 = year + month + day;
            if (value1 === value2) { return 0; }
            if (value1 < value2) { return -1; }
            return 1;
        },
        sortDate: function(val1: any, val2: any): number {
            let actualValue1 = this.stripHTML(val1[this.sortKey].toString());
            let actualValue2 = this.stripHTML(val2[this.sortKey].toString());
            let value1 = new Date(actualValue1);
            let value2 = new Date(actualValue2);
            if (isNaN(value1.getTime())) { value1 = new Date(0); }
            if (isNaN(value2.getTime())) { value2 = new Date(0); }
            if (value1 === value2) { return 0; }
            if (value1 < value2) { return -1; }
            return 1;
        },
        sortMMDDDate: function(value1: any, value2: any): number {
            let actualValue1 = this.stripHTML(value1[this.sortKey].toString());
            let actualValue2 = this.stripHTML(value2[this.sortKey].toString());
            let match = actualValue1.match(dateRegex);
            let year = match[3], day = match[2], month = match[1];
            if (month.length === 1) { month = "0" + month; }
            if (day.length === 1) { day = "0" + day; }
            let val1 = year + month + day;

            match = actualValue2.match(dateRegex);
            year = match[3];
            day = match[2];
            month = match[1];
            if (month.length === 1) { month = "0" + month; }
            if (day.length === 1) { day = "0" + day; }
            let val2 = year + month + day;
            if (val1 === val2) { return 0; }
            if (val1 < val2) { return -1; }
            return 1;
        },
        sortNumber: function(value1: any, value2: any): number {
            let actualValue1 = parseFloat(this.stripHTML(value1[this.sortKey].toString()).replace(/[^0-9.-]/g, ""));
            let actualValue2 = parseFloat(this.stripHTML(value2[this.sortKey].toString()).replace(/[^0-9.-]/g, ""));
            if (isNaN(actualValue1)) { actualValue1 = 0; }
            if (isNaN(actualValue2)) { actualValue2 = 0; }
            return actualValue1 - actualValue2;
        },
        sortString: function(value1: any, value2: any): number {
            let actualValue1 = this.stripHTML(value1[this.sortKey].toString());
            let actualValue2 = this.stripHTML(value2[this.sortKey].toString());
            if (actualValue1 === actualValue2) { return 0; }
            if (actualValue1 < actualValue2) { return -1; }
            return 1;
        },
        stripHTML: function(value: any): any {
            let tempDiv = document.createElement("div");
            tempDiv.innerHTML = value;
            return (tempDiv.textContent || tempDiv.innerText || "").replace(/^\s+|\s+$/g, "");
        },
    },
    props: {
        columns: Array,
        data: Array,
        filterKey: String,
        total: Number,
        page: Number,
        pageSize: Number,
        pageable: Boolean
    }
});
</script>