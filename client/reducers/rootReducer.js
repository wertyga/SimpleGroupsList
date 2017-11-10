import { combineReducers } from 'redux';
import globalError  from './globalError';
import groups from './groups';
import items from './items';


export default combineReducers({
    globalError,
    groups,
    items
});