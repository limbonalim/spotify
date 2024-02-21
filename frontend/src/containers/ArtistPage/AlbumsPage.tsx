import {useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {getArtist, selectCurrentArtist} from '../Home/artistsSlice.ts';
import {getArtists} from '../Home/artistsThunks.ts';
import {selectAlbums, selectIsLoading} from './albumsSlice.ts';
import {getAlbums} from './albumsThunk.ts';
import {BASE_URL} from '../../constants.ts';
import AlbumItem from '../../components/AlbumItem/AlbumItem.tsx';
import Loader from '../../components/UI/Loader/Loader.tsx';
import noImage from '../../assets/NoImage.png';


const AlbumsPage = () => {
  const dispatch = useAppDispatch();
  const artist = useAppSelector(selectCurrentArtist);
  const albums = useAppSelector(selectAlbums);
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

  const render = albums.map(({_id, title, image, year}) => (
    <AlbumItem key={_id} _id={_id} title={title} year={year} image={image}/>));

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
      <Grid item container>
        {isLoading? <Loader/> : render}
      </Grid>
    </Grid>
  );
};

export default AlbumsPage;