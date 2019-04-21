import { StyleSheet } from 'react-native';

import { DefaultTheme} from '../../../../constants/themes';

import a from '../renderer/a/styles/default';
import b from '../renderer/b/styles/default';
import br from '../renderer/br/styles/default';
import hr from '../renderer/hr/styles/default';
import i from '../renderer/i/styles/default';
import iframe from '../renderer/iframe/styles/default';
import img from '../renderer/img/styles/default';
import list from '../renderer/list/styles/default';
import script from '../renderer/script/styles/default';
import text from '../renderer/text/styles/default';
import textwrapper from '../renderer/textwrapper/styles/default';


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