import React from 'react';
import Form, { TextField } from 'react-form-material-ui'

export default class ExperienceForm extends Form {
  render() {
    return (
      <div className="row mb16">
        <div className="col-sm-8">
          <TextField {...this.$('name') } floatingLabelText="Nome da Experiência" />
        </div>
      </div>
    );
  }
}