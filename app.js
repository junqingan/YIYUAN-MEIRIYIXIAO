var express = require('express');
var app = express();
const port  = '8080';

app.use(express.static('dist'));

// 首页
app.get('/', function(req, res) {
    res.sendfile('./dist/page/index.html');
});
//每日一笑
app.get('/joke', function(req, res) {
    res.sendfile('./dist/page/joke.html');
});
// 搞笑图片
app.get('/imgjoke', function(req, res) {
    res.sendfile('./dist/page/imgjoke.html');
});
// 历史今天
app.get('/history', function(req, res) {
    res.sendfile('./dist/page/history.html');
});
// 天气
app.get('/tianqi', function(req, res) {
    res.sendfile('./dist/page/tianqi.html');
});



app.listen(port, function() {
    console.log(`server on http://localhost:${port}`);
})