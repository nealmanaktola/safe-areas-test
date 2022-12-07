package com.safeareasrn;

import android.view.Window;

import androidx.annotation.NonNull;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;

public class ImmersiveModeModule extends ReactContextBaseJavaModule {
    ImmersiveModeModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "ImmersiveModeModule";
    }

    @ReactMethod
    void toggleSystemBars(boolean isVisible) {
        UiThreadUtil.runOnUiThread(() -> {
            Window window = getCurrentActivity().getWindow();
            if (window == null) {
                return;
            }
            WindowInsetsControllerCompat insetsController = WindowCompat.getInsetsController(window, window.getDecorView());
            if (insetsController != null) {
                if (isVisible) {
                    insetsController.show(WindowInsetsCompat.Type.systemBars());
                } else {
                    insetsController.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
                    insetsController.hide(WindowInsetsCompat.Type.systemBars());
                }
            }
        });
    }
}