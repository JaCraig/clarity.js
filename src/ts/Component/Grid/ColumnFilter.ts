import { ComparisonType } from "./Enums/ComparisonType";
import { FilterType } from "./Enums/FilterType";

// Column filtering info
export default class ColumnFilter {
    // the filter value
    value: string = "";
    // the comparison type
    comparison: ComparisonType = ComparisonType.Contains;
    // the filter type
    type: FilterType = FilterType.Textbox;
    // Whether or not filtering is turned on for the column
    filtered: boolean = false;
}