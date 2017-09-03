import { JW_URL, judgeIfItsElective, calculateGPA, precision, selectedTermsKey,calculateCredits } from './configs';

import { actionCreators, ResultCurrentTermInfoAction, constants } from './actions';

//elements
const spanCurrentTerm = document.getElementById("currentTerm");
const spanCurrentTermSelectedGPA = document.getElementById("currentTermSelectedGPA");
const spanCurrentTermAllGPA = document.getElementById("currentTermAllGPA");
const numSelected = document.getElementById("numSelected");

const ulSelectedTerms = document.getElementById("selectedTerms");

const spanMultitermsTotalCredits = document.getElementById("multitermsTotalCredits");

const spanMultitermsGPA = document.getElementById("multitermsGPA");



function appendTermInfo(termInfo: TermInfo, ul: Element) {
  const li = document.createElement("li");
  li.textContent = `${termInfo.termName}, 选中 ${termInfo.selectedCourses.length} 门课`;
  ul.appendChild(li);
}

function updateMultitermGPA() {
  chrome.storage.local.get(items => {
    const selectedTerms = items[selectedTermsKey] as TermInfo[];
    if (!selectedTerms){
      chrome.storage.local.set({[selectedTermsKey]: []});
      return;
    }
    const courses = selectedTerms.map(x => x.selectedCourses).reduce((x, y) => x.concat(y), []);

    spanMultitermsTotalCredits.textContent = calculateCredits(courses).toString();

    spanMultitermsGPA.textContent = calculateGPA(courses).toFixed(precision);
    
    selectedTerms.forEach(x=>appendTermInfo(x,ulSelectedTerms));
  })

}

function deselectAllTerms(){
  chrome.storage.local.set({[selectedTermsKey]: []});
}

const queryInfo = {
  active: true,
  currentWindow: true
};



window.onload = () => {
  chrome.tabs.query(queryInfo, tabs => {
    const tab = tabs[0];
    if (!tab.url.startsWith(JW_URL)) {
      document.write("请打开教务网的“成绩查询”页面！");
      return;
    }
    document.getElementById("deselectAll").onclick = ()=>{
      deselectAllTerms();
      location.reload();
      chrome.tabs.sendMessage(tab.id, actionCreators.refreshPage());
    }

    chrome.tabs.sendMessage(tab.id, actionCreators.requireCurrentTermInfo(), res => {
      const termInfo = (res as ResultCurrentTermInfoAction).termInfo;

      spanCurrentTerm.textContent = termInfo.termName;

      numSelected.textContent = termInfo.selectedCourses.length.toString();

      spanCurrentTermSelectedGPA.textContent = calculateGPA(termInfo.selectedCourses).toFixed(precision);
      spanCurrentTermAllGPA.textContent = calculateGPA(termInfo.courses).toFixed(precision);


    });
    
    updateMultitermGPA();
    

  })
}
