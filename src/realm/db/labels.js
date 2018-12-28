import Realm from '../index';


const collectionName = 'Label';
const Labels =  Realm.objects(collectionName);


export const getLabelByLabelContent = (labelContent) => {
    return Realm.objectForPrimaryKey(collectionName, labelContent);
};

export const createLabel = (label) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const labelRealmObject = Realm.create(collectionName, label);

                resolve(labelRealmObject);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const createOrUpdateLabelById = (id, labelPart) => {
    return new Promise((resolve, reject) => {
        try {
            Realm.write(() => {
                const labelRealmObject = Realm.create(collectionName, { ...labelPart, id }, true);

                resolve(labelRealmObject);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const deleteLabelByLabelContent = (labelContent) => {
    return new Promise((resolve, reject) => {
        try {
            const labelRealmObject = getLabelByLabelContent(labelContent);

            if (labelRealmObject) {
                Realm.write(() => {
                    Realm.delete(labelRealmObject);

                    resolve(true);
                });
            } else {
                reject(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    getLabelByLabelContent,
    createLabel,
    createOrUpdateLabelById,
    deleteLabelByLabelContent,

    Labels,
};