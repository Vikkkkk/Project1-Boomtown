export function validate(values, fileSelected, selectedTags) {
  const errors = {};

  /**
   * An item title, description, and at least one tag is required for all items.
   */

  if (!values.title) {
    errors.title = 'Title is missing';
  }
  if (!values.description) {
    errors.description = 'description is missing';
  }
  if (!fileSelected) {
    errors.fileSelected = 'Image is missing';
  }
  if (selectedTags.length < 1) {
    errors.tags = 'at least one tag is required';
  }

  return errors;
}
