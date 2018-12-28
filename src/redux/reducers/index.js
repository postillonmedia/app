import {
    combineReducers,
} from 'redux';

// reducers
import archive from './archive';
import article from './article';
import pages from './pages';
import search from './search';
import steady from './steady';
import settings from './settings';
import environment from './environment';


export default combineReducers({
    archive,
    article,
    pages,
    search,
    steady,
    settings,
    environment,
});