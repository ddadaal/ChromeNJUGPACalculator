/// <reference path="../node_modules/chrome-extension-async/chrome-extension-async.d.ts" />
declare interface Course {
    index: number,
    id: string,
    chineseName: string,
    englishName: string,
    type: string,
    score: number, // 成绩
    credit: number, // 学分
    comment: string,
    exchangeScore: string
}

declare interface TermInfo{
    termName: string,
    courses: Course[],
    selectedCourses: Course[]
}

