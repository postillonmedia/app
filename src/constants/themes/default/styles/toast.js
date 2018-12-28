import { Platform } from 'react-native';
import colors from './../colors';


/**
 * Possible platform-compatible styles for https://github.com/onemolegames/react-native-toast-native
 *
 * width,
 * height,
 * backgroundColor,
 * color,
 * borderWidth,
 * borderColor,
 * borderRadius
 *
 */

export default {
    color: colors.toasts.color,
    backgroundColor: colors.toasts.backgroundColor,
    borderColor: colors.toasts.backgroundColor,

    borderRadius: 20,

    ...Platform.select({
        ios: {
            height: 50,
        }
    })
}