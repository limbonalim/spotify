import {useCallback, useEffect} from 'react';
import {Grid, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {getArtist, selectCurrentArtist} from '../Home/artistsSlice.ts';
import {getArtists} from '../Home/artistsThunks.ts';
import {getAlbums} from '../ArtistPage/albumsThunks.ts';
import {getTracks} from './tracksThunks.ts';
import {getCurrentAlbum, selectCurrentAlbum} from '../ArtistPage/albumsSlice.ts';
import {selectErrorMessage, selectIsLoading, selectTracks} from './tracksSlice.ts';
import TrackItem from '../../components/TrackItem/TrackItem.tsx';



const AlbumPage = () => {
  const dispatch = useAppDispatch();
  const artist = useAppSelector(selectCurrentArtist);
  const album = useAppSelector(selectCurrentAlbum);
  const error = useAppSelector(selectErrorMessage);
  const isLoading = useAppSelector(selectIsLoading);
  const tracks = useAppSelector(selectTracks);
  const {artistId, id} = useParams();

  const renderAlbum = useCallback(async () => {
    await dispatch(getArtists());
    if (artistId && id) {
      dispatch(getArtist(artistId));
      await dispatch(getAlbums(artistId));
      dispatch(getCurrentAlbum(id));
      await dispatch(getTracks(id));
    }
  },[id, artistId]);

  useEffect(() => {
    void renderAlbum();
  }, [renderAlbum]);

  const render = tracks.map(({_id, title, duration, numberInAlbum, album}) => (
    <TrackItem key={_id} _id={_id} title={title} duration={duration} numberInAlbum={numberInAlbum} album={album}/>
  ));

  return (artist && album) && (
    <Grid container>
      <Grid item container spacing={2} mb={3}>
        <Grid item>
          <Typography variant='h4' color='gray'>{artist.name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h5'>{album.title}</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={2} flexDirection='column'>
        {error? <span>{error.message}</span>: ''}
        <Typography variant='h5' color='gray'>Tracks:</Typography>
        {isLoading? <Loader/> : render}
      </Grid>
    </Grid>
  );
};

export default AlbumPage;