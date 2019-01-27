import React, { Component } from 'react';
import Share from './Share';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_TAGS_QUERY } from '../../apollo/queries';

class ShareContainer extends Component {
  render() {
    // console.log(props);
    return (
      <Query variables={{ filter: 0 }} query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          console.log(data);
          //??how can we do this below?
          return <Share classes={this.props.classes} tags={data.tags} />;
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ShareContainer);
