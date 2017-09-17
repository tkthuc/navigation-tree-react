import * as React from 'react';
import { InjectedFormProps, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { updateNode, UPDATE_NODE } from '../actions';
import { Node } from '../reducers';

export interface NodeData{
    firstName: string,
    lastName: string,
    email?:string,
    [index: string]: any    
} 

interface CustomFormProps extends InjectedFormProps{
    handleSubmit: any;  
    updateNode: any; 
    id: number;
  }


const ViewPanelForm = (props:CustomFormProps) : JSX.Element => {    

    const labels :  NodeData = {
        'firstName': 'First Name',
        'lastName' : 'Last Name',
        'email' : 'Email'
    }
   
    const onSubmit = (values: any) => {
        props.updateNode({id : props.id, data : values});
    }

   const renderField = (field : any ) :JSX.Element => {                     
        return (            
                <div className="form-group">
                    <label>{labels[field.input.name]}</label>
                    <input
                        className='form-control'
                        type="text"  
                        {...field.input}                                            
                    />  
                </div>      
        );
    }


    return (<form onSubmit={props.handleSubmit(onSubmit.bind(this))}>                   
                    <Field name="firstName"  component= {renderField} type="text"/>                                                     
                    <Field name="lastName"  component= {renderField} type="text"/>                    
                    <button type="submit" className="btn btn-primary">Submit</button>
    </form>);
    
}


const mapStateToProps = ( state: {currentNode: {id: number}, nodes: {[prop:number] : Node}}, props: any) => {
    return {
        initialValues  : state.nodes[state.currentNode.id] ? state.nodes[state.currentNode.id].data : {},
        id: state.currentNode.id
    }
}


const form = reduxForm({
    form:"viewPanelForm",
    enableReinitialize: true   
})(ViewPanelForm) as any;

export default connect(mapStateToProps, { updateNode })(form);