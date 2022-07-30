import * as React from 'react';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function SingleJobPage(props) {
  let params = useParams();
  return (
    <h2>Job: {params.jobID}</h2>
  );
}