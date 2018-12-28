package com.postillon;

import android.graphics.Color;
import android.util.TypedValue;
import android.view.Gravity;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    protected String getMainComponentName() {
        return "postillon";
    }

    @Override
    public RelativeLayout createSplashLayout() {
        RelativeLayout view = new RelativeLayout(this);

        view.setBackgroundColor(Color.parseColor("#ffffff"));


        ImageView imageView = new ImageView(this);

        int paddingPixel = 100;
        float density = this.getApplicationContext().getResources().getDisplayMetrics().density;
        int paddingDp = (int)(paddingPixel * density);
        RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.MATCH_PARENT);
        layoutParams.setMargins(paddingDp, paddingDp, paddingDp, paddingDp);

        imageView.setImageResource(R.drawable.logo);
        imageView.setScaleType(ImageView.ScaleType.CENTER_CROP);
        imageView.setAdjustViewBounds(true);
        imageView.setLayoutParams(layoutParams);

        view.addView(imageView);
        return view;
    }
}
