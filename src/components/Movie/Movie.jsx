import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

export default function Movie({ movie, i }) {
  console.log(movie, i);
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'}
            alt={movie.title}
            className={classes.image}
          />

          <Typography className={classes.title} varriant="h5">
            {movie.title}
          </Typography>
          <Tooltip disableFocusListener title={`${movie.vote_average} / 10 `}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
              <div>
                <h1><span className="text-red-400">Voted</span> by {movie.vote_count} 🤩 </h1>
              </div>
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}
