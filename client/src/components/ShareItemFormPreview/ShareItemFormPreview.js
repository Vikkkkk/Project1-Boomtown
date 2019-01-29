import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import ItemCard from '../../components/ItemCard/ItemCard';

class ShareItemFormPreview extends Component {
  render() {
    const { classes } = this.props;
    const { item } = this.props;
    console.log(this.props);
    console.log(classes);
    return (
      <div className={classes}>
        <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
          <ItemCard />
        </Grid>
      </div>
    );
  }
}

export default ShareItemFormPreview;
