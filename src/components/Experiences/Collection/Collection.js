import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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
    return (
      <div>
        <Link to ='experiences/new/'>Nova experiência</Link>
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
                return(
                  <TableRow key={n.id} hover>
                    <TableCell numeric>{n.id}</TableCell>
                    <TableCell>{n.name}</TableCell>
                    <TableCell numeric>{n.price}</TableCell>
                    <TableCell>Praias</TableCell>
                    <TableCell>Sim</TableCell>
                    <TableCell>
                      <Link to={`/experiences/${n.id}/edit`} style={{margin: 5}}>Editar</Link>
                      <Link to={`/experiences/${n.id}`} style={{margin: 5}}>Exibir</Link>
                      <Link to={`/experiences/${n.id}`} style={{margin: 5}}>Deletar</Link>
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