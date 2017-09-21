import { Action, SWITCH_NODE, DELETE_NODE } from '../actions';
import data from './data';
import { Node } from './node-interface';


const initialNode = {
   id: 0
}

export default function( state = initialNode, action : Action) : any{
    switch(action.type) {
        case SWITCH_NODE:
            return (<any>Object).assign({}, state, action.data );     
        case DELETE_NODE:
            return { id: -1 }; 
        default:
            return state;
    }
}