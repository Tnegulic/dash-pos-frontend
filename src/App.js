import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Transactions from './Transactions'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
<Route
  {...rest}
  render={props =>
    window.sessionStorage.getItem("key") ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/",
          state: { from: props.location }
        }}
      />
    )
  }
/>
);

function App() {
  return (
    <Router>
    <div className="App">
      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
    <Route exact path="/" component={Login}/>
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/transactions" component={Transactions} />

    </div>
    </Router>
  );
}

export default App;
