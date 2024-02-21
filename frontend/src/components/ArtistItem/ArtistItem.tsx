import React, {memo} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Link } from '@mui/material';
import {BASE_URL} from '../../constants.ts';
import noImage from '../../assets/NoImage.png';

const memoArtistItem: React.FC<IArtist> = memo(function ArtistItem ({_id, name, photo}) {
  const path = `/albums/${_id}`;
  const image = photo ? BASE_URL + '/' + photo : noImage;

  return (
    <Grid item>
      <Link to={path} component={RouterLink} sx={{textDecoration: 'none'}}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
);
});

import type {IArtist} from '../../types';

export default memoArtistItem;