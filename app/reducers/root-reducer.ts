import { Node } from './current-node-reducer';
import { UPDATE_ROOT, Action, FETCH_ROOT } from '../actions';

const initialRoot  = {
    label:'Root',
    data : {
        firstName: "Steve",
        lastName: "Tran"
    },
    items:[
        {
            label: 'First Child',                    
            data: {
                firstName: "Kevin",
                lastName: "Lee"
            }
        },
        {
            label: 'Second Child',
            data: {
                firstName: "Ivan",
                lastName: "Ivanov"
            },
            items: [
                {
                    label: 'Child of Second Child',
                    data: {
                        firstName: "Curtis",
                        lastName: "White"
                    }
                },
            ]
        }
    ]
};

export default function rootReducer( state = {label: "Root"}, action: Action) : any{
    switch (action.type) {
        case(UPDATE_ROOT):
            return (<any>Object).assign({},state, {label: action.node.label, items:action.node.items});   
        case(FETCH_ROOT):
            return initialRoot;
        default:
            return state;
    }
}