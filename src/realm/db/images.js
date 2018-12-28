/**
 * Created by DanielL on 13.07.2017.
 */

import Realm from '../index';


const collectionName = 'Image';
const Images =  Realm.objects(collectionName);


export const getImageByUrl = (url) => {
    return Realm.objectForPrimaryKey(collectionName, url);
};

export const createImage = (image) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const imageRealmObject = Realm.create(collectionName, image);

                resolve(imageRealmObject);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const createOrUpdateImageByUrl = (url, imagePart) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const imageRealmObject = Realm.create(collectionName, { ...imagePart, url }, true);

                resolve(imageRealmObject);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const createOrUpdateImages = (images) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                for (let i = 0; i < images.length; i++) {
                    Realm.create(collectionName, image, true);
                }

                resolve(true);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const deleteImageByUrl = (url) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const imageRealmObject = getImageByUrl(url);

                if (imageRealmObject) {
                    Realm.write(() => {
                        Realm.delete(imageRealmObject);

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
    getImageByUrl,
    createImage,
    createOrUpdateImageByUrl,
    createOrUpdateImages,
    deleteImageByUrl,

    Images,
};