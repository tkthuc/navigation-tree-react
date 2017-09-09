import * as React from 'react';
import { connect } from 'react-redux';
import { Node } from '../reducers';


export default function TreeNode(props : {
    node:Node, paddingLevel:number, 
    currentId: string,
    updateCurrentNode: any
}) : JSX.Element {
    let style = {
        "paddingLeft": `${props.paddingLevel*5}px`,
        "marginTop": "0px",
        "listStyle":"none"
    }

 
    
    return (
        <div>
            <input type="checkbox" id={`${props.currentId}`}/>
            <label htmlFor={`${props.currentId}`} onClick={() => props.updateCurrentNode(props.node)}> {props.node.label} </label>
            <ul style={style}>
            {
                props.node.items && props.node.items.map((item,index) => {
                  return <li key={index}>
                            <TreeNode node={item} paddingLevel={props.paddingLevel+1} currentId={`${props.currentId}${index}`} 
                                    updateCurrentNode={props.updateCurrentNode}></TreeNode>  
                         </li>
                })
            }
            </ul>
        </div>
    )
}


