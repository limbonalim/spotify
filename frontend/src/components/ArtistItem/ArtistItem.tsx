import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Grid, Link } from '@mui/material';
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
import type { IArtist } from '../../types';

interface Props extends IArtist {
  isAdmin?: boolean;
}

const memoArtistItem: React.FC<Props> = memo(function ArtistItem({_id, name, photo, isAdmin}) {
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
  };

  const handleDelete = async () => {
    dispatch(getCurrent(_id));
    await dispatch(deleteArtist(_id)).unwrap();
    dispatch(clearCurrent());
    await dispatch(getAdminData()).unwrap();
  };

  if (isAdmin) {
    buttons = (
      <CardActions>
        <Button disabled={currentId === _id? isPublicateLoading : false} size="small" variant="contained" onClick={handlePublicete}>Publicate</Button>
        <Button disabled={currentId === _id? isDeleteLoading : false} size="small" variant="contained" color="error" onClick={handleDelete}>Delete</Button>
      </CardActions>
    );
  }

  return (
    <Grid item>
      <Link to={path} component={isAdmin? 'div' : RouterLink} sx={{textDecoration: 'none'}}>
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
                {isAdmin && <Typography>Not published!</Typography> }
              </Typography>
            </CardContent>
            {buttons}
        </Card>
      </Link>
    </Grid>
  );
});



export default memoArtistItem;