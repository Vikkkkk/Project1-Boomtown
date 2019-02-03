import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import styles from './styles';
import ItemCard from '../ItemCard/ItemCard';

const ItemsGrid = props => {
  const classes = props.classes;
  const items = props.items;
  console.log(props);
  console.log(items);
  return (
    <Grid className={classes.grid} container spacing={8}>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemsGrid);
