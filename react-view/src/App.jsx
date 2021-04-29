/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  AppBar, Container, Toolbar, Typography, Paper, Button, Grid, Fab, Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// import MenuIcon from '@material-ui/icons/Menu';

import * as api from './Api';

const AppHeader = () => (
  <AppBar>
    <Container>
      <Toolbar>
        <Typography variant="h6" flexgrow={1}>Shopping List</Typography>
      </Toolbar>
    </Container>
  </AppBar>
);

const Note = (id, title, description) => (
  <Paper>
    <Grid container>
      <Typography variant="h3" align="center" color="textprimary" gutterBottom>{id}</Typography>
    </Grid>
    <Grid container>
      <Typography variant="h3" align="center"
 color="textprimary" gutterBottom>{title}</Typography>
    </Grid>
    <Grid container>
      <Typography variant="p" align="center"
color="textprimary" gutterBottom>{description}</Typography>
    </Grid>
  </Paper>
);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      query: '',
    };
    this.onInputchange.bind(this);
  }

  onInputchange(event) {
    // eslint-disable-next-line no-console
    console.log('onInputchange');
    // eslint-disable-next-line no-console
    console.log(event);
    // eslint-disable-next-line no-console
    console.log(this.state);
    this.setState({
      [event.query]: event.query,
    });
    // eslint-disable-next-line no-console
    console.log('onInputchange');
    // eslint-disable-next-line no-console
    console.log(this.state);
  }
  addNote = (event) => {
    const items = fetch(`http://localhost:5000/notes/${this.state.query}`)
       .then((res) => res.json());
    this.setState({
       notes: [items.map((option) => (
      <Note id={option.id} title={option.title} description={option.description} />))],
    });
  }

  render() {
    return (
      <Box mt={10}>
        <Paper>
          <Container maxWidth="sm">
            <Typography variant="h2" align="center" gutterBottom>Note Editor</Typography>
          </Container>
          <Grid container justify="center" spacing={1} alignItems="center">
            <Grid item xs={12} lg={1}>
              <Box textAlign="center">
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Box>
            </Grid>
            <Grid item xs={12} lg={9}>
              <api.AllNotes name="query" type="text" values={this.state.query} onChange={this.onInputchange} />
            </Grid>
            <Grid item xs={12} lg={2}>
              <Button fullWidth variant="contained" style={{ height: 60 }} onClick={this.addNote}>Search</Button>
            </Grid>
          </Grid>
          {this.state.notes}
        </Paper>
      </Box>
    );
  }
}
const App = () => (
  <>
    <Container>
      <AppHeader />
      <Main />
    </Container>
  </>
);

export default App;
