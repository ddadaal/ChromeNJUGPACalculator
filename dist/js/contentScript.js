webpackJsonp([0],[
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_MultitermBar__ = __webpack_require__(6);





const table = document.querySelector(__WEBPACK_IMPORTED_MODULE_0__configs__["d" /* queryForScoretable */]);
const allRecords = [].concat(Array.from(table.getElementsByClassName("TABLE_TR_01")), Array.from(table.getElementsByClassName("TABLE_TR_02")));
const courses = allRecords.map(x => parseCourse(x));
const termName = document.querySelector(__WEBPACK_IMPORTED_MODULE_0__configs__["e" /* queryForTermName */]).textContent.trim();
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
async function enhanceTable(table) {
    const head = table.querySelector("tr.TABLE_TH");
    const firstHeading = head.children[0];
    const selectedHeading = document.createElement("th");
    selectedHeading.setAttribute("align", "center");
    selectedHeading.innerText = "计算GPA";
    head.insertBefore(selectedHeading, firstHeading);
    const terms = await Object(__WEBPACK_IMPORTED_MODULE_3__data__["b" /* getSelectedTermsAsync */])();
    const selectedThisTerm = terms.filter(x => x.termName === termName);
    allRecords.forEach(x => {
        const firstCell = x.querySelector("td");
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("index", firstCell.textContent.trim());
        checkbox.checked = selectedThisTerm.length > 0
            ? selectedThisTerm[0].selectedCourses.some(x => x.index === parseInt(firstCell.textContent.trim()))
            : !Object(__WEBPACK_IMPORTED_MODULE_0__configs__["b" /* judgeIfItsElective */])(parseCourse(x));
        checkboxes.push(checkbox);
        const td = document.createElement("td");
        td.setAttribute("align", "center");
        td.appendChild(checkbox);
        x.insertBefore(td, firstCell);
    });
}
async function injectGPARow(table) {
    const spanGPA = document.createElement("span");
    spanGPA.innerText = "点左边计算本学期GPA";
    const btnCalculateGPA = document.createElement("input");
    btnCalculateGPA.setAttribute("type", "button");
    btnCalculateGPA.value = "计算GPA";
    btnCalculateGPA.onclick = () => {
        const selectedCourses = getSelectedCourses();
        spanGPA.textContent = `选中 ${selectedCourses.length} 门课，学分为：${Object(__WEBPACK_IMPORTED_MODULE_1__calc__["a" /* calculateCredits */])(selectedCourses)}, GPA为: ${Object(__WEBPACK_IMPORTED_MODULE_1__calc__["b" /* calculateGPA */])(selectedCourses).toFixed(__WEBPACK_IMPORTED_MODULE_0__configs__["c" /* precision */])}`;
    };
    const selected = (await Object(__WEBPACK_IMPORTED_MODULE_3__data__["b" /* getSelectedTermsAsync */])()).some(x => x.termName == termName);
    const bar = new __WEBPACK_IMPORTED_MODULE_4__components_MultitermBar__["a" /* MultitermBar */](getCurrentTermInfo, selected);
    const div = document.createElement("div");
    const hr = document.createElement("hr");
    const br = document.createElement("br");
    div.appendChild(hr);
    div.appendChild(btnCalculateGPA);
    div.appendChild(spanGPA);
    div.appendChild(hr);
    div.appendChild(bar.element);
    table.insertAdjacentElement('afterend', div);
}
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type === __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* constants */].RequireCurrentTermInfo) {
        sendResponse(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* actionCreators */].resultCurrentTermInfo(getCurrentTermInfo()));
    }
    else if (msg.type === __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* constants */].RefreshPage) {
        location.reload();
    }
});
enhanceTable(table);
injectGPARow(table);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Component__ = __webpack_require__(7);


const btnTextSelectTerm = "选择这个学期";
/* unused harmony export btnTextSelectTerm */

const btnTextUpdateTerm = "更新这个学期的信息！";
/* unused harmony export btnTextUpdateTerm */

const btnTextDeselectTerm = "取消选择这个学期！";
/* unused harmony export btnTextDeselectTerm */

function createButton(value, onclick) {
    const btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.value = value;
    btn.onclick = onclick;
    return btn;
}
class MultitermBar extends __WEBPACK_IMPORTED_MODULE_1__Component__["a" /* Component */] {
    constructor(getCurrentTermInfo, selected = false) {
        super();
        this._selected = false;
        this.select = async () => {
            await Object(__WEBPACK_IMPORTED_MODULE_0__data__["c" /* selectOrUpdateTermAsync */])(this.getCurrentTermInfo());
            this._selected = true;
            this.render();
        };
        this.deselect = async () => {
            await Object(__WEBPACK_IMPORTED_MODULE_0__data__["a" /* deselectTermAsync */])(this.getCurrentTermInfo());
            this._selected = false;
            this.render();
        };
        this.update = async () => {
            await Object(__WEBPACK_IMPORTED_MODULE_0__data__["c" /* selectOrUpdateTermAsync */])(this.getCurrentTermInfo());
            alert("已经更新！");
            this.render();
        };
        this.getCurrentTermInfo = getCurrentTermInfo;
        this._selected = selected;
        this.render();
    }
    get selected() {
        return this._selected;
    }
    unselectedBar() {
        const div = document.createElement("div");
        const btnSelect = createButton(btnTextSelectTerm, this.select);
        div.appendChild(btnSelect);
        return div;
    }
    selectedBar() {
        const div = document.createElement("div");
        const btnUpdate = createButton(btnTextUpdateTerm, this.update);
        const btnDeselect = createButton(btnTextDeselectTerm, this.deselect);
        div.appendChild(btnUpdate);
        div.appendChild(btnDeselect);
        return div;
    }
    render() {
        const bar = this._selected ? this.selectedBar() : this.unselectedBar();
        const div = document.createElement("div");
        const br = document.createElement("br");
        const spanPrompt = document.createElement("span");
        spanPrompt.innerHTML = "<strong>多个学期相关</strong>。选好了请点击地址栏右边的GPA图标，在弹出窗口里会有已经选择的学期信息以及GPA。";
        div.appendChild(spanPrompt);
        div.appendChild(br);
        div.appendChild(bar);
        this.refresh(div);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultitermBar;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Component {
    constructor() {
        this._element = document.createElement("div");
        this._element.appendChild(document.createElement("div")); // place a placeholder insider
    }
    get element() {
        return this._element;
    }
    refresh(element) {
        this._element.removeChild(this._element.firstChild);
        this._element.appendChild(element);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;



/***/ })
],[5]);