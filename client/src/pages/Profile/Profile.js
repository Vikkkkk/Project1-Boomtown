import React from 'react';
import ItemCard from '../../components/ItemCard/ItemCard';
import ItemGrid from '../../components/ItemsGrid/ItemsGrid';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Gravatar from 'react-gravatar';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';

const Profile = ({ profile, classes }) => {
  console.log(profile);

  return (
    <div className={classes.profileWrapper}>
      {/* <p>{profile.fullname}</p> */}
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.userInfo}>
            <Avatar className={classes.avatar}>
              <Gravatar email={profile.email} />
            </Avatar>
            <Typography className={classes.userName}>
              {profile.fullname}
            </Typography>
          </div>
          <div>
            <Typography className={classes.itemsInfo}>
              <span className={classes.bold}>{profile.items.length}</span> Items
              shared{' '}
              <span className={classes.bold}>{profile.borrowed.length}</span>{' '}
              Items borrowed
            </Typography>
            {profile.bio === null || profile.bio === undefined ? (
              <Typography className={classes.bio}>
                "This person is too lazy to write a bio....."
              </Typography>
            ) : (
              <Typography className={classes.bio}>"{profile.bio}"</Typography>
            )}
          </div>
        </CardContent>
      </Card>
      <Typography component="h1" className={classes.profileTitle}>
        Items Shared
      </Typography>
      <Grid container spacing={24}>
        {profile.items.map(item => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <ItemCard item={item} profile={profile} />
            </Grid>
          );
        })};
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Profile);
