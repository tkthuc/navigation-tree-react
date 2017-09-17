import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentNodeReducer from './current-node-reducer';
import rootReducer from './root-reducer';
import uiReducer from './ui-reducer';

export * from './current-node-reducer';


export default combineReducers({
    currentNode: currentNodeReducer,
    nodes: rootReducer,
    ui: uiReducer,
    form: formReducer
});