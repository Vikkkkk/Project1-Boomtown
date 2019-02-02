export default function validate(values, auth) {
  console.log(values);
  const errors = {};
  if (!values.email) {
    console.log('emailfked');
    errors.email = 'Email is fked';
  }
  if (!values.password) {
    console.log('pwfked');
    errors.password = 'Password is fked ';
  }
  if (!auth && !values.fullname) {
    errors.fullname = 'Name is Required';
  }
  return errors;
}
