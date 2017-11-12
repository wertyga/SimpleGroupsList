'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = _express2.default.Router();

route.get('/', function (req, res) {
    _axios2.default.get(_api2.default.groupItems(req.query.id)).then(function (resp) {
        return res.json(resp.data.items);
    }).catch(function (err) {
        return res.status(400).json({ errors: 'Can\'t get group\'s items' });
    });
});

route.post('/item', function (req, res) {
    var id = req.body.id;


    _axios2.default.get(_api2.default.item(id)).then(function (resp) {
        return res.json(resp.data.item);
    }).catch(function (err) {
        return res.status(400).json({ errors: 'Can\'t get group\'s item' });
    });
});

exports.default = route;