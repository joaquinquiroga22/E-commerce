import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
  	width: "100%",
  	display: "flex",
  	justifyContent: "space-around",
  	alignItems: "center"
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Typography variant="h6" >
    {"Stock: 3"}
    </Typography>
      <Button variant="contained" color="primary">
        Ver producto
      </Button>
    </div>
  );
}
