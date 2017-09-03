webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = judgeIfItsElective;
/* harmony export (immutable) */ __webpack_exports__["f"] = calculateGPA;
/* harmony export (immutable) */ __webpack_exports__["e"] = calculateCredits;
const JW_URL = "http://elite.nju.edu.cn/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList";
/* harmony export (immutable) */ __webpack_exports__["a"] = JW_URL;

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
function calculateCredits(courses) {
    return courses.filter(x => x.credit).map(x => x.credit).reduce((x, y) => x + y, 0);
}
const queryForTermName = "div[align='center'][style='margin-bottom: 5px']";
/* harmony export (immutable) */ __webpack_exports__["j"] = queryForTermName;

const queryForScoretable = "table.TABLE_BODY";
/* harmony export (immutable) */ __webpack_exports__["i"] = queryForScoretable;

const precision = 4;
/* harmony export (immutable) */ __webpack_exports__["h"] = precision;

const selectedTermsKey = "selectedTerms";
/* harmony export (immutable) */ __webpack_exports__["k"] = selectedTermsKey;

const btnTextSelectTerm = "选择这个学期";
/* harmony export (immutable) */ __webpack_exports__["c"] = btnTextSelectTerm;

const btnTextUpdateTerm = "更新这个学期的信息！";
/* harmony export (immutable) */ __webpack_exports__["d"] = btnTextUpdateTerm;

const btnTextDeselectTerm = "取消选择这个学期！";
/* harmony export (immutable) */ __webpack_exports__["b"] = btnTextDeselectTerm;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const constants = {
    RequireCurrentTermInfo: "REQUIRE_CURRENT_TERMINFO",
    ResultCurrentTermInfo: "RESULT_CURRENT_TERMINFO",
    RefreshPage: "REFRESH_PAGE"
};
/* harmony export (immutable) */ __webpack_exports__["b"] = constants;

const actionCreators = {
    requireCurrentTermInfo: () => ({ type: constants.RequireCurrentTermInfo }),
    resultCurrentTermInfo: (termInfo) => ({
        type: constants.ResultCurrentTermInfo,
        termInfo: termInfo
    }),
    refreshPage: () => ({
        type: constants.RefreshPage
    })
};
/* harmony export (immutable) */ __webpack_exports__["a"] = actionCreators;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configs__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__(1);


//elements
const spanCurrentTerm = document.getElementById("currentTerm");
const spanCurrentTermSelectedGPA = document.getElementById("currentTermSelectedGPA");
const spanCurrentTermAllGPA = document.getElementById("currentTermAllGPA");
const numSelected = document.getElementById("numSelected");
const ulSelectedTerms = document.getElementById("selectedTerms");
const spanMultitermsTotalCredits = document.getElementById("multitermsTotalCredits");
const spanMultitermsGPA = document.getElementById("multitermsGPA");
function appendTermInfo(termInfo, ul) {
    const li = document.createElement("li");
    li.textContent = `${termInfo.termName}, 选中 ${termInfo.selectedCourses.length} 门课`;
    ul.appendChild(li);
}
function updateMultitermGPA() {
    chrome.storage.local.get(items => {
        const selectedTerms = items[__WEBPACK_IMPORTED_MODULE_0__configs__["k" /* selectedTermsKey */]];
        if (!selectedTerms) {
            chrome.storage.local.set({ [__WEBPACK_IMPORTED_MODULE_0__configs__["k" /* selectedTermsKey */]]: [] });
            return;
        }
        const courses = selectedTerms.map(x => x.selectedCourses).reduce((x, y) => x.concat(y), []);
        spanMultitermsTotalCredits.textContent = Object(__WEBPACK_IMPORTED_MODULE_0__configs__["e" /* calculateCredits */])(courses).toString();
        spanMultitermsGPA.textContent = Object(__WEBPACK_IMPORTED_MODULE_0__configs__["f" /* calculateGPA */])(courses).toFixed(__WEBPACK_IMPORTED_MODULE_0__configs__["h" /* precision */]);
        selectedTerms.forEach(x => appendTermInfo(x, ulSelectedTerms));
    });
}
function deselectAllTerms() {
    chrome.storage.local.set({ [__WEBPACK_IMPORTED_MODULE_0__configs__["k" /* selectedTermsKey */]]: [] });
}
const queryInfo = {
    active: true,
    currentWindow: true
};
window.onload = () => {
    chrome.tabs.query(queryInfo, tabs => {
        const tab = tabs[0];
        if (!tab.url.startsWith(__WEBPACK_IMPORTED_MODULE_0__configs__["a" /* JW_URL */])) {
            document.write("请打开教务网的“成绩查询”页面！");
            return;
        }
        document.getElementById("deselectAll").onclick = () => {
            deselectAllTerms();
            location.reload();
            chrome.tabs.sendMessage(tab.id, __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* actionCreators */].refreshPage());
        };
        chrome.tabs.sendMessage(tab.id, __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* actionCreators */].requireCurrentTermInfo(), res => {
            const termInfo = res.termInfo;
            spanCurrentTerm.textContent = termInfo.termName;
            numSelected.textContent = termInfo.selectedCourses.length.toString();
            spanCurrentTermSelectedGPA.textContent = Object(__WEBPACK_IMPORTED_MODULE_0__configs__["f" /* calculateGPA */])(termInfo.selectedCourses).toFixed(__WEBPACK_IMPORTED_MODULE_0__configs__["h" /* precision */]);
            spanCurrentTermAllGPA.textContent = Object(__WEBPACK_IMPORTED_MODULE_0__configs__["f" /* calculateGPA */])(termInfo.courses).toFixed(__WEBPACK_IMPORTED_MODULE_0__configs__["h" /* precision */]);
        });
        updateMultitermGPA();
    });
};


/***/ })
],[2]);