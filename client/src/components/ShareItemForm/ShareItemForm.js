import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import ReactDOM from 'react-dom';

import TextField from '@material-ui/core/TextField';
class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <h3>Email Form</h3>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="name"
                render={({ input, meta }) => (
                  <div className="field">
                    <label for="name">Name</label>
                    <TextField inputProps={input} />

                    {meta.touched &&
                      meta.invalid && (
                        <div
                          className="error"
                          style={{ color: 'red', fontsize: '10px' }}
                        >
                          {meta.error}
                        </div>
                      )}
                  </div>
                )}
              />
              <Field
                name="email"
                render={({ input, meta }) => (
                  <div className="field">
                    <label for="email">Email</label>
                    <input type="text" {...input} />
                    {meta.touched &&
                      meta.invalid && (
                        <div
                          className="error"
                          style={{ color: 'red', fontsize: '10px' }}
                        >
                          {meta.error}
                        </div>
                      )}
                  </div>
                )}
              />
            </form>
          )}
        />
      </div>
    );
  }
}

export default ShareForm;
