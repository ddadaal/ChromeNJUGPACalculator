import { Component, createButton } from './Component';
import { calculateCredits, calculateGPA } from '../calc';
import { precision } from '../configs';

export class SingletermBar extends Component {

    private getCurrentTermInfo: ()=>TermInfo;

    constructor(getCurrentTermInfo: () => TermInfo){
        super();
        this.getCurrentTermInfo = getCurrentTermInfo;
        this.render();
    }

    render(){
        const spanGPA = document.createElement("span");
        spanGPA.innerText = "点左边计算本学期GPA";
    
        const btnCalculateGPA = document.createElement("input");
        btnCalculateGPA.setAttribute("type", "button");
        btnCalculateGPA.value = "计算GPA";
        btnCalculateGPA.onclick = () => {
            const selectedCourses = this.getCurrentTermInfo().selectedCourses;
            spanGPA.textContent = `选中 ${selectedCourses.length} 门课，学分为：${calculateCredits(selectedCourses)}, GPA为: ${calculateGPA(selectedCourses).toFixed(precision)}`;
        };

        const div = document.createElement("div");
        div.appendChild(btnCalculateGPA);
        div.appendChild(spanGPA);

        this.refresh(div);
        
    }



}