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
import Vue from 'vue';
import moment from 'moment';

export function RegisterFilters() {

    Vue.filter("moment", function (date: Date, format: string) {
        if (!date) {
            return "N/A";
        }
        return moment(date, "YYYY-MM-DDThh:mm:ss").format(format);
    });

    Vue.filter("capitalize", function (str: string) {
        if (!str) {
            return "";
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    });
}
