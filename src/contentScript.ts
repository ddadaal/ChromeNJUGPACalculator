import { judgeIfItsElective, calculateGPA, queryForScoretable, queryForTermName, precision, selectedTermsKey, btnTextDeselectTerm, btnTextSelectTerm, btnTextUpdateTerm, calculateCredits } from './configs';

import { constants, actionCreators } from './actions';

const table = document.querySelector(queryForScoretable);

const allRecords = ([] as Element[]).concat(
    Array.from(table.getElementsByClassName("TABLE_TR_01")),
    Array.from(table.getElementsByClassName("TABLE_TR_02"))
);
const courses: Course[] = allRecords.map(x => parseCourse(x));

const termName = document.querySelector(queryForTermName).textContent.trim();

const checkboxes = [] as HTMLInputElement[];
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


function parseCourse(tr: Element): Course {
    const nodes = tr.querySelectorAll("td")
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

function enhanceTable(table: Element) {
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
                : !judgeIfItsElective(parseCourse(x));

            checkboxes.push(checkbox);

            const td = document.createElement("td");
            td.setAttribute("align", "center");
            td.appendChild(checkbox);

            x.insertBefore(td, firstCell);
        });
    })


}

function injectGPARow(table: Element) {

    const spanGPA = document.createElement("span");
    spanGPA.innerText = "点左边计算本学期GPA";

    const btnCalculateGPA = document.createElement("input");
    btnCalculateGPA.setAttribute("type", "button");
    btnCalculateGPA.value = "计算GPA";
    btnCalculateGPA.onclick = () => {
        const selectedCourses = getSelectedCourses();
        spanGPA.textContent = `选中 ${selectedCourses.length} 门课，学分为：${calculateCredits(selectedCourses)}, GPA为: ${calculateGPA(selectedCourses).toFixed(precision)}`;
    };



    accessSelectedTerms(terms => {
        // going to rewrite this part


        const isSelected = terms.some(x => x.termName == termName);

        const spanPrompt  = document.createElement("span");
        spanPrompt.innerHTML = "<strong>多个学期相关</strong>。选好了请点击地址栏右边的GPA图标，在弹出窗口里会有已经选择的学期信息以及GPA。";

        const btnSelect = document.createElement("input");
        btnSelect.setAttribute("type", "button");
        btnSelect.value = isSelected ? btnTextUpdateTerm : btnTextSelectTerm;
        btnSelect.onclick = () => {
            selectOrUpdateTerm();
            const isUpdate = btnSelect.value == btnTextUpdateTerm;
            btnSelect.value = btnTextUpdateTerm;
            btnDeselect.disabled = false;
            if (isUpdate) {
                 alert("已经更新！");
            }
        }

        const btnDeselect = document.createElement("input");
        btnDeselect.setAttribute("type", "button");
        btnDeselect.value = btnTextDeselectTerm;
        btnDeselect.disabled = !isSelected;
        btnDeselect.onclick = () => {
            deselectTerm();
            btnDeselect.disabled = true;
            btnSelect.value = btnTextSelectTerm;
        }

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
    })


}

function selectOrUpdateTerm() {
    chrome.storage.local.get(items => {
        const selectedTerms = items[selectedTermsKey] as TermInfo[];
        chrome.storage.local.set({ [selectedTermsKey]: selectedTerms.filter(x => x.termName !== termName).concat([getCurrentTermInfo()]) });
    });
}

function deselectTerm() {
    chrome.storage.local.get(items => {
        const selectedTerms = items[selectedTermsKey] as TermInfo[];
        chrome.storage.local.set({ [selectedTermsKey]: selectedTerms.filter(x => x.termName !== termName) });
    });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type === constants.RequireCurrentTermInfo) {
        sendResponse(actionCreators.resultCurrentTermInfo(getCurrentTermInfo()));
    }else if (msg.type === constants.RefreshPage){
        location.reload();
    }
});

function accessSelectedTerms(callback: (terms: TermInfo[]) => void) {
    chrome.storage.local.get(items => {
        var terms = items[selectedTermsKey] as TermInfo[];
        if (!terms) {
            chrome.storage.local.set({ [selectedTermsKey]: [] });
            callback([]);
        } else {
            callback(terms);
        }

    })
}


enhanceTable(table);
injectGPARow(table);