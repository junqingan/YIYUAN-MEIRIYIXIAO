/**
 *
 * @author jasmine
 * ajax({  
 *          url: 'http://XXXX.com',     [必选]请求地址
 *          timeout : 2000,             [可选]超时
 *          cathe: false,               [可选]cathe : true  会读取缓存;  cathe 只有get方式的时候才有效;
 *          jsonp: 'cb',                [必选]用jsonp请求，且回调函数名为"jsonpCallbak"，可以设置为合法的字符串
 *          data : {url:'http://...'},  [必选]携带参数对象
 *          success : function(res)     [必选]请求成功的回调函数
 *          error : function()          [必选]请求失败的回调函数
 *      });
 */

var wxjs = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js';
 
(function(factory) {
    if(typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else if (typeof define === 'function') {
        // cmd
        define([wxjs],factory);    
    } else {
        // 原生
        factory(true);
    }
}(function(isImportedByScriptTag) {
    if(typeof define !== 'undefined' && define.cmd && seajs && seajs.require) {
        // seajs2
        window.wx = seajs.require(wxjs);   
    }

    var link = '//aplusapi.pptv.com/huodong/wxfx/';

    function addwxjs(success,error,response,status) {
        var wechat = document.getElementById("WeChat");
        if(wechat) {
            if(success) {
                success(response);
            }else{
                error(status);
            }
            return;
        }
        var head   = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.id  = "WeChat";
        head.appendChild(script);
        script.src = wxjs;
        script.onload = function() {
            if(success) {
                setupWx(response);
                success(response);   console.log("onload success>>>",response)
                return;
            }
            if (error) {
                error(status);       console.log("onload error>>>>>>>",status);
                return; 
            }
        }
        script.onerror = function(status) {  //WeChat请求失败
            error(status);
        }
    }  

    function setupWx(data) {
        wx.config(
        {
            debug: false,
            appId: data.appId + '',
            timestamp:data.timestamp,
            nonceStr: data.nonceStr + '',
            signature: data.signature + '',
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo'
            ]   
        });   
    }

    var wxajax = function(params) {
        params = params || {};  
        params.data = {
            'url': window.location.href,
        },
        params.timeout = 5000;
        params.cathe = false;
        params.jsonp = 'cb';
        params.url = link;
        // 判断是ajax请求还是jsonp请求
        var global = {
                        //格式化参数
                        formatParams : function(data) {
                            var arr = [];
                            for(var name in data) {  
                                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));  
                            }
                            // 添加一个随机数，防止缓存  
                            if(!params.cathe) arr.push('v=' + global.random());
                            return arr.join('&');
                        },  
                        // 获取随机数  
                        random : function() { 
                            return Math.random() + new Date().getTime();  
                        }
                    }
        if (params.jsonp) {
            jsonp(params);
        } else {
            json(params);
        }
        // ajax请求  
        function json(params) {
            // 请求方式，默认是GET
            params.type = (params.type || 'GET').toUpperCase(); 
            // 避免有特殊字符，必须格式化传输数据 
            params.data = global.formatParams(params.data);  
            var xhr = null;  
            // 实例化XMLHttpRequest对象  
            if(window.XMLHttpRequest) {  
                xhr = new XMLHttpRequest();  
            } else {  
                // IE6及其以下版本  
                xhr = new ActiveXObjcet('Microsoft.XMLHTTP');  
            } 
            // 监听事件，只要 readyState 的值变化，就会调用 readystatechange 事件
            xhr.onreadystatechange = function() { 
               // readyState属性表示请求/响应过程的当前活动阶段，4为完成，已经接收到全部响应数据
               if(xhr.readyState == 4) {  
                    var status = xhr.status; 
                    // status：响应的HTTP状态码，以2开头的都是成功
                    if(status >= 200 && status < 300) { 
                        var response = ''; 
                         // 判断接受数据的内容类型 
                        var type = xhr.getResponseHeader('Content-type');  
                        if(type.indexOf('xml') !== -1 && xhr.responseXML) {  
                            response = xhr.responseXML; //Document对象响应  
                        } else if(type === 'application/json') {  
                            response = JSON.parse(xhr.responseText); //JSON响应  
                        } else {  
                            response = xhr.responseText; //字符串响应  
                        }
                        // 成功回调函数 
                        // 如果是原生方式引入，则在在script.onload中加载微信config
                        // 如果是seajs引入则在，则在拿到微信appid等数据后加载微信config
                        if(isImportedByScriptTag === true) {
                            addwxjs(params.success,params.error,response, null);
                        }else{
                            setupWx(response);
                            params.success && params.success(response);
                        }
                    } else {
                        if(isImportedByScriptTag === true) {
                            addwxjs(null,params.error,null,status);
                        }else{
                            params.error && params.error(status); 
                        }
                    }  
                }
            }
            // 连接和传输数据  
            if(params.type == 'GET') {
                // 三个参数：请求方式、请求地址(get方式时，传输数据是加在地址后的)、是否异步请求(同步请求的情况极少)；
                xhr.open(params.type, params.url + '?' + params.data, true);  
                xhr.send(null);
            } else {  
                xhr.open(params.type, params.url, true);
                //必须，设置提交时的内容类型  
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 
                // 传输数据 
                xhr.send(params.data);
            }  
        } 

        // jsonp请求
        function jsonp(params) {
            //创建script标签并加入到页面中  
            var callbackName = params.jsonp;   //回调函数名
            var head = document.getElementsByTagName('head')[0];  
            // 设置传递给后台的回调参数名  
            params.data['callback'] = callbackName;  

            var qstr = global.formatParams(params.data);  
            var script = document.createElement('script');
            head.appendChild(script);

            //创建jsonp回调函数  
            window[callbackName] = function(json) {
                clearTimeout(script.timer);
                window[callbackName] = null;
                head.removeChild(script);
                if(isImportedByScriptTag === true) {
                    addwxjs(params.success,params.error,json, null);  
                }else {
                    setupWx(json);
                    params.success && params.success(json);  

                }
                
            };
        　　//发送请求  
            script.src = params.url + '?' + qstr;

            script.onerror = function(){
                clearTimeout(script.timer);
                removeScript();
            }

            //为了得知此次请求是否成功，设置超时处理 
            script.timer = setTimeout(function() {  
                removeScript();
            }, params.timeout);
   
            function removeScript() {
                script.onerror = null;
                window[callbackName] = null;
                head.removeChild(script);
                if(isImportedByScriptTag === true) {
                    addwxjs(null,params.error,null,status);
                }else{
                    params.error && params.error();
                }
                
            }
        }
    }

    window.ajax = {
                    url  : window.location.href,
                    link : '//aplusapi.pptv.com/huodong/wxfx/',
                    wxajax : wxajax
                }
    return ajax;
}));