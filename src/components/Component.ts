export class Component {

    constructor(){
        this._element = document.createElement("div");
        this._element.appendChild(document.createElement("div")); // place a placeholder insider
    }

    protected _element: Element;

    public get element(){
        return this._element;
    }

    protected set(element: Element){
        this._element.removeChild(this._element.firstChild);
        this._element.appendChild(element);
    }

}