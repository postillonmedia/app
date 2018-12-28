import { action } from './';


export const ARTICLE_OPEN = 'ARTICLE_OPEN';

export const ARTICLE_SET = 'ARTICLE_SET';

export const ARTICLE_REQUEST = 'ARTICLE_REQUEST';
export const ARTICLE_REQUEST_FAILURE = 'ARTICLE_REQUEST_FAILURE';

export const ARTICLE_PROCESS = 'ARTICLE_PROCESS';
export const ARTICLE_PROCESS_FAILURE = 'ARTICLE_PROCESS_FAILURE';

export const ARTICLE_ARCHIVE_SET_STATE = 'ARTICLE_ARCHIVE_SET_STATE';
export const ARTICLE_ARCHIVE_ADD_WITH_PICTURES = 'ARTICLE_ARCHIVE_ADD_WITH_PICTURES';
export const ARTICLE_ARCHIVE_ADD_WITHOUT_PICTURES = 'ARTICLE_ARCHIVE_ADD_WITHOUT_PICTURES';
export const ARTICLE_ARCHIVE_REMOVE = 'ARTICLE_ARCHIVE_REMOVE';

export const ARTICLE_ARCHIVE_ADDED = 'ARTICLE_ARCHIVE_ADDED';
export const ARTICLE_ARCHIVE_REMOVED = 'ARTICLE_ARCHIVE_REMOVED';



export const openArticle = (id) => action(ARTICLE_OPEN, {id});
export const setArticle = (id, article = null) => action(ARTICLE_SET, {id, article});

export const request = (id) => action(ARTICLE_REQUEST, {id});
export const requestFailure = (id, error) => action(ARTICLE_REQUEST_FAILURE, {id, error});

export const process = (id, blogId, path, article) => action(ARTICLE_PROCESS, {id, blogId, path, article});
export const processFailure = (id, error) => action(ARTICLE_PROCESS_FAILURE, {id, error});


export const setArchivatingState = (id, state) => action(ARTICLE_ARCHIVE_SET_STATE, {id, state});
export const addArticleToArchiveWithPictures = id => action(ARTICLE_ARCHIVE_ADD_WITH_PICTURES, {id});
export const addArticleToArchiveWithoutPictures = id => action(ARTICLE_ARCHIVE_ADD_WITHOUT_PICTURES, {id});
export const removeArticleFromArchive = id => action(ARTICLE_ARCHIVE_REMOVE, {id});

export const archivedArticle = id => action(ARTICLE_ARCHIVE_ADDED, {id});
export const removedArticle = id => action(ARTICLE_ARCHIVE_REMOVED, {id});