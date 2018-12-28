import { compose } from 'recompose';
import { i18n } from '@postillon/react-native-i18n';
import { connectStyle, ThemeManager } from '@postillon/react-native-theme';

import { Themes } from '../../../constants/themes';
import styles from './styles';

import StepNumberView from './StepNumberView';


ThemeManager.addStyleSheet(styles.darkStyles, 'copilot.stepnumber', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'copilot.stepnumber', Themes.DEFAULT);


export default compose(

    // i18n('copilot')

    connectStyle('copilot.stepnumber'),

)(StepNumberView);