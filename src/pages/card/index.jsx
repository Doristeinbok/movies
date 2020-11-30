import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './card.css'


function Card(props) {
    console.log(`movies obj: ${props.movie}`);
    console.log(`runtime: ${props.movie[0].OMDB.data.Runtime}`);
    return (
        <div className="main-cards px-2">
            <div className="movie-card">
                <Link to={`/movie/${props.movie.id}`}>
                    <img className="image" src={`${props.movie.base_url}/${props.movie.logo_sizes[2]}/${props.movie.poster_path}`} />
                </Link>
                <p className="categories">Genre</p>
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
            </div>
        </div>
    )
}

export default Card; 