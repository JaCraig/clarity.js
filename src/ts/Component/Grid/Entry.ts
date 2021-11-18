import ColumnData from "./ColumnData";
import { DataType } from "./Enums/DataType";
import moment from 'moment';

// An individual entry in a cell
export default class Entry  {
    //Constructor
    public constructor(value: any, column: ColumnData) {
        let property = column.property.split('.').pop();
        let finalValue = value[property];
        this.value = column.formatValue(this.replaceProperties(finalValue, value));
        this.url = this.getUrl(column.url, value);
    }
    // Value
    value: string;
    // Url
    url: string;

    // Gets the url for the value based on the url format.
    private getUrl(url: string, value: any): string {
        if (url === "" || value == null) {
            return "";
        }
        let returnValue = this.replaceProperties(url, value);
        while(returnValue.indexOf('{') > -1&&returnValue.indexOf('}') > -1) {
            returnValue = this.replaceProperties(returnValue, value);
        }
        return returnValue;
    }
    
    // Replace properties in the string.
    private replaceProperties(value: any, properties: any): string {
        if(typeof value !=="string" || value.indexOf("{") === -1 || value.indexOf("}") === -1) {
            return value;
        }
        let keys = value.match(/{([^}]*)}/g);
        for (let x = 0; x < keys.length; ++x) {
            let key = keys[x].replace("{", "").replace("}", "");
            let currentItem = this.stripHTML(properties[key]) || "";
            value = value.replaceAll("{"+key+"}", currentItem);
        }
        return value;
    }
    
    // Strip HTML from the string.
    private stripHTML (value: string): string {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = value;
        return (tempDiv.textContent || tempDiv.innerText || "").replace(/^\s+|\s+$/g, "");
    }
}