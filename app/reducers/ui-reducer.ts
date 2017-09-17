import { Action, ENABLE_EDIT, DISABLE_EDIT } from '../actions';

export default function uiReducer(state = {}, action : Action) {
    switch(action.type) {
        case (ENABLE_EDIT): {
            return {
                ...state,
                [action.data.id]: {
                    ...state[action.data.id],
                    inEditMode: true
                }
            };
        }

        case (DISABLE_EDIT): {
            return {
                ...state,
                [action.data.id]: {
                    ...state[action.data.id],
                    inEditMode: false
                }
            };
        }

        default:
            return state;
    }  
} 