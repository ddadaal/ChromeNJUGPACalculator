webpackJsonp([1],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = judgeIfItsElective;
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
    return possibleNumberStarts.map(x => course.id.startsWith(x)).some(x => x);
}
const queryForTermName = "div[align='center'][style='margin-bottom: 5px']";
/* harmony export (immutable) */ __webpack_exports__["e"] = queryForTermName;

const queryForScoretable = "table.TABLE_BODY";
/* harmony export (immutable) */ __webpack_exports__["d"] = queryForScoretable;

const precision = 4;
/* harmony export (immutable) */ __webpack_exports__["c"] = precision;

const selectedTermsKey = "selectedTerms";
/* harmony export (immutable) */ __webpack_exports__["f"] = selectedTermsKey;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getSelectedTermsAsync;
/* harmony export (immutable) */ __webpack_exports__["d"] = setSelectedTermsAsync;
/* harmony export (immutable) */ __webpack_exports__["c"] = selectOrUpdateTermAsync;
/* harmony export (immutable) */ __webpack_exports__["a"] = deselectTermAsync;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configs__ = __webpack_require__(0);

async function getSelectedTermsAsync() {
    const terms = (await chrome.storage.local.get())[__WEBPACK_IMPORTED_MODULE_0__configs__["f" /* selectedTermsKey */]];
    return terms ? terms : [];
}
async function setSelectedTermsAsync(terms) {
    await chrome.storage.local.set({ [__WEBPACK_IMPORTED_MODULE_0__configs__["f" /* selectedTermsKey */]]: terms });
}
async function selectOrUpdateTermAsync(term) {
    const currentTerms = await getSelectedTermsAsync();
    await setSelectedTermsAsync(currentTerms.filter(x => x.termName !== term.termName).concat(term));
}
async function deselectTermAsync(term) {
    const currentTerms = await getSelectedTermsAsync();
    await setSelectedTermsAsync(currentTerms.filter(x => x.termName !== term.termName));
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = calculateGPA;
/* harmony export (immutable) */ __webpack_exports__["a"] = calculateCredits;
function calculateGPA(courses) {
    const validCourses = courses.filter(x => x.credit);
    const totalCredits = validCourses.map(x => x.credit).reduce((x, y) => x + y, 0);
    const totalCreditScores = validCourses.map(x => x.credit * x.score).reduce((x, y) => x + y, 0);
    return totalCreditScores / totalCredits / 20;
}
function calculateCredits(courses) {
    return courses.filter(x => x.credit).map(x => x.credit).reduce((x, y) => x + y, 0);
}


/***/ }),
/* 3 */
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
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configs__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calc__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data__ = __webpack_require__(1);




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
async function updateMultitermGPAAsync() {
    const terms = await Object(__WEBPACK_IMPORTED_MODULE_3__data__["b" /* getSelectedTermsAsync */])();
    const courses = terms.map(x => x.selectedCourses).reduce((x, y) => x.concat(y), []);
    spanMultitermsTotalCredits.textContent = Object(__WEBPACK_IMPORTED_MODULE_1__calc__["a" /* calculateCredits */])(courses).toString();
    spanMultitermsGPA.textContent = Object(__WEBPACK_IMPORTED_MODULE_1__calc__["b" /* calculateGPA */])(courses).toFixed(__WEBPACK_IMPORTED_MODULE_0__configs__["c" /* precision */]);
    terms.forEach(x => appendTermInfo(x, ulSelectedTerms));
}
const queryInfo = {
    active: true,
    currentWindow: true
};
window.onload = async () => {
    const tab = (await chrome.tabs.query(queryInfo))[0];
    if (!tab.url.startsWith(__WEBPACK_IMPORTED_MODULE_0__configs__["a" /* JW_URL */])) {
        document.write("请打开教务网的“成绩查询”页面！");
        return;
    }
    document.getElementById("deselectAll").onclick = async () => {
        await Object(__WEBPACK_IMPORTED_MODULE_3__data__["d" /* setSelectedTermsAsync */])([]);
        chrome.tabs.sendMessage(tab.id, __WEBPACK_IMPORTED_MODULE_2__actions__["a" /* actionCreators */].refreshPage());
        location.reload();
    };
    const res = await chrome.tabs.sendMessage(tab.id, __WEBPACK_IMPORTED_MODULE_2__actions__["a" /* actionCreators */].requireCurrentTermInfo());
    const termInfo = res.termInfo;
    spanCurrentTerm.textContent = termInfo.termName;
    numSelected.textContent = termInfo.selectedCourses.length.toString();
    spanCurrentTermSelectedGPA.textContent = Object(__WEBPACK_IMPORTED_MODULE_1__calc__["b" /* calculateGPA */])(termInfo.selectedCourses).toFixed(__WEBPACK_IMPORTED_MODULE_0__configs__["c" /* precision */]);
    spanCurrentTermAllGPA.textContent = Object(__WEBPACK_IMPORTED_MODULE_1__calc__["b" /* calculateGPA */])(termInfo.courses).toFixed(__WEBPACK_IMPORTED_MODULE_0__configs__["c" /* precision */]);
    await updateMultitermGPAAsync();
};


/***/ })
],[5]);