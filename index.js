/**
 * @format
 */

// Fixes crash issues: https://github.com/kmagiera/react-native-gesture-handler/issues/783
import 'react-native-gesture-handler';

import { App } from './src/App';

const app = App.getInstance();

app.start();
