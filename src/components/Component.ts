export class Component {

    constructor() {
        this._element = document.createElement("div");
        this._element.appendChild(document.createElement("div")); // place a placeholder insider
    }

    protected _element: Element;

    public get element() {
        return this._element;
    }

    protected refresh(element: Element) {
        this._element.removeChild(this._element.firstChild);
        this._element.appendChild(element);
    }

}

export function action(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
    const fn = descriptor.value;
    const newFn = () => {
        fn.apply(target, arguments);
        this.render();
    }
    descriptor.value = newFn;
    return descriptor;
}