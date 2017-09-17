import * as React from 'react';
import { connect } from 'react-redux';
import { Node } from '../reducers';



export default class TreeNode extends React.Component <{
    nodes:{[prop:number]: Node}, 
    ui: {[prop:number]: {inEditMode: boolean}},
    paddingLevel:number, 
    currentId: number,
    switchNode: any,      
    disableEdit: any,
    updateCurrentNode: (id: number, label: string) => void,
},any> {
    style: any;

    constructor(props) {
        super(props);
        this.style = {
            "paddingLeft": `${this.props.paddingLevel*5}px`,
            "marginTop": "0px",
            "listStyle":"none"
        } 
        this.state = {
            label : ""
        }
    }    

    onKeyDownEvent(id: number, event: any) {
        if(event.keyCode == 13 ) {
            this.props.updateCurrentNode(id, this.state.label);
            this.props.disableEdit(id);
        }              
    }

    onChangeEvent(event) {
        this.setState({
            label: event.target.value
        });
    }
    
    render() {
        return (
            <div>
                <input type="checkbox" id={`${this.props.currentId}`}/>
                {
                    this.props.ui[this.props.currentId] && this.props.ui[this.props.currentId].inEditMode 
                        ?
                        <input data-id={`${this.props.currentId}`} 
                            onKeyDown={(e) => this.onKeyDownEvent(this.props.currentId, e)}
                            onChange= {this.onChangeEvent.bind(this)} 
                        />  
                        :
                        <label data-id={`${this.props.currentId}`} htmlFor={`${this.props.currentId}`} onClick={() => this.props.switchNode(this.props.currentId)}> {this.props.nodes[this.props.currentId].label} </label>
                        
                }
                <ul style={this.style}>
                {
                    this.props.nodes[this.props.currentId].items && this.props.nodes[this.props.currentId].items.map((item,index) => {
                    return <li key={index}>
                                <TreeNode 
                                        nodes={this.props.nodes} 
                                        paddingLevel={this.props.paddingLevel+1} 
                                        currentId={item} 
                                        switchNode={this.props.switchNode}
                                        ui= {this.props.ui}      
                                        disableEdit = {this.props.disableEdit}                                 
                                        updateCurrentNode={this.props.updateCurrentNode}
                                        >
                                </TreeNode>  
                            </li>
                    })
                }
                </ul>
        </div>
        );
    } 
    
}




