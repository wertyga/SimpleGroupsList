import { FETCH_ITEMS } from '../actions/items';

export default function error(state = [], action = {}) {
    switch(action.type) {

        case FETCH_ITEMS: {
            return action.items
        }

        default: return state;
    }
};