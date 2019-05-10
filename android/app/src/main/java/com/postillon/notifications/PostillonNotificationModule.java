package com.postillon.notifications;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class PostillonNotificationModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "PostillonNotifications";

    private final PostillonNotificationManager notificationManager;

    public PostillonNotificationModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);

        this.notificationManager = new PostillonNotificationManager(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void setEnabled(boolean enabled) {
        this.notificationManager.setEnabled(enabled);
    }

    @ReactMethod
    public boolean getEnabled() {
        return this.notificationManager.getEnabled();
    }

}
