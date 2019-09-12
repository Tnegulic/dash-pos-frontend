import React from 'react';
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
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import TextField from '@material-ui/core/TextField';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class Dashboard extends React.Component {
  state = {
    open: true,
    transactions: [],
    machines: [],
    capacities: [],
    dashboardopen: true,
    profit: [],
    name:"",
    location:"",
    type:"",
  };
  //handleChange = handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  componentDidMount() {
    this.getData();
    this.getMachines();
    this.getCapacities();

  }

  render() {
    let content
    const { classes } = this.props;
    if (!this.state.dashboardopen) {
      content =<main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Typography variant="h4" gutterBottom component="h2">
                  Ukupni promet u kunama
                </Typography>
                <Typography component="div" className={classes.chartContainer}>
                  <SimpleLineChart data={this.state.profit}/>
                </Typography>

                <Typography variant="h4" gutterBottom component="h2">
                  Transakcije
                </Typography>
                <div className={classes.tableContainer}>
                  <SimpleTable cards={this.state.transactions} />
                </div>
              </main>;
    } else {
      content =<main className={classes.content}>
                <div className={classes.appBarSpacer} />

                  <Typography variant="h4" gutterBottom component="h2">
                    Aparati
                  </Typography>
                  <MachineTable cards={this.state.machines} capacities={this.state.capacities} />
                  <div id="div_trans">
                  <Typography variant="h4" gutterBottom component="h2">
                    Dodavanje aparata
                  </Typography>
                  <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    id="name"
                    label="Naziv aparata:"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange}
                    margin="normal"
                    />
                    <TextField
                      id="type"
                      label="Tip:"
                      className={classes.textField}
                      value={this.state.type}
                      onChange={this.handleChange}
                      margin="normal"
                      />
                  <TextField
                    id="location"
                    label="Lokacija:"
                    className={classes.textField}
                    value={this.state.location}
                    onChange={this.handleChange}
                    margin="normal"
                    />
                  <Button  variant="outlined" size="small" color="primary" onClick={this.handleSubmit} className={classes.margin}>
                    Dodaj
                  </Button>
                  </form>

                </div>
                </main>;
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Kontrolna ploča
            </Typography>
            <IconButton color="inherit" onClick={this.logout}>
            <Typography
              component="h2"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Odjava
            </Typography>
                <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
          <div>
            <ListItem button onClick={ () => {this.setState({dashboardopen:true})} }>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Aparati" />
            </ListItem>
            <ListItem button onClick={ () => {this.setState({dashboardopen:false})} }>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Statistika" />
            </ListItem>
            <ListItem button onClick={this.logout}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Odjava" />
            </ListItem>
          </div>
          </List>
          <Divider />
        </Drawer>

        {content}

      </div>
    );
  }

  handleSubmit(event){

    event.preventDefault();
    console.log(this.state.location);
    var token = window.sessionStorage.getItem("key")
    var instance = axios.create({
             baseURL: "http://35.198.179.83/",
             timeout: 2000,
             headers: {'Authorization': "Token "+ token}

         });

    instance.post('/vending/machines/create/',{
      location: this.state.location,
      model_number: this.state.type,
      name: this.state.name,
      working: true,
    })
     .then(function (response) {
        console.log(response.data + "USER INFO");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
      //window.location.reload();
  }

  getData(){
    //funkcija dohvaća transakcije

    var token = window.sessionStorage.getItem("key")
    var self = this;

    var instance = axios.create({
             baseURL: "http://35.198.179.83/",
             timeout: 2000,
             headers: {'Authorization': "Token "+ token}

         });

    instance.get('vending/purchases/')
     .then(function (response) {

        console.log(response);

        self.setState({transactions:response.data.results});
        self.totalProfit();
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  getMachines(){
    //funkcija dohvaća sve aparate
    var token = window.sessionStorage.getItem("key")
    var self = this;
    var instance = axios.create({
             baseURL: "http://35.198.179.83/",
             timeout: 2000,
             headers: {'Authorization': "Token "+ token}
         });
    instance.get('vending/machines/')
     .then(function (response) {
        console.log(response.data);
        self.setState({machines:response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

getCapacities(){
    //funkcija dohvaća sve aparate
    var token = window.sessionStorage.getItem("key")
    var self = this;
    var instance = axios.create({
             baseURL: "http://35.198.179.83/",
             timeout: 2000,
             headers: {'Authorization': "Token "+ token}
         });
    instance.get('vending/machines/capacities/lei600/')
     .then(function (response) {
       console.log("spremnici")
        console.log(response.data);
        self.setState({capacities:response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  totalProfit(){
    console.log("calculating total profit");
    console.log(this.state.transactions[0]);

    var date = new Date()
    var counter = 0;
    var i = 0;
    var totalProfitData = [0,0,0,0,0,0,0];
    var t;
    //date.setDate(date.getDate());
    while (counter < 7){
      t = this.state.transactions[i];
      console.log(counter);
      if (t.time.slice(0,10) == date.toISOString().slice(0,10)){

        totalProfitData[counter] += t.amount;
        i++;
        console.log("sucess")
      }
      else{
        console.log(t.time);
        console.log(date.toISOString());
        counter ++;
        date.setDate(date.getDate() - 1);
      }
    }
    console.log(totalProfitData);

    var totalProfit = []
    var date = new Date();
    for(i=6;i>=0;i--){
      totalProfit[i] = {name: date.toISOString().slice(0,10), promet: totalProfitData[6-i] }
      date.setDate(date.getDate() - 1);
    }
    console.log(totalProfit);
    this.setState({ profit: totalProfit });
  }


  logout(){
    var apiBaseUrl = "http://35.198.179.83/";

    var instance = axios.create({
             baseURL: apiBaseUrl,
             timeout: 2000,
         });

    instance.post('rest-auth/logout/ ')
    .then(function (response) {
      console.log(JSON.stringify(response) + "LOGOUT");
      sessionStorage.clear();
      window.location.reload();

    })
    .catch(function (error) {
      console.log(error + "ERRRRRRor");
    });
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
