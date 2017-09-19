import * as React from 'react';
import { UPDATE_NODE, switchNode, updateRoot, fetchRoot, addChildren, enableEdit, updateNode, disableEdit } from '../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Node } from '../reducers';
import TreeNode from './tree-node';
import ContextMenu from './context-menu';
import ContextMenuHelper from './context-menu-position';

export interface TreeProps { 
    name: string; 
    nodes?: {[prop:number]: Node}, 
    getRoot: any, 
    switchNode: any, 
    addChildren: any,
    enableEdit: any,
    disableEdit: any,
    updateCurrentNode: any,
    ui: any,
}

// State is never set so we use the 'undefined' type.
class Tree extends React.Component<TreeProps, any> {
    
    menu: any;
    currentId: number;
    events: any;

    constructor(props : any){        
        super(props);      
        this.state = {
            contextMenuVisible: false,
            currentId: null,           
        }
        this.menu = null;
        this.events = [
            {
                label : 'Add Children',
                event : (node: Node) => {
                    console.log(`Add Children for Node ${node.id}`);
                    this.props.addChildren(node.id);
                }
            },
            {
                label : 'Delete node',
                event : (node: Node) => {
                    console.log(`Delete node for Node ${node.id}`);
                }
            },
            {
                label : 'Edit Node',
                event : (node: Node) => {
                    console.log(`Edit Content of Node ${node.id}`);
                    this.props.enableEdit(node.id);
                }
            }

        ]
    }    
    

    componentDidMount(){
        this.props.getRoot();
        document.addEventListener('contextmenu',this.handleContextMenu.bind(this));     
        document.addEventListener('click',this.handleClick.bind(this));       
    }

    componentWillUnmount() {
        document.removeEventListener('contextmenu', this.handleContextMenu);        
    }

    switchNode(id:number) {   
        this.props.switchNode(id);       
    }

    updateCurrentNode(id: number, label: string) {
        this.props.updateCurrentNode(id, {
            ...this.props.nodes[this.state.currentId],
            label,
        });
    } 

    enableEdit(id: number){
        this.props.enableEdit(id);
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
                        ui={this.props.ui}
                        disableEdit={this.props.disableEdit}
                        switchNode={this.switchNode.bind(this)}                     
                        updateCurrentNode= {this.updateCurrentNode.bind(this)}></TreeNode>
                <div ref={ el => this.menu = el} style={{position: "absolute"}}>
                    <ContextMenu currentNode={this.props.nodes[this.state.currentId]} visible={this.state.contextMenuVisible} onClickEvents={this.events}/>       
                </div>
            </div>
            
        );
    }
}

const mapStateToProps = (state : {nodes: {[prop:number] :Node}, currentNode: any, ui:{[prop:number] : any} }, props : any) : any => {
    return {
        nodes: state.nodes,
        currentNode: state.currentNode,
        ui: state.ui,
    }
}

const mapDispatchToProps =  (dispatch : Dispatch<any>) : any => {
    return {
        getRoot: () => {
            dispatch(fetchRoot());
        },
        switchNode: (id: number) => {
            dispatch(switchNode({id}));
        },
        addChildren: (id: number) => {
            dispatch(addChildren({id}))
        },
        enableEdit: (id: number) => {
            dispatch(enableEdit({id}));
        },
        disableEdit: (id:number) => {
            dispatch(disableEdit({id}));
        },
        updateCurrentNode: (id: number, node: Node) => {
            dispatch(updateNode(node))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
