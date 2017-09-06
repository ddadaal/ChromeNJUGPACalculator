import { getSelectedTermsAsync, setSelectedTermsAsync, selectOrUpdateTermAsync, deselectTermAsync } from '../data';
import { Component, createButton } from './Component';

export const btnTextSelectTerm = "选择这个学期";

export const btnTextUpdateTerm = "更新这个学期的信息！";

export const btnTextDeselectTerm = "取消选择这个学期！";



export class MultitermBar extends Component {
    private getCurrentTermInfo: () => TermInfo;
    private _selected: boolean = false;


    constructor(getCurrentTermInfo: () => TermInfo, selected: boolean = false) {
        super();
        this.getCurrentTermInfo = getCurrentTermInfo;
        this._selected = selected;
        this.render();
    }


    public get selected() {
        return this._selected;
    }

    public select = async () => {
        await selectOrUpdateTermAsync(this.getCurrentTermInfo());
        this._selected = true;
        this.render();
    }

    public deselect = async () => {
        await deselectTermAsync(this.getCurrentTermInfo());
        this._selected = false;
        this.render();
    }

    public update = async ()=> {
        await selectOrUpdateTermAsync(this.getCurrentTermInfo());
        alert("已经更新！");
        this.render();
    }

    private unselectedBar() {
        const div = document.createElement("div");
        const btnSelect = createButton(btnTextSelectTerm, this.select);
        div.appendChild(btnSelect);
        return div;
    }

    private selectedBar() {
        const div = document.createElement("div");

        const btnUpdate = createButton(btnTextUpdateTerm, this.update);

        const btnDeselect = createButton(btnTextDeselectTerm, this.deselect);

        div.appendChild(btnUpdate);
        div.appendChild(btnDeselect);

        return div;
    }

    render() {
        
        const bar = this._selected ? this.selectedBar() : this.unselectedBar();

        const div = document.createElement("div");

        const br = document.createElement("br");
        const spanPrompt = document.createElement("span");
        spanPrompt.innerHTML = "<strong>多个学期相关</strong>。选好了请点击地址栏右边的GPA图标，在弹出窗口里会有已经选择的学期信息以及GPA。";

        div.appendChild(spanPrompt);
        div.appendChild(br);
        div.appendChild(bar);

        this.refresh(div);
    }
}

