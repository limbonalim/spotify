import { Grid, Box, Typography, Alert } from '@mui/material';
import Protected from '../../components/UI/Protected/Protected.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  selectAlbums,
  selectArtists,
  selectDeleteAlbumError,
  selectDeleteArtistError,
  selectDeleteTrackError, selectError, selectIsLoading,
  selectPublicateAlbumError,
  selectPublicateArtistError,
  selectPublicateTrackError,
  selectTracks
} from './adminsSlice.ts';
import { getAdminData } from './adminsThunks.ts';
import { useCallback, useEffect, useState } from 'react';
import ArtistItem from '../../components/ArtistItem/ArtistItem.tsx';
import AlbumItem from '../../components/AlbumItem/AlbumItem.tsx';
import TrackItem from '../../components/TrackItem/TrackItem.tsx';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { IMyError } from '../../types';

interface IComponentsErrorObject {
  deleteArtistError: IMyError | null;
  deleteAlbumError: IMyError | null;
  deleteTrackError: IMyError | null;
  publicatedArtistError: IMyError | null;
  publicatedAlbumError: IMyError | null;
  publicatedTrackError: IMyError | null;
}

const AdminPage = () => {
  const [componentError, setComponentError] = useState<IMyError | null>(null);
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);
  const tracks = useAppSelector(selectTracks);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const errors: IComponentsErrorObject = {
    deleteArtistError: useAppSelector(selectDeleteArtistError),
    deleteAlbumError: useAppSelector(selectDeleteAlbumError),
    deleteTrackError: useAppSelector(selectDeleteTrackError),
    publicatedArtistError: useAppSelector(selectPublicateArtistError),
    publicatedAlbumError: useAppSelector(selectPublicateAlbumError),
    publicatedTrackError: useAppSelector(selectPublicateTrackError),
  };


  useEffect(() => {
    const keys = Object.keys(errors) as (keyof IComponentsErrorObject)[];
    keys.forEach((key) => {
      const error = errors[key];

      if (error) {
        setComponentError(errors[key]);
      }
    });
  }, [dispatch, errors.deleteArtistError, errors.deleteAlbumError, errors.deleteTrackError, errors.publicatedArtistError, errors.publicatedAlbumError, errors.publicatedTrackError]);

  const getContent = useCallback(async () => {
    await dispatch(getAdminData()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    void getContent();
  }, [getContent]);

  const renderArtists = artists.map(({_id, name, photo}) => (
    <ArtistItem key={`admin/${_id}`} _id={_id} name={name} photo={photo} isAdmin/>
  ));

  const renderAlbums = albums.map(({_id, title, image, year}) => (
    <AlbumItem key={`admin/${_id}`} _id={_id} title={title} year={year} image={image} isAdmin/>));

  const renderTracks = tracks.map(({_id, title, duration, numberInAlbum, url}) => (
    <TrackItem key={`admin/${_id}`} _id={_id} title={title} duration={duration} numberInAlbum={numberInAlbum} url={url} isAdmin/>
  ));

  const render =  (
    <Protected isAdmin>
      {error && (
        <Alert severity="error" sx={{mt: 3, width: '100%'}}>
          {error}
        </Alert>
      )}
      {componentError && (
        <Alert severity="error" sx={{mt: 3, width: '100%'}}>
          {componentError.message}
        </Alert>
      )}
      <Box>
        <Typography variant="h3" color="gray">Artists:</Typography>
        <Grid container spacing={1}>
          {renderArtists}
        </Grid>
        <Typography variant="h3" color="gray">Albums:</Typography>
        <Grid container direction="column" spacing={1}>
          {renderAlbums}
        </Grid>
        <Typography variant="h3" color="gray">Tracks:</Typography>
        <Grid container direction="column" spacing={1}>
          {renderTracks}
        </Grid>
      </Box>
    </Protected>
  );

  return (<>{isLoading? <Loader/> : render}</>);
};

export default AdminPage;