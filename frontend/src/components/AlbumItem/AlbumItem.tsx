import React, { memo } from 'react';
import { Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {BASE_URL} from '../../constants.ts';
import noImage from '../../assets/NoImage.png';
import {useAppSelector} from '../../app/hooks.ts';
import {selectCurrentArtist} from '../../containers/Home/artistsSlice.ts';
import type {IAlbum} from '../../types';


const AlbumItem: React.FC<IAlbum> = memo(function AlbumItem ({_id, year, title, image}) {
  const artist = useAppSelector(selectCurrentArtist);

  const path = artist?  `/tracks/${artist._id}/${_id}` : '/';

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
              <Typography variant='h5'>{title}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography>{year}</Typography>
          </Grid>
        </Grid>
      </Link>
    </Grid>
  );
});

export default AlbumItem;