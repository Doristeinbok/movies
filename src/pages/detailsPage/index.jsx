import React, { useState, useEffect } from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import './style.css';
import { actorDetails, recomendations, getOneMovie, getTMDBconf, gerCredits} from '../../api/TMDB';
import { getOMDB } from '../../api/OMDB';


function MovieDetails (props) { 

    const {movieId}=useParams(); 
    const history = useHistory();
    
    // const goHome = () => {        
    //     history.push("/home");
    // }
    
    const [movie2Display, setMovie2Dsiplay] = useState(        
        props.movies.find(movie => movie.id === parseInt(movieId))
      );   

    const [movie, setMovie] = useState();
    const [confImg, setConfImg] = useState();
    const [actor, setActor] = useState();
    const [rating, getRating] = useState();
    const [recomendedMovies, setRecomendedMovies] = useState();

      useEffect(async () => {
        //get movie 
        const movieData = await getOneMovie(movieId);
        setMovie(movieData);
        // console.log('movieData:');
        // console.log(movieData);

        //get rating from OMDB
        const omdb = await getOMDB(movieData.data.title);
        getRating(omdb);
        // console.log('omdb');
        // console.log(omdb);

        //get configuration for images
        const imgConf = await getTMDBconf();
        setConfImg(imgConf);
        // console.log('imgConf');
        // console.log(imgConf);

        //get actors from credits
        const credits = await gerCredits(movieId);
        setActor(credits);
        // console.log('credits');
        // console.log(credits);

        //show recomended movies
        const recomendedMoviesData = await recomendations(movieId);
        console.log('recomendedMovies');
        console.log(recomendedMoviesData);
        setRecomendedMovies(recomendedMoviesData);
        console.log(recomendedMovies);
        // const recomendedMoviesUrl = recomendedMoviesData.data.results.map(movie => movie.backdrop_path);

        //use this to find movies that the actor play in
        // const actorsInMovie = movie2Display.OMDB.data.Actors.split(',');
        // // console.log(movie2Display.OMDB.data);
        // const actorsDetails = await Promise.all(actorsInMovie.map(actor => actorDetails(actor)));
        // const actorsImg = actorsDetails.map(actor => actor.data.results[0].profile_path);

    },[]);
    return (
        <>
            <div className="head">
                {
                    movie &&
                    <div className="head-details"> 
                        <h1>{movie.data.title}</h1>
                        <h3 className="plot-summery">{movie.data.overview}</h3>
                        {rating && rating.data.Ratings.map((rating, index) => <h3 key={index}>{rating.Source} : {rating.Value}</h3>)}
                    </div>
                }
                {
                    confImg && 
                    <img src={`${confImg.data.images.base_url}/${confImg.data.images.profile_sizes[2]}/${movie.data.poster_path}`} alt='movie' />   
                }
                {/* <button onClick={goHome} >Back</button> */}
            </div>
            

        <hr />

        <h1>Actors:</h1>
        <div className="actors">
            {actor && 
                actor.data.cast.map((actorUrl, index) => 
                <img key={index} className="oneActor" 
                src={`${confImg.data.images.base_url}/${confImg.data.images.profile_sizes[2]}/${actorUrl.profile_path}`} alt='actor' />)
            }
        </div>

        <hr />

        <h1>You may like also...</h1>
        <div className="similarMovies">
            {recomendedMovies && recomendedMovies.data.results.map((movieUrl, index) => 
            <img key={index} className="movieSim"  
            src={`${confImg.data.images.base_url}/${confImg.data.images.profile_sizes[2]}/${movieUrl.poster_path}`} alt='recomended movies'/>   
            )}
        </div>

        {/* <div className="buttons-group">
            <Button size="large" variant="contained">Default</Button>
            <Button variant="contained" color="primary">
                Primary
            </Button>
            <Button variant="contained" color="secondary">
                Secondary
            </Button>
            <Button variant="contained" color="primary" href="#contained-buttons">
                Link
            </Button>
        </div> */}
        </>
    )
}

export default MovieDetails; 