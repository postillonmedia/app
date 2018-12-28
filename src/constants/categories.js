/**
 * Created by DanielL on 06.04.2017.
 */

import {BLOG_DE, BLOG_EN} from './blogs';
import languages, {LANGUAGE_DE, LANGUAGE_EN} from './languages';


const de_politic = 'Politik';
const de_economic = 'Wirtschaft';
const de_sport = 'Sport';
const de_people = 'Leute';
const de_media = 'Medien';
const de_science = 'Wissenschaft';
const de_panorama = 'Panorama';
const de_surveys = 'Umfrage';
const de_advice = 'Ratgeber';
const de_newsticker = 'Newsticker';
const de_postillon24 = 'Postillon24';



const en_politic = 'Politics';
const en_economic = 'Economics';
const en_sport = 'Sport';
const en_people = 'People';
const en_media = 'Media';
const en_science = 'Science';
const en_society = 'Society';
const en_surveys = 'Surveys';
const en_advice = 'Advice';
const en_newsticker = 'Newsticker';



export const CATEGORIES_DE_ARR = [de_politic, de_economic, de_sport, de_people, de_media, de_science, de_panorama, de_surveys, de_advice, de_newsticker, de_postillon24];
export const CATEGORIES_DE_OBJ = {
    [de_politic]: true,
    [de_economic]: true,
    [de_sport]: true,
    [de_people]: true,
    [de_media]: true,
    [de_science]: true,
    [de_panorama]: true,
    [de_surveys]: true,
    [de_advice]: true,
    [de_newsticker]: true,
    [de_postillon24]: true,
};

export const CATEGORIES_EN_ARR = [en_politic, en_economic, en_sport, en_people, en_media, en_science, en_society, en_surveys, en_advice, en_newsticker];
export const CATEGORIES_EN_OBJ = {
    [en_politic]: true,
    [en_economic]: true,
    [en_sport]: true,
    [en_people]: true,
    [en_media]: true,
    [en_science]: true,
    [en_society]: true,
    [en_surveys]: true,
    [en_advice]: true,
    [en_newsticker]: true,
};



const categoriesArray = {
    [LANGUAGE_DE]: CATEGORIES_DE_ARR,
    [LANGUAGE_EN]: CATEGORIES_EN_ARR,
};

const categoriesByBlogIdArray = {
    [BLOG_DE]: CATEGORIES_DE_ARR,
    [BLOG_EN]: CATEGORIES_EN_ARR,
};



const categoriesObject = {
    [LANGUAGE_DE]: CATEGORIES_DE_OBJ,
    [LANGUAGE_EN]: CATEGORIES_EN_OBJ,
};

const categoriesByBlogIdObject = {
    [BLOG_DE]: CATEGORIES_DE_OBJ,
    [BLOG_EN]: CATEGORIES_EN_OBJ,
};


export const getCategoriesByLocale = language => categoriesArray[language];
export const getCategoriesObjectByLocale = language => categoriesObject[language];

export const getCategoriesByBlogId = blogId => categoriesByBlogIdArray[blogId];
export const getCategoriesObjectByBlogId = blogId => categoriesByBlogIdObject[blogId];



export default {
    CATEGORIES: categoriesArray,

    getCategoriesByLocale,
    getCategoriesObjectByLocale,

    getCategoriesByBlogId,
    getCategoriesObjectByBlogId,
}