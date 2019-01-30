import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Gravatar from 'react-gravatar';

const ItemCard = ({ classes, item }) => {
  console.log(item);
  return (
    <Card className={classes.card}>
      <Fragment>
        <CardMedia
          className={classes.media}
          image={item.imageurl}
          title="Your-Item-Card"
        />
        <CardContent>
          <Avatar aria-label="user" className={classes.avatar}>
            {item.itemowner && <Gravatar email={item.itemowner.email} />}
          </Avatar>
          <Typography gutterBottom component="h2">
            {item.title}
          </Typography>
          <Typography component="p">{item.description}</Typography>
          <Typography component="p">
            {item.tags.map(tag => tag.title).join(', ')}
          </Typography>
        </CardContent>
      </Fragment>
      <CardActions>
        <Button size="small" color="primary">
          Borrow this sh!t
        </Button>
      </CardActions>
    </Card>
  );
};

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

ItemCard.defaultProps = {
  item: {
    title: 'ex.mango',
    description: 'ex.fruit',
    tags: ['sweet', 'sour'],
    imageurl: 'http://via.placeholder.com/350x250?text=Please select an image',
    itemowner: {
      email: 'example@example.com'
    }
  }
};

export default withStyles(styles)(ItemCard);
