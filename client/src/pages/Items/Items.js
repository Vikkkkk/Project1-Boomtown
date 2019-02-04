import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';

const Items = ({ classes, items }) => {
  return (
    <div className={classes.gridContainer}>
      <ItemsGrid classes={classes} items={items} />
    </div>
  );
};

export default Items;
