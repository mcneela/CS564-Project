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
      apiUrl: 'http://127.0.0.1:8000/api/v1/create/job/',
      title: '',
      function: '',
      department: '',
      profile: '',
      description: '',
      reqDescription: '',
      benefits: '',
      experience: '',
      city: '',
      state: '',
      country: '',
      industry: '',
      education: '',
      telecommuting: '',
      jobType: '',
    };
  }

  changeTitle = (event) => {
    event.preventDefault();
    this.setState({
      title: event.target.value
    });
  }

  changeFunction = (event) => {
    event.preventDefault();
    this.setState({
      function: event.target.value
    });
  }
  
  changeDepartment = (event) => {
    event.preventDefault();
    this.setState({
      department: event.target.value
    });
  }
  
  changeProfile = (event) => {
    event.preventDefault();
    this.setState({
      profile: event.target.value
    });
  }

  changeDescription = (event) => {
    event.preventDefault();
    this.setState({
      description: event.target.value
    });
  }
  
  changeBenefits = (event) => {
    event.preventDefault();
    this.setState({
      benefits: event.target.value
    });
  }
  
  changeExperience = (event) => {
    event.preventDefault();
    this.setState({
      experience: event.target.value
    });
  }

  changeCity = (event) => {
    event.preventDefault();
    this.setState({
      city: event.target.value
    });
  }
  
  changeState = (event) => {
    event.preventDefault();
    this.setState({
      state: event.target.value
    });
  }
  
  changeCountry = (event) => {
    event.preventDefault();
    this.setState({
      country: event.target.value
    });
  }

  changeIndustry = (event) => {
    event.preventDefault();
    this.setState({
      industry: event.target.value
    });
  }

  changeEducation = (event) => {
    event.preventDefault();
    this.setState({
      education: event.target.value
    });
  }
  
  changeTelecommuting = (event) => {
    event.preventDefault();
    this.setState({
      telecommuting: event.target.value
    });
  }
  
  changeJobType = (event) => {
    event.preventDefault();
    this.setState({
      jobType: event.target.value
    });
  }

  submitJob = (event) => {
    event.preventDefault();
    axios.post(this.state.apiUrl, {
      job: {
        title: this.state.title,
        description: this.state.description,
        function: this.state.function,
        salary_min: null,
        salary_max: null,
        department: this.state.department,
        telecommuting: this.state.telecommuting,
        fraudulent: 0,
        has_question: 0, 
      },
      reqs: {
        description: this.state.reqDescription,
        education: this.state.education,
        experience: this.state.experience,
        employment_type: this.state.jobType,
      },
      location: {
        city: this.state.city,
        state: this.state.state,
        country: this.state.country
      },
      company: {
        profile: this.state.profile,
        has_logo: 0, 
      },
      industry: {
        name: this.state.industry
      }
    })
      .then((response) => {
        console.log(response.status);
    });
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
                value={this.state.title}
                onChange={this.changeTitle}
              />
              <TextField
                id="job-function-input"
                name="jobFunction"
                label="Job Function"
                type="text"
                onChange={this.changeFunction}
              />
              <TextField
                id="job-department-input"
                name="jobDepartment"
                label="Department"
                type="text"
                onChange={this.changeDepartment}
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
                onChange={this.changeProfile}
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
                onChange={this.changeDescription}
              />
              <TextField
                id="job-benefits-input"
                name="jobBenefits"
                label="Benefits"
                type="text"
                multiline={true}
                minRows={5}
                onChange={this.changeBenefits}
              />
              <TextField
                id="experience-input"
                name="jobExperience"
                label="Required Experience"
                type="text"
                multiline={true}
                minRows={5}
                onChange={this.changeExperience}
              />
            </Grid>
            <Grid item>
              <TextField
                id="city-input"
                name="city"
                label="City"
                type="text"
                onChange={this.changeCity}
              />
              <TextField
                id="state-input"
                name="state"
                label="State"
                type="text"
                onChange={this.changeState}
              />
              <TextField
                id="country-input"
                name="country"
                label="Country"
                type="text"
                onChange={this.changeCountry}
              />
            </Grid>
            <Grid item>
              <TextField
                id="industry-input"
                name="industry"
                label="Industry"
                type="text"
                onChange={this.changeIndustry}
              />
              <FormControl>
                <FormLabel>Required Education</FormLabel>
                <Select
                  name="Required Education"
                  onChange={this.changeEducation}
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
              <FormControl onChange={this.changeTelecommuting}>
                <FormLabel>Telecommuting Allowed?</FormLabel>
                <RadioGroup
                  name="telecommuting"
                  row
                >
                    <FormControlLabel
                      key="true"
                      value={1}
                      control={<Radio size="small" />}
                      label="Yes"
                    />
                    <FormControlLabel
                      key="false"
                      value={0}
                      control={<Radio size="small" />}
                      label="No"
                    />
                </RadioGroup>
              </FormControl>
              <FormControl onChange={this.changeJobType}>
                <FormLabel>Job Type</FormLabel>
                  <RadioGroup
                    name="type"
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
                      value="Part-time"
                      control={<Radio size="small" />}
                      label="Part-time"
                    />
                    <FormControlLabel
                      key="full-time"
                      value="Full-time"
                      control={<Radio size="small" />}
                      label="Full-time"
                    />
                  </RadioGroup>
              </FormControl>
            </Grid>
            <Button onClick={this.submitJob}>
              Submit
            </Button>
          </Grid>
        </form>
      </div>
    );
  }
}

export default UploadJob;
