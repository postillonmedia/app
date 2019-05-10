package com.postillon.notifications;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.os.Build;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.google.firebase.messaging.RemoteMessage;
import com.postillon.R;

import static android.provider.Settings.Secure.getString;

class PostillonNotificationManager {
    private static final String TAG = "NotificationManager";

    private static final String PREFERENCES_KEY = "PostillonNotifications";
    private static final String PREFERENCES_NOTIFICATION_ENABLED = "enabled";

    public static final String CHANNEL_ID = "postillon-news";

    private Context context;
    private ReactApplicationContext reactContext;
    private SharedPreferences preferences;

    private NotificationManager notificationManager;
    private NotificationChannel newsChannel;

    PostillonNotificationManager(ReactApplicationContext reactContext) {
        this(reactContext.getApplicationContext());

        this.reactContext = reactContext;
    }

    PostillonNotificationManager(Context context) {
        this.context = context;
        this.notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        this.preferences = context.getSharedPreferences(PREFERENCES_KEY, Context.MODE_PRIVATE);

        // subscribe to events
        LocalBroadcastManager localBroadcastManager = LocalBroadcastManager.getInstance(context);

        localBroadcastManager.registerReceiver(
            new MessageReceiver(),
            new IntentFilter(PostillonNotificationService.EVENT_MESSAGE)
        );

        localBroadcastManager.registerReceiver(
            new RefreshTokenReceiver(),
            new IntentFilter(PostillonNotificationService.EVENT_TOKEN_NEW)
        );

        // build notification channel
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel newsChannel = notificationManager.getNotificationChannel(CHANNEL_ID);

            if (newsChannel == null) {
                Resources resources = context.getResources();

                CharSequence name = resources.getString(R.string.notification_channel_name);
                String description = resources.getString(R.string.notification_channel_description);

                newsChannel = new NotificationChannel(CHANNEL_ID, name, NotificationManager.IMPORTANCE_LOW);

                newsChannel.setDescription(description);
                newsChannel.setVibrationPattern(new long [] { 500, 500, 500 });

                newsChannel.enableVibration(true);

                notificationManager.createNotificationChannel(newsChannel);
            }
        }

    }

    static int getResourceId(Context context, String type, String image) {
        return context
                .getResources()
                .getIdentifier(image, type, context.getPackageName());
    }

    public void setEnabled(boolean enabled) {
        SharedPreferences.Editor editor = this.preferences.edit();

        editor.putBoolean(PREFERENCES_NOTIFICATION_ENABLED, enabled);

        editor.apply();
    }

    public boolean getEnabled() {
        return this.preferences.getBoolean(PREFERENCES_NOTIFICATION_ENABLED, false);
    }

    protected void displayNotification(RemoteMessage message) {
        DisplayNotificationTask task = new DisplayNotificationTask(
            context,
            reactContext,
            notificationManager,
            message,
            null
        );

        task.execute();
    }

    private class MessageReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (reactContext.hasActiveCatalystInstance()) {
                Log.d(TAG, "Received new message");

                RemoteMessage message = intent.getParcelableExtra("message");
                displayNotification(message);

                // WritableMap messageMap = MessagingSerializer.parseRemoteMessage(message);

                // Utils.sendEvent(getReactApplicationContext(), "messaging_message_received", messageMap);
            }
        }
    }

    private class RefreshTokenReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (reactContext.hasActiveCatalystInstance()) {
                Log.d(TAG, "Received new messaging token.");

//                Thread thread = new Thread(new Runnable() {
//                    @Override
//                    public void run() {
//                        String token = null;
//                        String senderId = FirebaseApp.getInstance().getOptions().getGcmSenderId();
//
//                        try {
//                            token = FirebaseInstanceId
//                                    .getInstance()
//                                    .getToken(senderId, FirebaseMessaging.INSTANCE_ID_SCOPE);
//                        } catch (IOException e) {
//                            Log.d(TAG, "onNewToken error", e);
//                        }
//
//                        if (token != null) {
//                            Log.d(TAG, "Sending new messaging token event.");
//                            Utils.sendEvent(getReactApplicationContext(), "messaging_token_refreshed", token);
//                        }
//                    }
//                });
//
//                thread.start();
            }
        }
    }
}
