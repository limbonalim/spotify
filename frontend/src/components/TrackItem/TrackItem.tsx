import React, { memo } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../containers/Users/usersSlice.ts';
import { createNewRecord } from '../../containers/TrackHistoryPage/tracksHistoryThunks.ts';
import { getCurrentTrack } from '../../containers/AlbumPage/tracksSlice.ts';
import {
  clearCurrent,
  getCurrent,
  selectCurrent, selectIsDeleteTrackLoading, selectIsPublicateTrackLoading
} from '../../containers/AdminPage/adminsSlice.ts';
import {
  deleteTrack,
  getAdminData,
  publicateTrack
} from '../../containers/AdminPage/adminsThunks.ts';
import type { ITrack } from '../../types';
import { getTracks } from '../../containers/AlbumPage/tracksThunks.ts';
import { selectCurrentAlbum } from '../../containers/ArtistPage/albumsSlice.ts';

type PropsMutation = Omit<ITrack, 'album'>

interface Props extends PropsMutation {
  isAdmin?: boolean;
}

const TrackItem: React.FC<Props> = memo(function TrackItem({_id, title, duration, numberInAlbum, url, isAdmin, isPublished}) {
  const dispatch = useAppDispatch();
  const currentId = useAppSelector(selectCurrent);
  const isPublicateLoading = useAppSelector(selectIsPublicateTrackLoading);
  const isDeleteLoading = useAppSelector(selectIsDeleteTrackLoading);
  const user = useAppSelector(selectUser);
  const album = useAppSelector(selectCurrentAlbum);
  let playButton;
  let buttons;

  const handlePublicete = async () => {
    dispatch(getCurrent(_id));
    await dispatch(publicateTrack(_id)).unwrap();
    dispatch(clearCurrent());
    await dispatch(getAdminData()).unwrap();
    if (album) {
      await dispatch(getTracks(album._id)).unwrap();
    }
  };

  const handleDelete = async () => {
    dispatch(getCurrent(_id));
    await dispatch(deleteTrack(_id)).unwrap();
    dispatch(clearCurrent());
    await dispatch(getAdminData()).unwrap();
    if (album) {
      await dispatch(getTracks(album._id)).unwrap();
    }
  };

  if (isAdmin) {
    buttons = (
      <Box sx={{display: 'flex', gap: 1}}>
        <Button disabled={currentId === _id ? isPublicateLoading : false} size="small" variant="contained"
                       onClick={handlePublicete}>Publicate</Button>
        <Button disabled={currentId === _id ? isDeleteLoading : false} size="small" variant="contained"
                       color="error" onClick={handleDelete}>Delete</Button>
      </Box>
    );
  }

  const onClick = async () => {
    if (user) {
      await dispatch(createNewRecord(_id)).unwrap();
      if (url) {
        dispatch(getCurrentTrack(url));
      }
    }
  };

  if (user) {
    playButton = (
      <Button onClick={onClick} variant="outlined" startIcon={<PlayCircleOutlineIcon/>}>
        Play
      </Button>
    );
  }

  return (
    <Grid item>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <Typography>{numberInAlbum}</Typography>
        {playButton}
        <Typography variant="h5">
          {title}
          {!isPublished && <Typography>Not published!</Typography> }
        </Typography>
        <Typography color="gray">{duration}</Typography>
        {buttons}
      </Box>
    </Grid>
  );
});

export default TrackItem;