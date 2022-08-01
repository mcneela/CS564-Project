import React from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import JobResultsList from './components/JobResultsList.js';
import SearchBar from './components/SearchBar.js'
import SearchFilter from './components/SearchFilter.js';

// allow cross origin requests for running locally
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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

  changeCity = (event) => {
    let city = event.target.value;
    let jobs = this.state.jobs.filter(function(job) {
      return job.city === city;
    });
    this.setState({
      city: city,
      jobs: jobs,
    });
  }
  
  changeState = (event) => {
    let state = event.target.value;
    let jobs = this.state.jobs.filter(function(job) {
      return job.state === state;
    });
    this.setState({
      state: state,
      jobs: jobs,
    });
  }
  
  changeCountry = (event) => {
    let country = event.target.value;
    let jobs = this.state.jobs.filter(function(job) {
      return job.country === country;
    });
    this.setState({
      country: country,
      jobs: jobs,
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
            <SearchFilter changeCity={this.changeCity.bind(this)}
                          changeState={this.changeState.bind(this)}
                          changeCountry={this.changeCountry.bind(this)}
                          setLoading={this.setLoading.bind(this)}/>
            <JobResultsList data={this.state.jobs} />
          </div>
        );
    }
  }
}

export default App;
