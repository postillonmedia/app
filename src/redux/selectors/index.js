import article from './article';
import environment from './environment';
import pages from './pages';
import search from './search';
import settings from './settings';
import steady from './steady';


export default {
    ...article,
    ...environment,
    ...pages,
    ...settings,
    ...search,
    ...steady,
}