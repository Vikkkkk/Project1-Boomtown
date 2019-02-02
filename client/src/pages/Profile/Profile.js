import React from 'react';
import ItemCard from '../../components/ItemCard/ItemCard';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Profile = ({ profile, classes }) => {
  console.log(profile);

  return (
    <div>
      <p>{profile.fullname}</p>
      <Grid container item xs={12} sm={6} md={4}>
        {profile.items.map(item => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <ItemCard item={item} />
            </Grid>
          );
        })};
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Profile);
