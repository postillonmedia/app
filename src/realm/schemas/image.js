import Realm from 'realm';


class Image {

    static schema = {
        name: 'Image',
        primaryKey: 'url',
        properties: {
            url: {type: 'string'},

            offline: {type: 'bool', default: false},
            path: {type: 'string', optional: true},

            width: {type: 'int', optional: true},
            height: {type: 'int', optional: true},

            articles: {type: 'linkingObjects', objectType: 'Article', property: 'images'},
        },
    };

}


export default Image;