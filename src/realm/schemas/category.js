import Realm from 'realm';


class Category {

    static schema = {
        name: 'Category',
        primaryKey: 'id',
        properties: {
            id: {type: 'string'},
            selector: {type: 'string'},

            blog: {type: 'Blog'},
            articles: {type: 'linkingObjects', objectType: 'Article', property: 'categories'},
        },
    };

}


export default Category;