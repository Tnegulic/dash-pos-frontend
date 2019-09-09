import React, { Component } from 'react';
import axios from 'axios';
import {Redirect } from 'react-router'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import MachineTable from './MachineTable';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import { hashHistory } from 'react-router';

class Transactions extends Component {

constructor(props){
  super(props);
  this.state={
  id:this.props.location.search.split("=")[1],
  dataT:[],
  }

 }


 componentDidMount() {
   this.getTransactions();

 }

 getTransactions(){
   //funkcija dohvaća transakcije
   this.setState({dataT:[]});
   var token = window.sessionStorage.getItem("key")
   var self = this;

   var instance = axios.create({
            baseURL: "http://35.198.179.83/",
            timeout: 2000,
            headers: {'Authorization': "Token "+ token}
        });
   console.log("dohvacam transakcije za aparat br:" + this.state.id)
   instance.get('vending/purchases/',{
     params:{
       machine:this.state.id
     }

   })
    .then(function (response) {
       console.log(response);
       self.setState({dataT:response.data.results});
     })
     .catch(function (error) {
       console.log(error);
     });
 }

render() {

    return (
      <div>
      <h2>Transakcije s odabranog aparata</h2>
      <Button  variant="outlined" size="small" color="primary" onClick={()=>this.props.history.goBack()} >
      Povratak
      </Button>
      <SimpleTable cards={this.state.dataT} />
      </div>
    );
  }
}


export default Transactions;
