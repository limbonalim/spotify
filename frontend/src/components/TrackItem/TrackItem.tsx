import React, {memo} from 'react';
import {Grid, Typography} from '@mui/material';
import type {ITrack} from '../../types';

const TrackItem: React.FC<ITrack> = memo(function TrackItem ({_id,album, title, duration, numberInAlbum}) {
  return (
    <Grid item container>
      <Grid item container spacing={2}>
        <Grid item>
          <Typography>{numberInAlbum}</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography>{duration}</Typography>
      </Grid>
    </Grid>
  );
});

export default TrackItem;