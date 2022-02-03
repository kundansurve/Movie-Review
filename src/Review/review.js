import React from 'react';
import './review.css';
import { Link } from 'react-router-dom';


function Revinfo(props){
    if(props.user){
        const delrev=()=>{
            try{
                const delpath='../api/reviews/review/delete/'+props._id;
                alert(delpath);
                fetch(delpath, {
                        method: 'DELETE'
                      }).then(window.location.reload());
            }catch(err){
                alert(err);
            }
        }
        return (<div className="userReview" id="loggerrev">
                    <h4 className="revivwer">{props.name.substring(0,props.name.lastIndexOf("@"))}</h4>
                    <div className="detailReview">
                        <p>Ratings:{props.ratings}</p>
                        <p>{props.info}</p>
                    </div>
                    <button className="bin" onClick={delrev}><img  src="https://img.icons8.com/material-sharp/24/ffffff/delete-forever.png"/></button>
                </div>);
    }
    return (<div className="userReview">
    <h4 className="revivwer">{props.name.substring(0, props.name.lastIndexOf("@"))}</h4>
    <div className="detailReview">
        <p>Ratings:{props.ratings}</p>
        <p>{props.info}</p>
    </div>
    </div>); 
}
class review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:props.user,
            userReview:[],
            allReviews: [],
            MovieInfo: {},
            ratings:"",
            moviereview:""
        }
    }
        componentDidMount() {
            try{
                fetch("../api/movies/id"+ window.location.pathname)
                        .then(response => response.json())    
                        .then((data) => {
                            this.setState({
                                MovieInfo:data
                            });
                        })
            } catch(err){
                alert(err);
            }

            try{
                fetch("../api/users/me")
                .then(response=>response.json())
                .then((u) => {
                    if(u.email){
                    this.setState({
                        user: u
                    });    
                    }else{
                    this.setState({
                        user: this.props.user
                    });
                    }
                fetch("../api/reviews"+ window.location.pathname)
                .then(response => response.json())
                .then(
                    (data)=>{
                        const userReview=[]
                        const allReviews=[]
                        for(let e of data){
                            if(e.email==this.state.user.email){
                                userReview.push(e);
                            }else{
                                allReviews.push(e);
                            }
                        }
                        this.setState({
                            userReview,
                            allReviews});
                        });        
                })
            }catch (err) {
                
                this.setState({
                    user: this.props.user
                });
            }

            try{
                fetch("../api/reviews"+ window.location.pathname)
                .then(response => response.json())
                .then(
                    (data)=>{
                        const userReview=[]
                        const allReviews=[]
                        for(let e of data){
                            if(e.email==this.state.user.email){
                                userReview.push(e);
                            }else{
                                allReviews.push(e);
                            }
                        }
                        this.setState({
                            userReview,
                            allReviews});
                        });
            }catch(error){
                alert(error);
                console.log(error);
            }
    }
    onInput = event => {
        if(event.target.name==="ratings"){
            if(event.target.value>10 || event.target.value<0){
                event.target.value=parseInt(event.target.value)%11;
                return;
            }
        }
        this.setState({ [event.target.name]: event.target.value });
      }

    addrev=e=>{
        try{
            const {ratings,moviereview}=this.state;
            const email=this.state.user.email;
            const movieid=this.state.MovieInfo.imdb_id;
            fetch('../api/reviews/review/create/'+movieid, {
                    method: 'POST',
                    body: JSON.stringify({ email,ratings,review:moviereview }),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8'
                    }
                  }).then(setTimeout(()=>{window.location.reload()},1000));
            }catch(err){
                alert(err);
            }
    }
    
    gotologin=e=>{
        window.open( "../login");
    }
    render() {
        return (<div className="reviewPage">
            <div className="movieDetails">
                <img className="movieImage" src={this.state.MovieInfo.poster_path} alt={this.state.MovieInfo._id}/>
                <p className="movieName"><h3>{this.state.MovieInfo.title}</h3></p>
            <p><h4>Release Date:</h4> {this.state.MovieInfo.release_date} <h4>Ratings:</h4> {this.state.MovieInfo.ratings}</p>
                <p ><h4>Geners:</h4> {this.state.MovieInfo.geners}</p>
                <h4 className="textalign">Actors:</h4> 
                <p>{this.state.MovieInfo.actors}</p>
                <h4 className="textalign">Story:</h4>
                <p className="movieInfo"> {this.state.MovieInfo.story}</p>
            </div>
            <div className="container">
            <p><h4>Reviews:</h4></p>
            <div className="reviews">
                
                {this.state.userReview.map((value) => {
                    return <Revinfo name={value.email} _id={value._id} ratings={value.ratings} info={value.review}  oninput={this.state.onInput} user={true}/>
                })}
                {this.state.allReviews.map((value) => {
                    return (<Revinfo name={value.email} _id={value._id} ratings={value.ratings} info={value.review} oninput={this.state.onInput}/>);
                }
                )}
            </div>
            {(this.state.userReview=="" )?
            <div className="Addreview" >
              <div className="rev">
                <label htmlFor="ratings"><b>Ratings</b></label>
                <span>
                <input type="number" id="ratings" placeholder="10" name="ratings" min="0" max="10" onInput={this.onInput} required/>
                </span>
                <label htmlFor="moviereview"><b>Review</b></label>
                <span>
                <input type="text" id="moviereview" placeholder="Enter Review" name="moviereview"   onInput={this.onInput} required/>
                </span>
              </div>
              {(this.state.user=="")?(<Link to={"../login"}><a style={{color:"white",textDecorationLine:""}}>Add Review</a></Link>):(<button onClick={this.addrev}>Add review</button>)}
            </div>:null}
        </div>
        </div>);
    }
}
export default review;