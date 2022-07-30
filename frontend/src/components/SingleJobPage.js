import * as React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class SingleJobPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      'isLoading': true,
      'jobID': props.params.jobID,
      'jobData': null,
      'apiUrl': 'http://127.0.0.1:8000/api/v1/jobs/',
    }
  }

  componentDidMount() {
    axios.get(this.state.apiUrl + this.state.jobID)
      .then((response) => {
      this.setState({
        jobData: response.data,
        isLoading: false
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div></div>
    }
    let job = this.state.jobData;
    var location = '';
    if (job.located_in.city != null && job.located_in.city != '') {
      location += job.located_in.city + ', ';
    }
    if (job.located_in.state != null && job.located_in.state != '') {
      location += job.located_in.state + ', ';
    }
    if (job.located_in.country!= null && job.located_in.country != '') {
      location += job.located_in.country;
    }
    return (
      <div>
        <h1>{job.title}</h1>
        <h2>{`Location: ${location}`}</h2>
        <p><b>Company: </b>{job.posted_by.profile}</p>
        <p><b>Description: </b>{job.description}</p>
        <p><b>Benefits: </b>{job.benefits}</p>
      </div>
    );
  }
}

export default withParams(SingleJobPage);