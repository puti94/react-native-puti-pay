# react-native-puti-pay
微信及支付宝支付的react-native模块。

### example
[示例项目](https://github.com/puti94/RNExample)

- 自动安装:
   ```
       //first
       npm install react-native-puti-pay --save
       //then   android可自行导包，IOS由于静态库创建有问题，则需要手动集成
       react-native link
   ```
- IOS 集成

   - 第一步 前往node_module里的react-native-puti-pay 文件夹下的ios_pay_lib拷贝到工程目录下,并添加到项目中(直接拖到xcode的工程目录下,选择copy items if needed和create groups);
   ![image](https://github.com/puti94/react-native-puti-pay/blob/master/screenshot/WX20171125-142527.png)
   - 第二步 TARGET -> Build Phases -> Linked Binary With Libraries 添加以下系统库
   ![image](https://github.com/puti94/react-native-puti-pay/blob/master/screenshot/WX20171125-142402.png)

   - 第三步 在项目中的info.plist中加入应用白名单，右键info.plist选择source code打开(plist具体设置在Build Setting -> Packaging -> Info.plist File可获取plist路径) :
   
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

   - 第四步 设置 URL Scheme URL Scheme是通过系统找到并跳转对应app的设置，通过向项目中的info.plist文件中加入URL types可使用第三方平台所注册的appkey信息向系统注册你的app，当跳转到第三方应用支付后，可直接跳转回你的app。微信填写微信ID,支付宝也建议添加ap+加支付宝应用id的形式以免冲突。

  ![image](https://github.com/puti94/react-native-puti-pay/blob/master/screenshot/WX20171125-142504.png)

   - 第五步 在入口文件AppDelegate.m下设置回调
   
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



- Android配置:

   ```
   //微信配置
   在包名目录下创建wxapi文件夹，新建一个名为WXPayEntryActivity的activity继承 com.puti.paylib包名下的XWXPayEntryActivity。
   并配置Android Manifest XML
   
 
    <activity
            android:name=".wxapi.WXPayEntryActivity"
            android:exported="true"
            android:launchMode="singleTop" />

  
   ```
   如果在早期版本有可能需要实现ReactPackage需要实现createJSModules方法。

   那么在PayReactPackage文件添加一行
   ```
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
   ```

   如果集成后遇到问题请先检查以下几项:
   - ios

        ios_pay_lib项目是不是真的拷贝进入ios工程目录下。
   - android

        是不是添加了wxapi包，和包下面是不是添加了activity,清单文件是不是有声明了这个activity。

        微信开发平台填写的应用签名和包名是不是正确。


- 使用:

   ```
       import XPay from 'react-native-puti-pay'

        //设置微信ID
        XPay.setWxId(id)
        //设置	支付宝URL Schemes
        XPay.setAlipayScheme(scheme)
        
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

