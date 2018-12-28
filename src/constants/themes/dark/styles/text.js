import colors from './../colors';


const text = {
    fontSize: 14,

    color: colors.text.primary,
    backgroundColor: colors.monochrome.transparent,
};

export default {
    heading: {
        ...text,

        fontSize: 20,
        fontFamily: 'FiraSans-SemiBold',
    },

    article: {
        ...text,

        fontFamily: 'PTSerif-Regular',
    },

    ui: {
        ...text,

        fontFamily: 'FiraSans-Regular',
    },

    modal: {
        ...text,

        fontFamily: 'FiraSans-Light',
    },

    date: {
        ...text,

        fontSize: 12,
        fontFamily: 'FiraSans-Regular',

        color: colors.text.light,
    },
}