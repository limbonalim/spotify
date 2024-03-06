import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Typography, Box, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import FileInput from '../../components/UI/FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCreateError, selectIsCreateLoading } from './artistsSlice.ts';
import { createArtist } from './artistsThunks.ts';
import type { IArtistFormState } from '../../types';
import Protected from '../../components/UI/Protected/Protected.tsx';

const ArtistForm = () => {
  const [state, setState] = useState<IArtistFormState>({
    name: '',
    info: '',
    photo: null
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectIsCreateLoading);
  const error = useAppSelector(selectCreateError);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prev => ({...prev, [name]: value}));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      photo: e.target.files ? e.target.files[0] : null
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(createArtist(state)).unwrap();
    navigate('/');

  };

  return (
    <Protected>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h3" mb={2} color="gray">Create Artist</Typography>
        {error && (
          <Alert severity="error" sx={{mb: 3}}>
            {error.message}
          </Alert>
        )}
        <Grid container item direction="column" spacing={3} xs={12} sm={10} md={6} mb={2}>
          <Grid item>
            <TextField
              label="Artist Name"
              name="name"
              onChange={handleChange}
              value={state.name}
              required
              sx={{width: '100%'}}
            />
          </Grid>
          <Grid item>
            <TextField
              label="About Artist"
              name="info"
              onChange={handleChange}
              value={state.info}
              multiline
              rows={4}
              sx={{width: '100%'}}
            />
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

export default ArtistForm;