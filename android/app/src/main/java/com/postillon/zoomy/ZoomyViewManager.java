package com.postillon.zoomy;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class ZoomyViewManager extends ViewGroupManager<ZoomyViewGroup> {

    public static final String REACT_CLASS = "RCTZoomy";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ZoomyViewGroup createViewInstance(ThemedReactContext reactContext) {
        return new ZoomyViewGroup(reactContext);
    }
}
