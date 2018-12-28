import { StyleSheet } from 'react-native';

import { DarkTheme} from '../../../constants/themes';

import a from './../renderer/a/styles/dark';
import b from './../renderer/b/styles/dark';
import br from './../renderer/br/styles/dark';
import hr from './../renderer/hr/styles/dark';
import i from './../renderer/i/styles/dark';
import iframe from './../renderer/iframe/styles/dark';
import img from './../renderer/img/styles/dark';
import list from './../renderer/list/styles/dark';
import script from './../renderer/script/styles/dark';
import text from './../renderer/text/styles/dark';
import textwrapper from './../renderer/textwrapper/styles/dark';


export const styles = StyleSheet.create({

    // import renderer styles
    ...a,
    ...b,
    ...br,
    ...hr,
    ...i,
    ...iframe,
    ...img,
    ...list,
    ...script,
    ...text,
    ...textwrapper,


    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },

});

export default styles;