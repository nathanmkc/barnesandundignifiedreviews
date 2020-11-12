import React from 'react';
import axios from 'axios';
import Form from './components/Form.jsx';


class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          allReviews: []
      }
  }

  render() {
      return (
          <div>
              <Form />
          </div>
      )
  }
};

export default App;