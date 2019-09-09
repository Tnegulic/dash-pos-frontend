import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

function SimpleTable(props) {
  const { classes } = props;
  console.log(props.cards)

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Proizvod {}</TableCell>
            <TableCell align="right">Cijena HRK</TableCell>
            <TableCell align="right">Cijena DASH</TableCell>
	    <TableCell align="right">Br. Aparata</TableCell>
	    <TableCell align="right">Datum transakcije</TableCell>
      <TableCell align="right">Vrijeme transakcije</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cards.map(n => (
            <TableRow key={n.pk}>
              <TableCell component="th" scope="row">
                {n.product}
              </TableCell>
              <TableCell align="right">{n.amount} kn</TableCell>
              <TableCell align="right">{n.dash_amount}</TableCell>
	      <TableCell align="right">{n.machine + "   "}
        </TableCell>
	      <TableCell align="right">{n.time.slice(0,10)} </TableCell>
        <TableCell align="right">{n.time.slice(11,19)} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
