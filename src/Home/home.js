import { fireEvent } from '@testing-library/react';
import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './home.css';


function Movie(props) {
    if (props.img == "" || props.img == null) props.img = "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6";
    if (props.img == "" || props.img == null) props.rating = "Unavailable";
    return (<div className="movieBox">
        <Link to={"/"+props.imdbid}>
        <img onError={(ev) => { ev.target.src = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6'; }} src={props.img} alt={props.name} /></Link>
        <div className="movie">
            <h2>{props.name}</h2>
            <h2>{props.info}</h2>
            <h2>Ratings:{props.rating}</h2>
        </div>
    </div>);
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
                        Movies: data
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
            this.setState({ Movies: searched })
        }
        return (<div className="home">
    <div className="search">
                        <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={(e) => { searchData(e) }} />
                    </div>
            <div className="movieList">
                {this.state.Movies.map((movieobj) => {
                    if(!movieobj.title)return;
                    return (<Movie imdbid={movieobj.imdb_id} name={movieobj.title} id={movieobj.id} info={movieobj.geners} rating={movieobj.rating} img={movieobj.poster_path}/>);
                }
                )}
            </div>
        </div>);
    }
}
export default home;