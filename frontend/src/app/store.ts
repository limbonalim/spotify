import { configureStore } from '@reduxjs/toolkit';
import {artistsReducer} from '../containers/Home/artistsSlice.ts';
import {albumReducer} from "../containers/ArtistPage/albumsSlice.ts";
import { tracksReducer } from '../containers/AlbumPage/tracksSlice.ts';


export const store = configureStore({
	reducer: {
    artists: artistsReducer,
		albums: albumReducer,
    tracks: tracksReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;