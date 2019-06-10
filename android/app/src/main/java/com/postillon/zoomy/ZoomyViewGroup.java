package com.postillon.zoomy;

import android.app.Activity;
import android.view.View;

import com.ablanco.zoomy.Zoomy;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.view.ReactViewGroup;

public class ZoomyViewGroup extends ReactViewGroup {

    private final Activity mActivity;

    public ZoomyViewGroup(ThemedReactContext context) {
        super(context);

        this.mActivity = context.getCurrentActivity();
    }

    @Override
    public void addView(View child, int index, LayoutParams params) {
        super.addView(child, index, params);

        Zoomy.Builder builder = new Zoomy.Builder(this.mActivity)
                .target(child);

        builder.register();
    }

    @Override
    public void removeView(View view) {
        Zoomy.unregister(view);

        super.removeView(view);
    }

}
