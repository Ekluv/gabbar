import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, FormControl, InputLabel, Input } from 'material-ui';

import { CustomInput } from 'components';

export default function GenericFormField(props) {
  const { input, label, hint, meta: { touched, error }, ...domProps } = props;

  return (
    <React.Fragment>
      <CustomInput
        labelText={label}
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{ ...input }}
        error={touched && error ? true : false}
      />

      {touched &&
        (error && (
          <div
            className="error-message"
            style={{
              fontSize: 12,
              marginTop: -10,
              color: 'red',
            }}
          >
            {error}
          </div>
        ))}
      {(!touched || !error) &&
        hint && <span className="hint-text yellow-info">{hint} </span>}
    </React.Fragment>
  );
}

GenericFormField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  hint: PropTypes.node,
};

GenericFormField.defaultProps = {
  label: '',
  input: {},
  hint: '',
};
