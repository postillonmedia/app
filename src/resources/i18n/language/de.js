/**
 * Created by DanielL on 03.04.2017.
 */

const categories = {
    '*': 'Alle',
    Politik: 'Politik',
    Wirtschaft: 'Wirtschaft',
    Sport: 'Sport',
    Leute: 'Leute',
    Medien: 'Medien',
    Wissenschaft: 'Wissenschaft',
    Panorama: 'Panorama',
    Umfrage: 'Umfrage',
    Ratgeber: 'Ratgeber',
    Newsticker: 'Newsticker',
    Postillon24: 'Postillon 24',
};

const list = {
    emptySubtext: 'Es wurden keine Artikel in dieser Kategorie gefunden.',

    listFooterNotConnected: 'Ohne Internetverbindung siehst Du nur Artikel, die schon heruntergeladen wurden. Was hattest Du denn erwartet?'
};

export default {
    categories,
    archive: {
        title: 'Archiv',

        online: 'Online Archiv',
        offline: 'Gespeicherte Artikel',

        emptyHeader: 'Bock auf Speichern?',
        emptySubtext: 'Wenn du Artikel herunterlädst, kannst du sie auch in unkultivierten Gegenden genießen!',

        dateFormat: 'dddd, DD. MMMM YYYY',

        year: 2008,

        0: 'Januar',
        1: 'Februar',
        2: 'März',
        3: 'April',
        4: 'Mai',
        5: 'Juni',
        6: 'Juli',
        7: 'August',
        8: 'September',
        9: 'Oktober',
        10: 'November',
        11: 'Dezember',
    },
    categoriesList: {
        title: 'Rubriken',

        ...list,
        ...categories,
    },
    articlesList: {
        title: 'Artikel',
        appTitle: 'Der Postillon',

        ...list,
    },
    articlesCard: {
        readOffline: 'Offline lesen',
        deleteDownload: 'Download löschen',
        inProgress: '%s\%',
    },
    article: {
        dateFormat: 'dddd, DD. MMMM YYYY',
        share: 'Artikel teilen',
        settings: 'Artikeldarstellung',
        loading: 'Artikel wird geladen',
        more: 'Weitere Artikel',
        ad: 'Anzeige',
        comments: 'Kommentare',
        commentsLoad: 'Kommentare laden',
        commentsLoadAlways: 'Immer automatisch laden',

        'copilot.image': 'Bilder lassen sich durch die 2-Finger-Zoomgeste vergrößern.',
        'copilot.back': 'Gedrückt halten, um sofort zur Übersicht zurückzukommen.',
        'copilot.settings': 'Schriftgröße ändern und zum Nachtmodus wechseln.',
    },
    articleByPath: {
        loading: 'Artikel wird geladen',
        error: 'Fehler: %s',
    },
    content: {
        webviewRendering: 'Um den Inhalt des Artikels vollständig darzustellen wurde eine alternative Darstellungsmethode gewählt.',
    },
    more: {
        title: 'Mehr',

        settings: 'Einstellungen',


        support: 'Unterstütze uns',

        shopillon: 'Shopillon',
        support_with_monthly_subscription: 'Monatliche Schmiergeld-Spende via Steady',
        support_with_single_gift: 'Einmalige Schmiergeld-Spende',
        support_with_ad: 'Werbung im Postillon schalten',
        support_watch_ad: 'Werbung schauen',
        support_watch_ad_failed: 'Sorry, zur Zeit können wir dir leider keine Werbung zeigen.',
        rate: 'Bewerte die App',


        other: 'Ein paar Links',

        faktillon: 'Der Faktillon auf Facebook',
        postillon24: 'Postillon 24 auf YouTube',
        faq: 'FAQ',
        history: 'Der Postillon von 1845 bis %s',
        privacyPolicy: 'Datenschutzerklärung',
        imprint: 'Impressum',


        development: 'App-Entwicklung',

        documentation: 'Dokumentation',
        github: 'Github',
        about: 'Informationen'
    },
    settings: {
        title: 'Einstellungen',

        appSection: 'App-Oberfläche',

        languageTitle: 'Sprache',
        languageDe: 'Deutsch',
        languageEn: 'English',

        themeTitle: 'Aussehen',
        themeLight: 'Hell',
        themeDark: 'Dunkel',

        articleSection: 'Artikel',
        displayBackButton: 'Zurück-Button anzeigen',
        displayCommentsAlways: 'Kommentare immer laden',
        displayTutorial: 'Tutorial anzeigen',

        listingSection: 'Artikel Liste',
        displayArticleIntroduction: 'Einleitung anzeigen',

        notificationSection: 'Benachrichtigungen',
        notificationEnable: 'Benachrichtigungen erhalten',

        maintenance: 'Zurzeit wird dieses Feature überarbeitet.\n\nDa diese Funktion auf vielen Geräten nicht korrekt funktionierte, wird nun nachgearbeitet.',
    },
    privacyPolicy: {
        title: 'Datenschutzerklärung',
    },
    imprint: {
        title: 'Impressum',
    },
    about: {
        title: 'Informationen',

        app: 'App',
        developers: 'Entwickler',
        dependencies: 'Abhängigkeiten',

        name: 'Name',
        version: 'Version',
        repository: 'Repository',

        email: 'E-Mail',
        url: 'Homepage'
    },
    search: {
        title: 'Suche',

        placeholder: 'Postillon durchsuchen...',
        period: 'Zeitraum',
        category: 'Rubrik',

        emptyList: 'Bisher keine Ergebnisse',

        LastWeek: 'Letzte Woche',
        LastMonth: 'Letzter Monat',
        LastYear: 'Letztes Jahr',
        NoFilter: 'Unbeschränkt',

        ...categories,
    },
    copilot: {
        skip: 'Überspringen',
        previous: 'Zurück',
        next: 'Weiter',
        finish: 'Fertig',
    },
    infobar: {
        noConnection: 'Keine Internetverbindung',
        error: 'Ups! Ein Fehler ist aufgetreten',
        errorMoreInfo: 'Mehr Info',
        errorAdvanced: 'Fehlerbericht',
    },
    steady: {
        greeting: 'Hallo, %s!',
        subscribed: 'Dein Abo: %s',
        notSubscribed: 'Du unterstützt den Postillon derzeit noch nicht.',
        subscribe: 'Abonniere uns bei Steady',
        costs: 'Du spendest %s€ / Monat',

        info: 'Info',

        adaway: 'Werbung weg mit',

        error: 'Oh Mist!',
        errorSubheading: 'Irgendwas ging schief.',
        errorAdvanced: 'Fehlerbericht',
        retry: 'Nochmal versuchen',
    },
    'offline.indicator': {
        image: 'Du bist zur Zeit nicht online',
        other: 'Dieser Onlineinhalt wird automatisch geladen, sobald du online gehst.'
    },

    'modal.archive.add': {
        heading: 'Bilder herunterladen?',
        text: 'Artikeltext ist jetzt offline verfügbar. Beinhaltete Bilder ebenfalls speichern?',

        noConnection: 'Diese Funktion ist nur möglich, wenn du mit dem Internet verbunden bist!',

        btnDownloadWithPictures: 'Herunterladen',
        btnDownloadWithoutPictures: 'Nein, ich mag keine Bilder',
    },
    'modal.archive.remove': {
        heading: 'Artikel aus dem Archiv löschen?',
        text: 'Der Artikel ist dann möglicherweise ohne Internetzugang nicht mehr zugänglich.',

        btnDeleteArticle: 'Löschen',
        btnCancel: 'Nein, im Archiv behalten',
    },
    'modal.article.settings': {
        dark: 'Dunkel',
        light: 'Hell',
        fontsize: 'Schriftgröße',
        theme: 'App-Oberfläche',
    },
    'modal.steady.login': {
        heading: 'Werbefrei in App & Web',
        text: 'Steady erlaubt Dir, uns mit einer monatlichen Spende zu unterstützen. Dadurch bekommst Du dann den Postillon komplett werbefrei präsentiert! Sowohl in der App, als auch auf unserer Website. Die Höhe der Spende entscheidest Du selbst. :)',

        btnCreateAccount: 'Neuen Account erstellen',
        btnLoginAccount: 'In Steady einloggen',
        btnNotInterested: 'Nö, ich mag Werbung',
    },
    'modal.steady.info': {
        heading: 'Steady-Informationen',

        user: 'Benutzer',
        subscription: 'Abonnement',

        name: 'Name',
        email: 'E-Mail',

        notSubscribed: 'Kein Abonnement zur Zeit.',
        state: 'Status',
        plan: 'Plan',
        costs: 'Kosten',
        costsPerMonth: '%s € / Monat',

        btnClose: 'Schließen',
        btnLogout: 'Abmelden',
    }
}
