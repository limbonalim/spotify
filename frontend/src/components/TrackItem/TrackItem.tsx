import React, { memo } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../containers/Users/usersSlice.ts';
import { createNewRecord } from '../../containers/TrackHistoryPage/tracksHistoryThunks.ts';
import { getCurrentTrack } from "../../containers/AlbumPage/tracksSlice.ts";
import type { ITrack } from '../../types';

type Props = Omit<ITrack, 'album'>

const TrackItem: React.FC<Props> = memo(function TrackItem({_id, title, duration, numberInAlbum, url}) {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  let playButton;

  const onClick = async () => {
    if (user) {
      await dispatch(createNewRecord({token: user.token, track: _id})).unwrap();
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
        </Typography>
        <Typography color="gray">{duration}</Typography>
      </Box>
    </Grid>
  );
});

export default TrackItem;