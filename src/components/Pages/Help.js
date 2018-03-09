import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import './Pages.scss';

export default class Help extends Component {
  render() {
    return (
      <div>
        <div className="faq-section">
          <div className="container">
            <div className="m-auto col-sm-8">
              <h2>Perguntas Frequentes</h2>
              <div className="faq-content">
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <span className="summary">Após fazer um agendamento, em quanto tempo recebo a confirmação?</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <span>
                      Em até 24h.
                    </span>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <span className="summary">Como cancelar um agendamento?</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <span>
                    No voucher do agendamento você terá a opção de ver política de cancelamento da atividade escolhida e fazer o cancelamento.
                    </span>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <span className="summary">Como saber se a atividade está realmente agendada?</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <span>
                      Na seção "Meus Agendamentos" você poderá visualizar todos os agendamentos e acessá-los individualmente.
                    </span>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <span className="summary">Como será efetuado o pagamento?</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <span>
                      O pagamento será feito diretamente com o provedor da experiência no dia combinado.
                    </span>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <span className="summary">Quais as formas de pagamento?</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <span>
                      Cada provedor de experiência possui sua própria forma de recebimento, checar na página da experiência as opções oferecidas.
                    </span>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
