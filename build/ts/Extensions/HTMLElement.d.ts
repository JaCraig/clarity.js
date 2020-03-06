interface HTMLElement {
    replaceClass(originalClassName: string, newClassName: string): void;
    toggleClass(originalClassName: string, newClassName: string): void;
    removeClass(className: string): void;
    addClass(className: string): void;
    show(): void;
    hide(): void;
    attribute(name: string, value?: string): string;
    hasClass(className: string): boolean;
    getParentByClass(className: string): HTMLElement;
}
