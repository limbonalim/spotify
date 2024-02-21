import {Grid, Typography} from '@mui/material';
import {IAlbum} from "../../types";
import {BASE_URL} from "../../constants.ts";
import noImage from "../../assets/NoImage.png";


const AlbumItem: React.FC<IAlbum> = ({ year, title, image}) => {
  return (
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
  );
};

export default AlbumItem;