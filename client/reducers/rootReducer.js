import { combineReducers } from 'redux';
import globalError  from './globalError';
import groups from './groups';
import items from './items';
import item from './item';


export default combineReducers({
    globalError,
    groups,
    items,
    item
});