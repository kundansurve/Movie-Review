import React from 'react';
import './login.css';

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn: false,
        }
    }
    render() {
        return (<div className="loginPage">
            <form action="" method="post">
              <div className="container">
                <label htmlFor="uname"><b>Username</b></label>
                <input type="text" id="uname" placeholder="Enter Username" name="uname" required/>
            
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" id="psw" placeholder="Enter Password" name="psw" required/>
                    
                <button type="submit">Login</button>
              </div>
            
              <div className="container" >
                <button type="button" className="cancelbtn">Cancel</button>
                <span className="psw">Forgot <a href="/">password?</a></span>
              </div>
            </form>
            </div>);
    }
}
export default login;