export const jwUrl = "http://elite.nju.edu.cn/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList";

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
  
  