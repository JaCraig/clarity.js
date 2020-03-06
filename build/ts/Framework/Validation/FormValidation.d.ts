/// <reference path="../../Extensions/NodeList.d.ts" />
/// <reference path="../../Extensions/HTMLElement.d.ts" />
export declare class FormValidation {
    constructor();
    errors: string[];
    private messageAttributes;
    initialize(): void;
    private map;
    private filter;
    initializeForm(form: HTMLFormElement): void;
    private invalidInputHandler;
    private invalidTextAreaHandler;
    private invalidSelectHandler;
    private inputHandler;
    private textAreaHandler;
    private selectHandler;
    validate(): boolean;
    validateForm(form: HTMLFormElement): String[];
    validateElement(element: HTMLElement): String[];
    private validateSelect;
    private validateTextArea;
    private getErrorMessages;
    private validateInput;
}
