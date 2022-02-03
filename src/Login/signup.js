import React from 'react';
import './login.css';

class signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn: false,
            email: null,
            password: null
        }
    }
    onInput = event => {
        this.setState({ [event.target.name]: event.target.value });
      }
    onSignupClick = e => {
        e.preventDefault();
        const { email, password,firstName,lastName} = this.state;
        fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ email, password ,firstName,lastName}),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(res => {
          if (res.status === 201 || res.status ===204) {
            fetch('/api/sessions/', {
              method: 'POST',
              body: JSON.stringify({ email, password }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8'
              }
            }).then(window.location = '../').catch((error)=>{console.log(error);})
          }else{
            res.json().then((data)=>{
              console.log(data.error);
            window.alert(data.error);}
            )
          }
          }).catch((error)=>{window.alert(error)});
      }
    render() {
        return (<div className="loginPage">
            <form  id="signup" onSubmit={this.onSignupClick}>
              <div className="formcontainer">

              <label htmlFor="firstName"><b>First Name</b></label>
                <input type="text" style={{backgroundColor:"white"}} id="firstName" placeholder="Enter First Name" name="firstName"  onInput={this.onInput} required/>

                <label htmlFor="lastName"><b>Last Name</b></label>
                <input type="text" id="lastName" style={{backgroundColor:"white"}} placeholder="Enter Last Name" name="lastName"  onInput={this.onInput} required/>

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" id="email" placeholder="Enter Emal" name="email"  onInput={this.onInput} required/>
            
                <label htmlFor="password"><b>Password</b></label>
                <input type="password" id="password" placeholder="Enter Password" name="password"  onInput={this.onInput} required/>
                    
                <input type="submit" className="button" onclick={this.onSignupClick} value="Sign up"></input>
              </div>
            </form>
            <a type="button" className="btn" href="../login" style={{backgroundColor:"transparent", color:"black", textDecorationLine:"none", color:"white", margin:"10px"}} >already have an account?Login</a>
            </div>);
    }
}
export default signup;