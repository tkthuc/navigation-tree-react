import * as React from 'react';
import { UPDATE_NODE, switchNode, updateRoot, fetchRoot } from '../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Node } from '../reducers';
import TreeNode from './tree-node';
import ContextMenu from './context-menu';
import ContextMenuHelper from './context-menu-position';

export interface TreeProps { name: string; nodes?: {[prop:number]: Node}, getRoot: any, updateCurrentNode: any}

// State is never set so we use the 'undefined' type.
class Tree extends React.Component<TreeProps, any> {
    
    menu: any;
    currentId: number;

    constructor(props : any){        
        super(props);      
        this.state = {
            contextMenuVisible: false,
            currentId: null,
            events: [
                {
                    label : 'Add Children',
                    event : (node: Node) => {
                        console.log(`Add Children for Node ${node.id}`);
                    }
                },
                {
                    label : 'Delete node',
                    event : (node: Node) => {
                        console.log(`Delete node for Node ${node.id}`);
                    }
                },

            ]
        }
        this.menu = null;
    }    
    

    componentDidMount(){
        this.props.getRoot();
        document.addEventListener('contextmenu',this.handleContextMenu.bind(this));     
        document.addEventListener('click',this.handleClick.bind(this));       
    }

    componentWillUnmount() {
        document.removeEventListener('contextmenu', this.handleContextMenu);        
    }

    updateCurrentNode(id:number) {
        this.props.updateCurrentNode(id);       
    }

    handleContextMenu(e) {        
        if(ContextMenuHelper._clickInsideElement(e,'tree-widget','label')){
            e.preventDefault();                  

            this.setState({
                contextMenuVisible: true,   
                currentId: e.target.getAttribute('data-id')            
            });    
            let {positionX, positionY} = ContextMenuHelper._positionMenu(e);
            this.menu.style.left = positionX;
            this.menu.style.top = positionY;       
            
        }else{
            this.setState({contextMenuVisible: false});
        }        
    }

    handleClick(e) {
        this.setState({contextMenuVisible: false});
    }
  
    render() {     
        if(Object.keys(this.props.nodes).length === 0 ){ 
            return <div></div>
        }   
        return (
            <div className='tree-widget'>               
                <TreeNode 
                        nodes={this.props.nodes} 
                        paddingLevel={1} 
                        currentId={0} 
                        updateCurrentNode={this.updateCurrentNode.bind(this)}></TreeNode>
                <div ref={ el => this.menu = el} style={{position: "absolute"}}>
                    <ContextMenu currentNode={this.props.nodes[this.state.currentId]} visible={this.state.contextMenuVisible} onClickEvents={this.state.events}/>       
                </div>
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
