/**
 * User: puti.
 * Time: 2017/11/23 下午3:13.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */
import {NativeModules, Platform} from 'react-native'
const XPay = NativeModules.XPay;
export default class XPay {

    /**
     * 支付宝Android端支付
     * @param orderInfo   订单号
     * @param callback    支付宝回调结果  详情见 https://docs.open.alipay.com/204/105301
     */
    static alipayAndroid(orderInfo, callback) {
        if (Platform.OS === 'android')
            XPay.alipay(orderInfo, callback)
    }

    /**
     * 支付宝Android端支付
     * @param orderInfo   订单号
     * @param callback    支付宝回调结果  详情见 https://docs.open.alipay.com/204/105301
     * @param scheme      IOS URL_TYPE里面设置的URL Schemes 为了使值唯一，建议使用ap+支付宝应用ID
     */
    static alipayIOS(orderInfo, scheme, callback) {
        if (Platform.OS === 'ios')
            XPay.alipay(orderInfo, scheme, callback)
    }

    /**
     * 设置微信APPID
     * @param id
     */
    static setWxId(id) {
        XPay.setWxId(id);
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
        XPay.wxPay(params, callBack)
    }
}