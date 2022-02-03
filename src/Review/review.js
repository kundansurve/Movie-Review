import React from 'react';
import './review.css';
import { Link } from 'react-router-dom';


function Revinfo(props){
    if(props.user){
        const delrev=()=>{
            try{
                const delpath='../api/reviews/review/delete/'+props._id;
                fetch(delpath, {
                        method: 'DELETE'
                      }).then(window.location.reload());
            }catch(err){
                alert(err);
            }
        }
        return (<div className="testimonial">
            <img className="deletebtn"  onClick={delrev} src="https://img.icons8.com/material-sharp/24/ffffff/delete-forever.png"/>
            <h4>Rating: {props.ratings}/10</h4>
            <p className="testimonial__text" style={{textAlign:"start"}}>
                {props.info}
            </p>
            <div className="testimonial__details">
                <div className="testimonial__info">
                    <h4 className="testimonial__name">{props.name}</h4>
                </div>
            </div>
        </div>);
    }
    return (<div className="testimonial">
    <h4>Rating: {props.ratings}/10</h4>
    <p className="testimonial__text">
        {props.info}
    </p>
    <div className="testimonial__details">
        <div className="testimonial__info">
            <h4 className="testimonial__name" style={{textAlign:"start"}}>{props.name}</h4>
        </div>
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
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap",width:"100%"}}>
                    <div><img className="movieImage" src={this.state.MovieInfo.poster_path} alt={this.state.MovieInfo._id}/>
                    </div>
                    <div style={{width:"100%",maxWidth:"500px"}}> 
                    <h1>{this.state.MovieInfo.title}</h1>
                    <div className="circ-chart">
        <svg viewBox="0 0 36 36" className="circular-chart">
      <path className="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path className="circle"
        stroke-dasharray={`${this.state.MovieInfo.ratings*10}, 100`}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" className="percentage">{this.state.MovieInfo.ratings}</text>
    </svg>
  </div>

                </div>
                </div>
                
            </div>
            <div className="container" style={{maxWidth:"900px"}}>
            <h2 className="has-text-white" style={{marginLeft:"1em",color:"#f40612",paddingLeft:"0px",marginTop:"1em"}}>
                    <br/>Release Date: </h2><br/><p >{this.state.MovieInfo.release_date} </p> 
                <h2 className="has-text-white" style={{marginLeft:"1em",color:"#f40612",paddingLeft:"0px",marginTop:"1em"}}>Geners:</h2><br/><p>{this.state.MovieInfo.geners}</p> 
                <h2 className="has-text-white" style={{marginLeft:"1em",color:"#f40612",paddingLeft:"0px",marginTop:"1em"}}>Actors:</h2><br/>
                <p>{this.state.MovieInfo.actors}</p>
            <h2 className="has-text-white" style={{marginLeft:"1em",color:"#f40612",paddingLeft:"0px",marginTop:"0px"}}>Story</h2>
                <p className="movieInfo" style={{wdith:"95%"}}> {this.state.MovieInfo.story}</p>
                <h2 className="has-text-white" style={{marginLeft:"1em",color:"#f40612",paddingLeft:"0px",marginTop:"0px"}}>Reviews</h2>
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
                  Rate:
              <form className="rating">
  <label>
    <input className="rate" type="radio" name="ratings" value="1" onClick={this.onInput}/>
    <span className="icon">★</span>
  </label>
  <label>
    <input  className="rate" type="radio" name="ratings" value="2" onClick={this.onInput} />
    <span className="icon">★</span>
    <span className="icon">★</span>
  </label>
  <label>
    <input  className="rate" type="radio" name="ratings" value="3" onClick={this.onInput}/>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>   
  </label>
  <label>
    <input className="rate" type="radio" name="ratings" value="4" onClick={this.onInput}/>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
  </label>
  <label>
    <input  className="rate" type="radio" name="ratings" value="5" onClick={this.onInput} />
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
  </label>
  <label>
  <input  className="rate" type="radio" name="ratings" value="6" onClick={this.onInput}/>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
  </label>
  <label>
<input  className="rate" type="radio" name="ratings" value="7" onClick={this.onInput} />
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
  </label>
  <label>
<input  className="rate" type="radio" name="ratings" value="8" onClick={this.onInput} />
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
<span   className="icon">★</span>
  </label>
  <label>
<input className="rate" type="radio" name="ratings" value="9" onClick={this.onInput} />
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
  </label>
  <label>
<input  className="rate" type="radio" name="ratings" value="10" onClick={this.onInput} />
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
    <span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
  </label>
</form>
                <label htmlFor="moviereview"><b>Review</b></label>
                <span>
                <textarea type="text" id="moviereview"  style={{backgroundColor:"white",color:"black",paddingLeft:"1em"}} placeholder="Enter Review" name="moviereview"   onInput={this.onInput} required/>
                </span>
              </div>
              {(this.state.user=="")?(<Link to={"../login"}><button style={{color:"white",textDecorationLine:"",borderRadius:"5px",backgroundColor:"#f40612"}}>Add Review</button></Link>):(<button onClick={this.addrev} style={{color:"white",textDecorationLine:"",borderRadius:"5px",backgroundColor:"#f40612"}}>Add review</button>)}
            </div>:null}
        </div>
        </div>);
    }
}
export default review;