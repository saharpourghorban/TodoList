import { combineReducers } from 'redux';
import LocalDataReducer from './LocalDataReducer';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
	localData: persistReducer(
		{
			storage,
			key: 'data',
			keyPrefix: `TODO-`,
		},
		LocalDataReducer
	),
});

export default reducers;
