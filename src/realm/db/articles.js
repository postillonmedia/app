/**
 * Created by DanielL on 13.07.2017.
 */

import Realm from '../index';


const collectionName = 'Article';
const Articles =  Realm.objects(collectionName);
const SortedArticles = Articles.sorted('published', true);
const ArchivatedArticles = Articles.filtered('archived!=null').sorted('archived', true);


export const getArticleById = (id) => {
    return Realm.objectForPrimaryKey(collectionName, id);
};

export const createArticle = (article) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const articleRealmObject = Realm.create(collectionName, article);

                resolve(articleRealmObject);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const createOrUpdateArticleById = (id, articlePart) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const articleRealmObject = Realm.create(collectionName, { ...articlePart, id }, true);

                resolve(articleRealmObject);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const createOrUpdateArticles = (articles) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                for (let i = 0; i < articles.length; i++) {
                    const article = articles[i];

                    Realm.create(collectionName, article, true);
                }

                resolve(true);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const deleteArticleById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const articleRealmObject = getArticleById(id);

                if (articleRealmObject) {
                    Realm.write(() => {
                        Realm.delete(articleRealmObject);

                        resolve(true);
                    });
                } else {
                    resolve(false);
                }
            });
        } catch (e) {
            reject(e);
        }
    });


};

export default {
    getArticleById,
    createArticle,
    createOrUpdateArticleById,
    createOrUpdateArticles,
    deleteArticleById,

    Articles,
    SortedArticles,
    ArchivatedArticles,
};