import React from 'react';
import './home.css';

function Movie(props) {
    return  (<div className="movieBox">
                <img src={props.img} alt={props.name}/>
                <div className="movie">
                    <h4>{props.name}</h4>
                    <p className="movieInfo">{props.info}</p>
                    <h5>Ratings:{props.ratings}</h5>
                </div>
            </div>);
}
class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn: false,
        }
    }
    render() {
        return (<div className="home">
            <div className="filter">
            <div className="wrap">
                    <div className="search">
                        <input type="text" className="searchTerm" placeholder="What are you looking for?" />
                        <button type="submit" className="searchButton">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="movieList">
                
                    <Movie name="Bahubali" info="Thriller and Suspense And Historic" ratings={4.5} img="https://i.pinimg.com/564x/86/16/07/8616073e12ee6776aa6c8d78eb6b81c5.jpg"/>
                    <Movie name="Bahubali" info="Thriller and Suspense And Historic" ratings={4.5} img="https://i.pinimg.com/564x/86/16/07/8616073e12ee6776aa6c8d78eb6b81c5.jpg"/>
                    <Movie name="Bahubali" info="Thriller and Suspense And Historic" ratings={4.5} img="https://i.pinimg.com/564x/86/16/07/8616073e12ee6776aa6c8d78eb6b81c5.jpg"/>
                    <Movie name="Bahubali" info="Thriller and Suspense And Historic" ratings={4.5} img="https://i.pinimg.com/564x/86/16/07/8616073e12ee6776aa6c8d78eb6b81c5.jpg"/>                               
            </div>
        </div>);
    }
}
export default home;