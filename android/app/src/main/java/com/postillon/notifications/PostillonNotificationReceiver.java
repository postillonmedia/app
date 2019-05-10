package com.postillon.notifications;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.google.firebase.messaging.RemoteMessage;

public class PostillonNotificationReceiver extends BroadcastReceiver {
    private static final String TAG = "NotificationReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "Received new message via broadcast");

        RemoteMessage message = intent.getParcelableExtra("message");

        new PostillonNotificationManager(context).displayNotification(message);
    }
}
