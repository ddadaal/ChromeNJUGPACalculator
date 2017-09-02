import * as moment from 'moment';
import { jwUrl, ActionType } from './Constants';
import { Course } from './Course';

const queryInfo = {
  active: true,
  currentWindow: true
};


window.onload = ()=>{
  chrome.tabs.query(queryInfo, tabs=>{
    const tab = tabs[0];
    if (!tab.url.startsWith(jwUrl)){
      document.getElementById("content").textContent = "请打开教务网的“成绩查询”页面！";
      return;
    }
    chrome.tabs.sendMessage(tab.id,{type: ActionType.COLLECT_GRADES},responseCallback);
  })
}

function responseCallback(res) {
  const courses = res as Course[];
  
  const spanIncludeXuanxiu = document.getElementById("include_xuanxiu");
  spanIncludeXuanxiu.textContent = calculateGPA(courses).toFixed(2);

}

function calculateGPA(courses: Course[]){
  const validCourses = courses.filter(x=>x.credit);

  const totalCredits = courses.map(x=>x.credit).reduce((x,y)=>x+y,0);
  const totalCreditScores = courses.map(x=>x.credit * x.score).reduce((x,y)=>x+y,0);

  return totalCreditScores/totalCredits/20;
}

