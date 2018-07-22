import * as React from 'react';

import './context-menu.scss';
import { Node } from '../reducers';

export default function contextMenu(props: {visible: boolean, currentNode: Node, onClickEvents: {label: string, event: any}[]}) : JSX.Element{   

    return (
        <nav className="context-menu" style={ { display: props.visible ? 'initial' : 'none' }  }>
            <ul className="context-menu__items">
                {
                    props.onClickEvents && props.onClickEvents.map( (item,index) => {
                        return <li className="context-menu__item" key={index}>
                            <a href="#" className="context-menu__link" onClick={item.event.bind(null,props.currentNode)}>
                                <i className="fa fa-eye"></i> {item.label}
                            </a>
                        </li> 
                    })
                }                
            </ul>
        </nav>
    );
  
}