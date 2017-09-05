export function calculateGPA(courses: Course[]){
    const validCourses = courses.filter(x=>x.credit);
  
    const totalCredits = validCourses.map(x=>x.credit).reduce((x,y)=>x+y,0);
    const totalCreditScores = validCourses.map(x=>x.credit * x.score).reduce((x,y)=>x+y,0);
  
    return totalCreditScores/totalCredits/20;
}

  
export function calculateCredits(courses: Course[]){
    return courses.filter(x=>x.credit).map(x=>x.credit).reduce((x,y)=>x+y,0);
}
