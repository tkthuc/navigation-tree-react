import * as _ from 'lodash';
import { Node } from '../reducers';

let id = 0;

export function idGenerator() : number {
    return id++;
}

/*
*   Flatten the nested structure of the tree-view to array-view
*/
const normalize = (node: Node) : any => {    
    if (!node) {
        return {};
    }
    let id = node.id || idGenerator();

    if (!node.items || node.items.length == 0) {        
        return {[id]: { id, ...node }};
    }

    let items = _.map(node.items, item => {
        return { ...item, id: idGenerator() };
    });


    const list = _.reduce(items,(list,item) => {       
        const sublist = {...normalize( {...item})};
        return {...list, ...sublist};
    },{})    
   
    return {[id]: { id, ...node, items}, ...list};
}

/*
*   Replace the children array of each node by the ids of its children after flattening
*/

const simplifyNodes = (nodes: any) : any => {
    return Object.keys(nodes).map((key, index) => {
       let items = nodes[key].items ? nodes[key].items.map((item : any)=>item.id) : [];
       return { ...nodes[key], items }
    });
}

export function normalizeData(root : Node) {
    let nodes = normalize(root);
    return simplifyNodes(nodes);
}





