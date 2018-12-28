import Realm from '../index';


const collectionName = 'Blog';
const Blogs =  Realm.objects(collectionName);


export const getBlogById = (id) => {
    return Realm.objectForPrimaryKey(collectionName, id);
};

export const createBlog = (blog) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const blogRealmObject = Realm.create(collectionName, blog);

                resolve(blogRealmObject);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const createOrUpdateBlogById = (id, blogPart) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const blogRealmObject = Realm.create(collectionName, { ...blogPart, id }, true);

                resolve(blogRealmObject);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const deleteBlogById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const blogRealmObject = getBlogById(id);

            if (blogRealmObject) {
                Realm.write(() => {
                    Realm.delete(blogRealmObject);

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
    getBlogById,
    createBlog,
    createOrUpdateBlogById,
    deleteBlogById,

    Blogs,
};