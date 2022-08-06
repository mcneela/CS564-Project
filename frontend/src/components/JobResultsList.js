// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { Link, Outlet } from "react-router-dom";
// import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: 'active', // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

function preventDefault(event) {
  event.preventDefault();
}

function JobResultsList(props) {
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

export default function PaginatedItems(props) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + props.itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(props.data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.data.length / props.itemsPerPage));
  }, [itemOffset, props.itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * props.itemsPerPage) % props.data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <JobResultsList data={currentItems}/>
      <MyPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

