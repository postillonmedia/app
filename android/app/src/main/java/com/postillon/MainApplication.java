package com.postillon;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import com.postillon.zoomy.ZoomyPackage;

import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import com.reactcommunity.rnlocalize.RNLocalizePackage;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;

import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.horcrux.svg.SvgPackage;
import com.proyecto26.inappbrowser.RNInAppBrowserPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import io.realm.react.RealmReactPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import ui.popovermenu.RNPopoverMenuPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  protected ReactGateway createReactGateway() {
    ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };
    return new ReactGateway(this, isDebug(), host);
  }

  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new RealmReactPackage(),
            new SvgPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new RNInAppBrowserPackage(),
            new RNGestureHandlerPackage(),
            new ReanimatedPackage(),
            new RNPopoverMenuPackage(),
            new RNLocalizePackage(),
            new RNCWebViewPackage(),
            new AsyncStoragePackage(),
            new ReactSliderPackage(),
            new NetInfoPackage(),
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

  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
