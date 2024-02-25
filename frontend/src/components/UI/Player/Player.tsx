import React from 'react';
import ReactPlayer from 'react-player';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useAppDispatch } from '../../../app/hooks.ts';
import { clearCurrentTrack } from "../../../containers/AlbumPage/tracksSlice.ts";

interface Props {
  url: string;
}

const Player: React.FC<Props> = ({url}) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(clearCurrentTrack());
  };

  return (
    <Box sx={{position: 'absolute', bottom: 0, right: 0}}>
      <IconButton aria-label="close" onClick={onClick}>
        <CloseIcon />
      </IconButton>
      <ReactPlayer url={url}/>
    </Box>
  );
};

export default Player;