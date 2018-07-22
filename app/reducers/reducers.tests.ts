import rootReducer, { getRootId } from './root-reducer';
import * as types from '../actions';
import { normalizeData } from '../utility';


describe("Testing reducer for list of nodes", () => {

    const initialState = {
        0: {
            data: {
                firstName: 'Bill', lastName: "Clinton",
            },
            label: "Root",
            items:[1],
        },
        1: {
            data: {
                firstName: 'Magaret', lastName: "Clinton",
            },
            label: "First child",   
            parent: 0,                             
        }
    };
    
    it(' should return default state', () => {
        expect( rootReducer(undefined, <any>{})).toEqual({});
    });

    it(' should update node correctly', () => {
        let state =  rootReducer(initialState,{
                                                    type: types.UPDATE_NODE,
                                                    data: {
                                                        id: 0,
                                                        data: {
                                                            firstName: 'William', lastName: 'Clinton',
                                                        },
                                                        label: "Tree Root",
                                                    }
                                                });        
        expect(state[0].label).toEqual("Tree Root");
        expect(state[0].data.firstName).toEqual("William");
       
        let stateAfterUpdatingEmptyTree = rootReducer({}, {
                                                            type: types.UPDATE_NODE,
                                                            data: {
                                                                id: -1,
                                                                data: {
                                                                    firstName: 'William', lastName: 'Clinton',
                                                                },
                                                                label: "Tree Root",
                                                            }
                                                      });                                                 
        expect(stateAfterUpdatingEmptyTree[getRootId()].data.firstName).toEqual("William");                                           
    });

    it(' should delete node correctly ', function() {      
        let newState = rootReducer(initialState,{
                                                type: types.DELETE_NODE,
                                                data: [1]
                                            });
        expect(newState[1]).not.toBeDefined();                                           
    });

    it(' should detach node correctly from its parent ', function() {      
        let newState = rootReducer(initialState,{
                                                type: types.DETACH_NODE,
                                                data: {
                                                    id: 1
                                                }
                                            });
        expect(newState[0].items.length).toEqual(0);                                              
    });
});