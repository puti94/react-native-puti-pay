/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    View
} from 'react-native';
import XPay from 'react-native-puti-pay';
import HttpUtils from './HttpUtils';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => {

                    HttpUtils.postFile("", {
                        uid: '1',
                        money: '0.01'
                    }).then((data) => {
                        XPay.setAlipayScheme('');
                        XPay.alipay(data.data, (res) => {
                            console.log(res)
                        })
                    })
                }} title={'支付宝支付测试'}/>

                <Button onPress={() => {
                    XPay.setWxId('');

                    HttpUtils.postFile("", {
                        uid: '1',
                        money: '0.01'
                    }).then((data) => {
                        XPay.wxPay(data.data, (res) => {
                            console.log(res)
                        })
                    })


                }} title={'微信支付测试'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
