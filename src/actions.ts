
export interface RequireCurrentTermInfoAction {
    type: "REQUIRE_CURRENT_TERMINFO"
}

export interface ResultCurrentTermInfoAction {
    type: "RESULT_CURRENT_TERMINFO",
    termInfo: TermInfo
}

export interface RefreshPageAction {
    type: "REFRESH_PAGE"
}

export const constants = {
    RequireCurrentTermInfo: "REQUIRE_CURRENT_TERMINFO",
    ResultCurrentTermInfo:
    "RESULT_CURRENT_TERMINFO",
    RefreshPage:
    "REFRESH_PAGE"
}



export const actionCreators = {
    requireCurrentTermInfo: ()=>(
        {type: constants.RequireCurrentTermInfo}
    ),
    resultCurrentTermInfo: (termInfo: TermInfo)=>({
        type: constants.ResultCurrentTermInfo,
        termInfo: termInfo
    }),
    refreshPage: ()=>({
        type: constants.RefreshPage
    })
};

