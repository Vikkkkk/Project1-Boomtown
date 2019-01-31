import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import { Form, Field } from 'react-final-form';

import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import validate from './helpers/validation';

import styles from './styles';
import { SIGCHLD } from 'constants';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;

    return (
      // @TODO: Wrap in Final Form <Form />
      <form
        onSubmit={() => {
          console.log('Submitted');
        }}
        className={classes.accountForm}
      >
        {!this.state.formToggle && (
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="fullname">Username</InputLabel>
            {/* @TODO: Wrap in a Final Form <Field /> */}
            <Input
              id="fullname"
              type="text"
              inputProps={{
                autoComplete: 'off'
              }}
              value={''}
            />
            {/* @TODO: Close Final Form <Field /> */}
          </FormControl>
        )}
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="email">Email</InputLabel>
          {/* @TODO: Wrap in a Final Form <Field /> */}
          <Input
            id="email"
            type="text"
            inputProps={{
              autoComplete: 'off'
            }}
            value={''}
          />
          {/* @TODO: Close Final Form <Field /> */}
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="password">Password</InputLabel>
          {/* @TODO: Wrap in a Final Form <Field /> */}
          <Input
            id="password"
            type="password"
            inputProps={{
              autoComplete: 'off'
            }}
            value={''}
          />
          {/* @TODO: Close Final Form <Field /> */}
        </FormControl>
        <FormControl className={classes.formControl}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Button
              type="submit"
              className={classes.formButton}
              variant="contained"
              size="large"
              color="secondary"
              onClick={e => {
                e.preventDefault();
                if (this.state.formToggle) {
                  this.props.loginMutation({
                    variables: {
                      user: {
                        email: 'mac@red.com',
                        password: '1234'
                      }
                    }
                  });
                } else {
                  this.props.signupMutation({
                    variables: {
                      user: {
                        fullname: 'sid',
                        email: 'sid@red.com',
                        password: '1234'
                      }
                    }
                  });
                }
              }}
              disabled={
                false // @TODO: This prop should depend on pristine or valid state of form
              }
            >
              {this.state.formToggle ? 'Enter' : 'Create Account'}
            </Button>
            <Typography>
              <button
                className={classes.formToggle}
                type="button"
                onClick={() => {
                  // @TODO: Reset the form on submitiables:

                  this.setState({
                    formToggle: !this.state.formToggle
                  });
                }}
              >
                {this.state.formToggle
                  ? 'Create an account.'
                  : 'Login to existing account.'}
              </button>
            </Typography>
          </Grid>
        </FormControl>
        <Typography className={classes.errorMessage}>
          {/* @TODO: Display sign-up and login errors */}
        </Typography>
      </form>
      // @TODO: Close Final Form <Form />
    );
  }
}

// @TODO: Use compose to add the login and signup mutations to this components props.
// @TODO: Refetch the VIEWER_QUERY to reload the app and access authenticated routes.
// ... imports
// ... AccountForm component
export default compose(
  graphql(SIGNUP_MUTATION, {
    name: 'signupMutation'
  }),
  graphql(LOGIN_MUTATION, {
    name: 'loginMutation'
  }),
  withStyles(styles)
)(AccountForm);
