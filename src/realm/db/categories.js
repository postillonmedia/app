import Realm from '../index';
import { getBlogById } from './blogs';

const collectionName = 'Category';
const Categories =  Realm.objects(collectionName);

export const getCategoryById = (id) => {
    return Realm.objectForPrimaryKey(collectionName, id);
};

export const getCategoryByBlogAndSelector = (blogId, selector) => {
    return getCategoryById(blogId + '_' + selector);
};

export const createCategory = (category) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const categoryRealmObject = Realm.create(collectionName, category);

                resolve(categoryRealmObject);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const createOrUpdateCategoryById = (id, categoryPart) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const categoryRealmObject = Realm.create(collectionName, { ...categoryPart, id }, true);

                resolve(categoryRealmObject);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const deleteCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const categoryRealmObject = getCategoryById(id);

            if (categoryRealmObject) {
                Realm.write(() => {
                    Realm.delete(categoryRealmObject);

                    resolve(true);
                });
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    getCategoryById,
    getCategoryByBlogAndSelector,
    createCategory,
    createOrUpdateCategoryById,
    deleteCategoryById,

    Categories,
};