import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { Image, StyleSheet, View } from 'react-native';

import { Buffer } from 'buffer';
import seedrandom from 'seedrandom';


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',

        borderRadius: 5,
    },

});


export class Thumbnail extends PureComponent {

    static propTypes = {
        source: Image.propTypes.source,
    };

    state = {
        image: null,
    };

    constructor(props) {
        super(props);

        this._generateThumbnail(props, true);
    }

    _generateThumbnail = (props = this.props, initalize = false) => {
        const uri = props.source.uri;

        if (uri && uri.length > 0) {
            const a = [];
            const rnd = seedrandom(uri);

            for (let i = 0; i < 1024; i++) {
                a[i] = (rnd() * 256)|0;
            }

            const image = this._arrayToBase64(a, 16);

            if (initalize) {
                this.state = {
                    image,
                };
            } else {
                this.setState({
                    image,
                });
            }
        }
    };

    _btoa = (str) => {
        let buffer;

        if (str instanceof Buffer) {
            buffer = str;
        } else {
            buffer = Buffer.from(str.toString(), 'binary');
        }

        return buffer.toString('base64');
    };

    _arrayToBase64 = (arr, depth) => {
        let offset, height, data, src;

        function conv(size) {
            return String.fromCharCode(size&0xff, (size>>8)&0xff, (size>>16)&0xff, (size>>24)&0xff);
        }

        offset = depth <= 8 ? 54 + Math.pow(2, depth) * 4 : 54;
        height = Math.ceil(Math.sqrt(arr.length * 8 / depth));

        //BMP Header
        data  = 'BM';                          // ID field
        data += conv(offset + arr.length);     // BMP size
        data += conv(0);                       // unused
        data += conv(offset);                  // pixel data offset

        //DIB Header
        data += conv(40);                      // DIB header length
        data += conv(height);                  // image height
        data += conv(height);                  // image width
        data += String.fromCharCode(1, 0);     // colour panes
        data += String.fromCharCode(depth, 0); // bits per pixel
        data += conv(0);                       // compression method
        data += conv(arr.length);              // size of the raw data
        data += conv(2835);                    // horizontal print resolution
        data += conv(2835);                    // vertical print resolution
        data += conv(0);                       // colour palette, 0 == 2^n
        data += conv(0);                       // important colours

        //Grayscale tables for bit depths <= 8
        if (depth <= 8) {
            data += conv(0);

            for (let s = Math.floor(255 / (Math.pow(2, depth) - 1)), i = s; i < 256; i += s)  {
                data += conv(i + i * 256 + i * 65536);
            }
        }

        //Pixel data
        data += String.fromCharCode.apply(String, arr);

        src = 'data:image/bmp;base64,' + this._btoa(data);

        return src;
    };

    render() {
        const { source } = this.props;
        const { image } = this.state;

        const imageSource = (image && {uri: image}) || source;

        return (
            <Image style={styles.container} source={imageSource} blurRadius={1} />
        );

    }

}


export default Thumbnail;