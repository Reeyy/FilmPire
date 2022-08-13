import React, { useEffect, useState } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating, useMediaQuery } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams, userParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { useGetMovieQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

export default function MovieInformation() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isFecthing, error } = useGetMovieQuery(id);
  console.log(data);
  if (isFecthing) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something went wrong! - Go back to Home</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '30px' }}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
        <Grid item container direction="column" lg={7}>
          <Typography variant="h3" align="center" gutterBottom>
            {data?.title} ({data?.release_date.split('-')[0]})
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {data?.tagline}
          </Typography>
          <Grid item className={classes.containerSpaceAround}>
            <Box display="flex" align="center">
              <Rating readOnly value={data?.vote_average / 2} />
              <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '10px' }}>
                {data?.vote_average} / 10
              </Typography>
            </Box>
            <Typography gutterBottom variant="h6" align="center">{data?.runtime}min</Typography>
          </Grid>
          <Grid item className={classes.genresContainer}>
            {data?.genres?.map((genre, i) => (
              <Link className={classes.links} key={genre.name} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
                <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} width={30} />
                <Typography color="textPrimary" variant="subtitle1">{genre?.name}</Typography>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
