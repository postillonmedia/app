export const getPageByBlogAndCategory = (state, blogId, category = null) => {
    const selector = !category ? blogId : blogId + '_' + category;

    return state.pages[selector];
};


export default {
    getPageByBlogAndCategory,
}