import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';
import styles from './styles';

const FullScreenLoader = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CircularProgress color="primary" size={80} thickness={2} />{' '}
        <Typography className={classes.suck}>Loading...</Typography>
      </div>
    </div>
  );
};
FullScreenLoader.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(FullScreenLoader);
