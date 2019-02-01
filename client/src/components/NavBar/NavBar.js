import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../images/boomtown.svg';
import styles from './styles';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import {
  MoreVert,
  AddCircle,
  Fingerprint,
  PowerSettingsNew,
  Link
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
    const { anchorEl } = this.state;
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

            <Typography component="h6" color="inherit" className={classes.grow}>
              <Button color="inherit" href="/share">
                <AddCircle /> Share your Item
              </Button>
            </Typography>
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
              <MenuItem component={Link} to="/profile">
                <Fingerprint /> Profile
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
  withStyles(styles)
)(NavBar);
