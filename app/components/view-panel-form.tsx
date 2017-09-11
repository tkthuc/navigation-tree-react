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
  }


const ViewPanelForm = (props:CustomFormProps) :any => {    

    const labels :  NodeData = {
        'firstName': 'First Name',
        'lastName' : 'Last Name',
        'email' : 'Email'
    }
   
    const onSubmit = (values: any) => {
        props.updateNode({
            type: UPDATE_NODE,
            node: {
                firstName: values.firstName,
                lastName: values.lastName,
            }
        });
    }

   const renderField = (field : any ) :JSX.Element => {             
        const updateValue = (event: any) => {
            console.log(event.target.value);            
        }
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
                    {/* <Field name="firstName"  component= "input" type="text"/>                                           */}
                    <Field name="lastName"  component= {renderField} type="text"/>                    
                    <button type="submit" className="btn btn-primary">Submit</button>
    </form>);
    
}


const mapStateToProps = ( state: {currentNode: Node}, props: any) => {
    return {
        initialValues  : state.currentNode.data
    }
}



export default connect(mapStateToProps, { updateNode })(reduxForm({
    form:"viewPanelForm",
    enableReinitialize: true   
})(ViewPanelForm));