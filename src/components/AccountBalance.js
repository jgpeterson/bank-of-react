import React, {Component} from 'react';
import { Link, Redirect } from "react-router-dom"
class AccountBalance extends Component {
    state = {
        redirectToHome: false
    }
    saveSomething = () => {
        console.log("clicked");
        setTimeout(() => {
            this.setState({redirectToHome: true})
        }, 1500)
    }
  render() {
      if(this.state.redirectToHome) {
          return <Redirect to="/" />
      }
    return (
        <div>
            <h2>Account Page</h2>
            <h4>Your balance is ${this.props.accountBalance}</h4>
            <button onClick={this.saveSomething}>Redirect Button</button>
          {/* Balance: {this.props.accountBalance} */}
          <br />
          <Link to="/">Home</Link>
          <br /> <br />
          <Link to="/debits">Debits</Link>
        </div>
    );
  }
}
export default AccountBalance;