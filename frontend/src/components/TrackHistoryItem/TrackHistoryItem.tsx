import React, { memo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import FormatDate from '../UI/FormatDate/FormatDate.ts';
import type { ITrackHistory } from '../../types';

type Props = Omit<ITrackHistory, '_id'>;

const memoTrackHistoryItem: React.FC<Props> = memo(function TrackHistoryItem({track, datetime}) {
  return (
    <Grid item>
      <Box sx={{display: 'flex', gap: 2, alignItems: 'center', borderBottom: '1px solid gray'}}>
        <Typography color="gray">{new FormatDate(datetime).getFormatDate()}</Typography>
        <Typography variant="h4">{track.album.artist.name}</Typography>-
        <Typography variant="h5">{track.title}</Typography>
      </Box>
    </Grid>
  );
});

export default memoTrackHistoryItem;