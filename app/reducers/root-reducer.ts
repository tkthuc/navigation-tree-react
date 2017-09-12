import { Node } from './current-node-reducer';
import { UPDATE_NODE, UPDATE_ROOT, Action, FETCH_ROOT, SWITCH_NODE } from '../actions';
import initialRoot from './data';

export default function rootReducer( state = {}, action: Action) : any{
    switch (action.type) {
        case(UPDATE_ROOT):
            return (<any>Object).assign({},state, {label: action.data.label, items:action.data.items});   
        case(FETCH_ROOT):
            return initialRoot;
        case(UPDATE_NODE):
            return {
                ...state,
                [action.data.id]: {...state[action.data.id], data:action.data.data}
            }       
        default:
            return state;
    }
}