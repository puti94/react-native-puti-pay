/**
 * User: puti.
 * Time: 2017/11/23 下午3:13.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */
import {NativeModules, Platform} from 'react-native'

export default class XPay {

    /**
     * 支付宝Android端支付
     * @param orderInfo   订单号
     * @param callback    支付宝回调结果  详情见 https://docs.open.alipay.com/204/105301
     */
    static alipay(orderInfo, callback) {
        NativeModules.PutiPay.alipay(orderInfo, callback)
    }


    /**
     * 设置微信APPID
     * @param id
     */
    static setWxId(id) {
        NativeModules.PutiPay.setWxId(id);
    }

    /**
     * 设置支付宝跳转Scheme
     * @param scheme
     */
    static setAlipayScheme(scheme) {
       if (Platform.OS === 'ios')
            NativeModules.PutiPay.setAlipayScheme(scheme);
    }

    /**
     * 设置支付宝沙箱环境，仅Android
     * @param isSandBox
    */
    static setAlipaySandbox(isSandBox) {
        if (Platform.OS === 'android')
            NativeModules.PutiPay.setAlipaySandbox(isSandBox);
    }

    /**
     * 微信支付
     * 传入参数示例
     * {
        partnerId:data.partnerId,
        prepayId: data.prepayId,
        packageValue: data.data.packageValue,
        nonceStr: data.data.nonceStr,
        timeStamp: data.data.timeStamp,
        sign: data.data.sign,
       }
     *
     *
     * @param params  参数
     * @param callBack 回调结果码 0:支付成功,
     *                          -1:原因：支付错误,可能的原因：签名错误、未注册APPID、项目设置APPID不正确、注册的APPID与设置的不匹配、其他异常等
     *                          -2: 原因 用户取消,无需处理。发生场景：用户不支付了，点击取消，返回APP
     */
    static wxPay(params, callBack) {
        NativeModules.PutiPay.wxPay(params, callBack)
    }
}