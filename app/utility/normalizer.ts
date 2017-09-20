import * as _ from 'lodash';
import { Node } from '../reducers';

let id = 0;

export function idGenerator() : number {
    return id++;
}

/*
*   Flatten the nested structure of the tree-view to array-view
*/
const normalize = (node: any) : any => {    
    if (!node) {
        return {};
    }
    let id = node.id || idGenerator();

    if (!node.items || node.items.length == 0) {        
        return {[id]: { id, ...node }};
    }

    let items = _.map(node.items, item => {
        return { ...item, id: idGenerator(), parent: id};
    });


    const list = _.reduce(items,(list,item) => {       
        const sublist = {...normalize(item)};
        return {...list, ...sublist};
    },{})    
   
    return {[id]: { id, ...node, items}, ...list};
}

/*
*   Replace the children array of each node by the ids of its children after flattening
*/

const simplifyNodes = (nodes: any) : {[prop:number] : Node} => {
    return Object.keys(nodes).reduce((list, key) => {
       let items = nodes[key].items ? nodes[key].items.map((item : any)=>item.id) : [];
       return {...list, [key]: { ...nodes[key], items }}
    }, {});
}

export function normalizeData(root : any) : {[prop:number] : Node} {
    let nodes = normalize(root);
    return simplifyNodes(nodes);
}





