import { Grid } from '@mui/material';
import { useEffect } from 'react';
import ArtistItem from '../../components/ArtistItem/ArtistItem.tsx';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectArtists, selectErrorMessage, selectIsLoading } from './artistsSlice.ts';
import { getArtists } from './artistsThunks.ts';


const Home = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const error = useAppSelector(selectErrorMessage);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  const render = artists.map(({_id, name, photo}) => (
    <ArtistItem key={_id} _id={_id} name={name} photo={photo}/>
  ));
  return (
    <Grid container spacing={2}>
      {error ? <span>{error.message}</span> : ''}
      {isLoading ? <Loader/> : render}
    </Grid>
  );
};

export default Home;