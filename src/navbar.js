import React, { Component } from 'react'
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user:""
        };
        try{
            fetch("http://localhost:4000/api/users/me")
            .then(response => response.json())
            .then((data) => {
            if(data){
                this.setState({
                    user: data
                });
            }
        });}catch (err) {
            console.log(err);
        }   
    } 
    Logout=()=>{
        if(this.state.user!==""){
            fetch("http://localhost:4000/api/users/me").
            then(console.log("Successfully Logout"))
            .then(this.setState({user:""}));
        }
    }
    menu=()=>{
        if(this.state.user===""){
            return <Link to={"./login"}><a>Login</a></Link>;
        }
        return (<div class="dropdown">
        <button class="dropbtn"><img src="https://img.icons8.com/material/48/000000/user-male-circle--v1.png"/>{this.state.user.firstName}
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="#">logout</a>
        </div>
      </div>);
    }
    render(){
        return 
        <div>
            
      </div>
    }
}

export default Navbar;