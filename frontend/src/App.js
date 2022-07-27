import React from 'react';
import axios from 'axios';

// allow cross origin requests for running locally
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      'name': 'Job Posting App v1',
    }
  }
}

export default App;
