import { JW_URL, judgeIfItsElective, precision, selectedTermsKey } from './configs';
import { calculateGPA, calculateCredits } from './calc';
import { actionCreators, ResultCurrentTermInfoAction, constants } from './actions';

import { getSelectedTermsAsync, setSelectedTermsAsync } from './data';
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

async function updateMultitermGPAAsync() {
  const terms = await getSelectedTermsAsync();


  const courses = terms.map(x => x.selectedCourses).reduce((x, y) => x.concat(y), []);

  spanMultitermsTotalCredits.textContent = calculateCredits(courses).toString();

  spanMultitermsGPA.textContent = calculateGPA(courses).toFixed(precision);

  terms.forEach(x => appendTermInfo(x, ulSelectedTerms));

}


const queryInfo = {
  active: true,
  currentWindow: true
};



window.onload = async () => {
  const tab = (await chrome.tabs.query(queryInfo))[0];
  if (!tab.url.startsWith(JW_URL)) {
    document.write("请打开教务网的“成绩查询”页面！");
    return;
  }
  document.getElementById("deselectAll").onclick = async () => {
    await setSelectedTermsAsync([]);
    chrome.tabs.sendMessage(tab.id, actionCreators.refreshPage());
    location.reload();
  }

  const res = await chrome.tabs.sendMessage(tab.id, actionCreators.requireCurrentTermInfo());

  const termInfo = (res as ResultCurrentTermInfoAction).termInfo;

  spanCurrentTerm.textContent = termInfo.termName;

  numSelected.textContent = termInfo.selectedCourses.length.toString();

  spanCurrentTermSelectedGPA.textContent = calculateGPA(termInfo.selectedCourses).toFixed(precision);
  spanCurrentTermAllGPA.textContent = calculateGPA(termInfo.courses).toFixed(precision);

  await updateMultitermGPAAsync();
}
