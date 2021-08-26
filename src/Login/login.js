import React from 'react';
import './login.css';

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn: false,
            loginpage:true,
            signuppage:false
        }
    }
    onInput = event => {
      this.setState({ [event.target.name]: event.target.value });
    }
    onLoginClick = e => {
      e.preventDefault();
      const { email, password } = this.state;
      fetch('/api/sessions/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(res => {
        console.log(res.body);
        if (res.status === 204) {
          window.location = '../';
        }
      });
    }
    render() {
      return (<div className="loginPage">
            <form action="" onSubmit={this.onLoginClick} id="login" >
              <div className="formcontainer">
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" id="email" placeholder="Enter Email" name="email"  onInput={this.onInput} required/>
            
                <label htmlFor="password"><b>Password</b></label>
                <input type="password" id="password" placeholder="Enter Password" name="password"  onInput={this.onInput} required/>
                    
                <input type="submit" className="button" onclick={this.onLoginClick} value="Login"></input>
              </div>
            </form>
            <a className="btn" href="../signup" style={{backgroundColor:"transparent", textDecorationLine:"none", color:"white", margin:"10px",marginLeft:"0px"}} >Don't have an account?Signup</a>
            </div>);
    }
}
export default login;