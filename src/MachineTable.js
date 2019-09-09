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
import WarningIcon from '@material-ui/icons/Warning';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SimpleTable from './SimpleTable';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Transactions from './Transactions';



const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

function resetMachine(pk,status){
    console.log("reseted")
    var token = window.sessionStorage.getItem("key")
    var apiBaseUrl = "http://35.198.179.83/";

    var instance = axios.create({
            baseURL: apiBaseUrl,
            timeout: 2000,
            headers: {'Authorization': "Token "+ token}
        });
   console.log('vending/machines/' + pk + '/');

   instance.patch('vending/machines/' + pk + '/', {
    working: !status,
  });

}


function reset(pk,param,max){
  console.log("reseted")
  var token = window.sessionStorage.getItem("key")
  var apiBaseUrl = "http://35.198.179.83/";
  var self = this;
  var instance = axios.create({
          baseURL: apiBaseUrl,
          timeout: 2000,
          headers: {'Authorization': "Token "+ token}
      });
 console.log('vending/machines/' + pk + '/');
 if (param == 'cups'){
   instance.patch('vending/machines/' + pk + '/', {
    cups: max,
  });
}else if (param == 'tea_container') {
  instance.patch('vending/machines/' + pk + '/', {
   tea_container: max,
 });
}else if (param == 'coffee_container') {
  instance.patch('vending/machines/' + pk + '/', {
   coffee_container: max,
 });
}else if (param == 'milk_container') {
  instance.patch('vending/machines/' + pk + '/', {
   milk_container: max,
 });
}else if (param == 'chocolate_container') {
  instance.patch('vending/machines/' + pk + '/', {
   chocolate_container: max,
 });
}else if (param == 'water_container') {
  instance.patch('vending/machines/' + pk + '/', {
   water_container: max,
 });
}else if (param == 'irish_container') {
  instance.patch('vending/machines/' + pk + '/', {
   irish_container: max,
 });
}else if (param == 'decaffeinated_container') {
  instance.patch('vending/machines/' + pk + '/', {
   decaffeinated_container: max,
 });
}

}


function MachineTable(props) {
  const { classes } = props;
  var render_transactions = false

  return (
    <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Naziv aparata</TableCell>
            <TableCell align="center">Tip aparata</TableCell>
            <TableCell align="center">Lokacija</TableCell>
	    <TableCell align="center">Br. Čašica</TableCell>
	    <TableCell align="center">Spremnik: Čaj</TableCell>
      <TableCell align="center">Spremnik: Kava</TableCell>
      <TableCell align="center">Spremnik: Mlijeko</TableCell>
      <TableCell align="center">Spremnik: Čokolada</TableCell>
      <TableCell align="center">Spremnik: Irish</TableCell>
      <TableCell align="center">Spremnik: Bezkof. kava</TableCell>
      <TableCell align="center">Spremnik: Voda</TableCell>
      <TableCell align="center">Stanje aparata</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cards.map(n => (
            <TableRow key={n.pk}>
              <TableCell component="th" scope="row">
              <NavLink to={"/transactions?id="+ n.pk} component={Transactions}> {n.name} </NavLink>
              </TableCell>
              <TableCell align="center">{n.model_number}</TableCell>
              <TableCell align="center">{n.location}</TableCell>
	      <TableCell align="center">{ ((n.cups!=0)?n.cups + "/"+ props.capacities.max_cups +"   ":<WarningIcon color="secondary" />)}
        <Button  variant="outlined" size="small" color="primary" onClick={() => reset(n.pk,"cups",props.capacities.max_cups)} className={classes.margin}>
        Reset
        </Button>
        </TableCell>
	      <TableCell align="center">{(n.tea_container!=2)?n.tea_container+ "/"+ props.capacities.max_tea_container +"   ":<WarningIcon color="secondary" />}
        <Button  variant="outlined" size="small" color="primary" onClick={() => reset(n.pk,"tea_container",props.capacities.max_tea_container)} className={classes.margin}>
        Reset
        </Button>
        </TableCell>
        <TableCell align="center">{(n.coffee_container!=0)?n.coffee_container+ "/"+ props.capacities.max_coffee_container +"   ":<WarningIcon color="secondary" />}
        <Button  variant="outlined" size="small" color="primary" onClick={() => reset(n.pk, "coffee_container",props.capacities.max_coffee_container )} className={classes.margin}>
        Reset
        </Button>
        </TableCell>
        <TableCell align="center">{(n.milk_container!=0)?n.milk_container+ "/"+ props.capacities.max_milk_container +"   ":<WarningIcon color="secondary" />}
        <Button  variant="outlined" size="small" color="primary" onClick={() => reset(n.pk, "milk_container",props.capacities.max_milk_container )} className={classes.margin}>
        Reset
        </Button>
        </TableCell>
        <TableCell align="center">{(n.chocolate_container!=0)?n.chocolate_container+ "/"+ props.capacities.max_chocolate_container +"   ":<WarningIcon color="secondary" />}
        <Button  variant="outlined" size="small" color="primary" onClick={() => reset(n.pk, "chocolate_container",props.capacities.max_chocolate_container)} className={classes.margin}>
        Reset
        </Button>
        </TableCell>
        <TableCell align="center">{(n.decaffeinated_container!=0)?n.decaffeinated_container+ "/"+ props.capacities.max_decaffeinated_container +"   ":<WarningIcon color="secondary" />}
        <Button  variant="outlined" size="small" color="primary" onClick={() => reset(n.pk, "decaffeinated_container",props.capacities.max_decaffeinated_container)} className={classes.margin}>
        Reset
        </Button>
        </TableCell>
        <TableCell align="center">{(n.irish_container!=0)?n.irish_container+ "/"+ props.capacities.max_irish_container +"   ":<WarningIcon color="secondary" />}
        <Button  variant="outlined" size="small" color="primary" onClick={() => reset(n.pk, "irish_container",props.capacities.max_irish_container)} className={classes.margin}>
        Reset
        </Button>
        </TableCell>
        <TableCell align="center">{(n.water_container!=0)?n.water_container+ "/"+ props.capacities.max_water_container +"   ":<WarningIcon color="secondary" />}
        <Button  variant="outlined" size="small" color="primary" onClick={() => reset(n.pk, "water_container", props.capacities.max_water_container)} className={classes.margin}>
        Reset
        </Button>
        </TableCell>
        <TableCell align="center">{ ((n.working)?"ON":"OFF") }
        <Button  variant="outlined" size="small" color={ ((n.working)?"secondary":"primary") } onClick={() => resetMachine(n.pk, n.working)} className={classes.margin}>
        { ((n.working)?"TURN OFF":"TURN ON") }
        </Button>
        </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Paper>

    </div>

  );
}

MachineTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MachineTable);
