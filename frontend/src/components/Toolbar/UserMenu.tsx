import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { logout } from '../../containers/Users/usersSlice.ts';
import type { IUser } from '../../types';
import { useAppDispatch } from '../../app/hooks.ts';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" onClick={onClick}>
        Hello, {user.username}!
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose} keepMounted>
        <MenuItem onClick={() => dispatch(logout())}>LogOut</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;