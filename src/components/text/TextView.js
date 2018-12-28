import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactNative, { Text } from 'react-native';



export class TextView extends PureComponent {

    static propTypes = {
        ...Text.propTypes,

        bold: PropTypes.bool,
        italic: PropTypes.bool,

        h1: PropTypes.bool,
        h2: PropTypes.bool,
        h3: PropTypes.bool,
        h4: PropTypes.bool,
        h5: PropTypes.bool,

        styles: PropTypes.object.isRequired,
    };

    static defaultProps = {
        bold: false,
        italic: false,

        h1: false,
        h2: false,
        h3: false,
        h4: false,
        h5: false,
    };

    render() {
        const {
            bold, italic,

            h1, h2, h3, h4, h5,

            style: customStyle,
            styles,

            children,

            ...textProps
        } = this.props;

        const style = [
            styles.base,

            h1 && styles.h1,
            h2 && styles.h2,
            h3 && styles.h3,
            h4 && styles.h4,
            h5 && styles.h5,

            bold && styles.bold,
            italic && styles.italic,

            customStyle,
        ];

        return (
            <Text style={style} {...textProps}>{children}</Text>
        );
    }

}


export default TextView;