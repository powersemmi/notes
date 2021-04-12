/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  AppBar, Container, Toolbar, makeStyles, Typography,
} from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';

import GetNotes from './Api';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  mainFeturesPost: {
    position: 'relative',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  mainFeturesPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
  },
}));

const AppHeader = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Container fixed>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>Shopping List</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const Main = () => {
  const classes = useStyles();
  return (
    <main className={classes.mainFeturesPost}>
      <div className={classes.mainContent}>
        <Container maxWidth="sm">
          <Typography variant="h2" align="center" color="textprimary" gutterBottom>Shopping List</Typography>
        </Container>
        <GetNotes />
      </div>
    </main>
  );
};
const App = () => (
  <>
    <AppHeader />
    <Main />
  </>
);

export default App;
