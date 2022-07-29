import React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
const useStyles = styled(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 400,
        }
    }
}));

export default function JobResultsList(props) {
    const classes = useStyles();
    return (
        <List className={classes.root} style={{maxHeight: '100%', overflow: 'auto'}}>
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
                return (
                    <ListItem key={jobID} role={undefined}>
                        <ListItemText id={jobID} primary={`Title: ${title}, Location: (${located_in.city}, ${located_in.state}, ${located_in.country}` }></ListItemText>
                    </ListItem>
                )
            })}
        </List>
    )
}

