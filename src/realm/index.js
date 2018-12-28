/**
 * Created by DanielL on 13.07.2017.
 */

import Realm from 'realm';

import Blog from './schemas/blog';
import Label from './schemas/label';
import Category from './schemas/category';
import Article from './schemas/article';
import Image from './schemas/image';


export const RealmDb =  new Realm({
    schema: [Blog, Label, Category, Article, Image],
    schemaVersion: 1,
});

export default RealmDb;