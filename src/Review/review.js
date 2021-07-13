import React from 'react';
import './review.css';


class review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn: false,
            Reviewed:false,
            loginreview: '',
            Ratings:'',
            allReviews:[]
        }
    }
    render() {
        return (<div className="reviewPage">
            <div className="movieDetails">
                <img className="movieImage" src="https://i.pinimg.com/564x/86/16/07/8616073e12ee6776aa6c8d78eb6b81c5.jpg"alt="bahubali"/>
                <h2 className="movieName">BahuBali</h2>
                <h3>Ratings:</h3>
                <p className="movieInfo">Info</p>
            </div>
            <div className="reviews">
                <div className="userReview">
                <h4 className="revivwer">Kdsurve</h4>
                <div className="detailReview">
                    <h5>Ratings</h5>
                    <p>Best Movie from india</p>
                </div>
                </div>
                <div className="userReview">
                <h4 className="revivwer">Kdsurve</h4>
                <div className="detailReview">
                    <h5>Ratings</h5>
                    <p>Best Movie from india</p>
                </div>
                </div>
                <div className="userReview">
                <h4 className="revivwer">Kdsurve</h4>
                <div className="detailReview">
                    <h5>Ratings</h5>
                    <p>Best Movie from india</p>
                </div>
                </div>
                <div className="userReview">
                <h4 className="revivwer">Kdsurve</h4>
                <div className="detailReview">
                    <h5>Ratings</h5>
                    <p>Best Movie from india</p>
                </div>
                </div>
                <div className="userReview">
                <h4 className="revivwer">Kdsurve</h4>
                <div className="detailReview">
                    <h5>Ratings</h5>
                    <p>Best Movie from india</p>
                </div>
                </div>
                <div className="userReview">
                <h4 className="revivwer">Kdsurve</h4>
                <div className="detailReview">
                    <h5>Ratings</h5>
                    <p>Best Movie from india</p>
                </div>
                </div>
            </div>
        </div>);
    }
}
export default review;