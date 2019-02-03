export default function validate(values, userlogin) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (/.*@.*\..*/.test(values.email) === false) {
    errors.email = 'Email is Invalid';
  }
  if (!values.password) {
    errors.password = 'Password is Required ';
  }
  if (!userlogin && !values.fullname) {
    errors.fullname = 'Name is Required';
  }
  return errors;
}
