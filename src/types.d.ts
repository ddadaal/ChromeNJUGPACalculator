declare const enum ActionType {
    COLLECT_GRADES,
    TEST
}

declare interface Action { 
    type: ActionType
}



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
