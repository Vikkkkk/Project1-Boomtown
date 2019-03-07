import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
    console.log(this.props.match.path);
    const id = this.props.match.params.userid;
    // const id = '1';
    return (
      <Query variables={{ id: id }} query={ALL_USER_ITEMS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          console.log(data);
          console.log(id);
          return <Profile classes={this.props.classes} profile={data.user} />;
        }}
      </Query>
    );
  }
}
export default withStyles(styles)(ProfileContainer);
