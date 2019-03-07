import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';

import styles from './styles';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';
const today = Date.now();

console.log(
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(today)
);

const ItemCard = ({ classes, item, match }) => {
  console.log(match);
  console.log(item);

  const formatDate = date => {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString([], options);
  };
  return (
    <Card className={classes.card}>
      <Fragment>
        <CardMedia
          className={classes.media}
          image={item.imageurl}
          title={item.title}
          component={Link}
          to={`/profile/${item.itemowner.id}`}
        />
        <CardContent>
          <div className={classes.avatarContainer}>
            <Avatar aria-label="user" className={classes.avatar}>
              {item.itemowner && <Gravatar email={item.itemowner.email} />}
            </Avatar>
            <div className={classes.userinfoContainer}>
              <Typography component="p" className={classes.fullname}>
                {item.itemowner.fullname}{' '}
              </Typography>
              <Typography component="p">{formatDate(item.created)}</Typography>
            </div>
          </div>
          <div className={classes.textContainer}>
            <Typography gutterBottom component="h2" className={classes.title}>
              {item.title}
            </Typography>
            <Typography component="p" className={classes.tag}>
              {item.tags.map(tag => tag.title).join(', ')}
            </Typography>
            <Typography component="h3" className={classes.description}>
              {item.description}
            </Typography>
          </div>
        </CardContent>
      </Fragment>
      {match.url === '/profile/' + item.itemowner.id ? (
        ''
      ) : (
        <CardActions>
          <Button size="small" variant="outlined" color="primary">
            Borrow this sh!t
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(connect()(withStyles(styles)(ItemCard)));
