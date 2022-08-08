import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { RadioGroup, Radio, FormControl, FormControlLabel, FormLabel, Grid } from '@mui/material';

class SearchFilter extends React.Component  {
  constructor(props) {
    super();
    this.setData = props.setData;
    this.state = {
      city: '',
      state: '',
      country: '',
      telecommute: 0,
      allCities: [],
      allStates: [],
      allCountries: [],
      allLocations: [],
      apiUrl: 'http://127.0.0.1:8000/api/v1/locations/',
    };

  }

  changeCity = (event) => {
    event.preventDefault();
    this.setState({
      city: event.target.value,
      state: '',
      country: '',
      telecommute: null,
    })
    axios.get('http://127.0.0.1:8000/api/v1/jobs/location/city/' + event.target.value)
      .then((response) => {
        this.setData(response.data);
      });
  };
  
  changeState = (event) => {
    event.preventDefault();
    this.setState({
      city: '',
      state: event.target.value, 
      country: '',
      telecommute: null,
    })
    axios.get('http://127.0.0.1:8000/api/v1/jobs/location/state/' + event.target.value)
      .then((response) => {
        this.setData(response.data);
      });
  };
  
  changeCountry = (event) => {
    event.preventDefault();
    this.setState({
      city: '',
      state: '', 
      country: event.target.value ,
      telecommute: null,
    })
    axios.get('http://127.0.0.1:8000/api/v1/jobs/location/country/' + event.target.value)
      .then((response) => {
        this.setData(response.data);
      });
  };

  changeTelecommute = (event) => {
    event.preventDefault();
    this.setState({
      telecommute: event.target.value,
      city: '',
      state: '', 
      country: '',
    });
    axios.get('http://127.0.0.1:8000/api/v1/jobs/telecommuting/' + event.target.value)
      .then((response) => {
        this.setData(response.data);
      });
  }

  componentDidMount() {
    axios.get(this.state.apiUrl)
      .then((response) => {
        this.setState({
          allLocations: response.data,
      });
      var allStates = response.data.filter((v,i,a)=>a.findIndex(v2=>(v.state === v2.state))===i).sort();
      this.setState({
        allStates: allStates
      });
      var allCities = response.data.filter((v,i,a)=>a.findIndex(v2=>(v.city === v2.city))===i).sort();
      this.setState({
        allCities: allCities
      });
      var allCountries = response.data.filter((v,i,a)=>a.findIndex(v2=>(v.country === v2.country))===i).sort();
      this.setState({
        allCountries: allCountries
      });
    });
  };

  render() {
    return (
      <div>
        Filter By:
        <Grid spacing={1} alignItems="center" justify="center" direction="row">
          <Box sx={{ minWidth: 120 }}>
            <FormControl style={{width: 100}}>
              <InputLabel id="select-label1">City</InputLabel>
              <Select
                labelId="select-label1"
                id="select1"
                value={this.state.city}
                label="city"
                onChange={this.changeCity}
              >
                {
                  this.state.allCities.map(loc => {
                    return <MenuItem value={loc.city}>{loc.city}</MenuItem>;
                  })
                }
              </Select>
            </FormControl>
            <FormControl style={{width: 100}}>
              <InputLabel id="select-label2">State</InputLabel>
              <Select
                labelId="select-label2"
                id="select2"
                value={this.state.state}
                label="state"
                onChange={this.changeState}
              >
                {
                  this.state.allStates.map(loc => {
                    return <MenuItem value={loc.state}>{loc.state}</MenuItem>;
                  })
                }
              </Select>
            </FormControl>
            <FormControl style={{width: 100}}>
              <InputLabel id="select-label3">Country</InputLabel>
              <Select
                labelId="select-label3"
                id="select3"
                value={this.state.country}
                label="country"
                onChange={this.changeCountry}
              >
                {
                  this.state.allCountries.map(loc => {
                    return <MenuItem value={loc.country}>{loc.country}</MenuItem>;
                  })
                }
              </Select>
            </FormControl>
            <FormControl style={{width:100}} onChange={this.changeTelecommute}>
              <FormLabel>Telecommuting</FormLabel>
              <RadioGroup>
              <FormControlLabel
                key="true"
                value={1}
                control={<Radio size="small" />}
                label="Yes"
                style={{
                  float: 'left',
                  clear: 'none',
                  margin: '2px 0 0 2px',
                }}
              />
              <FormControlLabel
                key="false"
                value={0}
                control={<Radio size="small" />}
                label="No"
                style={{
                  float: 'right',
                  clear: 'none',
                  margin: '2px 0 0 2px',
                }}
              />
              </RadioGroup> 
            </FormControl>
          </Box>
        </Grid>
      </div>
    );
  }
}

export default SearchFilter;