import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import { Form, Field } from 'react-final-form';

import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import validate from './helpers/validation';

import styles from './styles';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  onSubmit = async values => {
    console.log('hi');
    try {
      console.log('>>>>>>>', values);
      if (this.state.formToggle) {
        console.log('>>>>>>onsubmit');
        await this.props.loginMutation({
          variables: {
            user: {
              ...values
            }
          }
        });
      } else {
        console.log('>>>>>>onsingu');
        await this.props.signupMutation({
          variables: {
            user: {
              ...values
            }
          }
        });
      }
    } catch (e) {
      throw 'error onsubmit';
    }
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit}
        validate={values => validate(values, this.state.formToggle)}
        render={({
          handleSubmit,
          form,
          pristine,
          submitting,
          invalid,
          values
        }) => (
          <form onSubmit={handleSubmit} className={classes.accountForm}>
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
                        <Typography color="red">{meta.error}</Typography>
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
                  <Fragment>
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
                  </Fragment>
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
                  disabled={submitting || pristine || invalid}
                >
                  {this.state.formToggle ? 'Enter' : 'Create Account'}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      form.reset();
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
    );
  }
}
AccountForm.propTypes = {
  loginMutation: PropTypes.func.isRequired,
  signupMutation: PropTypes.func.isRequired,
  classes: PropTypes.object
};

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
