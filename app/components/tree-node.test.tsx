import * as React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest';

import TreeNode from './tree-node';

describe('TreeNode component renders into a tree structure',function(){
    it("Tree Node component should contains label", function(){
        const nodes = {
            0: {
                id: 0,
                label: "First",
                data: {
                    firstName: 'John',
                    lastName: 'White'
                },
                items: [1]
            },
            1: {
                id: 1,
                label: "Second",
                data: {
                    firstName: 'Jen',
                    lastName: 'Brown'
                }
            }
        };

        const updateCurrentNode = (values) =>{
            console.log(values);
        };
        const wrapper = mount(
            <TreeNode 
                    nodes={nodes} 
                    paddingLevel={1} 
                    currentId={0}  
                    updateCurrentNode={updateCurrentNode}           
            ></TreeNode>
        );       
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});