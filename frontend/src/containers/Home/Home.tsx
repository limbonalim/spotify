import { Grid } from '@mui/material';
import {useEffect} from 'react';
import ArtistItem from '../../components/ArtistItem/ArtistItem.tsx';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectArtists} from './artistsSlice.ts';
import {getArtists} from './artistsThunks.ts';


const Home = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);
  return (
    <Grid container spacing={2}>
      {artists.map(({_id, name, info, photo}) => (
        <ArtistItem key={_id} _id={_id} name={name} info={info} photo={photo}/>
      ))}

    </Grid>
  );
};

export default Home;