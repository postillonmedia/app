/**
 * Created by DanielL on 06.04.2017.
 */

import DeviceInfo from 'react-native-device-info';

export const LANGUAGE_DE = 'de';
export const LANGUAGE_EN = 'en';

const languages = {
    de: LANGUAGE_DE,
    en: LANGUAGE_EN,
};
export const LANGUAGES = languages;

const deviceLocale = DeviceInfo.getDeviceLocale();
export const LANGUAGE_DEVICE = deviceLocale.slice(0, deviceLocale.indexOf('-'));

export const LANGUAGE_DEVICE_APP_COMPATIBLE = (typeof languages[LANGUAGE_DEVICE] !== 'undefined' ? languages[LANGUAGE_DEVICE] : LANGUAGE_DE);

export default {
    LANGUAGE_DE,
    LANGUAGE_EN,

    LANGUAGE_DEVICE,
    LANGUAGE_DEVICE_APP_COMPATIBLE,
}