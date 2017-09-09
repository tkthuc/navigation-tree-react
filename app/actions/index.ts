import { Node } from '../reducers';

export const UPDATE_NODE = 'UPDATE_NODE';
export const UPDATE_ROOT = 'UPDATE_ROOT';
export const FETCH_ROOT = 'FETCH_ROOT';

export interface Action {
    type: string,
    node: Node
}

export function updateNode(node : Node) : Action {
    return {
        type: UPDATE_NODE,
        node,
    }
}

export function updateRoot(root: Node) : Action {
    return {
        type: UPDATE_ROOT,
        node: root,
    }
}

export function fetchRoot() : Action {
    return {
        type: FETCH_ROOT,      
        node: null
    }
}