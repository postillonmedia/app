import { DarkTheme } from './../../../../../constants/themes';


export const styles = {
    image: {
        flex: 1,
        borderRadius: 5,
    },

    caption: {
        ...DarkTheme.styles.text.article,

        flex: 1,
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,

        borderRadius: 5,

        color: DarkTheme.colors.text.secondary,
        backgroundColor: DarkTheme.colors.bg.lighter,

        textAlign: 'center',
        fontFamily: 'PTSerif-Italic',

    }
};

export default styles;