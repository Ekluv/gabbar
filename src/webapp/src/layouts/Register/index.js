import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, InputLabel } from 'material-ui';

import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid,
} from 'components';

import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker,
} from 'redux-form-material-ui';

import {
  required,
  mobileNumberRegex,
  emailRegex,
} from '../../utils/validations';

import GenericFormField from '../../components/GenericFormField';

import avatar from 'assets/img/faces/marc.jpg';

let RegistrationForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <Field
            name="fullName"
            label="Full Name"
            component={GenericFormField}
            validate={[required]}
          />
        </ItemGrid>
      </Grid>

      <Grid container>
        <ItemGrid xs={12} sm={12} md={6}>
          <Field
            name="email"
            label="Email"
            component={GenericFormField}
            validate={[required, emailRegex]}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <Field
            name="mobileNo"
            label="Mobile No"
            component={GenericFormField}
            validate={[required, mobileNumberRegex]}
          />
        </ItemGrid>
      </Grid>
      {/*<Grid container>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="City"
                        id="city"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Country"
                        id="country"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Postal Code"
                        id="postal-code"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </ItemGrid>
                  </Grid>*/}
      <div style={{ textAlign: 'center', margin: 10 }}>
        <Button color="primary" style={{ width: '40%' }} type="submit">
          Register
        </Button>
      </div>
    </form>
  );
};

// Decorate with redux-form
RegistrationForm = reduxForm({
  form: 'RegistrationForm',
})(RegistrationForm);

class UserProfile extends React.Component {
  state = {
    fullName: '',
    email: '',
    mobileNo: '',
  };

  handleFieldChange = fieldName => e => {
    this.setState({ [fieldName]: e.target.value });
  };

  onSubmit = values => {
    console.log(values);
  };

  render() {
    return (
      <div>
        <Grid container style={{ marginTop: 30 }} justify="center">
          <ItemGrid xs={12} sm={12} md={8}>
            <RegularCard
              cardTitle="Register"
              cardSubtitle="Complete your profile"
              content={<RegistrationForm onSubmit={this.onSubmit} />}
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
