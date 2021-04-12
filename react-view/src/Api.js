/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Button } from '@material-ui/core';

const Search = () => (
  <Button color="primary">
    Are you didn use your code.
  </Button>
);

class GetNotes extends React.Component {
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
        <div>
          Ошибка:
          {error.message}
          {' '}
          {items}
        </div>
      );
    } if (!isLoaded) {
      return (<div>Загрузка...</div>);
    }

    const listItems = items.map((item) => <li key={item.id}>{item.note}</li>);

    return (
      <div className="GetNotes">
        <div className="shopping-list">
          <ul>
            {listItems}
          </ul>
          {Search()}
        </div>
      </div>
    );
  }
}

export default GetNotes;
