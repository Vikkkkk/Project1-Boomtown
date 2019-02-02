import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../images/boomtown.svg';
import styles from './styles';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import Link from 'react-router-dom/Link';
import { withRouter } from 'react-router';
import {
  MoreVert,
  AddCircle,
  Fingerprint,
  PowerSettingsNew
} from '@material-ui/icons';

class NavBar extends React.Component {
  state = {
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { location } = this.props;
    const { anchorEl } = this.state;
    console.log(this.props);

    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              href="/items"
            >
              <img src={logo} width="40" />
            </IconButton>
            <div className={classes.grow} />
            <Slide
              direction="left"
              in={location.pathname !== '/share'}
              mountOnEnter
              unmountOnExit
            >
              <Typography component="h6" color="inherit">
                <Button color="inherit" href="/share">
                  <AddCircle /> Share your Item
                </Button>
              </Typography>
            </Slide>
            <IconButton onClick={this.handleMenu} color="inherit">
              <MoreVert />
            </IconButton>
            <Menu
              id="menu-appbar"
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              onClose={this.handleClose}
            >
              <MenuItem component={Link} to={`/profile/${this.props.user.id}`}>
                <Fingerprint /> Your Frickin Profile
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  this.props.logoutMutation({});
                }}
              >
                <PowerSettingsNew /> Log Out
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];
export default compose(
  graphql(LOGOUT_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'logoutMutation'
  }),
  withStyles(styles),
  withRouter
)(NavBar);
