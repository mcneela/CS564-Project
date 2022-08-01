import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

class SearchFilter extends React.Component  {
  constructor(props) {
    super();
    this.changeCity = props.changeCity;
    this.changeState = props.changeState;
    this.changeCountry = props.changeCountry;
    this.state = {
      city: '',
      state: '',
      country: '',
      allLocations: [],
      apiUrl: 'http://127.0.0.1:8000/api/v1/locations/',
    };

  }

  // changeCity = (event) => {
  //   this.setState({
  //     city: event.target.value
  //   });
  // };

  // changeState = (event) => {
  //   this.setState({
  //     state: event.target.value
  //   });
  // };
  
  // changeCountry = (event) => {
  //   this.setState({
  //     country: event.target.value
  //   });
  // };

  componentDidMount() {
      axios.get(this.state.apiUrl)
      .then((response) => {
        this.setState({
          allLocations: response.data,
      });
    });
  };

  render() {
    return (
      <div>
        Filter By:
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
              {/* {
                this.state.allLocations.sort(function(a, b) {
                  if (a !== null || b !== null) {
                    var textA = a.city.toLowerCase();
                    var textB = b.city.toLowerCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                  }
                })
              } */}
              {
                this.state.allLocations.map(loc => {
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
                this.state.allLocations.map(loc => {
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
                this.state.allLocations.map(loc => {
                  return <MenuItem value={loc.country}>{loc.country}</MenuItem>;
                })
              }
            </Select>
          </FormControl>
        </Box>
      </div>
    );
  }
}

export default SearchFilter;