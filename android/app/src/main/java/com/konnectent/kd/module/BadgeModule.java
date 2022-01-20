package com.konnectent.kd.module;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import me.leolin.shortcutbadger.ShortcutBadger;

public class BadgeModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;

    public BadgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "Badge";
    }

    @ReactMethod
    public void applyCount(int count) {
        if (mContext != null) {
            ShortcutBadger.applyCount(mContext, count);
        }
    }
}
