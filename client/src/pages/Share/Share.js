import React from 'react';
import ShareItemForm from '../../components/ShareItemForm/ShareItemForm';
import ShareItemFormPreview from '../../components/ShareItemFormPreview/ShareItemFormPreview';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';

const Share = ({ classes, tags }) => {
  return (
    <div className={classes.sharePageFlex}>
      <Grid container className={classes.formPreview}>
        <Grid item xs={6}>
          <ShareItemFormPreview classes={classes} />
        </Grid>
        <Grid item xs={6}>
          <ShareItemForm classes={classes} tags={tags} />
        </Grid>
      </Grid>
    </div>
  );
};
Share.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired
};
export default withStyles(styles)(Share);
