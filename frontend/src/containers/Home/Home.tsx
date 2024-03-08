import { Alert, Grid } from '@mui/material';
import { useEffect } from 'react';
import ArtistItem from '../../components/ArtistItem/ArtistItem.tsx';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectArtists, selectErrorMessage, selectIsLoading } from './artistsSlice.ts';
import { getArtists } from './artistsThunks.ts';
import {selectUser} from "../Users/usersSlice.ts";
import {Roles} from "../../constants.ts";


const Home = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const error = useAppSelector(selectErrorMessage);
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  const render = artists.map(({_id, name, photo, isPublished}) => {
    if (user && user.role === Roles.admin) {
      return (<ArtistItem key={_id} _id={_id} name={name} photo={photo} isPublished={isPublished} isAdmin/>);
    }
    return (<ArtistItem key={_id} _id={_id} name={name} isPublished={isPublished} photo={photo}/>);
  });

  return (
    <Grid container spacing={2}>
      {error && (
        <Alert severity="error" sx={{mb: 3}}>
          {error.message}
        </Alert>
      )}
      {isLoading ? <Loader/> : render}
    </Grid>
  );
};

export default Home;