import { Alert, Platform, ToastAndroid } from 'react-native';

export const showMessage = message => {
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    } else {
        Alert.alert(null, message);
    }
};
