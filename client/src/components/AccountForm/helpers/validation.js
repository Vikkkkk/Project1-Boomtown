export default function validate(values, userlogin) {
  console.log(values);
  const errors = {};
  if (!values.email) {
    console.log('emailfked');
    errors.email = 'Email is Required';
  } else if (/.*@.*\..*/.test(values.email) === false) {
    errors.email = 'Email is Invalid';
  }
  if (!values.password) {
    console.log('pwfked');
    errors.password = 'Password is Required ';
  }
  if (!userlogin && !values.fullname) {
    errors.fullname = 'Name is Required';
  }
  return errors;
}
