function start() {
    function formatterDateTime() {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear() +
            "" // "年"
            +
            (month >= 10 ? month : "0" + month) +
            "" // "月"
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
    var Url = 'http://route.showapi.com/119-42',
        showapiSign = '6a3bd601b27c4e148c76874d4dfe2e03',
        showapiAppid = 44650;
    $.ajax({
        type: 'post',
        url: Url,
        dataType: 'jsonp',
        data: {
            "showapi_timestamp": formatterDateTime(),
            "showapi_appid": showapiAppid,
            "showapi_sign": showapiSign
        },
        jsonp: 'jsonpcallback',
        success: function (res) {
            renderData(res);
        }
    });

    function renderData(res) {
        var List = res.showapi_res_body.list;
        // console.log(List)
        var html = "";
        $.each(List, function (index, item) {
            html +=
                '<div class="list">' +
                '   <img src=' + item.img + '>' +
                '   <p class="tit">' + 
                '       <span>'+item.title+'</span>'+
                '   </p>' +
                '</div>';

            $('.history .bd').html(html);
        })
    }
}

function init() {
    start();
}
module.exports = {
    init: init
};