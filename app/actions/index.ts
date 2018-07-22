import { Node } from '../reducers';

export const UPDATE_NODE = 'UPDATE_NODE';
export const SWITCH_NODE = 'SWITCH_NODE';
export const FETCH_ROOT = 'FETCH_ROOT';
export const ADD_CHILDREN = 'ADD_CHILDREN';
export const ENABLE_EDIT = 'ENABLE_EDIT';
export const DISABLE_EDIT = 'DISABLE_EDIT';
export const DELETE_NODE = 'DELETE_NODE';
export const DETACH_NODE = 'DETACH_NODE';

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

export function addChildren(data: {id: number}) : Action {
    return {
        type: ADD_CHILDREN,
        data,
    }
}

export function enableEdit(data : { id: number }) : Action {
    return {
        type: ENABLE_EDIT,
        data,
    }
}

export function disableEdit(data : { id: number }) : Action {
    return {
        type: DISABLE_EDIT,
        data,
    }
}

export function deleteNode(data : number | number[]) : Action {
    let listOfIds = [];
    if (!Array.isArray(data)) {
        listOfIds = listOfIds.concat([data]);
    }else{
        listOfIds = data;
    }
    return {
        type: DELETE_NODE,
        data: listOfIds,        
    }
}

export function detachFromParent( data: { id: number }){
    return {
        type: DETACH_NODE,
        data,
    }
}