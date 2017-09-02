export const jwUrl = "http://elite.nju.edu.cn/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList";

export const judgeIfItsElective: (course: Course) => boolean = course => {
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
