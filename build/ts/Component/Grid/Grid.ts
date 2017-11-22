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

module Components {

declare var Vue: any;

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
            let sortOrders = {};
            this.columns.forEach(function (key) {
                key = key.replace(/\s+/g, "");
                sortOrders[key] = 1;
            });
            return {
                sortKey: "",
                sortOrders: sortOrders,
            };
        },
        methods: {
            filteredColumn: function(key) {
                return key.replace(/\s+/g, "");
            },
            guessDataType: function(data: Array<any>): string {
                let returnValue = "string";
                for (let x = 0; x < data.length; ++x) {
                    let cellText = data[x][this.sortKey].toString().replace(/^\s+|\s+$/g, "");
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
                key = key.replace(/\s+/g, "");
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1;
            },
            sortDDMMDate: function(val1: any, val2: any): number {
                let match = val1[this.sortKey].toString().match(dateRegex);
                let year = match[3], day = match[1], month = match[2];
                if (month.length === 1) { month = "0" + month; }
                if (day.length === 1) { day = "0" + day; }
                let value1 = year + month + day;

                match = val2[this.sortKey].toString().match(dateRegex);
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
                let value1 = new Date(val1[this.sortKey]);
                let value2 = new Date(val2[this.sortKey]);
                if (isNaN(value1.getTime())) { value1 = new Date(0); }
                if (isNaN(value2.getTime())) { value2 = new Date(0); }
                if (value1 === value2) { return 0; }
                if (value1 < value2) { return -1; }
                return 1;
            },
            sortMMDDDate: function(val1: any, val2: any): number {
                let match = val1[this.sortKey].toString().match(dateRegex);
                let year = match[3], day = match[2], month = match[1];
                if (month.length === 1) { month = "0" + month; }
                if (day.length === 1) { day = "0" + day; }
                let value1 = year + month + day;

                match = val2[this.sortKey].toString().match(dateRegex);
                year = match[3];
                day = match[2];
                month = match[1];
                if (month.length === 1) { month = "0" + month; }
                if (day.length === 1) { day = "0" + day; }
                let value2 = year + month + day;
                if (value1 === value2) { return 0; }
                if (value1 < value2) { return -1; }
                return 1;
            },
            sortNumber: function(val1: any, val2: any): number {
                let value1 = parseFloat(val1[this.sortKey].toString().replace(/[^0-9.-]/g, ""));
                let value2 = parseFloat(val2[this.sortKey].toString().replace(/[^0-9.-]/g, ""));
                if (isNaN(value1)) { value1 = 0; }
                if (isNaN(value2)) { value2 = 0; }
                return value1 - value2;
            },
            sortString: function(value1: any, value2: any): number {
                if (value1[this.sortKey] === value2[this.sortKey]) { return 0; }
                if (value1[this.sortKey] < value2[this.sortKey]) { return -1; }
                return 1;
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
                {{ key | capitalize }}
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
}