import NotificationModule from './NotificationManager';
import { DeepLinkManager as DeepLinkModule } from './DeepLinkManager';


export const DeepLinkManager = DeepLinkModule;
export const NotificationManager = NotificationModule;

export default {
    DeepLinkManager: DeepLinkModule,
    NotificationManager: NotificationModule,
};