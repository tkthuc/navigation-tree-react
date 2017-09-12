import { Node } from '../reducers';

export const UPDATE_NODE = 'UPDATE_NODE';
export const SWITCH_NODE = 'SWITCH_NODE';
export const UPDATE_ROOT = 'UPDATE_ROOT';
export const FETCH_ROOT = 'FETCH_ROOT';

export interface Action {
    type: string,
    data: any   
}

export function updateNode(data : Node) : Action {
    return {
        type: UPDATE_NODE,
        data,
    }
}

export function updateRoot(root: Node) : Action {
    return {
        type: UPDATE_ROOT,
        data: root,
    }
}

export function fetchRoot() : Action {
    return {
        type: FETCH_ROOT,      
        data: null
    }
}

export function switchNode(data: {id: number}): Action {
    return {
        type: SWITCH_NODE,
        data,
    }
}