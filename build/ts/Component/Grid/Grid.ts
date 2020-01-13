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

import Vue from 'vue/dist/vue.js'

let dateRegex = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;

Vue.component("clarity-grid", {
    computed: {
        filteredData: function () {
            let sortKey = this.sortKey;
            let filterKey = this.filterKey && this.filterKey.toLowerCase();
            let order = this.sortOrders[sortKey] || 1;
            let data = this.data;
            if (filterKey) {
                data = data.filter(function (row) {
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
        let sortOrders = {};
        this.columns.forEach(function (key: String) {
            key = key.replace(/\s+/g, "").trim();
            sortOrders[key.toString()] = 1;
        });
        return {
            sortKey: "",
            sortOrders: sortOrders,
        };
    },
    methods: {
        filteredColumn: function(key) {
            return key.replace(/\s+/g, "").trim();
        },
        getHeader: function(key) {
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
        sortBy: function (key) {
            key = this.filteredColumn(key);
            this.sortKey = key;
            let tempSortOrder = {};
            if (!(key in this.sortOrders)) {
                tempSortOrder[key] = 1;
            } else {
                tempSortOrder[key] = this.sortOrders[key];
            }
            tempSortOrder[key] = tempSortOrder[key] * -1;
            this.sortOrders = tempSortOrder;
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
    },
    template: `<table class="sortable" v-cloak>
        <thead>
        <tr>
            <th v-for="key in columns"
            @click="sortBy(key)"
            :class="{ active: sortKey == filteredColumn(key),
                        headerSortUp: sortKey == filteredColumn(key) && sortOrders[filteredColumn(key)] > 0,
                        headerSortDown: sortKey == filteredColumn(key) && sortOrders[filteredColumn(key)] < 0 }">
            {{ getHeader(key) | capitalize }}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in filteredData">
            <td v-for="key in columns" v-html="entry[filteredColumn(key)]">
            </td>
        </tr>
        </tbody>
    </table>`,
});
