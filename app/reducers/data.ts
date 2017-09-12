import { normalizeData } from '../utility';
import { Node } from './current-node-reducer';

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

Object.freeze(initialRoot);

export default normalizeData(initialRoot);