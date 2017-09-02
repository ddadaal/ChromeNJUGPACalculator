export const enum ActionType {
    COLLECT_GRADES,
    TEST
}

export interface Action { 
    type: ActionType
}

export const jwUrl = "http://elite.nju.edu.cn/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList";
