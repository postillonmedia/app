import { UIManager } from 'react-native';
import App from './src/App';


UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

// create new app instance
const app = new App();

app.start();
