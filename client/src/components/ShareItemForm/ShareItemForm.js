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
import Input from '@material-ui/core/Input';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      title: '',
      description: ' ',
      newtag: '',
      name: []
    };
    this.handleChange = this.handleChange.bind(this);
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
    console.log(classes);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250
        }
      }
    };

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
                    <TextField
                      id="standard-textarea"
                      label="Item Name"
                      multiline
                      className={classes.TextField}
                      margin="normal"
                      onChange="{this.handleChange}"
                      // value="{this.state.title}"
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
                  </div>
                )}
              />
              <Field
                name="description"
                render={({ input, meta }) => (
                  <div className="field">
                    <Input
                      placeholder="Item Description"
                      className={classes.input}
                      multiline
                      rows="4"
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
                  </div>
                )}
              />
              <Field
                name="tags"
                render={({ classes, meta }) => (
                  <div className="field">
                    <label for="name">Tags</label>

                    <FormControl fullWidth>
                      <InputLabel>Tags!</InputLabel>
                      <Select
                        value={tags}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple" />}
                        MenuProps={MenuProps}
                        inputProps={{
                          name: 'ItemTags',
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
                    {/* added */}
                    {/* <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="select-multiple-chip">
                        Chip
                      </InputLabel>
                      <Select
                        multiple
                        value={this.state.name}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                          <div className={classes.chips}>
                            {selected.map(value => (
                              <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                        MenuProps={MenuProps}
                      >
                        {names.map(name => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, this)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}
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
