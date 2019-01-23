import React, { Component } from 'react';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class HomeContainer extends Component {
  render() {
    return <Home classes={this.props.classes} />;
  }
}
export default withStyles(styles)(HomeContainer);

// class HomeContainer extends Component {
//   render() {
//     return (
//       <Query query={GET_TAGS}>
//         {({ loading, error, data }) => {
//           if (loading) return <p>loading...</p>;
//           if (error) return <p>Error!</p>;
//           {
//             console.log(data);
//           }
//           return <p>data received</p>;
//         }}
//       </Query>
//     );
//   }
// }
// export default withStyles(styles)(HomeContainer);
