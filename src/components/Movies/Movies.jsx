import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';

export default function Movies() {
  const { data } = useGetMoviesQuery();
  console.log(data);
  return (

    <div>Moviess</div>
  );
}
