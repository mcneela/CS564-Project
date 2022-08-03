import React from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import {withRouter} from './withRouter.js';


const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 800,
    },
  },
  container: {
    width: '500px',
    align: 'left',
    marginLeft: 20,
    padding: 20,
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    width: '90%',
    marginLeft: 200,
    marginRight: 'auto',            
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500
  },
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keywords: '',
      results: [],
      n: 10000,
      loading: false,
      apiUrl: 'http://localhost:8000/api/v1/search/jobs/'
    }
    this.setData = props.setData;
    this.setLoading = props.setLoading;
    this.directTo =this.directTo.bind(this);
  }

  directTo() {
    this.props.navigate('/upload');
  }
  
  search = (event) => {
    event.preventDefault();
    this.setLoading(true);
    axios.get(this.state.apiUrl, { 
      params: {
        keywords: this.state.keywords, 
      }
    }).then((response) => {
      this.setState({
        loading: false,
        results: response.data
      });
      this.setData(response.data);
      this.setLoading(false);
    });
  }

  handleSetN = (event) => {
    this.setState({ n: event.target.value });
  }

  handleSetKeywords = (event) => {
    this.setState({ keywords: event.target.value });
  }

  render() {
    const classes = this.props;

    return (
        <div className="container">
          <div className="search">
            <form className="searchField" noValidate autoComplete="off" onSubmit={this.search}>
              <input className={classes.textField} onChange={this.handleSetKeywords} id="searchField"
                         label="Search for a job."
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div style={{float: 'right', marginRight: '10px'}}>
            <Button onClick={this.directTo} variant="contained">Upload Job</Button>
          </div>
        </div>
    );
  }
}
 
export default withRouter(SearchBar);
