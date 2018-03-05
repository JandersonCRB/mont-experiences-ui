import 'react-dates/initialize';
import React, { Component } from 'react'

import { browserHistory } from 'react-router';

import { inject, observer } from 'mobx-react';

import moment from 'moment/min/moment-with-locales'

import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

@inject('experience')
@inject('booking')
@inject('session') @observer
class BookingsNew extends Component {

  constructor() {
    super();
    moment.locale('pt-br');
    this.state = {
      values: {
        adults: 1,
        name: '',
        email: '',
        phone: '',
        address: '',
        complement: '',
        dates: moment()
      },
      activeStep: 0
    }
  }

  componentWillMount() {
    const { experience } = this.props;
    experience.findBy({ id: this.props.params.experienceId });
  }


  submit() {
    let body = this.state.values;
    body.experience_id = this.props.experience.selected.id;
    body.dates = body.dates.format('YYYY-MM-DD');
    this.props.booking.create({}, body);
  }

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { name, email, phone } = this.state.values;
    const steps = getSteps();
    if(activeStep === 1){
      if(name && email && phone){
        this.setState({
          activeStep: activeStep + 1,
        });
      }
    }else{
      this.setState({
        activeStep: activeStep + 1,
      });
    }
    if(activeStep === steps.length - 1){
      this.submit();
    }
  };
  change(e) {
    if (e._isAMomentObject) {
      const values = Object.assign(this.state.values, { dates: e }) //values RECEIVES THE STATE WITH THE NEW MODIFIED ATTRIBUTES
      this.setState({ values });
    } else {
      const values = Object.assign(this.state.values, { [e.target.name]: e.target.value }) //values RECEIVES THE STATE WITH THE NEW MODIFIED ATTRIBUTES
      this.setState({ values });
    }
  }

  renderTransfer() {
    if (this.props.experience.selected.has_transfer) {
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <span>Sobre o translado</span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ul className='list-unstyled'>
              <li>
                <TextField
                  name='address'
                  label='Hotel / Endereço'
                  value={this.state.values.address}
                  onChange={(e) => this.change(e)}
                />
              </li>
              <li>
                <TextField
                  name='complement'
                  label='Complemento'
                  value={this.state.values.complement}
                  onChange={(e) => this.change(e)}
                />
              </li>
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    } else {
      return null;
    }
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className="container text-center">
            <TextField
              className="m-2"
              type='number'
              name='adults'
              value={this.state.values.adults}
              onChange={e => this.change(e)}
              label="Número de pessoas"
            /> <br />
            {/* // https://github.com/airbnb/react-dates */}
            <SingleDatePicker
              required
              numberOfMonths={1}
              showDefaultInputIcon
              date={this.state.values.dates}
              onDateChange={e => this.change(e)}
              focused={this.state.focused}
              onFocusChange={({ focused }) => this.setState({ focused })}
              monthFormat="MMMM/YYYY"
            />
          </div>
        )
      case 1:
        return (
          <div className="container m-2">
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <span>Sobre você</span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ul className='list-unstyled'>
                  <li>
                    <TextField
                      required
                      name='name'
                      label='Nome Completo'
                      value={this.state.values.name}
                      onChange={(e) => this.change(e)}
                    />
                  </li>
                  <li>
                    <TextField
                      required
                      name='email'
                      label='Email'
                      value={this.state.values.email}
                      onChange={(e) => this.change(e)}
                    />
                  </li>
                  <li>
                    <TextField
                      required
                      name='phone'
                      label='Telefone'
                      value={this.state.values.phone}
                      onChange={(e) => this.change(e)}
                    />
                  </li>
                </ul>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {this.renderTransfer()}
          </div>
        )
      case 2:
        return (
          <div className="container m-2">
            <ul>
              <li>{this.state.values.name}</li>
              <li>{this.state.values.phone}</li>
              <li>{this.state.values.adults}</li>
              <li>{this.state.values.email}</li>
              <li>{this.state.values.dates.format("ll")}</li>
              <li>{this.state.values.address}</li>
              <li>{this.state.values.complement}</li>
            </ul>
          </div>
        )
      default:
        return 'Unknown step';
    }
  };

  render() {
    const { session } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    if (!session.signedIn && !session.isLoading) {
      browserHistory.push('/users/sign_in');
      return null;
    }
    else {
      return (
        <div className='container'>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <div>
            {activeStep === steps.length ? (
              <div>
                <span>
                  Seu pedido de agendamento foi solicitado, entraremos em contato! <br/>
                  Obrigado pela preferência
              </span>
              </div>
            ) : (
                <React.Fragment>
                  <form>
                    {this.getStepContent(activeStep)}
                    <div className="row">
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                      >
                        Voltar
                      </Button>

                      <div className="ml-auto">
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={this.handleNext}
                        >
                          {activeStep === steps.length - 1 ? 'Finalizar' : 'Avançar'}
                        </Button>
                      </div>
                    </div>
                  </form>
                </React.Fragment>
              )}
          </div>
        </div>
      )
    }
  }
}

export default BookingsNew;

function getSteps() {
  return ['Escolha a data que melhor se encaixa para você', 'Conte-nos como podemos chegar até você', 'Revise e confirme as informações inseridas'];
}
