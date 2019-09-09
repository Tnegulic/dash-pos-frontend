import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Redirect } from 'react-router'

function reload(){
  window.location.reload();
}

class Login extends Component {

constructor(props){
  super(props);
  this.state={
  username:'',
  password:'',
  error:false,
  redirect:false,
}
 }


 handleClick(event){
   var apiBaseUrl = "http://35.198.179.83/";
   var self = this;
   var payload={
   "username":this.state.username,
   "password":this.state.password
   }

  var instance = axios.create({
           baseURL: apiBaseUrl,
           timeout: 2000,
       });
  console.log(this.state.username);

  instance.post('rest-auth/login/ ', {
    username: payload.username,
    password: payload.password,
  })
  .then(function (response) {
    //dohvacanje tokena i spremanje u session
    console.log(JSON.stringify(response) + "TOKEN");
    window.sessionStorage.setItem("key", response.data.key);
    console.log(window.sessionStorage.getItem("key"));
    window.sessionStorage.setItem("username", payload.email);
    self.setState({redirect:true});

  })
  .catch(function (error) {
    console.log(error + "ERRRRRRor");
    //window.alert("Login failed: wrong username or password"); RADII malo uljepsati error msg
    self.setState({error:true});
  });

}

render() {

    let err_msg;
    if(this.state.error){
      err_msg = <p> Error: wrong username or password</p>
    }else{
      err_msg = <p></p>
    }
    if (this.state.redirect) {
        return <Redirect push to="/dashboard" />;

      }
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <span>{err_msg}</span>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};

export default Login;
