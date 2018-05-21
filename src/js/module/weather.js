/**
 *  天气预报
 */
/* <li class="now">
<div class="con">
    <img src="http://app1.showapi.com/weather/icon/day/01.png" alt="">
    <h3><em>34</em> °</h3>
    <p >紫外线强度：<code class="press">很强</code></p>
    <p >风向：<em class="press">你猜</em></p>
</div>
</li>
<li class="list">
<div class="con">
    <img src="http://app1.showapi.com/weather/icon/day/01.png" alt="">
    <p><em>34</em> °</p>
    <p >紫外线强度：<code class="press">很强</code></span>
    <p >风向：<em class="press">你猜</em></p>
</div>
</li>
<li class="list">
<div class="con">
    <img src="http://app1.showapi.com/weather/icon/day/01.png" alt="">
    <p><em>34</em> °</p>
    <p >紫外线强度：<code class="press">很强</code></p>
    <p >风向：<em class="press">你猜</em></p>
</div>
</li>*/

function start() {
    function formatterDateTime() {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear() +
            "" 
            +
            (month >= 10 ? month : "0" + month) +
            "" 
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) +
            "" +
            (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            "" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes()) +
            "" +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    }
    var Url = 'https://route.showapi.com/9-6',
        showapiSign = 'b753f37fe6b74940814fcb47b93ba5e1',
        showapiAppid = 44609,
        area = '上海';

    $.ajax({
        type: 'post',
        url: Url,
        dataType: 'jsonp',
        data: {
            "showapi_timestamp": formatterDateTime(),
            "area": area,
            "showapi_appid": showapiAppid,
            "showapi_sign": showapiSign
        },
        jsonp: 'jsonpcallback',
        success: function (res, item) {
            // console.log(res.showapi_res_body);
            var F1 = res.showapi_res_body.f1,
                F2 = res.showapi_res_body.f2,
                F3 = res.showapi_res_body.f3,
                City= res.showapi_res_body.cityInfo,
                Now = res.showapi_res_body.now;
            // var F1html ='<div>' + F1.day_weather + '</div>';
            // $('.weather').html(F1html);
            var arr = [];
            arr.push(F1, F2, F3);
            // console.log(arr);
            var htmlnow = '',
                htmlList = '';
            htmlnow +=
                '    <li class="now">' +
                '        <span class="cityinfo">'+City.c7+'</span>'+
                '        <div class="con">' +
                '            <img src=' + Now.weather_pic + ' alt="">' +
                '               <h3><em>' + Now.temperature + '</em> °</h3>' +
                '               <p >空气湿度：<code class="press">' + Now.sd + '</code></p>' +
                '               <p >风向：<em class="press">' + Now.wind_direction + '</em></p>' +
                '        </div>' +
                '    </li>';
            $.each(arr, function (index, item) {
                htmlList +=
                    '    <li class="list">' +
                    '        <div class="con">' +
                    '            <div class="img">'+
                    '               <img src=' + item.day_weather_pic + ' alt="">' +
                    '               <p>'+item.day_weather+'<em>' + item.day_air_temperature +'℃'+ '</em> </p>'+
                    '            </div>'+
                    '            <div class="txt">'+
                    '            <p >紫外线强度：<code class="press">' + item.ziwaixian + '</code></p>' +
                    '            <p >风向：<em class="press">' + item.day_wind_direction + '</em></p>' +
                    '               <p >降水概率：<em class="press">' + item.jiangshui + '</em></p>' +
                    '            </div>'+
                    '        </div>' +
                    '    </li>';

                var html = htmlnow + htmlList;
                $('.weather-bd ul').html(html);
            })
        }
    });
};

function init() {
    start();
}
module.exports = {
    init: init
};