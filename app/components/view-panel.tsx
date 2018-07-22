import * as React from 'react';
import { Dispatch } from 'redux';

import { Node } from '../reducers';
import ViewPanelForm from './view-panel-form';

export interface PanelProps {
    currentNode?: Node   
}

export default class ViewPanel extends React.Component<PanelProps,undefined>{
    constructor(props: PanelProps) {
        super(props);       
    }

    render() {
        return <ViewPanelForm></ViewPanelForm>;
    }
}