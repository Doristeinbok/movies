import React, { useState, useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

import './card.css'


function Card(props) {
    return (
        <div className="maincard">
            <div className="cards">
                <div className="cardz">
                    <img className="image" src={`${props.movie.base_url}/${props.movie.logo_sizes[3]}/${props.movie.poster_path}`} />
                    <p className="categoryz">Genre</p>
                    <div className="card-contant">
                        <h2 className="title">{props.movie.title}</h2>
                        <p className="year">Released: {props.movie.release_date}</p>
                        <footer className="foot">
                            <div className="meta">
                                <span className="duration"><i className="fa fa-clock-o"></i>duration:</span>
                                <span className="views"><i className="fa fa-comments"></i><a href="#">views rateing:{props.movie.popularity}</a></span>
                            </div>
                        </footer>
                    </div>
                    {<Link to={`/movie/${props.movie.id}`}> Details</Link>}
                </div>
            </div>


            {/* <span>{`${props.movie.id}:  ${props.movie.title}`}
            </span>
            <img src={`${props.conf.base_url}/${props.conf.logo_sizes[1]}/${props.movie.poster_path}`}
                alt={props.movie.title} /> */}
        </div>
    )
}

export default Card; 