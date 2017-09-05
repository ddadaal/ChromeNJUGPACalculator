export const JW_URL = "http://elite.nju.edu.cn/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList";

export function judgeIfItsElective (course: Course) {
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
    return possibleNumberStarts.map(x=>course.id.startsWith(x)).some(x=>x);
}


export const queryForTermName = "div[align='center'][style='margin-bottom: 5px']";
export const queryForScoretable = "table.TABLE_BODY";

export const precision = 4;

export const selectedTermsKey = "selectedTerms";

