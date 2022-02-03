import { fireEvent } from '@testing-library/react';
import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './home.css';
import bgimg from './../bg2.png';


function Movie(props) {
    if (props.img == "" || props.img == null) props.img = "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6";
    if (props.ratings === null || props.numberofRatings<=0) props.ratings = "Nan";
    return (<Link to={"/"+props.imdbid}>
    <div className="moviecard">
    
        <img onError={(ev) => { ev.target.src = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6'; }} src={props.img} alt={props.name}/>
        <div className="moviedescriptions">
        <p>{props.name}</p>
        </div>
        <div className="single-chart">
        <svg viewBox="0 0 36 36" className="circular-chart">
      <path className="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path className="circle"
        stroke-dasharray={`${props.ratings*10}, 100`}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" className="percentage">{props.ratings}</text>
    </svg>
  </div>
    </div>
    </Link>);
}

class home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            LoggedIn:"",
            user:props.user,
            Allmovies: [],
            Movies: []
        }
        try {
            fetch("/api/movies/")
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        LoggedIn: false,
                        Allmovies: data,
                        Movies: data,
                        inputField:"",
                    });
                })
        }
        catch (err) {
            
        }
        try{
            fetch("/api/users/me")
            .then(response => response.json())
            .then((data) => {
            if(data){
                this.setState({
                    LoggedIn: true,
                    user: data
                });
            }else{
                this.setState({
                    LoggedIn: false,
                    user: null
                });
            }
        });}catch (err) {

        }
    }
    render() {
        const searchData=(event)=> {
            let Data = this.state.Allmovies;
            let searched = Data.filter(movie => {
                if(movie["title"]){
                return movie["title"].toLowerCase().startsWith(event.target.value.toLowerCase());}
            });
            this.setState({ Movies: searched ,inputField:event.target.value.toLowerCase()})
        }
        return (<><div className="top">
        <div className="columns">
            <div className="column is-full featured_wrapper p-0" style={{justifyContent:"center",display:"flex",alignItems:"center"}}>
                <img src={bgimg} className="featured" style={{filter: "brightness(30%)"}}/>
                <div className="title_wrapper" style={{display:"flex",flexDirection:"column"}}>
                    <h2 style={{color:"white",zIndex:3,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{marginRight:"0px"}}>Movie</span> <span style={{marginLeft:"2px",color:"#f40612"}}>Review</span></h2>
                <div class="search">
      <input type="text" class="searchTerm" style={{color:"black",paddingLeft:"1em"}}placeholder="Search Movie by Name" onChange={(e) => { searchData(e) }}/>
      <button type="submit" class="searchButton" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <img src="https://img.icons8.com/ios/50/ffffff/search--v1.png" style={{maxHeight:"20px",width:"20px",margin:"0px",padding:"0px"}}/>
     </button>
   </div>
                </div>
            </div>
        </div>
    </div>
    <div className="container" style={{width:"100%"}}>
    {(this.state.inputField!="")?<div className="columns1">
        {this.state.Movies.map((movieobj,index) => {
          if(!movieobj.title)return;
          return (<Movie imdbid={movieobj.imdb_id} numberofRatings={movieobj.numberofRatings} name={movieobj.title} id={movieobj.id} info={movieobj.geners} ratings={movieobj.ratings} img={movieobj.poster_path}/>);
      }
      )}
        </div>:(<>
    <h2 className="has-text-white">Top Rated Movies</h2>
        <div className="columns1">
        {this.state.Movies.map((movieobj,index) => {
          if(!movieobj.title)return;
 
          if(movieobj.ratings<=8){return null;}
          return (<Movie imdbid={movieobj.imdb_id} numberofRatings={movieobj.numberofRatings} name={movieobj.title} id={movieobj.id} info={movieobj.geners} ratings={movieobj.ratings} img={movieobj.poster_path}/>);
      }
      )}
        </div>
    <h2 className="has-text-white">Action Movies</h2>
        <div className="columns1">
        {this.state.Movies.map((movieobj,index) => {
          if(!movieobj.title)return;
 
          
          const list = movieobj.geners.split("|");
          console.log(list)
          for(let i=0;i<list.length;i++){
              if(list[i]=='Action'){
                return (<Movie imdbid={movieobj.imdb_id} numberofRatings={movieobj.numberofRatings} name={movieobj.title} id={movieobj.id} info={movieobj.geners} ratings={movieobj.ratings} img={movieobj.poster_path}/>);
                  break;
              }
          }
          return (null);
      }
      )}
        </div>

        <h2 className="has-text-white">Comedy Movies</h2>
        <div className="columns1">
        {this.state.Movies.map((movieobj,index) => {
          if(!movieobj.title)return;
 
          
          const list = movieobj.geners.split("|");
          console.log(list)
          for(let i=0;i<list.length;i++){
              if(list[i]=='Comedy'){
                return (<Movie imdbid={movieobj.imdb_id} numberofRatings={movieobj.numberofRatings} name={movieobj.title} id={movieobj.id} info={movieobj.geners} ratings={movieobj.ratings} img={movieobj.poster_path}/>);
                  break;
              }
          }
          return (null);
      }
      )}
        </div>

        <h2 className="has-text-white">Romantic Movies</h2>
        <div className="columns1">
        {this.state.Movies.map((movieobj,index) => {
          if(!movieobj.title)return;
 
          
          const list = movieobj.geners.split("|");
          console.log(list)
          for(let i=0;i<list.length;i++){
              if(list[i]=='Romance'){
                return (<Movie imdbid={movieobj.imdb_id} numberofRatings={movieobj.numberofRatings} name={movieobj.title} id={movieobj.id} info={movieobj.geners} ratings={movieobj.ratings} img={movieobj.poster_path}/>);
                  break;
              }
          }
          return (null);
      }
      )}
        </div>

        <h2 className="has-text-white">Biography Movies</h2>
        <div className="columns1">
        {this.state.Movies.map((movieobj,index) => {
          if(!movieobj.title)return;
 
          const list = movieobj.geners.split("|");
          console.log(list)
          for(let i=0;i<list.length;i++){
              if(list[i]=='Biography'){
                return (<Movie imdbid={movieobj.imdb_id} numberofRatings={movieobj.numberofRatings} name={movieobj.title} id={movieobj.id} info={movieobj.geners} ratings={movieobj.ratings} img={movieobj.poster_path}/>);
                  break;
              }
          }
          return (null);
      }
      )}
        </div></>)}
    </div></>);
    }
}
export default home;