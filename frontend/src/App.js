import React from 'react';
import axios from 'axios';
import JobResultsList from './components/JobResultsList.js';

// allow cross origin requests for running locally
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      'name': 'Job Posting App v1',
      'apiUrl': 'http://127.0.0.1:8000/api/v1/'
    }
  }
  
  render() {
    return (
      <div className="jobApp">
        <JobResultsList></JobResultsList>
      </div>
    );
  }
}

export default App;
