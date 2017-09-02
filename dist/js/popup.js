webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __webpack_require__(1);
const queryInfo = {
    active: true,
    currentWindow: true
};
window.onload = () => {
    chrome.tabs.query(queryInfo, tabs => {
        const tab = tabs[0];
        if (!tab.url.startsWith(Constants_1.jwUrl)) {
            document.getElementById("content").textContent = "请打开教务网的“成绩查询”页面！";
            return;
        }
        chrome.tabs.sendMessage(tab.id, { type: 0 /* COLLECT_GRADES */ }, responseCallback);
    });
};
function responseCallback(res) {
    const courses = res;
    const spanIncludeXuanxiu = document.getElementById("include_xuanxiu");
    spanIncludeXuanxiu.textContent = calculateGPA(courses).toFixed(2);
}
function calculateGPA(courses) {
    const validCourses = courses.filter(x => x.credit);
    const totalCredits = courses.map(x => x.credit).reduce((x, y) => x + y, 0);
    const totalCreditScores = courses.map(x => x.credit * x.score).reduce((x, y) => x + y, 0);
    return totalCreditScores / totalCredits / 20;
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.jwUrl = "http://elite.nju.edu.cn/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList";


/***/ })
],[0]);