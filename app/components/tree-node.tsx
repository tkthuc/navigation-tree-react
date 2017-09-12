import * as React from 'react';
import { connect } from 'react-redux';
import { Node } from '../reducers';


export default function TreeNode(props : {
    nodes:{[prop:number]: Node}, 
    paddingLevel:number, 
    currentId: number,
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
            <label htmlFor={`${props.currentId}`} onClick={() => props.updateCurrentNode(props.currentId)}> {props.nodes[props.currentId].label} </label>
            <ul style={style}>
            {
                props.nodes[props.currentId].items && props.nodes[props.currentId].items.map((item,index) => {
                  return <li key={index}>
                            <TreeNode 
                                    nodes={props.nodes} 
                                    paddingLevel={props.paddingLevel+1} 
                                    currentId={item} 
                                    updateCurrentNode={props.updateCurrentNode}>
                            </TreeNode>  
                         </li>
                })
            }
            </ul>
        </div>
    )
}


