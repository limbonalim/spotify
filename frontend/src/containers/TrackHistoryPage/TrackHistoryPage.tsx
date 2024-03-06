import { useCallback, useEffect } from 'react';
import { Alert, Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getTrackHistory } from './tracksHistoryThunks.ts';
import { selectUser } from '../Users/usersSlice.ts';
import { selectGetErrorMessage, selectIsLoading, selectTrackHistory } from './tracksHistorySlice.ts';
import TrackHistoryItem from '../../components/TrackHistoryItem/TrackHistoryItem.tsx';
import Loader from '../../components/UI/Loader/Loader.tsx';
import Protected from '../../components/UI/Protected/Protected.tsx';

const TrackHistoryPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const trackHistory = useAppSelector(selectTrackHistory);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectGetErrorMessage);

  const getRender = useCallback(async () => {
    if (user) {
      await dispatch(getTrackHistory()).unwrap();
    }
  }, [user]);

  useEffect(() => {
    void getRender();
  }, [getRender]);

  const render = trackHistory.map(({_id, track, datetime}) => (
    <TrackHistoryItem key={_id} track={track} datetime={datetime}/>
  ));

  return (
    <Protected>
      <Box>
        {error && (
          <Alert severity="error" sx={{mt: 3, width: '100%'}}>
            {error.message}
          </Alert>
        )}
        <Grid container direction="column" spacing={1}>
          {isLoading? <Loader/> : render}
        </Grid>
      </Box>
    </Protected>
  );
};

export default TrackHistoryPage;