'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _config = require('./common/config');

var _config2 = _interopRequireDefault(_config);

var _groups = require('./routes/groups');

var _groups2 = _interopRequireDefault(_groups);

var _items = require('./routes/items');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('./common/log')(module);

// ****************** Import routes *************

//***********************************************

var dev = process.env.NODE_ENV.trim() === 'development';

var app = (0, _express2.default)();

if (dev ? false : _cluster2.default.isMaster) {

    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i += 1) {
        _cluster2.default.schedulingPolicy = _cluster2.default.SCHED_NONE;
        _cluster2.default.fork();
    }

    _cluster2.default.on('exit', function (worker) {
        console.log('Worker ' + worker.id + ' died :(');
        _cluster2.default.fork();
    });
} else {

    var server = _http2.default.createServer(app);

    //****************** Webpack ********************
    if (dev) {
        var webpack = require('webpack');
        var webpackConfig = require('../webpack.dev.config');
        var webpackHotMiddleware = require('webpack-hot-middleware');
        var webpackMiddleware = require('webpack-dev-middleware');

        var compiler = webpack(webpackConfig);

        app.use(webpackMiddleware(compiler, {
            hot: true,
            publicPath: webpackConfig.output.publicPath,
            noInfo: true
        }));
        app.use(webpackHotMiddleware(compiler));
    }

    //**********************************************

    app.use(_bodyParser2.default.json());
    if (!dev) app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'client', 'static')));

    //************************* GARBAGE magic ***********************************

    // Для работы с garbage collector запустите проект с параметрами:
    // node --nouse-idle-notification --expose-gc app.js
    if (!dev) {
        var init = function init() {
            gcInterval = setInterval(function () {
                gcDo();
            }, 60000);
        };

        var gcDo = function gcDo() {
            global.gc();
            clearInterval(gcInterval);
            init();
        };

        var gcInterval = void 0;

        ;

        ;

        init();
    }

    //************************************************************

    //******************************** Routes ***************************

    app.use('/api/groups', _groups2.default);
    app.use('/api/items', _items2.default);

    app.get('/*', function (req, res) {
        res.sendFile(_path2.default.join(__dirname, 'index.html'));
    });

    //******************************** Run server ***************************

    app.listen(_config2.default.PORT, function () {
        return console.log('Server run on ' + _config2.default.PORT + ' port');
    });
};

//******************************** Uncaught Exception ***************************

process.on('uncaughtException', function (err) {
    log.error(new Date().toUTCString() + ' uncaughtException:', err.message);
    log.error(err.stack);
    process.exit(1);
});