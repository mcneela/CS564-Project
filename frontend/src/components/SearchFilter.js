import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [country, setCountry] = React.useState('');

  const changeCity = (event) => {
    setCity(event.target.value);
  };

  const changeState = (event) => {
    setState(event.target.value);
  };
  
  const changeCountry = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      Filter By:
      <Box sx={{ minWidth: 120 }}>
        <FormControl style={{width: 100}}>
          <InputLabel id="select-label1">City</InputLabel>
          <Select
            labelId="select-label1"
            id="select1"
            value={city}
            label="city"
            onChange={changeCity}
          >
            <MenuItem value={"San Francisco"}>San Francisco</MenuItem>
            <MenuItem value={"New York"}>New York</MenuItem>
            <MenuItem value={"New Orleans"}>New Orleans</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{width: 100}}>
          <InputLabel id="select-label2">State</InputLabel>
          <Select
            labelId="select-label2"
            id="select2"
            value={state}
            label="state"
            onChange={changeState}
          >
            <MenuItem value={"California"}>California</MenuItem>
            <MenuItem value={"New York"}>New York</MenuItem>
            <MenuItem value={"Louisiana"}>Louisiana</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{width: 100}}>
          <InputLabel id="select-label3">Country</InputLabel>
          <Select
            labelId="select-label3"
            id="select3"
            value={country}
            label="country"
            onChange={changeCountry}
          >
            <MenuItem value={"USA"}>USA</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}