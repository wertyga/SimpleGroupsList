'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var models = {};

var ProductShema = function ProductShema() {
    return new Schema({
        title: String,
        description: String,
        category: String,
        price: String,
        discount: String,
        filePath: String,
        index: Number
    });
};

models.frames = _mongoose2.default.model('frame', new ProductShema());
models.albums = _mongoose2.default.model('album', new ProductShema());

exports.default = models;