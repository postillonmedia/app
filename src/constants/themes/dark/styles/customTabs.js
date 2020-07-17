import colors from './../colors';


export default {
    // iOS Properties
    dismissButtonStyle: 'close',
    preferredBarTintColor: colors.tabs.background,
    preferredControlTintColor: colors.text.primary,
    readerMode: false,

    // Android Properties
    showTitle: true,
    toolbarColor: colors.tabs.background,
    secondaryToolbarColor: colors.text.primary,
    enableUrlBarHiding: true,
    enableDefaultShare: true,
    forceCloseOnRedirection: false,
    animations: {
        startEnter: 'slide_in_right',
        startExit: 'slide_out_left',
        endEnter: 'slide_in_left',
        endExit: 'slide_out_right'
    },
}