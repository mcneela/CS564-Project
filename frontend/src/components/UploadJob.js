import * as React from 'react';
import axios from 'axios';

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';

class UploadJob extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: '',

    }
  }

  render() {
    return (
      <div>
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid item>
              <Typography style={{ margin: 'auto' }} variant="h2" component="div" gutterBottom>
                Upload a Job
              </Typography>
            </Grid>
        </Grid>
        <form >
          <Grid container spacing={1} alignItems="center" justify="center" direction="column">
            <Grid item>
              <TextField
                id="job-title-input"
                name="jobTitle"
                label="Job Title"
                type="text"
              />
              <TextField
                id="job-function-input"
                name="jobFunction"
                label="Job Function"
                type="text"
              />
              <TextField
                id="job-department-input"
                name="jobDepartment"
                label="Department"
                type="text"
              />
            </Grid>
            <Grid item>
              <TextField
                id="profile-input"
                name="companyProfile"
                label="Company Profile"
                type="text"
                multiline={true}
                minRows={5}
              />
            </Grid>
            <Grid item>
              <TextField
                id="job-description-input"
                name="jobDescription"
                label="Job Description"
                type="text"
                multiline={true}
                minRows={5}
              />
              <TextField
                id="job-benefits-input"
                name="jobBenefits"
                label="Benefits"
                type="text"
                multiline={true}
                minRows={5}
              />
              <TextField
                id="experience-input"
                name="jobExperience"
                label="Required Experience"
                type="text"
                multiline={true}
                minRows={5}
              />
            </Grid>
            <Grid item>
              <TextField
                id="city-input"
                name="city"
                label="City"
                type="text"
              />
              <TextField
                id="state-input"
                name="state"
                label="State"
                type="text"
              />
              <TextField
                id="country-input"
                name="country"
                label="Country"
                type="text"
              />
            </Grid>
            <Grid item>
              <TextField
                id="industry-input"
                name="industry"
                label="Industry"
                type="text"
              />
              <FormControl>
                <FormLabel>Required Education</FormLabel>
                <Select
                  name="Required Education"
                  // value={formValues.os}
                  // onChange={handleInputChange}
                >
                  <MenuItem key="High School" value="highSchool">
                    High School
                  </MenuItem>
                  <MenuItem key="Bachelors" value="bachelors">
                    Bachelor's 
                  </MenuItem>
                  <MenuItem key="Masters" value="masters">
                    Master's
                  </MenuItem>
                  <MenuItem key="PhD" value="phd">
                    PhD
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel>Telecommuting Allowed?</FormLabel>
                <RadioGroup
                  name="telecommuting"
                  // value={formValues.gender}
                  // onChange={handleInputChange}
                  row
                >
                    <FormControlLabel
                      key="true"
                      value="true"
                      control={<Radio size="small" />}
                      label="Yes"
                    />
                    <FormControlLabel
                      key="false"
                      value="false"
                      control={<Radio size="small" />}
                      label="No"
                    />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Job Type</FormLabel>
                  <RadioGroup
                    name="type"
                    // value={formValues.gender}
                    // onChange={handleInputChange}
                    row
                  >
                    <FormControlLabel
                      key="internship"
                      value="internship"
                      control={<Radio size="small" />}
                      label="Internship"
                    />
                    <FormControlLabel
                      key="part-time"
                      value="partTime"
                      control={<Radio size="small" />}
                      label="Part-Time"
                    />
                    <FormControlLabel
                      key="full-time"
                      value="fullTime"
                      control={<Radio size="small" />}
                      label="Full-Time"
                    />
                  </RadioGroup>
              </FormControl>
            </Grid>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </form>
      </div>
    );
  }
}

export default UploadJob;
