import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Grid, Link } from '@mui/material';
import noImage from '../../assets/NoImage.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { deleteArtist, getAdminData, publicateArtist } from '../../containers/AdminPage/adminsThunks.ts';
import {
  clearCurrent,
  getCurrent, selectCurrent,
  selectIsDeleteArtistLoading,
  selectIsPublicateArtistLoading
} from '../../containers/AdminPage/adminsSlice.ts';
import { BASE_URL } from '../../constants.ts';
import {getArtists} from "../../containers/Home/artistsThunks.ts";
import type { IArtist } from '../../types';
import Box from "@mui/material/Box";

interface Props extends IArtist {
  isAdmin?: boolean;
}

const memoArtistItem: React.FC<Props> = memo(function ArtistItem({_id, name, photo, isAdmin, isPublished}) {
  const dispatch = useAppDispatch();
  const isPublicateLoading = useAppSelector(selectIsPublicateArtistLoading);
  const isDeleteLoading = useAppSelector(selectIsDeleteArtistLoading);
  const currentId = useAppSelector(selectCurrent);
  const path = `/albums/${_id}`;
  const image = photo ? BASE_URL + '/' + photo : noImage;
  let buttons;

  const handlePublicete = async () => {
    dispatch(getCurrent(_id));
    await dispatch(publicateArtist(_id)).unwrap();
    dispatch(clearCurrent());
    await dispatch(getAdminData()).unwrap();
    await dispatch(getArtists()).unwrap();
  };

  const handleDelete = async () => {
    dispatch(getCurrent(_id));
    await dispatch(deleteArtist(_id)).unwrap();
    dispatch(clearCurrent());
    await dispatch(getAdminData()).unwrap();
    await dispatch(getArtists()).unwrap();
  };

  if (isAdmin) {
    buttons = (
      <Box sx={{display: 'flex', gap: 2, mt: 1}}>
        <Button disabled={currentId === _id? isPublicateLoading : false} size="small" variant="contained" onClick={handlePublicete}>Publicate</Button>
        <Button disabled={currentId === _id? isDeleteLoading : false} size="small" variant="contained" color="error" onClick={handleDelete}>Delete</Button>
      </Box>
    );
  }

  return (
    <Grid item>
      <Link to={path} component={RouterLink} sx={{textDecoration: 'none'}}>
        <Card sx={{maxWidth: 345}}>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
                {!isPublished && <Typography>Not published!</Typography> }
              </Typography>
            </CardContent>
        </Card>
      </Link>
      {buttons}
    </Grid>
  );
});



export default memoArtistItem;