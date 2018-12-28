import Realm from 'realm';


class Blog {

    static schema = {
        name: 'Blog',
        primaryKey: 'id',
        properties: {
            id: {type: 'string'},

            articles: {type: 'linkingObjects', objectType: 'Article', property: 'blog'},
            categories: {type: 'linkingObjects', objectType: 'Category', property: 'blog'},
        },
    };

}


export default Blog;