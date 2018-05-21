const joke = require('../module/joke');
const imgjoke = require('../module/img_joke');
const weather = require('../module/weather');
const history = require('../module/history');

var Home = function () {
    this.options = {};
    this.redianM = null, this.redianC = null;
};


/**
 * 初始化
 * @param options Object 参数传递
 */
Home.prototype.init = function (options) {
    $.extend(this.options, options);
    this.initJoke();
    this.initImgjoke();
    this.initWeather();
    this.initHistory();
}

/**
 * 笑话大全
 */
Home.prototype.initJoke = function () {
    joke.init();
};
/**
 * 图片
 */
Home.prototype.initImgjoke = function () {
    imgjoke.init();
};

/**
 * tianqi
 */
Home.prototype.initWeather = function () {
    weather.init();
};
/**
 * 历史今天
 */
Home.prototype.initHistory = function () {
    history.init();
};















var instance;

module.exports = {
    'getInstance': function (options) {
        return instance || (instance = new Home(options));
    }
};