package com.postillon.notifications;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.google.firebase.messaging.RemoteMessage;
import com.postillon.R;

import java.io.IOException;
import java.lang.ref.WeakReference;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import io.invertase.firebase.Utils;

public class DisplayNotificationTask extends AsyncTask<Void, Void, Void> {
    private static final String TAG = "DisplayNotificationTask";

    private final WeakReference<Context> contextWeakReference;
    private final WeakReference<ReactApplicationContext> reactContextWeakReference;

    private final Promise promise;
    private final RemoteMessage notification;
    private final NotificationManager notificationManager;

    DisplayNotificationTask(
            Context context, ReactApplicationContext reactContext,
            NotificationManager notificationManager,
            RemoteMessage notification, Promise promise
    ) {
        this.contextWeakReference = new WeakReference<>(context);
        this.reactContextWeakReference = new WeakReference<>(reactContext);

        this.promise = promise;
        this.notification = notification;
        this.notificationManager = notificationManager;
    }

    @Override
    protected void onPostExecute(Void result) {
        contextWeakReference.clear();
        reactContextWeakReference.clear();
    }

    @Override
    protected Void doInBackground(Void... voids) {
        Context context = contextWeakReference.get();
        if (context == null) return null;

        try {
            Class intentClass = getMainActivityClass(context);

            if (intentClass == null) {
                if (promise != null) {
                    promise.reject(
                            "notification/display_notification_error",
                            "Could not find main activity class"
                    );
                }
                return null;
            }

            Map<String, String> data = notification.getData();

            // get properties from data
            String id = notification.getMessageId();
            String topic = notification.getFrom();
            String tag = null;
            String title = null;
            String subtitle = null;
            String body = null;
            String image = null;

            // build message bundle
            Bundle messageBundle = new Bundle();

            for (Map.Entry<String, String>entry : data.entrySet()) {
                messageBundle.putString(entry.getKey(), entry.getValue());
            }

            // add message id and topic
            messageBundle.putString("id", id);
            messageBundle.putString("topic", topic);

            // set variables
            if (data.containsKey("tag")) {
                tag = data.get("tag");
            }
            if (data.containsKey("title")) {
                title = data.get("title");
            }
            if (data.containsKey("subtitle")) {
                subtitle = data.get("subtitle");
            }
            if (data.containsKey("body")) {
                body = data.get("body");
            }
            if (data.containsKey("image")) {
                image = data.get("image");
            }

            NotificationCompat.Builder nb;
            try {
                nb = new NotificationCompat.Builder(context, PostillonNotificationManager.CHANNEL_ID);
            } catch (Throwable t) {
                // thrown if v4 android support library < 26
                nb = new NotificationCompat.Builder(context);
            }

            // set defaults
            nb
                .setDefaults(NotificationCompat.DEFAULT_ALL)
                .setExtras(messageBundle)
                .setGroup(topic)
                .setColorized(false)
                .setSmallIcon(R.drawable.notification)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC);

            // set properties from data
            if (title != null) {
                nb = nb.setContentTitle(title);
            }
            if (subtitle != null) {
                nb = nb.setSubText(subtitle);
            }

            if (body != null) {
                nb = nb.setContentText(body);
            }

            // set content intent
            // Create the notification intent
            String action = null;

            PendingIntent contentIntent = createIntent(
                context,
                intentClass,
                messageBundle,
                action
            );

            nb = nb.setContentIntent(contentIntent);

            // Build the notification and send it
            Notification builtNotification = nb.build();
            notificationManager.notify(tag, id.hashCode(), builtNotification);

            if (reactContextWeakReference.get() != null) {
                Utils.sendEvent(
                    reactContextWeakReference.get(),
                    "notifications_notification_displayed",
                    Arguments.fromBundle(messageBundle)
                );
            }

            if (promise != null) {
                promise.resolve(null);
            }

        } catch (Exception ex) {
            Log.e(TAG, "Failed to send notification", ex);
            if (promise != null) {
                promise.reject("notification/display_notification_error", "Could not send notification", ex);
            }
        }

        return null;
    }

    private PendingIntent createIntent(Context context, Class intentClass, Bundle messageBundle, String action) {
        Intent intent = new Intent(context, intentClass);
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        intent.putExtras(messageBundle);

        if (action != null) {
            intent.setAction(action);
        }

        String notificationId = messageBundle.getString("id");
        return PendingIntent.getActivity(
            context,
            notificationId.hashCode(),
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT
        );
    }

    private Bitmap getBitmap(String image) {
        if (image.startsWith("http://") || image.startsWith("https://")) {
            return getBitmapFromUrl(image);
        }

        if (image.startsWith("file://")) {
            return BitmapFactory.decodeFile(image.replace("file://", ""));
        }

        int largeIconResId = getIcon(image);
        return BitmapFactory.decodeResource(
            contextWeakReference.get().getResources(),
            largeIconResId
        );
    }

    private Bitmap getBitmapFromUrl(String imageUrl) {
        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(imageUrl).openConnection();
            connection.setDoInput(true);
            connection.connect();
            return BitmapFactory.decodeStream(connection.getInputStream());
        } catch (IOException e) {
            Log.e(TAG, "Failed to get bitmap for url: " + imageUrl, e);
            return null;
        }
    }

    private int getIcon(String icon) {
        int resourceId = PostillonNotificationManager.getResourceId(
            contextWeakReference.get(),
            "mipmap",
            icon
        );

        if (resourceId == 0) {
            resourceId = PostillonNotificationManager.getResourceId(
                contextWeakReference.get(),
                "drawable",
                icon
            );
        }

        return resourceId;
    }

    private Class getMainActivityClass(Context context) {
        String packageName = context.getPackageName();
        Intent launchIntent = context
            .getPackageManager()
            .getLaunchIntentForPackage(packageName);

        try {
            return Class.forName(launchIntent.getComponent().getClassName());
        } catch (ClassNotFoundException e) {
            Log.e(TAG, "Failed to get main activity class", e);
            return null;
        }
    }
}
