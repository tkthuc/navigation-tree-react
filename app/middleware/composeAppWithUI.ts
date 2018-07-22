import { getDescendants } from '../reducers';
import { deleteNode, detachFromParent } from '../actions';


export function deleteNodeFromStore({id} : {id:number}) : any {
    return function(dispatch, getState) {     
        const nodes = getState().nodes;
        const descendants = getDescendants(nodes, id);        
        dispatch(detachFromParent({id}));
        dispatch(deleteNode(descendants));
    }
}

