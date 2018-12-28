import Realm from 'realm';


class Label {

    static schema = {
        name: 'Label',
        primaryKey: 'label',
        properties: {
            label: {type: 'string'},
            blog: {type: 'Blog'},

            articles: {type: 'linkingObjects', objectType: 'Article', property: 'labels'},
        },
    };

}


export default Label;