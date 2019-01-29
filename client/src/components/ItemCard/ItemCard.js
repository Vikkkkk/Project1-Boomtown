import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

const ItemCard = ({ classes, item }) => {
  console.log(item);
  return (
    <Card className={classes.card}>
      <Fragment>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <h2>{item.title}</h2>
          </Typography>
          <Typography component="p">
            <p>{item.description}</p>
            <p>{item.tags.map(tag => tag.title)}</p>
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
  item: { title: 'ex.mango', description: 'ex.fruit', tags: ['sweet', 'sour'] }
};

export default withStyles(styles)(ItemCard);
