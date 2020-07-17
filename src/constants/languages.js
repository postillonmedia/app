/**
 * Created by DanielL on 06.04.2017.
 */

import * as RNLocalize from 'react-native-localize';

export const LANGUAGE_DE = 'de';
export const LANGUAGE_EN = 'en';

const languages = {
    de: LANGUAGE_DE,
    en: LANGUAGE_EN,
};
export const LANGUAGES = languages;

const deviceLocales = RNLocalize.getLocales();
export const LANGUAGE_DEVICE =
  deviceLocales &&
  deviceLocales.length &&
  deviceLocales.length > 0 &&
  deviceLocales[0].languageCode;

export const LANGUAGE_DEVICE_APP_COMPATIBLE = (typeof languages[LANGUAGE_DEVICE] !== 'undefined' ? languages[LANGUAGE_DEVICE] : LANGUAGE_DE);

export default {
    LANGUAGE_DE,
    LANGUAGE_EN,

    LANGUAGE_DEVICE,
    LANGUAGE_DEVICE_APP_COMPATIBLE,
}
