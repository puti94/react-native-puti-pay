/**
 * Created by puti on 2017/11/1.
 * 封装一个可通用的网络请求工具类
 * @param path
 * @param name
 * @param fileSize
 */


export function ImageBody(response) {
    this.path = response.uri;
    this.name = response.fileName;
    this.fileSize = response.fileSize;
}


export default class HttpUtils {

    static header = null;

    /**
     * GET请求
     * @param url 地址
     * @param params 参数,Object类型
     * @returns {Promise}
     */
    static get(url, params) {
        return HttpUtils.request(url, 'GET', '', params)
    }

    /**
     * POST请求 JSON方式
     * @param url  地址
     * @param params  参数,Object类型
     * @returns {Promise}
     */
    static postJson(url, params) {
        return HttpUtils.request(url, 'POST', 'json', params)
    }

    /**
     * 传统POST请求
     * @param url  地址
     * @param params  参数,Object类型
     * @returns {Promise}
     */
    static postForm(url, params) {
        return HttpUtils.request(url, 'POST', 'form', params)
    }

    static postFile(url, params) {
        return HttpUtils.request(url, 'POST', 'file', params)
    }

    /**
     * 封装的网络请求方法
     * @param url  地址
     * @param method 方法 GET 或者 POST
     * @param type  GET不传，POST 传是传统form形式还是json形式
     * @param params  参数,Object类型
     * @returns {Promise}  返回一个Promise
     */
    static request(url, method, type, params) {
        let body = null;
        let header = {};
        if (method === 'GET') {
            if (params) {
                let paramsArray = [];
                Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])));
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&')
                } else {
                    url += '&' + paramsArray.join('&')
                }
            }
        } else if (method === 'POST') {
            if (params) {
                if (type === 'form') {
                    body = '';
                    for (let key in params) {
                        body += key + "=" + params[key] + '&'
                    }
                    body = body.substring(0, body.length - 1)
                    header = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    }
                } else if (type === 'json') {
                    body = JSON.stringify(params)
                    header = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                } else if (type === 'file') {
                    body = new FormData();

                    Object.keys(params).forEach(key => {
                        let param = params[key];
                        if (param.path) {
                            let file = {
                                uri: param.path,
                                type: 'multipart/form-data',
                                name: param.name
                            };
                            body.append(key, file);
                        } else {
                            body.append(key, param);
                        }

                    });
                    header = {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data;charset=utf-8'
                    }
                }
            }
        }
        console.log("HttpUtils:" + method + ":url:", url, "  body:", body);
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                header: header,
                body: body
            }).then(response => {
                if (response.ok) {
                    console.log('URL:' + url, '加载成交', response);
                    return response.json()
                } else {
                    console.log('URL:' + url, '加载失败', response);
                    reject({code: response.status, msg: response._bodyText})
                }
            }).then(responseJson => {
                console.log('URL:' + url, '回调数据', responseJson);
                resolve(responseJson);
            }).catch(e => {
                console.log('URL:' + url, '加载失败', e);
                reject({code: -1, msg: JSON.stringify(e)})
            })
        })

    }

}