/**
 * Created by DanielL on 25.12.2018.
 */

const categories = {
    '*': 'All',
    Politics: 'Politics',
    Economics: 'Economics',
    Sport: 'Sport',
    People: 'People',
    Media: 'Media',
    Science: 'Science',
    Society: 'Society',
    Surveys: 'Surveys',
    Advice: 'Advice',
    Newsticker: 'News Ticker',
};

const list = {
    emptySubtext: 'There are no articles in this category.',

    listFooterNotConnected: 'Without Internet Connection you\'ll only see articles that have already been downloaded. What else did you expect?'
};

export default {
    categories,
    archive: {
        title: 'Archive',

        online: 'Online Archive',
        offline: 'Saved Articles',

        emptyHeader: 'Billy-goat on floppy disk.',
        emptySubtext: 'In German, that\'s a great pun. It doesn\'t work in english, but our offline-feature does. Download articles!',

        dateFormat: 'dddd, MMMM DD, YYYY',

        year: 2016,

        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    },
    categoriesList: {
        title: 'Categories',

        ...list,
        ...categories,
    },
    articlesList: {
        title: 'Articles',
        appTitle: 'The Postillon',

        ...list,
    },
    articlesCard: {
        readOffline: 'Read offline',
        deleteDownload: 'Delete Download',
        inProgress: '%s\%',
    },
    article: {
        dateFormat: 'dddd, MMMM DD, YYYY',
        share: 'Share article',
        settings: 'Article settings',
        loading: 'Article is loading',
        more: 'More articles',

        'copilot.image': 'You can zoom every image with a two-finger pitch gesture.',
        'copilot.back': 'Press and hold to go back to the articles listing',
        'copilot.settings': 'Change the font size and theme of the app',
    },
    articleByPath: {
        loading: 'Loading article...',
        error: 'Error: %s',
    },
    content: {
        webviewRendering: 'An alternate rendering option was chosen in order to display the article\'s content correctly.',
    },
    more: {
        title: 'More',

        settings: 'Settings',

        support: 'Support us',

        shopillon: 'Shopillon',
        support_with_monthly_subscription: 'Monthly subscription via Steady',
        support_with_single_gift: 'Single payment',
        support_with_single_gift_modal_intro: 'You can donate to The Postillon with the following bank details:',
        support_with_single_gift_modal_bankinfo: 'Der Postillon\nAccount Number: 40444028\nBank Code: 762 500 00 (Sparkasse Fürth)\nIBAN: DE90762500000040444028\nBIC: BYLADEM1SFU\nSubject: Spende Postillon',
        support_with_single_gift_modal_bankinfo_copied: 'Bank details copied to clipboard.',
        support_with_single_gift_modal_paypal: 'or simply online with PayPal:',
        support_with_single_gift_modal_paypal_spend: 'Donate with PayPal',
        support_with_ad: 'Ads on the Postillon',
        support_watch_ad: 'Watch Ad',
        support_watch_ad_failed: 'Sorry, we can not show you any ads right now.',
        rate: 'Rate the App',


        other: 'Some other links',

        faktillon: 'Faktillon on Facebook (Ger)',
        postillon24: 'Postillon24 on YouTube (Ger)',
        faq: 'FAQ',
        history: 'The Postillon from 1845 until %s',
        privacyPolicy: 'Privacy Policy',
        imprint: 'Imprint',


        development: 'Development',

        documentation: 'Documentation',
        github: 'Github',
        about: 'About'
    },
    settings: {
        title: 'Settings',

        appSection: 'App-Interface',

        languageTitle: 'Language',
        languageDe: 'Deutsch',
        languageEn: 'English',

        themeTitle: 'Theme',
        themeLight: 'Light',
        themeDark: 'Dark',

        articleSection: 'Article',

        displayBackButton: 'Display back button',
        displayTutorial: 'Show tutorial',

        notificationSection: 'Notifications',

        notificationTitle: 'Notifications',
        notificationEnable: 'Enable notifications',
        notificationSound: 'Sound',
        notificationVibrate: 'Vibration',
    },
    privacyPolicy: {
        title: 'Privacy Policy',
    },
    imprint: {
        title: 'Imprint',
    },
    about: {
        title: 'About',

        app: 'App',
        developers: 'Developers',
        dependencies: 'Dependencies',

        name: 'Name',
        version: 'Version',
        repository: 'Repository',

        email: 'Email',
        url: 'Homepage'
    },
    search: {
        title: 'Search',

        placeholder: 'Search the Postillon...',
        period: 'Period',
        category: 'Category',

        emptyList: 'Still no results',

        LastWeek: 'Last Week',
        LastMonth: 'Last Month',
        LastYear: 'Last year',
        NoFilter: 'No filter',

        ...categories,
    },
    copilot: {
        skip: 'Skip',
        previous: 'Previous',
        next: 'Next',
        finish: 'Finish',
    },
    infobar: {
        noConnection: 'No connection',
        error: 'Ouch! An error occurred',
        errorMoreInfo: 'More Info',
        errorAdvanced: 'Error Report',
    },
    steady: {
        greeting: 'Hello, %s!',
        subscribed: 'Subscribed: %s',
        notSubscribed: 'Currently you don\'t support the Postillon',
        subscribe: 'Subscribe us on Steady',
        costs: 'You donate %s€ / month',

        info: 'Info',

        adaway: 'Go ad-free with',

        error: 'Ouch, damn!',
        errorSubheading: 'Something went terribly wrong.',
        errorAdvanced: 'Error report',
        retry: 'Try it again',
    },
    'offline.indicator': {
        image: 'You are currently not online',
        other: 'This online content will load automatically as soon as you go online.'
    },

    'modal.archive.add': {
        heading: 'Download images?',
        text: 'Article text saved offline. Download contained images as well?',

        noConnection: 'This feature is only possible if you are connected to the internet!',

        btnDownloadWithPictures: 'Download',
        btnDownloadWithoutPictures: 'No images, thanks',
    },
    'modal.archive.remove': {
        heading: 'Delete article from archive?',
        text: 'You will not be able to access this article without an active internet connection anymore.',

        btnDeleteArticle: 'Delete',
        btnCancel: 'No, keep in archive',
    },
    'modal.article.settings': {
        dark: 'Dark',
        light: 'Light',
        fontsize: 'Font size',
        theme: 'Theme',
    },
    'modal.steady.login': {
        heading: 'Ad-free Postillon App and website',
        text: 'With Steady you can support the Postillon with a monthly subscription to enjoy all our content free of ads! That applies to the app, as well as the website. You decide how much you want to donate. :)',

        btnCreateAccount: 'Create new account',
        btnLoginAccount: 'Log in',
        btnNotInterested: 'No thanks, I like ads',
    },
    'modal.steady.info': {
        heading: 'Steady-Informations',

        user: 'User',
        subscription: 'Subscription',

        name: 'Name',
        email: 'Email',

        notSubscribed: 'Currently no subscription.',
        state: 'State',
        plan: 'Plan',
        costs: 'Cost',

        btnClose: 'Close',
        btnLogout: 'Log out',
    }
}