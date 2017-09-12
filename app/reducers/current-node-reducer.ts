import { Action, SWITCH_NODE } from '../actions';
import data from './data';

export interface Node {
    items?: number[],
    data?: any,
    label: string,
    id?: number
};

const initialNode = {
   id: 0
}

export default function( state = initialNode, action : Action) : any{
    switch(action.type) {
        case SWITCH_NODE:
            return (<any>Object).assign({}, state, action.data );       
        default:
            return state;
    }
}