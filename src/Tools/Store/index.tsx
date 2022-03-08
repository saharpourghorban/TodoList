// <reference types="redux-persist" />
import { FC } from 'react';
import { Provider } from 'react-redux';
import { isDev } from '../Utils/React';
import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';

import reducers from './reducers';

export const store = configureStore({
	devTools: isDev,
	reducer: reducers,
	middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

const Store: FC = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistStore(store)}>{children}</PersistGate>
		</Provider>
	);
};

export type StoreTypes = ReturnType<typeof store.getState>;

export default Store;
