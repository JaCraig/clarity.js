import { Hotkeys } from "./Hotkey/Hotkeys.ts";
import { Router } from "./Router/Router.ts";
import { FormValidation } from "./Validation/FormValidation.ts";
import { ErrorLogging } from "./Logging/ErrorLogging.ts";
import { PageHistory } from "./History/PageHistory.ts";
import { LocalStorage } from "./WebStorage/LocalStorage.ts";
import { SessionStorage } from "./WebStorage/SessionStorage.ts";
import { Request } from "./AJAX/Request.ts";
export default class Clarity {
    constructor();
    private components;
    hotkeys: Hotkeys;
    request: Request;
    router: Router;
    validation: FormValidation;
    errorLogger: ErrorLogging;
    history: PageHistory;
    localStorage: LocalStorage;
    sessionStorage: SessionStorage;
}
declare global {
    interface Window {
        clarity: Clarity;
    }
}
