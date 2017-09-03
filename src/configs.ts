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
    return possibleNumberStarts.map(x=>course.id.startsWith(x)).reduce((x,y)=>x||y, false);
}

export function calculateGPA(courses: Course[]){
    const validCourses = courses.filter(x=>x.credit);
  
    const totalCredits = validCourses.map(x=>x.credit).reduce((x,y)=>x+y,0);
    const totalCreditScores = validCourses.map(x=>x.credit * x.score).reduce((x,y)=>x+y,0);
  
    return totalCreditScores/totalCredits/20;
  }
  
export function calculateCredits(courses: Course[]){
    return courses.filter(x=>x.credit).map(x=>x.credit).reduce((x,y)=>x+y,0);
}

export const queryForTermName = "div[align='center'][style='margin-bottom: 5px']";
export const queryForScoretable = "table.TABLE_BODY";

export const precision = 4;

export const selectedTermsKey = "selectedTerms";

export const btnTextSelectTerm = "选择这个学期";

export const btnTextUpdateTerm = "更新这个学期的信息！";

export const btnTextDeselectTerm = "取消选择这个学期！";