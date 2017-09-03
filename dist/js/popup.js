webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = judgeIfItsElective;
/* harmony export (immutable) */ __webpack_exports__["a"] = calculateGPA;
const jwUrl = "http://elite.nju.edu.cn/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList";
/* harmony export (immutable) */ __webpack_exports__["c"] = jwUrl;

function judgeIfItsElective(course) {
    const possibleNumberStarts = [
        "77",
        "78",
        "61",
        "002",
        "003",
        "004",
        "37",
        "500"
    ];
    return possibleNumberStarts.map(x => course.id.startsWith(x)).reduce((x, y) => x || y, false);
}
function calculateGPA(courses) {
    const validCourses = courses.filter(x => x.credit);
    const totalCredits = validCourses.map(x => x.credit).reduce((x, y) => x + y, 0);
    const totalCreditScores = validCourses.map(x => x.credit * x.score).reduce((x, y) => x + y, 0);
    return totalCreditScores / totalCredits / 20;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configs__ = __webpack_require__(0);

const queryInfo = {
    active: true,
    currentWindow: true
};
window.onload = () => {
    chrome.tabs.query(queryInfo, tabs => {
        const tab = tabs[0];
        if (!tab.url.startsWith(__WEBPACK_IMPORTED_MODULE_0__configs__["c" /* jwUrl */])) {
            document.write("请打开教务网的“成绩查询”页面！");
            return;
        }
        chrome.tabs.sendMessage(tab.id, { type: 0 /* COLLECT_GRADES */ }, responseCallback);
    });
};
function responseCallback(res) {
    const courses = res;
    const spanIncludeElective = document.getElementById("include_elective");
    const spanExcludeElective = document.getElementById("exclude_elective");
    spanIncludeElective.textContent = Object(__WEBPACK_IMPORTED_MODULE_0__configs__["a" /* calculateGPA */])(courses).toFixed(4);
    spanExcludeElective.textContent = Object(__WEBPACK_IMPORTED_MODULE_0__configs__["a" /* calculateGPA */])(courses.filter(x => !Object(__WEBPACK_IMPORTED_MODULE_0__configs__["b" /* judgeIfItsElective */])(x))).toFixed(4);
}


/***/ })
],[1]);