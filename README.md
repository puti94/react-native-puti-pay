# react-native-puti-pay

## Getting started

```bash
$ npm install react-native-puti-pay --save
//or
$ yarn add react-native-puti-pay
```

### Mostly automatic installation

```bash
//react-native version>0.60+
$ cd ios && pod install
//or
$ react-native link react-native-puti-pay
```

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-puti-pay` and add `RNPutiPay.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNPutiPay.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
   - Add `import com.puti.paylib.PayReactPackage;` to the imports at the top of the file
   - Add `new PayReactPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:

   ```
      include ':react-native-puti-pay'
      project(':react-native-puti-pay').projectDir = new File(rootProject.projectDir,     '../node_modules/react-native-puti-pay/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:

   ```
      compile project(':react-native-puti-pay')
   ```

### Config

#### iOS

1. (使用pod管理则不需要这一步)TARGET -> Build Phases -> Linked Binary With Libraries 添加以下系统库
![image](https://github.com/puti94/react-native-puti-pay/blob/master/screenshot/WX20171125-142402.png)

2. 在项目中的info.plist中加入应用白名单，右键info.plist选择source code打开(plist具体设置在Build Setting -> Packaging -> Info.plist File可获取plist路径) :

   ```
   <key>LSApplicationQueriesSchemes</key>
   <array>
       <!-- 支付宝 URL Scheme 白名单-->
       <string>alipay</string>
       <!-- 微信 URL Scheme 白名单-->
       <string>wechat</string>
       <string>weixin</string>
   
   </array>
   ```

3. 设置 URL Scheme URL Scheme是通过系统找到并跳转对应app的设置，通过向项目中的info.plist文件中加入URL types可使用第三方平台所注册的appkey信息向系统注册你的app，当跳转到第三方应用支付后，可直接跳转回你的app。微信填写微信ID,支付宝也建议添加ap+加支付宝应用id的形式以免冲突。

   ![image](https://github.com/puti94/react-native-puti-pay/blob/master/screenshot/WX20171125-142504.png)

4. 在入口文件AppDelegate.m下设置回调

   ```
   
   #import <React/RCTLinkingManager.h>
   
     - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
     {
       return [RCTLinkingManager application:application openURL:url
                           sourceApplication:sourceApplication annotation:annotation];
     }
   
     - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
     {
       return [RCTLinkingManager application:application openURL:url options:options];
     }
   ```

#### Android

在包名目录下创建wxapi文件夹，新建一个名为`WXPayEntryActivity`的activity继承 `com.puti.paylib`包名下的`XWXPayEntryActivity`。

```

    // wxapi/WXPayEntryActivity.jave
    package com.自己包名.wxapi;
    import com.puti.paylib.XWXPayEntryActivity;
    public class WXPayEntryActivity extends XWXPayEntryActivity {
    }

   并配置Android Manifest XML
    <activity
            android:name=".wxapi.WXPayEntryActivity"
            android:label="@string/app_name"
            android:exported="true" />
```

 如果在早期版本有可能需要实现ReactPackage需要实现createJSModules方法。

 那么在PayReactPackage文件添加一行

```
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
```

## Usage

```javascript
      import XPay from 'react-native-puti-pay'

        //设置微信ID
        XPay.setWxId(id)
        //设置    支付宝URL Schemes
        XPay.setAlipayScheme(scheme)
        //支付宝开启沙箱模式 仅限安卓
        XPay.setAlipaySandbox(isSandBox)
        //支付宝支付
        //orderInfo是后台拼接好的支付参数
        XPay.alipay(orderInfo,(res)=>console.log(res))
        //微信支付
        //这些参数都是由后台生成的
        let params = {
          partnerId:partnerId,
          prepayId: prepayId,
          packageValue:packageValue,
          nonceStr: nonceStr,
          timeStamp: timeStamp,
          sign: sign,
       }
        XPay.wxPay(params,(res)=>console.log(res))
```

## Issues


[示例](https://github.com/puti94/RNExample/blob/master/src/pages/PayPage.js)
此项目已经集成好，可以参照上面支付例子，如果调用支付跳转到了微信支付宝，不管支付成不成功也跳转回来并有相应的回调则说明已经集成成功了，若支付失败就是所传入参数的问题(你可以强势甩锅给后端开发人员了)
由于之前项目原因，只需要微信支付宝支付，所有就写了这个插件，此项目比较适用于只需要微信支付宝支付功能，或者微信支付宝分享登录等功能已由其它第三方聚合平台（友盟）等完成。如需单独集成，
建议微信使用[react-native-wechat](https://github.com/yorkie/react-native-wechat)，
支付宝使用[react-native-yunpeng-alipay](https://www.npmjs.com/package/react-native-yunpeng-alipay)。
一下列出一些集成微信支付宝支付经常遇到的坑。

1. 安卓微信支付时跳转到微信了然后闪退
   这是不熟悉安卓人员经常遇到的坑，这是安卓的签名机制问题，安卓签名跟微信后台应用配置的签名不匹配，微信判定应用非法直接退出。
   如果出现这个问题，修改签名并且`清理微信的数据`(微信有缓存，需要直接清理数据，或者卸载重装，或者换台手机)
   要想一劳永逸避免这个问题 参考此[配置项](https://github.com/puti94/RNExample/blob/master/android/app/build.gradle)将debug签名以及release签名同步

   ```
   debug  {
               signingConfig signingConfigs.release
           }
   release {
                  signingConfig signingConfigs.release
              }
   ```

2. ios 支付完没有返回商家按钮
   ios应用间跳转判断跳转到哪个应用是通过上面ios配置第三部设置的URL Scheme区分的。`XPay.setWxId()`，`XPay.setAlipayScheme()` 方法都是通过支付的sdk将Scheme传给微信支付宝，支付成功后才能正确跳转回应用，也才有返回商家按钮
   所有要是没有此功能，请再对照文档检查一遍
