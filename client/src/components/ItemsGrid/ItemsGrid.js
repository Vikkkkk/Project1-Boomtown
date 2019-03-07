import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import ItemCard from '../ItemCard/ItemCard';

const ItemsGrid = props => {
  const classes = props.classes;
  const items = props.items;
  console.log(props);

  return (
    <Grid className={classes.grid} container spacing={16}>
      {items.map(item => {
        return (
          <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
            <ItemCard item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

ItemsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default withStyles(styles)(ItemsGrid);
