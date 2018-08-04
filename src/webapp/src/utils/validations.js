/*
 *
 * Custom Form fields validation util functions
 *
 */

export const required = value => (value ? null : 'This field cannot be left blank');

export const maxLength = max => value => ((value && value.toString().length > max) ? `Must be ${max} characters or less` : null);

export const minLength = min => value => ((value && value.toString().length < min) ? `Must be ${min} characters or more` : null);

export const pancardNumberRegex = value => (
  value && /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? null : 'PAN Number is invalid');

export const nameRegex = value => (value && /^[a-zA-Z\s]*$/.test(value) ?
  null : 'Name should contain only alphabets');

export const merchantNameRegex = value => (value && /^(?!\s*$)[a-zA-Z .]{1,80}$/.test(value) ?
  null : 'Name should contain alphabets only (a-z)');

export const bankAccountRegex = value => (value && /^[A-Za-z0-9]+$/.test(value) ?
  null : 'Bank number should not contain special caracters e.g.(.#$,)');

export const amountRegx = value => (value && /^\d{0,8}(\.\d{1,2})?$/.test(value) ?
  null : 'Invalid amount');

export const mobileNumberRegex = value => (value && /^[6789]\d{9}$/.test(value.trim()) ?
  null : 'Invalid mobile number');

export const ifscCodeRegex = value => (value && /^[A-Za-z0-9]{11}$/.test(value) ?
  null : 'IFSC code format is invalid');

export const gstRegex = value => (!value || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value) ?
  null : 'Invalid GST number');

export const nameAlphaNumRegex = value => (value && /^[A-Za-z0-9 ]+$/.test(value) ?
  null : 'Name should not contain special characters e.g.(.#$,)');

export const alphaNumRegexWithOneChar = value => (value && /^[A-Za-z0-9][A-Za-z0-9 .,;:'°&/()-]*$/.test(value) ?
  null : 'Please enter valid Address');

export const emailRegex = value => (value && /^(?=.{6,254}$)[A-Za-z0-9_\-\.]{1,64}\@[A-Za-z0-9_\-\.]+\.[A-Za-z]{2,}$/.test(value) ?
  null : 'Invalid email');

export const pincodeRegex = value => (!value || /^[1-9][0-9]{5}$/.test(value) ? null : 'Invalid Pincode');

export const addressRegex = value => (!value || /^.{3,}$/.test(value) ? null : 'Business Address should not be less than 3 characters');

export const strongPasswordRegex = (value) => {
  if (value) {
    if (!(/(?=.*[a-z])/.test(value))) {
      return 'Password must contain 1 small case letter.';
    }
    if (!(/(?=.*[A-Z])/.test(value))) {
      return 'Password must contain 1 upper case letter.';
    }
    if (!(/(?=.*[0-9])/.test(value))) {
      return 'Password must contain 1 number.';
    }
    if (!(/(?=.*[!@#\$%\^&\*])/.test(value))) {
      return 'Password must contain 1 special character.';
    }
  }
  return null;
};

export const urlRegex = value => (!value || /^((https?|http):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/.test(value) ? null : 'Invalid URL');

export const websiteUrlRegex = value => (!value ||
  /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
    .test(value) ? null : 'Entered website URL is invalid');

export const hasMinChars = (value, minLimit) => new RegExp(`(?=.{${minLimit},})`).test(value);
export const hasUpperChar = value => /^(?=.*[A-Z])/.test(value);
export const hasLowerChar = value => /^(?=.*[a-z])/.test(value);
export const hasNumber = value => /^(?=.*[0-9])/.test(value);
export const hasSpecialChar = value => /^(?=.*[!@#\$%\^&\*])/.test(value);

export const minValue = min => value => (value && value < min ? `Must be at least ${min}` : null);

export const maxValue = max => value => (value && value > max ? `Must be ${max} at max` : null);

export const nonZeroAmountRegex = value => value && /^[1-9]\d*(\.\d+)?$/.test(value) || /^0.\d*[1-9]+\d*$/.test(value) ?
    null : 'Amount should be greater than 0';

export const onlyNumber = (value) => {
  if (!value) return null;
  return (/^(\d)*$/.test(value)) ? null : 'Please enter number only';
};
