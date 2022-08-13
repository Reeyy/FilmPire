import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { userSelector } from '../../features/auth';

export default function Profile() {
  // const { user } = useSelector((state) => state.user);
  //* tidak perlu pake cara atas karena di  bawah sudah di  lakukan di use selector
  const { user } = useSelector(userSelector);
  const { username } = user;
  console.log(user);
  const favoriteMovies = [];
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
        { }
      </Box>
      {!favoriteMovies.length
        ? <Typography variant="h5">Add favorites or watchlist some movies to see here!</Typography>
        : (
          <Box>
            <Typography variant="h5">Your fav</Typography>
          </Box>
        )}
    </Box>
  );
}
