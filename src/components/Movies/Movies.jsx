import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

export default function Movies() {
  const { data, error, isFetching } = useGetMoviesQuery();
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="cener">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please searh for something else.
        </Typography>
      </Box>
    );
  }
  if (error) return 'an error occured';
  return (

    <div>
      <MovieList movies={data} />
    </div>
  );
}
