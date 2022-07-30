import * as React from 'react';
import { Link, Outlet } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function preventDefault(event) {
  event.preventDefault();
}

export default function JobResultsList(props) {
  return (
    <div>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <React.Fragment>
            {/* <Title>Current Jobs</Title> */}
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><b>Position</b></TableCell>
                  <TableCell><b>Department</b></TableCell>
                  <TableCell><b>Location</b></TableCell>
                  {/* <TableCell><b>Salary</b></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map(value => {
                  const {
                    job_id,
                    title,
                    salary_min,
                    salary_max,
                    department,
                    benefits,
                    description,
                    fraudulent,
                    telecommuting,
                    has_question,
                    posted_by,
                    located_in
                  } = value;
                  var location = '';
                  if (located_in.city != null && located_in.city != '') {
                    location += located_in.city + ', ';
                  }
                  if (located_in.state != null && located_in.state != '') {
                    location += located_in.state + ', ';
                  }
                  if (located_in.country!= null && located_in.country != '') {
                    location += located_in.country;
                  }
                  var salary_provided = true;
                  if (salary_min == null || salary_max == null) {
                    salary_provided = false;
                  }
                  return (
                    <TableRow key={job_id}>
                      <TableCell>
                        <Link
                          style={{ display: "block", margin: "1rem 0" }}
                          to={`/jobs/${job_id}`}
                          key={job_id}
                        >
                        {title}
                        </Link>
                        <Outlet />
                      </TableCell>
                      <TableCell>{department}</TableCell>
                      <TableCell>{location}</TableCell>
                      {/* <TableCell>{`$${salary_min} to $${salary_max}` ? salary_provided : 'N/A'}</TableCell> */}
                    </TableRow>
                  );
              })}
              </TableBody>
            </Table>
          </React.Fragment>
        </Paper>
      </Grid>
    </div>
  );
}

