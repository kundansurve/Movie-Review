import React from 'react';
import './home.css';


class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn: false,
        }
    }
    render() {
        return (<div>
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
                
            </div>
        </div>);
    }
}
export default home;