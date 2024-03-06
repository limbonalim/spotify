import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Protected from '../../components/UI/Protected/Protected.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getArtists } from '../Home/artistsThunks.ts';
import { selectArtists } from '../Home/artistsSlice.ts';
import { getAlbums } from '../ArtistPage/albumsThunks.ts';
import { selectAlbums } from '../ArtistPage/albumsSlice.ts';
import { createTrack } from './tracksThunks.ts';
import { useNavigate } from 'react-router-dom';
import { selectCreateError, selectIsCreateLoading } from './tracksSlice.ts';

export interface ITrackFormState {
  title: string,
  album: string,
  url: string,
  duration: string
}

const AlbumForm = () => {
  const [state, setState] = useState({
    title: '',
    album: '',
    url: '',
    duration: ''
  });
  const [artist, setArtist] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsCreateLoading);
  const error = useAppSelector(selectCreateError);
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);

  const getSelectData = useCallback(async () => {
    await dispatch(getArtists()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    void getSelectData();
  }, [getSelectData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prev => ({...prev, [name]: value}));
  };

  const selectArtist = async (e: SelectChangeEvent) => {
    const {value} = e.target;
    await dispatch(getAlbums(value)).unwrap();
    setArtist(value);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const {value} = e.target;
    setState(prev => ({...prev, album: value}));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(state);
    await dispatch(createTrack(state)).unwrap();
    navigate('/');
  };

  const artistItems = artists.map((item) => (
    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
  ));

  const albumItems = albums.map((item) => (
    <MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
  ));

  return (
    <Protected>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h3" mb={2} color="gray">Create Track</Typography>
        {error && (
          <Alert severity="error" sx={{mb: 3}}>
            {error.message}
          </Alert>
        )}
        <Grid container item direction="column" spacing={3} xs={12} sm={10} md={6} mb={2}>
          <Grid item>
            <TextField
              label="Track Title"
              name="title"
              onChange={handleChange}
              value={state.title}
              required
              sx={{width: '100%'}}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Official Link"
              name="url"
              type="url"
              onChange={handleChange}
              value={state.url}
              sx={{width: '100%'}}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="select">Artist</InputLabel>
              <Select
                required
                labelId="select"
                id="select"
                label="Artist"
                name="artist"
                defaultValue=""
                onChange={selectArtist}
                value={artist}
              >
                {artistItems}
              </Select>
            </FormControl>
          </Grid>
          {artist && (<Grid item>
            <FormControl fullWidth>
              <InputLabel id="select">Album</InputLabel>
              <Select
                required
                labelId="select"
                id="select"
                label="Artist"
                name="artist"
                defaultValue=""
                onChange={handleSelectChange}
              >
                {albumItems}
              </Select>
            </FormControl>
          </Grid>)}
          <Grid item>
            <TextField
              required
              label="Duration"
              name="duration"
              onChange={handleChange}
              value={state.duration}
            />
          </Grid>
        </Grid>
        <LoadingButton loading={isLoading} loadingPosition="start" type="submit" startIcon={<SaveIcon/>}>
          Create
        </LoadingButton>
      </Box>
    </Protected>
  );
};

export default AlbumForm;