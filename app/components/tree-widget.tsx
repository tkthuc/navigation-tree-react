import * as React from 'react';
import { UPDATE_NODE, updateNode, updateRoot, fetchRoot } from '../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Node } from '../reducers';
import TreeNode from './tree-node';

export interface TreeProps { name: string; root?: Node, getRoot: any, updateCurrentNode: any}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
class Tree extends React.Component<TreeProps, undefined> {
    
    constructor(props : any){        
        super(props);      
    }

    componentDidMount(){
        this.props.getRoot();
    }
  

    updateCurrentNode(node: Node) {
        this.props.updateCurrentNode(node);       
    }
    
    render() {        
        return (
            <div>               
                <TreeNode node={this.props.root} paddingLevel={1} currentId="0" updateCurrentNode={this.updateCurrentNode.bind(this)}></TreeNode>
            </div>
        );
    }
}

const mapStateToProps = (state : {root: Node, currentNode: Node}, props : any) : any => {
    return {
        root: state.root
    }
}

const mapDispatchToProps =  (dispatch : Dispatch<any>) : any => {
    return {
        getRoot: () => {
            dispatch(fetchRoot());
        },
        updateCurrentNode: (node: Node) => {
            dispatch(updateNode(node));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
