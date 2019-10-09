import {createStore} from 'redux';

import {hotColdGameReducer} from './reducers';

export default createStore(hotColdGameReducer);