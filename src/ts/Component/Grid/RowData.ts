import ColumnData from "./ColumnData";
import Entry from "./Entry";
import RowValue from "./RowValue";

// Contains all of the rows of data.
export default class RowData {
    //Constructor
    public constructor(data: any, columns: Array<ColumnData>) {
        this.originalData = data;
        for (let y = 0; y < columns.length; ++y) {
            this.columns.push(new RowValue(columns[y], data));
        }
    }

    // Parsed data for the rows.
    columns: Array<RowValue> = [];
    // Original data for the rows.
    originalData: Array<any> = [];
}