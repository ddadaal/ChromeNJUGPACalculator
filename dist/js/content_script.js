webpackJsonp([1],[
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
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configs__ = __webpack_require__(0);

const table = document.querySelector("table.TABLE_BODY");
const allRecords = [].concat(Array.from(table.getElementsByClassName("TABLE_TR_01")), Array.from(table.getElementsByClassName("TABLE_TR_02")));
const courses = allRecords.map(x => parseCourse(x));
const checkboxes = [];
console.log(courses);
function parseCourse(tr) {
    const nodes = tr.querySelectorAll("td");
    return {
        index: parseInt(nodes[0].textContent),
        id: nodes[1].textContent.trim(),
        chineseName: nodes[2].textContent.trim(),
        englishName: nodes[3].textContent.trim(),
        type: nodes[4].textContent.trim(),
        credit: parseInt(nodes[5].textContent.trim()),
        score: parseInt(nodes[6].textContent.trim()),
        comment: nodes[7].textContent.trim(),
        exchangeScore: nodes[8].textContent.trim()
    };
}
function enhanceTable(table) {
    const head = table.querySelector("tr.TABLE_TH");
    const firstHeading = head.children[0];
    const selectedHeading = document.createElement("th");
    selectedHeading.setAttribute("align", "center");
    selectedHeading.innerText = "计算GPA";
    head.insertBefore(selectedHeading, firstHeading);
    allRecords.forEach(x => {
        const firstCell = x.querySelector("td");
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("index", firstCell.textContent.trim());
        checkbox.checked = !Object(__WEBPACK_IMPORTED_MODULE_0__configs__["b" /* judgeIfItsElective */])(parseCourse(x));
        checkboxes.push(checkbox);
        const td = document.createElement("td");
        td.setAttribute("align", "center");
        td.appendChild(checkbox);
        x.insertBefore(td, firstCell);
    });
}
function injectGPARow(table) {
    const span = document.createElement("span");
    span.innerText = "点左边计算GPA";
    const button = document.createElement("input");
    button.setAttribute("type", "button");
    button.value = "计算GPA";
    button.onclick = () => {
        const selectedIndice = checkboxes.filter(x => x.checked).map(x => parseInt(x.getAttribute("index")));
        const selectedCourses = courses.filter(x => selectedIndice.indexOf(x.index) > -1);
        span.innerHTML = `选中${selectedCourses.length}门课，总GPA为:${Object(__WEBPACK_IMPORTED_MODULE_0__configs__["a" /* calculateGPA */])(selectedCourses).toFixed(4)}`;
    };
    const div = document.createElement("div");
    div.appendChild(button);
    div.appendChild(span);
    table.insertAdjacentElement('afterend', div);
}
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type == 0 /* COLLECT_GRADES */) {
        sendResponse(courses);
    }
});
enhanceTable(table);
injectGPARow(table);


/***/ })
],[2]);