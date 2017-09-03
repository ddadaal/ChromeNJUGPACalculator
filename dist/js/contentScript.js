webpackJsonp([1],[
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
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configs__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__(1);


const table = document.querySelector(__WEBPACK_IMPORTED_MODULE_0__configs__["i" /* queryForScoretable */]);
const allRecords = [].concat(Array.from(table.getElementsByClassName("TABLE_TR_01")), Array.from(table.getElementsByClassName("TABLE_TR_02")));
const courses = allRecords.map(x => parseCourse(x));
const termName = document.querySelector(__WEBPACK_IMPORTED_MODULE_0__configs__["j" /* queryForTermName */]).textContent.trim();
const checkboxes = [];
function getSelectedCourses() {
    const selectedIndice = checkboxes.filter(x => x.checked).map(x => parseInt(x.getAttribute("index")));
    return courses.filter(x => selectedIndice.indexOf(x.index) > -1);
}
function getCurrentTermInfo() {
    return {
        termName: termName,
        courses: courses,
        selectedCourses: getSelectedCourses()
    };
}
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
    accessSelectedTerms(terms => {
        const selectedThisTerm = terms.filter(x => x.termName === termName);
        allRecords.forEach(x => {
            const firstCell = x.querySelector("td");
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("index", firstCell.textContent.trim());
            checkbox.checked = selectedThisTerm.length > 0
                ? selectedThisTerm[0].selectedCourses.some(x => x.index === parseInt(firstCell.textContent.trim()))
                : !Object(__WEBPACK_IMPORTED_MODULE_0__configs__["g" /* judgeIfItsElective */])(parseCourse(x));
            checkboxes.push(checkbox);
            const td = document.createElement("td");
            td.setAttribute("align", "center");
            td.appendChild(checkbox);
            x.insertBefore(td, firstCell);
        });
    });
}
function injectGPARow(table) {
    const spanGPA = document.createElement("span");
    spanGPA.innerText = "点左边计算本学期GPA";
    const btnCalculateGPA = document.createElement("input");
    btnCalculateGPA.setAttribute("type", "button");
    btnCalculateGPA.value = "计算GPA";
    btnCalculateGPA.onclick = () => {
        const selectedCourses = getSelectedCourses();
        spanGPA.textContent = `选中 ${selectedCourses.length} 门课，学分为：${Object(__WEBPACK_IMPORTED_MODULE_0__configs__["e" /* calculateCredits */])(selectedCourses)}, GPA为: ${Object(__WEBPACK_IMPORTED_MODULE_0__configs__["f" /* calculateGPA */])(selectedCourses).toFixed(__WEBPACK_IMPORTED_MODULE_0__configs__["h" /* precision */])}`;
    };
    accessSelectedTerms(terms => {
        // going to rewrite this part
        const isSelected = terms.some(x => x.termName == termName);
        const spanPrompt = document.createElement("span");
        spanPrompt.innerHTML = "<strong>多个学期相关</strong>。选好了请点击地址栏右边的GPA图标，在弹出窗口里会有已经选择的学期信息以及GPA。";
        const btnSelect = document.createElement("input");
        btnSelect.setAttribute("type", "button");
        btnSelect.value = isSelected ? __WEBPACK_IMPORTED_MODULE_0__configs__["d" /* btnTextUpdateTerm */] : __WEBPACK_IMPORTED_MODULE_0__configs__["c" /* btnTextSelectTerm */];
        btnSelect.onclick = () => {
            selectOrUpdateTerm();
            const isUpdate = btnSelect.value == __WEBPACK_IMPORTED_MODULE_0__configs__["d" /* btnTextUpdateTerm */];
            btnSelect.value = __WEBPACK_IMPORTED_MODULE_0__configs__["d" /* btnTextUpdateTerm */];
            btnDeselect.disabled = false;
            if (isUpdate) {
                alert("已经更新！");
            }
        };
        const btnDeselect = document.createElement("input");
        btnDeselect.setAttribute("type", "button");
        btnDeselect.value = __WEBPACK_IMPORTED_MODULE_0__configs__["b" /* btnTextDeselectTerm */];
        btnDeselect.disabled = !isSelected;
        btnDeselect.onclick = () => {
            deselectTerm();
            btnDeselect.disabled = true;
            btnSelect.value = __WEBPACK_IMPORTED_MODULE_0__configs__["c" /* btnTextSelectTerm */];
        };
        const div = document.createElement("div");
        const hr = document.createElement("hr");
        const br = document.createElement("br");
        div.appendChild(hr);
        div.appendChild(btnCalculateGPA);
        div.appendChild(spanGPA);
        div.appendChild(hr);
        div.appendChild(spanPrompt);
        div.appendChild(br);
        div.appendChild(btnSelect);
        div.appendChild(btnDeselect);
        table.insertAdjacentElement('afterend', div);
    });
}
function selectOrUpdateTerm() {
    chrome.storage.local.get(items => {
        const selectedTerms = items[__WEBPACK_IMPORTED_MODULE_0__configs__["k" /* selectedTermsKey */]];
        chrome.storage.local.set({ [__WEBPACK_IMPORTED_MODULE_0__configs__["k" /* selectedTermsKey */]]: selectedTerms.filter(x => x.termName !== termName).concat([getCurrentTermInfo()]) });
    });
}
function deselectTerm() {
    chrome.storage.local.get(items => {
        const selectedTerms = items[__WEBPACK_IMPORTED_MODULE_0__configs__["k" /* selectedTermsKey */]];
        chrome.storage.local.set({ [__WEBPACK_IMPORTED_MODULE_0__configs__["k" /* selectedTermsKey */]]: selectedTerms.filter(x => x.termName !== termName) });
    });
}
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type === __WEBPACK_IMPORTED_MODULE_1__actions__["b" /* constants */].RequireCurrentTermInfo) {
        sendResponse(__WEBPACK_IMPORTED_MODULE_1__actions__["a" /* actionCreators */].resultCurrentTermInfo(getCurrentTermInfo()));
    }
    else if (msg.type === __WEBPACK_IMPORTED_MODULE_1__actions__["b" /* constants */].RefreshPage) {
        location.reload();
    }
});
function accessSelectedTerms(callback) {
    chrome.storage.local.get(items => {
        var terms = items[__WEBPACK_IMPORTED_MODULE_0__configs__["k" /* selectedTermsKey */]];
        if (!terms) {
            chrome.storage.local.set({ [__WEBPACK_IMPORTED_MODULE_0__configs__["k" /* selectedTermsKey */]]: [] });
            callback([]);
        }
        else {
            callback(terms);
        }
    });
}
enhanceTable(table);
injectGPARow(table);


/***/ })
],[3]);