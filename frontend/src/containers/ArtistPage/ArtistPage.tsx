import {useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {getArtist, selectCurrentArtist} from '../Home/artistsSlice.ts';
import {getArtists} from '../Home/artistsThunks.ts';
import {selectAlbums, selectErrorMessage, selectIsLoading} from './albumsSlice.ts';
import {getAlbums} from './albumsThunks.ts';
import {BASE_URL, Roles} from '../../constants.ts';
import AlbumItem from '../../components/AlbumItem/AlbumItem.tsx';
import Loader from '../../components/UI/Loader/Loader.tsx';
import noImage from '../../assets/NoImage.png';
import {selectUser} from "../Users/usersSlice.ts";


const ArtistPage = () => {
  const dispatch = useAppDispatch();
  const artist = useAppSelector(selectCurrentArtist);
  const user = useAppSelector(selectUser);
  const albums = useAppSelector(selectAlbums);
  const error = useAppSelector(selectErrorMessage);
  const isLoading = useAppSelector(selectIsLoading);
  const {id} = useParams();

  const renderArtist = useCallback(async () => {
    await dispatch(getArtists());
    if (id) {
      dispatch(getArtist(id));
      await dispatch(getAlbums(id));
    }
  },[id]);

  useEffect(() => {
    void renderArtist();
  }, [renderArtist]);

  const render = albums.map(({_id, title, image, year, isPublished}) => {
    if (user && user.role === Roles.admin) {
      return (<AlbumItem key={_id} _id={_id} title={title} year={year} image={image} isPublished={isPublished} isAdmin/>);
    }
    return (<AlbumItem key={_id} _id={_id} title={title} year={year} image={image} isPublished={isPublished}/>);
  });

  return artist && (
    <Grid container>
      <Grid item container spacing={2} mb={3}>
        <Grid item>
          <img
            style={{maxWidth: 350, borderRadius: 5}}
            src={artist.photo ? BASE_URL + '/' + artist.photo : noImage}
            alt={artist.name}
          />
        </Grid>
        <Grid item>
          <Typography variant='h4'>{artist.name}</Typography>
          <Typography color='gray'>{artist.info}</Typography>
        </Grid>
      </Grid>
      <Grid item container flexDirection='column'>
        {error? <span>{error.message}</span>: ''}
        <Typography variant='h5' color='gray'>Albums:</Typography>
        {isLoading? <Loader/> : render}
      </Grid>
    </Grid>
  );
};

export default ArtistPage;