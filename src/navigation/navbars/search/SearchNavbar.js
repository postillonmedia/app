import React, { PureComponent } from 'react';
import ReactNative, { View, TextInput } from 'react-native';


export class SearchNavbar extends PureComponent {

    onChangeText = (text) => {

    };

    onSubmitEditing = ({nativeEvent}) => {
        const { text } = nativeEvent;
        const { submitSearch } = this.props;

        submitSearch(text);
    };

    render() {
        const { styles, constants, t } = this.props;

        return (
            <View style={styles.navbar}>
                <TextInput
                    style={styles.textfiled}
                    selectionColor={constants.colors.text.highlighted}
                    placeholderTextColor={constants.colors.text.secondary}
                    underlineColorAndroid={'transparent'}

                    placeholder={t('placeholder')}
                    returnKeyType={'search'}
                    keyboardType={'default'}
                    keyboardAppearance={constants.styles.keyboard}
                    enablesReturnKeyAutomatically={true}

                    autoFocus={true}
                    autoGrow={false}

                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEditing}
                ></TextInput>
            </View>
        );
    }

}

export default SearchNavbar;