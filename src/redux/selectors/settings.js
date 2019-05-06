export const getAppSettings = state => state.settings.app;
export const getAppLocale = state => state.settings.app.locale;
export const getAppTheme = state => state.settings.app.theme;
export const getAppNotifications = state => state.settings.app.notifications;

export const getAppAnalytics = state => state.settings.app.analytics;

export const getArticleSettings = state => state.settings.article;
export const getArticleFontSize = state => state.settings.article.fontSize;
export const getArticleTutorial = state => state.settings.article.tutorial;
export const getArticleDisplayBackButton = state => state.settings.article.displayBackButton;
export const getArticleDisplayCommentsAlways = state => state.settings.article.displayCommentsAlways;

export const getListingDisplayArticleIntroduction = state => state.settings.listing.displayArticleIntroduction;


export default {
    getAppSettings,
    getAppLocale,
    getAppTheme,
    getAppNotifications,

    getAppAnalytics,

    getArticleSettings,
    getArticleFontSize,
    getArticleTutorial,
    getArticleDisplayBackButton,
    getArticleDisplayCommentsAlways,

    getListingDisplayArticleIntroduction,
}