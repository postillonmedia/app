import { AsyncStorage } from 'react-native';
import { persistCombineReducers } from 'redux-persist';

// reducers
import app from './app';
import article from './article';


const settingsPersistorConfig = {
    key: 'settings',
    storage: AsyncStorage,
};

export default persistCombineReducers(settingsPersistorConfig, {
    app,
    article,
});