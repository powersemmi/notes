import React from 'react';
import {
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

class AllNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/notes')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return (
        // eslint-disable-next-line react/jsx-filename-extension
        <div>
          Error:
          {error.message}
          {' '}
          {items}
        </div>
      );
    } if (!isLoaded) {
      return (<div>Loading...</div>);
    }

    return (
      <div className="GetNotes">
        <div className="shopping-list">
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={items.map((option) => option.note)}
            renderInput={(params) => (
              <TextField
        // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Select note"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default AllNotes;
