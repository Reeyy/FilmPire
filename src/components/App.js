import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Actors from './Actors/Actors';
import MovieInformation from './MovieInformation/MovieInformation';
import Movies from './Movies/Movies';
import Navbar from './Navbar/Navbar';
import Profile from './Profile/Profile';

import useStyles from './styles';

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
        </Routes>
      </main>
    </div>

  );
}
