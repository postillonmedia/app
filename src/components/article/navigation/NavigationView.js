import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactNative, { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import Articles from '../../../realm/db/articles';
import { getBlogByLanguage } from '../../../constants/blogs';

import { SmallArticleCard } from './../../card';


export class NavigationView extends PureComponent {

    static propTypes = {
        category: PropTypes.string,

        page: PropTypes.object,
        articleState: PropTypes.object,

        onArticlePress: PropTypes.func,
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);

        this.state = {
            previous: null,
            next: null,
        };
    }

    componentDidMount() {
        setTimeout(this.findAdjacentArticles, 0);
    }

    componentWillReceiveProps(nextProps) {

    }

    findAdjacentArticles = () => {
        const { page, articleState } = this.props;

        const articleId = articleState.articleId;
        const articles = page.articles;

        const index = articles.findIndex((article, index, collection) => {
            return article.id === articleId;
        });

        let previous;
        if (index - 1 < 0) {
            previous = null;
        } else {
            previous = articles[index -1];
        }

        let next;
        if (index + 1 >= articles.length) {
            next = null;
        } else {
            next = articles[index + 1];
        }

        this.setState({
            previous,
            next,
        });
    };

    handleArticlePressed = (article) =>{
        const { onArticlePress } = this.props;

        onArticlePress && onArticlePress(article);
    };

    render() {
        const { t, styles, constants } = this.props;
        const { next, previous } = this.state;

        const previousTitle = previous && previous.title;
        const nextTitle = next && next.title;


        const content = [];

        previousTitle && (content[content.length] = ( <Text onPress={() => this.handleArticlePressed(previous)}>{previousTitle}</Text> ));
        nextTitle && (content[content.length] = ( <Text onPress={() => this.handleArticlePressed(next)}>{nextTitle}</Text> ));
        // content[content.length] = ( <ActivityIndicator animating={true} size={'large'} color={constants.colors.activityIndicator} /> );

        return (
            <View style={[styles.container, styles.section]}>
                <Text style={styles.heading}>{t('more')}</Text>
                <View style={styles.line} />

                {content}
            </View>
        );
    }
}


export default NavigationView;