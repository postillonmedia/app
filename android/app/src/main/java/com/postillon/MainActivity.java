package com.postillon;

import android.graphics.Color;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {
    @Override
    protected void addDefaultSplashLayout() {
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

        this.setContentView(view);
    }
}
