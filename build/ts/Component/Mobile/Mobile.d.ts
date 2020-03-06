/// <reference path="../../Extensions/HTMLElement.d.ts" />
/// <reference path="../../Extensions/NodeList.d.ts" />
import { IComponent } from '../Interfaces/IComponent';
export declare class Mobile implements IComponent {
    constructor();
    private map;
    static show(id: string): void;
    static hide(id: string): void;
    private static menuElements;
}
