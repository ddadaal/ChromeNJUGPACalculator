webpackJsonp([1],{

/***/ 2:
/***/ (function(module, exports) {

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type == 0 /* COLLECT_GRADES */) {
        const items = [].concat(Array.from(document.getElementsByClassName("TABLE_TR_01")), Array.from(document.getElementsByClassName("TABLE_TR_02")));
        const courses = items.map(x => {
            const nodes = x.querySelectorAll("td");
            const course = {
                id: nodes[1].textContent.trim(),
                chineseName: nodes[2].textContent.trim(),
                englishName: nodes[3].textContent.trim(),
                type: nodes[4].textContent.trim(),
                credit: parseInt(nodes[5].textContent.trim()),
                score: parseInt(nodes[6].textContent.trim()),
                comment: nodes[7].textContent.trim(),
                exchangeScore: nodes[8].textContent.trim()
            };
            return course;
        });
        sendResponse(courses);
    }
});


/***/ })

},[2]);