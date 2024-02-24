import { useCallback, useEffect } from 'react';
import { Alert, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getTrackHistory } from './tracksHistoryThunks.ts';
import { selectUser } from '../Users/usersSlice.ts';
import { selectGetErrorMessage, selectIsLoading, selectTrackHistory } from './tracksHistorySlice.ts';
import TrackHistoryItem from '../../components/TrackHistoryItem/TrackHistoryItem.tsx';
import Loader from '../../components/UI/Loader/Loader.tsx';

const TrackHistoryPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const trackHistory = useAppSelector(selectTrackHistory);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectGetErrorMessage);
  const navigate = useNavigate();

  const getRender = useCallback(async () => {
    if (user) {
      await dispatch(getTrackHistory(user.token)).unwrap();
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    void getRender();
  }, [getRender]);

  const render = trackHistory.map(({_id, track, datetime}) => (
    <TrackHistoryItem key={_id} _id={_id} track={track} datetime={datetime}/>
  ));

  return (
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
  );
};

export default TrackHistoryPage;