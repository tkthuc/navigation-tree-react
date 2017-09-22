import * as _ from 'lodash';

import { Action, ENABLE_EDIT, DISABLE_EDIT, UPDATE_NODE, DELETE_NODE } from '../actions';
import { getRootId } from './root-reducer';

export default function uiReducer(state = {}, action : Action) {
    switch(action.type) {
        case (ENABLE_EDIT): {   
            const id =  action.data.id > -1 ? action.data.id : getRootId();   
            return {
                ...state,
                [id]: {
                    ...state[id],
                    inEditMode: true
                }
            };
        }

        case (DISABLE_EDIT): {
            const id =  action.data.id > -1 ? action.data.id : getRootId();   
            return {
                ...state,
                [id]: {
                    ...state[id],
                    inEditMode: false
                }
            };
        }

        case DELETE_NODE: {
            return _.omit(state, action.data);
        }

        default:
            return state;
    }  
} 