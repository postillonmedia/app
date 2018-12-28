import { DomHandler, DomUtils } from 'htmlparser2/lib';

import { getImageUrl } from './BloggerImageUrl';


export class BloggerHandler extends DomHandler {

    constructor(callback, options) {
        super(callback, options);
    }

    static getElements(what, where) {
        return DomUtils.getElementsByTagName(what, where, true);
    }
    static getOneElement(what, where) {
        return DomUtils.getElementsByTagName(what, where, true, 1)[0];
    }
    static fetch(what, where, recurse){
        return DomUtils.getText(
            DomUtils.getElementsByTagName(what, where, recurse, 1)
        ).trim();
    }

    static addConditionally(obj, prop, what, where, recurse){
        const tmp = BloggerHandler.fetch(what, where, recurse);
        if(tmp) obj[prop] = tmp;
    }

    static isValidFeed(value) {
        return value === 'rss' || value === 'feed' || value === 'rdf:RDF';
    };

    onend() {
        const feed = {};
        const feedRoot = BloggerHandler.getOneElement(BloggerHandler.isValidFeed, this.dom);

        let tmp;
        let childs;

        if(feedRoot){
            if(feedRoot.name === 'feed'){
                childs = feedRoot.children;

                feed.type = 'atom';
                BloggerHandler.addConditionally(feed, 'id', 'id', childs);
                BloggerHandler.addConditionally(feed, 'title', 'title', childs);
                if((tmp = BloggerHandler.getOneElement('link', childs)) && (tmp = tmp.attribs) && (tmp = tmp.href)) feed.link = tmp;
                BloggerHandler.addConditionally(feed, 'description', 'subtitle', childs);
                if((tmp = BloggerHandler.fetch('updated', childs))) feed.updated = new Date(tmp);
                BloggerHandler.addConditionally(feed, 'author', 'email', childs, true);

                feed.items = BloggerHandler.getElements('entry', childs).map(function(item){
                    const entry = {};
                    let tmp;

                    item = item.children;

                    BloggerHandler.addConditionally(entry, 'id', 'id', item);
                    BloggerHandler.addConditionally(entry, 'title', 'title', item);
                    if((tmp = BloggerHandler.fetch('summary', item) || BloggerHandler.fetch('content', item))) entry.description = tmp;
                    if((tmp = BloggerHandler.fetch('updated', item))) entry.updated = new Date(tmp);
                    if((tmp = BloggerHandler.fetch('published', item))) entry.published = new Date(tmp);

                    // get links
                    if((tmp = BloggerHandler.getOneElement('link', item)) && (tmp = tmp.attribs) && (tmp = tmp.href)) entry.link = tmp;
                    if((tmp = BloggerHandler.getElements('link', item)) && tmp.length && tmp.length > 0) {
                        entry.links = tmp.reduce((links, item, index) => {
                            if (item.attribs && item.attribs.rel && item.attribs.href) {
                                links[item.attribs.rel] = item.attribs.href;
                            }

                            return links;
                        }, {});
                    }

                    // get media
                    if((tmp = BloggerHandler.getOneElement('media:thumbnail', item)) && (tmp = tmp.attribs) && (tmp = tmp.url)) {
                        entry.thumbnail = getImageUrl(tmp, 75);
                        entry.image = getImageUrl(tmp, 200);
                    }

                    return entry;
                });
            } else {

                throw new Error('couldn\'t find root of feed');

            }
        }

        this.dom = feed;
        DomHandler.prototype._handleCallback.call(
            this, feedRoot ? null : Error('couldn\'t find root of feed')
        );
    };

}


export default BloggerHandler;