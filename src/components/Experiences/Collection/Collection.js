import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import VisibilityIcon from 'material-ui-icons/Visibility';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

import { browserHistory } from 'react-router';

import { Link } from 'react-router';

import { inject, observer } from 'mobx-react';

@inject('experience') @observer
class Collection extends Component {
  componentDidMount() {
    const { experience } = this.props;

    experience.findAll();
  }
  render() {
    const { collection, isLoading } = this.props.experience;
    if (isLoading){
      return <CircularProgress className="mr-auto ml-auto" style={{ color: purple[500] }} thickness={7} />;
    }
    return (
      <div>
        <Link to='experiences/new/'>Nova experiência</Link>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell numeric>id</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell numeric>Preço</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Recomendada</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collection.slice().map(n => {
                return (
                  <TableRow key={n.id} hover>
                    <TableCell numeric>{n.id}</TableCell>
                    <TableCell>{n.name}</TableCell>
                    <TableCell numeric>{n.price}</TableCell>
                    <TableCell>Praias</TableCell>
                    <TableCell>Sim</TableCell>
                    <TableCell>
                      <Tooltip id="tooltip-icon" title="Mostrar">
                        <IconButton aria-label="Mostrar">
                          <VisibilityIcon onClick={() => browserHistory.push(`/experiences/${n.id}`)} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip id="tooltip-icon" title="Editar">
                        <IconButton aria-label="Editar">
                          <ModeEditIcon onClick={() => browserHistory.push(`/experiences/${n.id}/edit`)} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip id="tooltip-icon" title="Deletar">
                        <IconButton aria-label="Deletar">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default Collection;