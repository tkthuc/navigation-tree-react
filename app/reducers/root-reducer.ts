import { Node } from './current-node-reducer';
import { UPDATE_NODE, UPDATE_ROOT, Action, FETCH_ROOT, SWITCH_NODE, ADD_CHILDREN, ENABLE_EDIT } from '../actions';
import initialRoot from './data';
import { idGenerator }  from '../utility';

export default function rootReducer( state = {}, action: Action) : any{
    switch (action.type) {
        case(UPDATE_ROOT):
            return (<any>Object).assign({},state, {label: action.data.label, items:action.data.items});   
        case(FETCH_ROOT):
            return initialRoot;
        case(UPDATE_NODE):
            return {
                ...state,
                [action.data.id]: {
                    ...state[action.data.id], 
                    data: action.data.data ? action.data.data : state[action.data.id].data, 
                    label: action.data.label ? action.data.label : state[action.data.id].label
                }
            }   
        case(ADD_CHILDREN): {
            let childrenId = idGenerator();
            return {
               ...state,
               [action.data.id] : { 
                   ...state[action.data.id], 
                   items: state[action.data.id].items.concat([childrenId]),                    
               },
               [childrenId] : { label:"New Node", items:[], id: childrenId } 
            }     
        }        
        default:
            return state;
    }
}