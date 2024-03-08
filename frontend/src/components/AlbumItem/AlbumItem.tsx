import React, { memo } from 'react';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { BASE_URL } from '../../constants.ts';
import noImage from '../../assets/NoImage.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCurrentArtist } from '../../containers/Home/artistsSlice.ts';
import {
  clearCurrent,
  getCurrent,
  selectCurrent, selectIsDeleteAlbumLoading, selectIsPublicateAlbumLoading
} from '../../containers/AdminPage/adminsSlice.ts';
import {
  deleteAlbum,
  getAdminData,
  publicateAlbum,
} from '../../containers/AdminPage/adminsThunks.ts';
import {getAlbums} from "../../containers/ArtistPage/albumsThunks.ts";
import type { IAlbum } from '../../types';

interface Props extends IAlbum {
  isAdmin?: boolean;
}

const AlbumItem: React.FC<Props> = memo(function AlbumItem({_id, year, title, image, isAdmin, isPublished}) {
  const dispatch = useAppDispatch();
  const currentId = useAppSelector(selectCurrent);
  const isPublicateLoading = useAppSelector(selectIsPublicateAlbumLoading);
  const isDeleteLoading = useAppSelector(selectIsDeleteAlbumLoading);
  const artist = useAppSelector(selectCurrentArtist);
  const path = artist ? `/tracks/${artist._id}/${_id}` : '/';
  let buttons;

  const handlePublicete = async () => {
    dispatch(getCurrent(_id));
    await dispatch(publicateAlbum(_id)).unwrap();
    dispatch(clearCurrent());
    await dispatch(getAdminData()).unwrap();
    if (artist) {
      await dispatch(getAlbums(artist._id));
    }
  };

  const handleDelete = async () => {
    dispatch(getCurrent(_id));
    await dispatch(deleteAlbum(_id)).unwrap();
    dispatch(clearCurrent());
    await dispatch(getAdminData()).unwrap();
    if (artist) {
      await dispatch(getAlbums(artist._id));
    }
  };

  if (isAdmin) {
    buttons = (
      <Box sx={{display: 'flex', gap: 1, marginY: 2}}>
        <Button disabled={currentId === _id ? isPublicateLoading : false} size="small" variant="contained"
                       onClick={handlePublicete}>Publicate</Button>
        <Button disabled={currentId === _id ? isDeleteLoading : false} size="small" variant="contained"
                       color="error" onClick={handleDelete}>Delete</Button>
      </Box>
    );
  }

  return (
    <Grid item>
      <Link to={path} component={RouterLink} sx={{textDecoration: 'none', color: 'inherit'}}>
        <Grid item container>
          <Grid item container spacing={2}>
            <Grid item>
              <img
                style={{maxWidth: 200, borderRadius: 5}}
                src={image ? BASE_URL + '/' + image : noImage}
                alt={title}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">{title}</Typography>
              {!isPublished && <Typography>Not published!</Typography> }
            </Grid>
          </Grid>
          <Grid item>
            <Typography>{year}</Typography>
          </Grid>
        </Grid>
      </Link>
      {buttons}
    </Grid>
  );
});

export default AlbumItem;