import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Home from './Home/home';
import Login from './Login/login';
import signup from './Login/signup';
import ReviewPage from './Review/review';

class MAinbody extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          user:""
      };
        
  }
  componentDidMount(){

    try{
      fetch("/api/users/me")
      .then(response => response.json())
      .then((data) => {
      if(data){
          this.setState({
              user: data
          });
      }
  });}catch (err) {
      
    }   
  } 
  Logout=()=>{
      if(this.state.user!=""){
          fetch("/api/sessions/me", {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }).
          then(window.location = '../')
      }
      document.querySelector(".logout").style.display="none";
  }
  ll=()=>{
    if(document.querySelector(".dropdown-content").style.display=="none")
    document.querySelector(".dropdown-content").style.display="Block";
    else{
      document.querySelector(".dropdown-content").style.display="none";
    }
  }
  menu=()=>{
      if(this.state.user===""){
          return <Link to={"./login"}><a>Login</a></Link>;
      }
      
      return (<div class="dropdown">
      <button class="dropbtn"><img style={{zIndex:"6",backgroundColor:"white"}} src="https://img.icons8.com/material/48/000000/user-male-circle--v1.png"/>{this.state.user.firstName}
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <button onClick={this.Logout}>logout</button>
    </div>
  </div>);
  }
  render(){
      return <div style={{minHeight:"850px", backgroundColor: "rgba(0,0,0,0.7)",backdropFilter: "blur(1px)"}}>
        <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL.*/}
        <div class="navbar" >
            <h2>Movie Review</h2>
            {this.menu()}
        </div>

        <Switch>
        <Route exact path="/"><Home user={this.state.user}/></Route>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={signup}/>
        <Route exact path="/:movieid" component={ReviewPage}> <ReviewPage user={this.state.user}/></Route>
        </Switch>
    </Router>
    </div>
  }
}
ReactDOM.render(<MAinbody/>,document.querySelector('#root'));

