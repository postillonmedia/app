package com.postillon;


import java.util.Arrays;
import java.util.List;

import com.facebook.soloader.SoLoader;
import com.facebook.react.ReactPackage;

import com.postillon.zoomy.ZoomyPackage;
import com.toast.RCTToastPackage;
import com.horcrux.svg.SvgPackage;
import io.realm.react.RealmReactPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import ui.popovermenu.RNPopoverMenuPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnativenavigation.NavigationApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.github.droibit.android.reactnative.customtabs.CustomTabsPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;



public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    SoLoader.init(this, /* native exopackage */ false);
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            new RealmReactPackage(),
            new SvgPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new RCTToastPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage(),
            new CustomTabsPackage(),
            new RNPopoverMenuPackage(),
            new RNDeviceInfo(),
            new RNCWebViewPackage(),
            new RNFirebasePackage(),
            new RNFirebaseInstanceIdPackage(),
            new RNFirebaseAdMobPackage(),
            new RNFirebaseAnalyticsPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNFirebaseCrashlyticsPackage(),
            new RNFirebaseRemoteConfigPackage(),

            new ZoomyPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

}
