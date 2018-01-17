package com.puti.paylib;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by puti on 2017/11/23.
 */

public class PayReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new PayModule(reactContext));
        return modules;
    }

    //早期版本的RN如果有报错取消这个注释即可
    // @override
     public List<Class<? extends JavaScriptModule>> createJSModules() {
     return Collections.emptyList();
      }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
