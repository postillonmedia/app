import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactNative, { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import Articles from '../../../realm/db/articles';
import { getBlogByLanguage } from '../../../constants/blogs';

import { SmallArticleCard } from './../../card';


export class RecommendationsView extends PureComponent {

    static propTypes = {
        count: PropTypes.number,
        articleState: PropTypes.object,

        onArticlePress: PropTypes.func,

        renderAd: PropTypes.func
    };

    static defaultProps = {
        count: 3,
    };

    constructor(props) {
        super(props);

        this.state = {
            articles: this.getRecommendations()
        };
    }

    getRecommendations = () => {
        const { articleState, locale, count } = this.props;

        const blogId = getBlogByLanguage(locale);

        const indices = {};
        const articles = [];
        const source = Articles.Articles.filtered('id != $0 AND blog.id == $1', articleState.articleId, blogId);
        const length = source.length;

        let i = 0;

        while (i < count && i < length) {
            const index = ~~(length * Math.random()) | 0;
            const article = source[index];

            if (indices[index]) {
                continue;
            }

            indices[index] = true;
            articles[articles.length] = article;

            i++;
        }

        return articles;
    };

    handleArticlePressed = (article) => {
        const { onArticlePress } = this.props;

        onArticlePress && onArticlePress(article);
    };

    render() {
        const { articles } = this.state;
        const { renderAd, t, styles, constants } = this.props;

        const content = [];

        if (articles.length > 0) {
            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];

                content[content.length] = ( <SmallArticleCard key={article.id} article={article} onPress={this.handleArticlePressed} /> );

                if ((i + 1) % 2 === 0) {
                    content[content.length] = renderAd && renderAd(article);
                }
            }
        } else {
            content[content.length] = ( <ActivityIndicator animating={true} size={'large'} color={constants.colors.activityIndicator} /> );
        }

        return (
            <View style={[styles.container, styles.section]}>
                <Text style={styles.heading}>{t('more')}</Text>
                <View style={styles.line} />

                {content}
            </View>
        );
    }
}


export default RecommendationsView;