import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactNative, { RefreshControl, SectionList, Text, View } from 'react-native';

import { ThemeManager } from "@postillon/react-native-theme";
import { LocalizedDate } from '@postillon/react-native-timeago';

import { SmallArticleCard } from '../../../../../components/card';

import InfoBar from '../../../../../components/infobar';


export class OnlineArchiveView extends PureComponent {

    static propTypes = {
        navigator: PropTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const { initialize } = this.props;

        initialize();
    }

    componentWillReceiveProps(nextProps) {
        const { locale: nextLocale } = nextProps;
        const { locale, initialize } = this.props;

        if (locale !== nextLocale) {
            initialize();
        }
    }

    handleRefresh = () => {
        const { reload } = this.props;

        reload();
    };

    handleArticlePressed = (article) => {
        const { navigator, t, theme } = this.props;
        const { article: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

        navigator.push({
            screen: 'postillon.Article',
            navigatorStyle: style,
            passProps: {
                articleId: article.id,
            },
        });
    };

    renderEmptyListComponent = () => {
        const { content, styles, t } = this.props;

        const isFetchingData = (content && (content.isFetching || content.isReloading)) || false;

        if (!isFetchingData) {
            return (
                <View style={styles.emptyListContainer}>
                    <Text style={[styles.text, styles.heading]}>¯\_(ツ)_/¯</Text>
                    <Text style={styles.text}>Schade...</Text>
                </View>
            );
        } else {
            return null;
        }
    };

    renderListFooterComponent = () => {
        const { styles } = this.props;

        return (
            <View style={styles.footer} />
        );
    };

    renderRefreshControl = () => {
        const { content, constants } = this.props;

        return (
            <RefreshControl
                key={'archive_online_refresh_control'}
                refreshing={content.isFetching || false}
                onRefresh={this.handleRefresh}
                tintColor={constants.colors.refreshControl.tintColor}
                colors={constants.colors.refreshControl.colors}
                progressBackgroundColor={constants.colors.refreshControl.background}
            />
        );
    };

    renderItem = ({item, index, section}) => <SmallArticleCard key={item.id} article={item} onPress={this.handleArticlePressed} />;

    renderSectionHeader = ({section: {title}}) => {
        const { t, locale, styles, constants } = this.props;

        return (
            <View style={styles.header}>
                <LocalizedDate style={styles.headertext} date={title} format={t('dateFormat')} locale={locale} />
            </View>
        );
    };

    render() {
        const { content, styles } = this.props;

        if (content) {
            const articles = content.articles && content.articles.reduce((articles, article) => {
                const date = article.published && article.published.getDate();

                if (date in articles) {
                    articles[date].push(article);
                } else {
                    articles[date] = [article];
                }

                return articles;
            }, {}) || {};

            const sections = [];

            for (const date in articles) {
                if (articles.hasOwnProperty(date)) {
                    sections[sections.length] = {
                        title: articles[date][0].published,
                        data: articles[date],
                    };
                }
            }

            return (
                <View style={styles.container}>
                    <SectionList
                        style={styles.container}
                        stickySectionHeadersEnabled={true}

                        renderItem={this.renderItem}
                        renderSectionHeader={this.renderSectionHeader}

                        keyExtractor={(item, index) => (item && item.id) || index}
                        sections={sections}

                        windowSize={20}
                        maxToRenderPerBatch={10}

                        refreshControl={this.renderRefreshControl()}

                        ListEmptyComponent={this.renderEmptyListComponent}
                        ListFooterComponent={this.renderListFooterComponent}
                    />

                    <InfoBar error={content && content.error} />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    {this.renderEmptyListComponent()}

                    <InfoBar />
                </View>
            );
        }
    }

}

export default OnlineArchiveView;