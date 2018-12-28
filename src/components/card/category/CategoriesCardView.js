/**
 * Created by DanielL on 16.06.2017.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { View, TouchableOpacity, Image, Text } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';


const images = {
    advice: require('./../../../resources/images/categories/advice.jpg'),
    economy: require('./../../../resources/images/categories/economy.jpg'),
    media: require('./../../../resources/images/categories/media.jpg'),
    newsticker: require('./../../../resources/images/categories/newsticker.jpg'),
    people: require('./../../../resources/images/categories/people.jpg'),
    politic: require('./../../../resources/images/categories/politic.jpg'),
    postillon24: require('./../../../resources/images/categories/postillon24.jpg'),
    science: require('./../../../resources/images/categories/science.jpg'),
    society: require('./../../../resources/images/categories/society.jpg'),
    sport: require('./../../../resources/images/categories/sport.jpg'),
    surveys: require('./../../../resources/images/categories/surveys.jpg'),
};

const imagesByEnSelector = {
    Politics: images.politic,
    Economics: images.economy,
    Sport: images.sport,
    People: images.people,
    Media: images.media,
    Science: images.science,
    Society: images.society,
    Surveys: images.surveys,
    Advice: images.advice,
    Newsticker: images.newsticker,
};

const imagesByDeSelector = {
    Politik: images.politic,
    Wirtschaft: images.economy,
    Sport: images.sport,
    Leute: images.people,
    Medien: images.media,
    Wissenschaft: images.science,
    Panorama: images.society,
    Umfrage: images.surveys,
    Ratgeber: images.advice,
    Newsticker: images.newsticker,
    Postillon24: images.postillon24,
};

const imagesByLocale = {
    en: imagesByEnSelector,
    de: imagesByDeSelector,
};


export class CategoriesCardView extends PureComponent {

    static displayName = 'CategoryCard';
    static componentName = 'CategoryCard';

    static propTypes = {
        category: PropTypes.string.isRequired,
        styles: PropTypes.object.isRequired,
        t: PropTypes.func.isRequired,
        onPress: PropTypes.func,
    };

    onCardPress = () => {
        const { category, onPress } = this.props;

        onPress && onPress(category);
    };

    render() {
        const { category, styles, t, locale } = this.props;

        const image = imagesByLocale[locale][category];

        return (
            <TouchableOpacity style={styles.touchable} onPress={this.onCardPress}>
                <View style={styles.cardContainer}>
                    <Image source={image} resizeMode={'cover'} style={styles.image} />

                    <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.6)']} style={styles.gradient}>
                        <Text style={styles.title}>{t(category)}</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        );
    }
}

export default CategoriesCardView;