import { selectedTermsKey } from './configs';



export async function getSelectedTermsAsync (){
    const terms = (await chrome.storage.local.get())[selectedTermsKey] as TermInfo[];
    return terms ? terms : [];
    
}

export async function setSelectedTermsAsync (terms: TermInfo[]){
    await chrome.storage.local.set({[selectedTermsKey]: terms});
}

export async function selectOrUpdateTermAsync(term: TermInfo) {
    const currentTerms = await getSelectedTermsAsync();
    await setSelectedTermsAsync(currentTerms.filter(x => x.termName !== term.termName).concat(term));
}

export async function deselectTermAsync(term: TermInfo) {
    const currentTerms = await getSelectedTermsAsync();
    await setSelectedTermsAsync(currentTerms.filter(x => x.termName !== term.termName));
}