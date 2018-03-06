import 'react-dates/initialize';
import React, { Component } from 'react'

import { browserHistory } from 'react-router';

import { inject, observer } from 'mobx-react';

import moment from 'moment'
import 'moment/locale/pt-br.js';

import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

import './New.scss';

import Location from 'material-ui-icons/LocationOn';
import Date from 'material-ui-icons/DateRange';
import Timer from 'material-ui-icons/Timer';
import People from 'material-ui-icons/People';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
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
        <div className="info-container">
          <div className="section-title">Informações para o translado</div>
          <ul className='list-unstyled'>
            <li className="info-input">
              <TextField
                name='address'
                fullWidth
                label='Hotel / Endereço'
                value={this.state.values.address}
                onChange={(e) => this.change(e)}
              />
            </li>
            <li className="info-input">
              <TextField
                name='complement'
                fullWidth
                label='Complemento'
                value={this.state.values.complement}
                onChange={(e) => this.change(e)}
              />
            </li>
          </ul>
        </div>
      )
    } else {
      return null;
    }
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className="">
            <div className="steps-container">
              <span className="current">1. Agendamento</span><span className="next"> > 2. Detalhes do Titular > 3. Confirmação </span>
            </div>
            <div className="info-container">
              <div className="info-label">Selecione a Data</div>
              {/* // https://github.com/airbnb/react-dates */}
              <SingleDatePicker
                transitionDuration = {0}
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
            <div className="info-container">
              <div className="info-label">Selecione o Número de Pessoas</div>
              <TextField
                className=""
                fullWidth
                type='number'
                name='adults'
                value={this.state.values.adults}
                onChange={e => this.change(e)}
                inputProps={{
                  min: 1
                }}
              />
            </div>
          </div>
        )
      case 1:
        return (
          <div className="">
            <div className="steps-container">
              <span className="completed">1. Agendamento > </span><span className="current">2. Detalhes do Titular</span><span className="next"> > 3. Confirmação </span>
            </div>
            <div className="info-container">
              <ul className='list-unstyled'>
                <li className="info-input">
                  <TextField
                    fullWidth
                    required
                    name='name'
                    label='Nome Completo'
                    value={this.state.values.name}
                    onChange={(e) => this.change(e)}
                  />
                </li>
                <li className="info-input">
                  <TextField
                    required
                    fullWidth
                    name='email'
                    label='Email'
                    value={this.state.values.email}
                    onChange={(e) => this.change(e)}
                  />
                </li>
                <li className="info-input">
                  <TextField
                    required
                    fullWidth
                    name='phone'
                    label='Telefone'
                    value={this.state.values.phone}
                    onChange={(e) => this.change(e)}
                  />
                </li>
              </ul>
            </div>
            <div>
              {this.renderTransfer()}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="confirmation-section">
            <div className="steps-container">
              <span className="completed">1. Agendamento > 2. Detalhes do Titular ></span><span className="current"> 3. Confirmação </span>
            </div>
            <div className="section-container">
              <div className="section-title">Seu Agendamento</div>
              <ul className="list-unstyled">
                <li>Data: {this.state.values.dates.format("ll")}</li>
                <li>Quantidade de Pessoas: {this.state.values.adults}</li>
              </ul>
            </div>
            <div className="section-container">
              <div className="section-title">Detalhes do Titular</div>
                <ul className="list-unstyled">
                  <li>Nome: {this.state.values.name}</li>
                  <li>Email: {this.state.values.email}</li>
                  <li>Telefone: {this.state.values.phone}</li>
                  <li>{this.state.values.address}</li>
                  <li>  {this.state.values.address}</li>
                </ul>
            </div>
            <div className="section-container">
              <div className="section-title">Observações</div>
              <ul>
                  { () => {
                    if (this.props.experience.selected.has_transfer) {
                      return <li>{this.props.experience.selected.has_transfer}</li>
                    }
                 } }
                 { () => {
                   if (this.props.experience.selected.payment_method) {
                     return <li>{this.props.experience.selected.payment_method}</li>
                   }
                } }
                { () => {
                  if (this.props.experience.selected.cancelation) {
                    return <li>{this.props.experience.selected.cancelation}</li>
                  }
               } }
              </ul>
            </div>
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
          <div className='row'>
            <div className='col-md-8 col-sm-12'>
              {this.getStepContent(activeStep)}
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
                      <div className="flow-container text-center">
                        <Button
                          className="m-3"
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                        >
                          Voltar
                        </Button>
                        <Button
                          className="m-3"
                          variant="raised"
                          color="primary"
                          onClick={this.handleNext}
                        >
                          {activeStep === steps.length - 1 ? 'Confirmar' : 'Avançar'}
                        </Button>
                      </div>
                    </form>
                  </React.Fragment>
                )}
            </div>
            <div className='col-sm-4'>
              <Paper elevation={6} style={{ borderRadius: "4px" }} className="p-3 mb-5">
                <ul className="list-unstyled">
                  <li className="title">{this.props.experience.selected.name}</li>
                  <li className=""><span className="icon"><Location fontSize /> </span><span className="icon-text">{this.props.experience.selected.location}</span></li>
                  <li className=""><span className="icon"><Date fontSize /> </span><span className="icon-text">{this.state.values.dates.format("ll")}</span></li>
                  <li className=""><span className="icon"><People fontSize /> </span><span className="icon-text">{this.state.values.adults}</span></li>
                </ul>
                <div>
                  <div></div>
                  <div>{this.props.experience.selected.cost}</div>
                </div>
                <div className="confirm-container">
                  <Button
                    variant="raised"
                    fullWidth
                    color="primary"
                    onClick={this.handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Confirmar' : 'Avançar'}
                  </Button>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default BookingsNew;

function getSteps() {
  return ['Datas', 'Detalhes', 'Confirmar'];
}
