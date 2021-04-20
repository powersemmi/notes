/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  AppBar, Container, Toolbar, makeStyles, Typography, Paper, Button, Grid, Fab, Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// import MenuIcon from '@material-ui/icons/Menu';

import AllNotes from './Api';

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
  mainContent: {
    color: '#000000',
    display: 'block',
    marginTop: theme.spacing(20),
    padding: theme.spacing(1),
  },
  toolbar: theme.mixins.toolbar,
}));

const AppHeader = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.toolbar}>
      <Container>
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
    <Paper className={classes.mainContent}>
      <Container maxWidth="sm">
        <Typography variant="h2" align="center" color="textprimary" gutterBottom>Note Editor</Typography>
      </Container>
      <Grid container maxWidth="md" justify="center" spacing={1} alignItems="center">
        <Grid item xs={12} lg={1}>
          <Box textAlign="center">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Box>
        </Grid>
        <Grid item xs={12} lg={9}>
          <AllNotes />
        </Grid>
        <Grid item xs={12} lg={2}>
          <Button fullWidth="true" variant="contained" style={{ height: 60 }}>Search</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
const App = () => (
  <>
    <Container>
      <AppHeader maxWidth="lg" />
      <Main />
    </Container>
  </>
);

export default App;
