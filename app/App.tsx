/**
 * Created by ktran on 12/26/2016.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'bootstrap/dist/css/bootstrap.css';
import treeReducer from './reducers';
import Tree from "./components/tree-widget";
import ViewPanel from "./components/view-panel";
import './app.scss';

let store = createStore(
    treeReducer,
    composeWithDevTools()
);

let nameStyle = {
    display: "flex",
    marginTop: "0px",
    marginBottom: "10px",
    flexBasis: "calc(100% - 22px)",
    justifyContent: "center",
    flexDirection: "column"
};

ReactDOM.render(    
    <Provider store={store}>
        <div className='container'>
            <div style={nameStyle as any}>
                <h1>Hello from React Tree!</h1>
            </div>
            <div className="tree-widget full-width">
                <Tree name="React-Tree"/>
            </div>
            <div className="view-panel full-width">
                <ViewPanel/>
            </div>                    
        </div>
    </Provider>,
    document.getElementById("hello")
);