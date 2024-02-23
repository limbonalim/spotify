import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { artistsReducer } from '../containers/Home/artistsSlice.ts';
import { albumReducer } from '../containers/ArtistPage/albumsSlice.ts';
import { tracksReducer } from '../containers/AlbumPage/tracksSlice.ts';
import { usersReducers } from '../containers/Users/usersSlice.ts';

const usersPersistConfig = {
	key: 'spotify:users',
	storage: storage,
	whitelist: ['user'],
};

const rootReducer = combineReducers({
	artists: artistsReducer,
	albums: albumReducer,
	tracks: tracksReducer,
	users: persistReducer(usersPersistConfig, usersReducers)
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
		}
	})
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;