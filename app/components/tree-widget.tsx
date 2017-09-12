import * as React from 'react';
import { UPDATE_NODE, switchNode, updateRoot, fetchRoot } from '../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Node } from '../reducers';
import TreeNode from './tree-node';

export interface TreeProps { name: string; nodes?: {[prop:number]: Node}, getRoot: any, updateCurrentNode: any}

// State is never set so we use the 'undefined' type.
class Tree extends React.Component<TreeProps, undefined> {
    
    constructor(props : any){        
        super(props);      
    }

    componentDidMount(){
        this.props.getRoot();
    }
  

    updateCurrentNode(id:number) {
        this.props.updateCurrentNode(id);       
    }
    
    render() {     
        if(Object.keys(this.props.nodes).length === 0 ){ 
            return <div></div>
        }   
        return (
            <div>               
                <TreeNode 
                        nodes={this.props.nodes} 
                        paddingLevel={1} 
                        currentId={0} 
                        updateCurrentNode={this.updateCurrentNode.bind(this)}></TreeNode>
            </div>
        );
    }
}

const mapStateToProps = (state : {nodes: {[prop:number] :Node}, currentNode: any}, props : any) : any => {
    return {
        nodes: state.nodes,
        currentNode: state.currentNode
    }
}

const mapDispatchToProps =  (dispatch : Dispatch<any>) : any => {
    return {
        getRoot: () => {
            dispatch(fetchRoot());
        },
        updateCurrentNode: (id: number) => {
            dispatch(switchNode({id}));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
