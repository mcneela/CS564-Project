// import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function preventDefault(event) {
  event.preventDefault();
}

export default function JobResultsList(props) {
    // const classes = useStyles();
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
                            <TableCell><b>Salary</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data.map(value => {
                                const {
                                    jobID,
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
                                var salary_provided = true;
                                if (salary_min == null || salary_max == null) {
                                    salary_provided = false;
                                }
                                return (
                                    <TableRow key={jobID}>
                                        <TableCell><i>{title}</i></TableCell>
                                        <TableCell>{department}</TableCell>
                                        <TableCell>{`${located_in.city}, ${located_in.state}, ${located_in.country}`}</TableCell>
                                        <TableCell>{`$${salary_min} to $${salary_max}` ? salary_provided : 'N/A'}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                        See more orders
                    </Link>
                    </React.Fragment>
                    </Paper>
                </Grid>
            </div>
        );
}

