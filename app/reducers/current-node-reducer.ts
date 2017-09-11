import { Action, UPDATE_NODE, CHANGE_NODE } from '../actions';

export interface Node {
    items?: Node[],
    data?: any,
    label: string,
    id?: number
};

const initialNode = {
    items: <Node[]>[]    
}

export default function( state = initialNode, action : Action) : any{
    switch(action.type) {
        case CHANGE_NODE:
            return (<any>Object).assign({}, state, action.node );
        case UPDATE_NODE:
            return (<any>Object).assign({}, state, action.node );
        default:
            return state;
    }
}