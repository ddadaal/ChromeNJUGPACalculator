import { jwUrl, judgeIfItsElective, calculateGPA } from './configs';

const queryInfo = {
  active: true,
  currentWindow: true
};


window.onload = ()=>{
  chrome.tabs.query(queryInfo, tabs=>{
    const tab = tabs[0];
    if (!tab.url.startsWith(jwUrl)){
      document.write("请打开教务网的“成绩查询”页面！");
      return;
    }
    chrome.tabs.sendMessage(tab.id,{type: ActionType.COLLECT_GRADES},responseCallback);
  })
}

function responseCallback(res) {
  const courses = res as Course[];
  
  const spanIncludeElective = document.getElementById("include_elective");
  const spanExcludeElective = document.getElementById("exclude_elective");
  spanIncludeElective.textContent = calculateGPA(courses).toFixed(4);
  spanExcludeElective.textContent = calculateGPA(courses.filter(x=>!judgeIfItsElective(x))).toFixed(4);  

}

