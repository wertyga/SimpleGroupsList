import { GET_ITEM } from '../actions/items';

export default function error(state = {}, action = {}) {
    switch(action.type) {

        case GET_ITEM: {
            return action.item
        }

        default: return state;
    }
};