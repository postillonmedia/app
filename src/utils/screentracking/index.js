import { ScreenVisibilityListener as RNNScreenVisibilityListener } from '@postillon/react-native-navigation';

import { logScreenChange } from './../../redux/actions/analytics';


export class ScreenVisibilityListener {

    constructor(dispatch) {
        this.dispatch = dispatch;

        this.listener = new RNNScreenVisibilityListener({
            willAppear: ({screen, startTime, endTime, commandType}) => {
                console.log('screenVisibility', `Screen ${screen} will be displayed in ${endTime - startTime} millis after [${commandType}]`);
            },
            didAppear: ({screen, startTime, endTime, commandType}) => {
                console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis after [${commandType}]`);

                dispatch && dispatch(logScreenChange(`${screen} - ${commandType}`, screen));
            },
            willDisappear: ({screen, startTime, endTime, commandType}) => {
                console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis after [${commandType}]`);
            },
            didDisappear: ({screen, startTime, endTime, commandType}) => {
                console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis after [${commandType}]`);
            }
        });
    }

    register() {
        this.listener.register();
    }

    unregister() {
        if (this.listener) {
            this.listener.unregister();
            this.listener = null;
        }
    }
}

export default ScreenVisibilityListener;