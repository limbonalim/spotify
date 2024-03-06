import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import FileInput from '../../components/UI/FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectArtists } from '../Home/artistsSlice.ts';
import { getArtists } from '../Home/artistsThunks.ts';
import { createAlbum } from './albumsThunks.ts';
import { selectCreateError, selectIsCreateLoading } from './albumsSlice.ts';
import type { IAlbumFormState } from '../../types';

const AlbumForm = () => {
  const [state, setState] = useState<IAlbumFormState>({
    title: '',
    year: '',
    artist: '',
    image: null
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsCreateLoading);
  const error = useAppSelector(selectCreateError);
  const artists = useAppSelector(selectArtists);

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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      image: e.target.files ? e.target.files[0] : null
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const {value} = e.target;
    setState(prev => ({...prev, artist: value}));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(createAlbum(state)).unwrap();
    navigate('/');
  };

  const selectItems = artists.map((item) => (
    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
  ));

  return (
    <Protected>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h3" mb={2} color="gray">Create Album</Typography>
        {error && (
          <Alert severity="error" sx={{mb: 3}}>
            {error.message}
          </Alert>
        )}
        <Grid container item direction="column" spacing={3} xs={12} sm={10} md={6} mb={2}>
          <Grid item>
            <TextField
              label="Album Title"
              name="title"
              onChange={handleChange}
              value={state.title}
              required
              sx={{width: '100%'}}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Album year"
              name="year"
              type="number"
              onChange={handleChange}
              value={state.year}
              required
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
                onChange={handleSelectChange}
                value={state.artist}
              >
                {selectItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FileInput
              onChange={handleImageChange}
              label="Image"
              name="image"
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