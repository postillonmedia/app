import React, { PureComponent } from 'react';
import ReactNative, { Animated, LayoutAnimation, View, Text, TouchableOpacity, FlatList } from 'react-native';

import PropTypes from 'prop-types';


export class OnlineArchiveControlView extends PureComponent {

    constructor(props) {
        super(props);

        const { t } = props;

        this.date = new Date();

        this.state = {
            years: this.calculateYears(t('year')),
            months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        };
    }

    componentWillReceiveProps(nextProps) {
        const { t, locale: nextLocale } = nextProps;
        const { locale } = this.props;

        if (locale !== nextLocale) {
            const years = this.calculateYears(t('year'));

            this.setState({
                years,
            });
        }
    }

    calculateYears = begin => {
        const years = [];

        for (let year = begin; year <= this.date.getFullYear(); year++) {
            years[years.length] = year;
        }

        return years;
    };

    handleSelectorChanged = selector => event => {
        const { setSelector } = this.props;

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setSelector && setSelector(selector);
    };

    handleYearSelected = year => event => {
        const { setYearAndSelectMonth, setMonth, month } = this.props;

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setYearAndSelectMonth && setYearAndSelectMonth(year);

        if (year >= this.date.getFullYear() && month > this.date.getMonth()) {
            setMonth(this.date.getMonth());
        }
    };

    handleMonthSelected = month => event => {
        const { setMonth } = this.props;

        setMonth && setMonth(month);
    };

    renderSelectorItem = (type, pointer, selected) => ({item, index}) => {
        const { styles, t } = this.props;
        const handler = pointer && pointer(item);
        const text = type === 'year' ? item : t(item);

        return (
            <TouchableOpacity key={type + item} onPress={handler} style={styles.item}>
                <Text key={item} style={[styles.text, selected === index && styles.selected]}>{text}</Text>
            </TouchableOpacity>
        );
    };

    renderSelector = (type, list) => {
        const typeName = type.charAt(0).toUpperCase() + type.slice(1);

        const { selector, styles } = this.props;
        const current = this.props[selector];

        const pointer = this['handle' + typeName + 'Selected'];
        const selected = list.indexOf(current);

        return (
            <FlatList
                key={type + '_list'}
                style={styles.list}
                horizontal={true}
                initialScrollIndex={selected}
                showsHorizontalScrollIndicator={false}

                data={list}
                renderItem={this.renderSelectorItem(type, pointer, selected)}
                keyExtractor={(item, index) => type + item}
            />
        );
    };

    render() {
        const { position, navigationState, styles, t, selector, year, month } = this.props;
        const { years } = this.state;

        const translateY = position.interpolate({
            inputRange: [0, navigationState.routes.length - 1],
            outputRange: [100, 0],
            extrapolate: 'clamp',
        });

        const content = [];

        if (selector === 'month') {

            let months;

            if (year < this.date.getFullYear()) {
                months = this.state.months;
            } else {
                months = [];

                for (let month = 0; month <= this.date.getMonth(); month++) {
                    months.push(month);
                }
            }

            content[content.length] = (
                <TouchableOpacity key={'touchable_' + year} style={[styles.switch, { borderRightWidth: 1 }]} onPress={this.handleSelectorChanged('year')}>
                    <Text key={year} style={[styles.text, styles.selected]}>{year}</Text>
                </TouchableOpacity>
            );

            content[content.length] = this.renderSelector(selector, months);

        } else if (selector === 'year') {

            content[content.length] = this.renderSelector(selector, years);

            content[content.length] = (
                <TouchableOpacity key={'touchable_' + month} style={[styles.switch, { borderLeftWidth: 1, }]} onPress={this.handleSelectorChanged('month')}>
                    <Text key={month} style={[styles.text, styles.selected]}>{t(month)}</Text>
                </TouchableOpacity>
            );

        }

        return (
            <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
                {content}
            </Animated.View>
        );
    }

}


export default OnlineArchiveControlView;