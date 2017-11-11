import axios from 'axios';

import { globalError } from './errors';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const GET_ITEM = 'GET_ITEM';

export function getItemsGroup(id) {
    return dispatch => {
        return axios({
            method: 'GET',
            url: '/api/items',
            params: { id }
        })
            .then(res => dispatch(itemsGroupFetch(res.data)))
            .catch(err => {
                dispatch(globalError(err.response ? err.response.data.errors : err.message));
                throw new Error(err.response ? err.response.data : err.message)
            })
    }
};
function itemsGroupFetch(items) {
    return {
        type: FETCH_ITEMS,
        items
    }
};

export function getItem(id) {
    return dispatch => {
        return axios.post('/api/items/item', { id })
            .then(res => dispatch(itemGet(res.data)))
            .catch(err => {
                dispatch(globalError(err.response ? err.response.data.errors : err.message));
                throw new Error(err.response ? err.response.data : err.message)
            })
    }
};
function itemGet(item) {
    return {
        type: GET_ITEM,
        item
    }
}