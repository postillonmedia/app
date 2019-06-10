/**
 * Created by DanielL on 07.06.2017.
 */
import { action } from '../';


export const SETTINGS_ARTICLE_FONTSIZE = 'SETTINGS_ARTICLE_FONTSIZE';
export const SETTINGS_ARTICLE_DISPLAY_COMMENTS_ALWAYS = 'SETTINGS_ARTICLE_DISPLAY_COMMENTS_ALWAYS';
export const SETTINGS_ARTICLE_DISPLAY_BACKBUTTON = 'SETTINGS_ARTICLE_DISPLAY_BACKBUTTON';
export const SETTINGS_ARTICLE_TUTORIAL = 'SETTINGS_ARTICLE_TUTORIAL';


export const setFontSize = fontSize => action(SETTINGS_ARTICLE_FONTSIZE, {fontSize});
export const setDisplayCommentsAlways = displayCommentsAlways => action(SETTINGS_ARTICLE_DISPLAY_COMMENTS_ALWAYS, {displayCommentsAlways});
export const setDisplayBackButton = displayBackButton => action(SETTINGS_ARTICLE_DISPLAY_BACKBUTTON, {displayBackButton});
export const setTutorial = tutorial => action(SETTINGS_ARTICLE_TUTORIAL, {tutorial});