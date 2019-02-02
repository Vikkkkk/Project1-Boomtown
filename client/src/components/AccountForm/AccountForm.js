import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component } from 'react';
import { Typography, TextField } from '@material-ui/core';

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

  onSubmit(values) {
    console.log('Submitted');
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;

    return (
      // @TODO: Wrap in Final Form <Form />
      <Form
        onSubmit={this.onSubmit}
        render={({ pristine, submitting, invalid }) => (
          <form
            onSubmit={() => {
              console.log('Submitted');
            }}
            className={classes.accountForm}
          >
            {!this.state.formToggle && (
              <Field
                name="fullname"
                render={({ input, meta }) => (
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="fullname">Username</InputLabel>
                    <Input
                      id="fullname"
                      type="text"
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      value={''}
                      {...input}
                    />

                    {meta.touched &&
                      meta.invalid && (
                        <div
                          className="error"
                          style={{ color: 'red', fontsize: '10px' }}
                        >
                          {meta.error}
                        </div>
                      )}
                  </FormControl>
                )}
              />
            )}
            <Field
              name="email"
              render={({ input, meta }) => (
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    type="text"
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    value={''}
                    {...input}
                  />

                  {meta.touched &&
                    meta.invalid && (
                      <div
                        className="error"
                        style={{ color: 'red', fontsize: '10px' }}
                      >
                        {meta.error}
                      </div>
                    )}
                </FormControl>
              )}
            />

            <Field
              name="password"
              render={({ input, meta }) => (
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    value={''}
                    {...input}
                  />

                  {meta.touched &&
                    meta.invalid && (
                      <div
                        className="error"
                        style={{ color: 'red', fontsize: '10px' }}
                      >
                        {meta.error}
                      </div>
                    )}
                </FormControl>
              )}
            />

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
                    console.log(this.props);
                    e.preventDefault();
                    if (this.state.formToggle) {
                      this.props.loginMutation({
                        variables: {
                          user: {
                            email: '',
                            password: ''
                          }
                        }
                      });
                    } else {
                      this.props.signupMutation({
                        variables: {
                          user: {
                            fullname: '',
                            email: '',
                            password: ''
                          }
                        }
                      });
                    }
                  }}
                  disabled={submitting || pristine || invalid}
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
        )}
      />
      // @TODO: Close Final Form <Form />
    );
  }
}

// @TODO: Use compose to add the login and signup mutations to this components props.
// @TODO: Refetch the VIEWER_QUERY to reload the app and access authenticated routes.
// ... imports
// ... AccountForm component
const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];
export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'signupMutation'
  }),
  graphql(LOGIN_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'loginMutation'
  }),
  withStyles(styles)
)(AccountForm);
