import * as _ from 'lodash';
import { Node } from './node-interface';
import { UPDATE_NODE, DELETE_NODE, Action, FETCH_ROOT, SWITCH_NODE, ADD_CHILDREN, ENABLE_EDIT, DETACH_NODE } from '../actions';
import initialRoot from './data';
import { idGenerator }  from '../utility';

let rootId = 0;

export const getRootId = () => rootId;

export default function rootReducer( state = {}, action: Action) : any{
    switch (action.type) {        
        case(FETCH_ROOT):
            return initialRoot;
        case(UPDATE_NODE):
            // in case the root has been deleted
            if (action.data.id < 0) {
                rootId = idGenerator();               
                return {
                    ...state,
                    [rootId]: {
                        id: rootId,
                        data: action.data.data,
                        label: action.data.label || 'Root'
                    }
                }
            }

            return {
                ...state,
                [action.data.id]: {
                    ...state[action.data.id], 
                    data: action.data.data ? action.data.data : state[action.data.id].data, 
                    label: action.data.label ? action.data.label : state[action.data.id].label
                }
            }   
        case DELETE_NODE : {                    
            return _.omit(state, action.data);
        }
        case DETACH_NODE : {
            if ( state[action.data.id].parent === undefined) {
                return state;
            }

            const parent = state[action.data.id].parent;
            const siblings =  state[parent].items.filter(item => item !== action.data.id);

            return {
                ...state,
                [parent]: { ...state[parent], items: siblings},
            }
        }
        case(ADD_CHILDREN): {
            let childrenId = idGenerator();
            return {
               ...state,
               [action.data.id] : { 
                   ...state[action.data.id], 
                   items: (state[action.data.id].items || []).concat([childrenId]),                    
               },
               [childrenId] : { label:"New Node", items:[], id: childrenId, parent: action.data.id } 
            }     
        }        
        default:
            return state;
    }
}