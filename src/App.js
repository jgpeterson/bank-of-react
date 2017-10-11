
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
//this is the key for everything we're building 
//says import this component, but import it as "Router" aka call it "Router" not "Browser Router"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./components/Home"
import UserProfile from "./components/UserProfile"
import AccountBalance from "./components/AccountBalance"
import Debits from "./components/Debits"
class App extends Component {
  state = {
    accountBalance: 12345.34,
    user: {
      userName: "Bob",
      memberSince: 1950
    },
    debits: []
  }
  displayAllDebits = () => {
    console.log("debits")
    axios.get(`http://localhost:4000/debits`)
      .then((response) => {
        console.log(response)
        this.setState({
          debits: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  componentWillMount() {
    this.displayAllDebits()
  }
  //have to use below to pass in props
  //then use AccountBalanceWrapper in the <Switch> below
  //using this syntax takes state to highestmost level 
  render() {
    const AccountBalanceWrapper = () => {
      return (<AccountBalance accountBalance={this.state.accountBalance} />)
    }
    const UserProfileWrapper = () => {
      return (<UserProfile userName={this.state.user.userName} memberSince={this.state.user.memberSince} />)
    }
    const DebitWrapper = () => {
      return (<Debits id={this.state.debits.id} description={this.state.debits.description} amount={this.state.debits.amount} date={this.state.debits.date} />)
    }
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/account" render={AccountBalanceWrapper} />
          <Route exact path="/user" render={UserProfileWrapper} />
          <Route exact path="/debits" displayAllDebits={this.displayAllDebits} render={DebitWrapper} />
        </Switch>
      </Router>
    );
  }
}
export default App;