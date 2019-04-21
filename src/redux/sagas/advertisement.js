import ReactNative, { Alert, Platform } from 'react-native';
import { all, take, takeEvery, put, call, select } from 'redux-saga/effects';

import Firebase from '../../utils/firebase';
import Config from '../../constants/config';

import { ARTICLE_OPEN } from '../actions/article';
import { getSteadySubscription } from '../selectors/steady';


function* handleArticleOpened(action) {
    try {
        const advert = Firebase.admob().interstitial(Config.keys.admob.interstitial);

        const AdRequest = Firebase.admob.AdRequest;
        const request = new AdRequest();

        advert.on('onAdLoaded', () => {
            advert.show();
        });

        if (Config.DEV) {
            Alert.alert('Show Interstitial');
        }

        advert.loadAd(request.build());
    } catch (error) {
        // error is not relevant
    }
}

function* watchOnArticleOpened() {
    let offset = Config.ad.interstitial.offset;
    let counter = 0 - offset;

    while (true) {
        const action = yield take(ARTICLE_OPEN);

        if (offset !== Config.ad.interstitial.offset) {
            console.log('Interstitial opening offset has been changed from "' + offset + '" to "' + Config.ad.interstitial.offset + '"');

            counter = counter + offset - Config.ad.interstitial.offset;
            offset = Config.ad.interstitial.offset;
        }

        const enabled = Config.ad.interstitial.enabled;
        const repeat = Config.ad.interstitial.repeat;

        if (enabled && (counter >= 0 && counter % repeat === 0)) {
            const steadySubscription = yield select(getSteadySubscription);

            if (!steadySubscription) {
                yield call(handleArticleOpened, action);
            }
        }

        counter++;
    }
}


export default function* advertisementSaga() {
    yield all([
        watchOnArticleOpened(),
    ]);
}