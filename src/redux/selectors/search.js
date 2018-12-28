export const getSearch = state => state.search;
export const getIsSearching = state => state.search.isSearching;
export const getSearchCategory = state => state.search.category;
export const getSearchPeriod = state => state.search.period;
export const getSearchString = state => state.search.search;
export const getSearchResults = state => state.search.results;


export default {
    getSearch,
    getIsSearching,
    getSearchCategory,
    getSearchPeriod,
    getSearchString,
    getSearchResults,
}