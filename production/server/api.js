'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var baseUrl = 'https://webilesoft-backend.herokuapp.com';

exports.default = {
    groups: baseUrl + '/groups',
    groupItems: function groupItems(id) {
        return baseUrl + '/groups/items/' + id;
    },
    item: function item(id) {
        return baseUrl + '/items/' + id;
    }
};