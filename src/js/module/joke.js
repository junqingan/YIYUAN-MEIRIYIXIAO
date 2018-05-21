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
    $.ajax({
        type: 'post',
        url: 'https://route.showapi.com/341-3',
        dataType: 'jsonp',
        data: {
            "showapi_timestamp": formatterDateTime(),
            "maxResult": 20,
            "showapi_appid": 37935,
            "showapi_sign": '860ce87a42ea467d872e88fcdae517f1'
        },
        jsonp: 'jsonpcallback',

        success: function (res, item) {
            var data = res.showapi_res_body.contentlist;
            // console.log(data)
            var html = "";
            $.each(data, function (idx, item) {
                html +=
                    '<div class="gifList" >' +
                    '<img src=' + item.img + '>' +
                    '</div>';
                $('.gif_joke').html(html);
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