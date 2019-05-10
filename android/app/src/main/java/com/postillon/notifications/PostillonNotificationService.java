package com.postillon.notifications;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class PostillonNotificationService extends FirebaseMessagingService {
    private static final String TAG = "NotificationService";

    public static final String EVENT_MESSAGE = "EVENT_MESSAGE";
    public static final String EVENT_TOKEN_NEW = "EVENT_TOKEN_NEW";

    @Override
    public void onNewToken(String token) {
        Log.d(TAG, "New token received: " + token);

        Intent tokenEvent = new Intent(EVENT_TOKEN_NEW);
        tokenEvent.putExtra("token", token);

        LocalBroadcastManager
            .getInstance(this)
            .sendBroadcast(tokenEvent);
    }

    @Override
    public void onMessageReceived(RemoteMessage message) {
        if (message != null) {

            Log.d(TAG, "New message has been received");

            Intent messageEvent = new Intent(EVENT_MESSAGE);
            messageEvent.putExtra("message", message);

            LocalBroadcastManager
                .getInstance(this)
                .sendBroadcast(messageEvent);

        }
    }
}
