package com.puti.paylib;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;


public abstract class XWXPayEntryActivity extends Activity implements IWXAPIEventHandler {

    private IWXAPI api;
    static WXPayCallBack callback = null;

    private static final String TAG = "XWXPayEntryActivity";


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate: ");
        api = WXAPIFactory.createWXAPI(this, PayModule.WX_APPID);
        api.handleIntent(getIntent(), this);
    }

    @Override
    public void onReq(BaseReq baseReq) {
        Log.d(TAG, "onReq: ");
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        Log.d(TAG, "onNewIntent: ");
        setIntent(intent);
        api.handleIntent(intent, this);
    }

    @Override
    public void onResp(BaseResp resp) {


        if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
            if (callback != null) {
                Log.e(TAG, "callback");
                WritableMap data = Arguments.createMap();
                data.putString("errStr", resp.errStr);
                data.putString("errCode", "" + resp.errCode);
                data.putString("type", "" + resp.getType());
                callback.callBack(data);
            }
            //resp.errCode == 0 支付成功
            // resp.errCode == -1
            // 原因：支付错误,可能的原因：签名错误、未注册APPID、项目设置APPID不正确、注册的APPID与设置的不匹配、其他异常等
            // resp.errCode == -2 原因 用户取消,无需处理。发生场景：用户不支付了，点击取消，返回APP
            callback = null;
            finish(); // ----支付结束关闭本界面
        }
    }
}
