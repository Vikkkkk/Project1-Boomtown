import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import { validate } from './helpers/validation';
import { ADD_ITEM_MUTATION } from '../../apollo/queries';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  ListItemText,
  Input,
  Button,
  Typography
} from '@material-ui/core';

import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/modules/ShareItemPreview';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import styles from './styles';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
  }

  handleSelectTags = event => {
    this.setState({ selectedTags: event.target.value });
  };
  handleSelectFile = event => {
    //whatever the first image user picks willbe our file upload
    this.setState({ fileSelected: this.fileInput.current.files[0] });
  };

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }
  //convers image to base64 string
  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }
  dispatchUpdate(values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  render() {
    const { classes, tags, updateItem, resetImage, resetItem } = this.props;

    return (
      <div className={classes.formWrapper}>
        <Typography component="h1" className={classes.formTitle}>
          Share. Borrow. Prosper.
        </Typography>
        <Mutation mutation={ADD_ITEM_MUTATION}>
          {addItemMutation => {
            return (
              <Form
                onSubmit={values => {
                  addItemMutation({
                    variables: {
                      item: {
                        ...values,
                        tags: this.state.selectedTags.map(tag => ({
                          id: tag,
                          title: ''
                        }))
                      }
                    }
                  });
                  resetItem();
                }}
                validate={values =>
                  validate(
                    values,
                    this.state.fileSelected,
                    this.state.selectedTags
                  )
                }
                render={({
                  handleSubmit,
                  pristine,
                  submitting,
                  invalid,
                  form
                }) => (
                  <form
                    onSubmit={event => {
                      handleSubmit(event);
                    }}
                  >
                    <FormSpy
                      subscription={{ values: true }}
                      component={({ values }) => {
                        if (values) {
                          this.dispatchUpdate(values, tags, updateItem);
                        }
                        return '';
                      }}
                    />
                    <label htmlFor="contained-button-file">
                      {!this.state.fileSelected ? (
                        <Button
                          color="primary"
                          className={classes.imageButton}
                          variant="contained"
                          component="span"
                          onClick={() => {
                            this.fileInput.current.click();
                          }}
                        >
                          select an image
                        </Button>
                      ) : (
                        <Button
                          className={classes.imageButton}
                          variant="contained"
                          component="span"
                          onClick={() => {
                            this.fileInput.current.value = '';
                            this.setState({ fileSelected: false });
                            resetImage();
                          }}
                        >
                          Reset Image
                        </Button>
                      )}
                      <input
                        type="file"
                        id="fileInput"
                        ref={this.fileInput}
                        accept="image/*"
                        onChange={this.handleSelectFile}
                        hidden
                      />
                    </label>
                    <Field
                      name="title"
                      render={({ input, meta }) => (
                        <div className="field">
                          <TextField
                            {...input}
                            id="standard-textarea"
                            label="Item Name"
                            className={classes.TextField}
                            margin="normal"
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
                          <TextField
                            placeholder="Item Description"
                            {...input}
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
                          <FormControl fullWidth>
                            <InputLabel>Tags!</InputLabel>

                            <Select
                              multiple
                              value={this.state.selectedTags}
                              onChange={this.handleSelectTags}
                              input={<Input id="select-multiple" />}
                              renderValue={selected => {
                                return this.generateTagsText(tags, selected);
                              }}
                            >
                              {tags.map(tag => (
                                <MenuItem key={tag.id} value={tag.id}>
                                  <Checkbox
                                    checked={
                                      this.state.selectedTags.indexOf(tag.id) >
                                      -1
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

                    <Button
                      className={classes.shareButton}
                      variant="contained"
                      type="submit"
                      disabled={submitting || pristine || invalid}
                    >
                      Share
                    </Button>
                  </form>
                )}
              />
            );
          }}
        </Mutation>
      </div>
    );
  }
}
ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
  resetImage: PropTypes.func.isRequired,
  resetItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired
};

//this function maps dispatch to props, this way we can access the dispatch (fire an action) from our props.
//the store is already wrapped our app class so the store is always there. which is also we use this way. where we
//put the dispatch in the props and use the same name(or key) to call it
const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetItem() {
    dispatch(resetItem());
  },
  resetImage() {
    dispatch(resetImage());
  }
});

//the mapStateToProps parameter is required, so its null here.
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm));
