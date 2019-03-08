import React from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import { withRouter } from 'react-router';

const ItemsContainer = props => {
  return (
    <Query query={ALL_ITEMS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <FullScreenLoader inverted />;
        if (error) return <p>{`Error! ${error.message}`}</p>;

        return (
          <Items
            classes={props.classes}
            items={data.items}
            path={props.location}
          />
        );
      }}
    </Query>
  );
};

export default withRouter(withStyles(styles)(ItemsContainer));
