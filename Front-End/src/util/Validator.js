
let Validator = {
  required: value => (value == null || !value ? 'Required' : undefined),
  email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined,
  passwordMatch: (value, allValues) => value !== allValues.password ? 'Password Mismatch' : undefined,
  mobile: value => value && /^\d+$/.test(value) && value.length === 10 ? undefined : 'Invalid Mobile Number',
  string: value => value && !/^[a-zA-Z]*$/i.test(value) ? 'Only text allowed' : undefined,
  password: value => value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/i.test(value) ? 'Password must be minimum eight characters including one uppercase letter, one special character and alphanumeric characters' : undefined,
  disallowSpace: value => value && !/[^ ]+/i.test(value) ? 'Space not allowed in password' : undefined
}
export default Validator;