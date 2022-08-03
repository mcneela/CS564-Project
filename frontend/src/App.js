import React from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import JobResultsList from './components/JobResultsList.js';
import SearchBar from './components/SearchBar.js'
import SearchFilter from './components/SearchFilter.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Job Posting App v1',
      loading: true,
      city: '',
      state: '',
      country: '',
      apiUrl: 'http://127.0.0.1:8000/api/v1/',
      jobs: []
    }
  }

  componentDidMount() {
    axios.get(this.state.apiUrl + 'jobs/')
      .then((response) => {
      this.setState({
        jobs: response.data,
        loading: false
      });
    });
  }

  setLoading = (boolVal) => {
    this.setState({
      loading: boolVal,
    })
  }

  setData = (results) => {
    this.setState({
      jobs: results
    });
  }
  
  render() {
    if (this.state.loading) {
      return (<div className="jobApp"><CircularProgress /></div>);
    } else {
        return (
          <div className="jobApp">
            <SearchBar setLoading={this.setLoading.bind(this)} 
                       setData={this.setData.bind(this)}
            />
            <SearchFilter setData={this.setData.bind(this)}
                          setLoading={this.setLoading.bind(this)}/>
            <JobResultsList data={this.state.jobs} />
          </div>
        );
    }
  }
}

export default App;
