import * as _ from 'lodash';

import { Node } from './node-interface';


export function  getDescendants(nodes: {[prop:number]:Node}, id: number) {
        if (!nodes[id]) {
            return [];
        }
    
        if(!nodes[id].items || nodes[id].items.length == 0) {
            return [id];
        }

        const descendants = nodes[id].items.reduce(( list, item) => {
            const subDescendants = getDescendants(nodes, item);
            return [...list, ...subDescendants];
        },[]);
        
        return [...descendants,id];
};
    
export function deleteNode(nodes: {[prop:number]:Node}, id: number) {
        const descendants: number[] = getDescendants(nodes, id);
        const predecessor: number[] = (nodes[id]).hasOwnProperty('parent') ? [nodes[id].parent] : [];
        if (predecessor.length > 0) {
            const children = nodes[predecessor[0]].items.filter(item => item!==id );
            nodes = {...nodes, [predecessor[0]]: { ...nodes[predecessor[0]], items: children}};
        }
        return _.omit(nodes, [...descendants]);
} ;
