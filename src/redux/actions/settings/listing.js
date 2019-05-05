/**
 * Created by DanielL on 07.06.2017.
 */
import { action } from '../';


export const SETTINGS_LISTING_DISPLAY_ARTICLE_INTRODUCTION = 'SETTINGS_LISTING_DISPLAY_ARTICLE_INTRODUCTION';


export const setDisplayArticleIntroduction = displayArticleIntroduction => action(SETTINGS_LISTING_DISPLAY_ARTICLE_INTRODUCTION, {displayArticleIntroduction});
