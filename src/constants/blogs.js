/**
 * Created by DanielL on 06.04.2017.
 */

export const BLOG_DE = '746298260979647434';
export const BLOG_EN = '2124855141757136521';

const DER_POSTILLON = 'der-postillon.com';
const THE_POSTILLON = 'the-postillon.com';
const WWW_DER_POSTILLON = 'www.der-postillon.com';
const WWW_THE_POSTILLON = 'www.the-postillon.com';

const blogs = {
    de: BLOG_DE,
    en: BLOG_EN,
};

const hostnames = {
    [DER_POSTILLON]: BLOG_DE,
    [THE_POSTILLON]: BLOG_EN,
    [WWW_DER_POSTILLON]: BLOG_DE,
    [WWW_THE_POSTILLON]: BLOG_EN,
};

const hostnamesByBlog = {
    [BLOG_DE]: DER_POSTILLON,
    [BLOG_EN]: THE_POSTILLON,
};

export const getBlogByLanguage = language => {
    return blogs[language];
};

export const getBlogByHostname = hostname => {
    return hostnames[hostname];
};

export const getHostnameByBlog = (blog, protocol = true) => {
    return (protocol ? 'http://' : '') + hostnamesByBlog[blog];
};


export default {
    BLOG_DE,
    BLOG_EN,

    BLOGS: blogs,
    HOSTNAMES: hostnames,

    getBlogByLanguage,
    getBlogByHostname,
    getHostnameByBlog,
}