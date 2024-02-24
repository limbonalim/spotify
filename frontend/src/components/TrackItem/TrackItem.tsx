import React, { memo } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../containers/Users/usersSlice.ts';
import type { ITrack } from '../../types';
import { createNewRecord } from '../../containers/TrackHistoryPage/tracksHistoryThunks.ts';

const TrackItem: React.FC<ITrack> = memo(function TrackItem({_id, album, title, duration, numberInAlbum}) {
  const user = useAppSelector(selectUser);
  const dipatch = useAppDispatch();
  let play;

  const onClick = () => {
    if (user) {
      dipatch(createNewRecord({token: user.token, track: _id}));
    }
  };

  if (user) {
    play = (
      <Button onClick={onClick} variant="outlined" startIcon={<PlayCircleOutlineIcon/>}>
      Play
    </Button>
    );
  }

  return (
    <Grid item>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <Typography>{numberInAlbum}</Typography>
        {play}
        <Typography variant="h5">
          {title}
        </Typography>
        <Typography color="gray">{duration}</Typography>
      </Box>
    </Grid>
  );
});

export default TrackItem;