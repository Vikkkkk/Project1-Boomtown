import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
  }
  onSubmit(o) {
    console.log('Submitting:', o);
  }

  validate(o) {
    console.log('Validating:', o);
    const error = {};
    if (!o.name) {
      error.name = 'Name is required';
    }
    if (!o.email) {
      error.email = 'Description is required';
    }
    return error;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { tags } = this.props;
    console.log(this.props);

    return (
      <div className={classes}>
        <h3>Share. Borrow. Prosper.</h3>
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
                name="description"
                render={({ input, meta }) => (
                  <div className="field">
                    <label for="email">Item description</label>
                    <TextField rows="8" />
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
                name="tags"
                render={({ classes, meta }) => (
                  <div className="field">
                    <label for="name">Tags</label>

                    <FormControl fullWidth>
                      <InputLabel htmlFor="age-simple">Tags!</InputLabel>
                      <Select
                        value={tags}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'Item Tags',
                          id: 'tagid'
                        }}
                      >
                        {tags.map(tag => (
                          <MenuItem key={tag.id} value={tag.title}>
                            <Checkbox
                              checked={
                                this.state.checked.indexOf(tag.title) > -1
                              }
                            />
                            <ListItemText primary={tag.title} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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

export default ShareItemForm;

// {
//   tags.map(tag => (
//     <MenuItem key={tag.id} value={tag.title}>
//       <Checkbox checked={this.state.checked.indexOf(tag.title) > -1} />
//       <ListItemText primary={tag.title} />
//     </MenuItem>
//   ));
// }
