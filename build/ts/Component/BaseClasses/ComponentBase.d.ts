/// <reference path="../../Extensions/HTMLElement.d.ts" />
import { IComponent } from "../Interfaces/IComponent";
export declare class ComponentBase implements IComponent {
    private element;
    constructor(element: HTMLElement);
    name: string;
    protected show(): void;
    protected hide(): void;
}
