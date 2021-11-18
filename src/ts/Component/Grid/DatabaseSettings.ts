// Database settings
export default class DatabaseSettings {
    // Constructor
    public constructor(saveFilters: boolean = true, sourceName: string = "filteredTable") {
        this.saveFilters = saveFilters;
        this.sourceName = sourceName;
    }
    // save the filters
    saveFilters: boolean = true;
    // source name for the database
    sourceName: string = "filteredTable";
}