import React, { useState, useEffect } from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; 
import Button from '@material-ui/core/Button';
import RateReviewIcon from '@material-ui/icons/RateReview';

import './style.css';
import { actorDetails, recomendations, getOneMovie, getTMDBconf, gerCredits} from '../../api/TMDB';
import { getOMDB } from '../../api/OMDB';


function MovieDetails () { 

    let {movieId}=useParams(); 
    const history = useHistory();
    
    // const goHome = () => {        
    //     history.push("/home");
    // }

    const [movie, setMovie] = useState();
    const [confImg, setConfImg] = useState();
    const [actor, setActor] = useState();
    const [rating, getRating] = useState();
    const [recomendedMovies, setRecomendedMovies] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        window.scrollTo(0, 0);

        //add flag for loading signa
        setLoading(true);

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
        console.log('movieId');
        console.log(movieId);
        let credits = await gerCredits(movieId);

        console.log('movieId for the credits (actors)');
        console.log(credits);
        setActor(credits);

        //show recomended movies
        const recomendedMoviesData = await recomendations(movieId);
        console.log('recomendedMovies');
        console.log(recomendedMoviesData);
        setRecomendedMovies(recomendedMoviesData);
        // console.log(recomendedMovies);
        // const recomendedMoviesUrl = recomendedMoviesData.data.results.map(movie => movie.backdrop_path);

        setLoading(false);

    },[movieId]);
    
    return (
        <>
            <div className="buttons-group">
                <Button href="/" variant="contained" color="secondary">
                    back to main page
                </Button>
            </div>
            <div className="head">
                {
                    movie &&
                    <div className="head-details"> 
                        <h1>{movie.data.title}</h1>
                        <h3 className="plot-summery">{movie.data.overview}</h3>
                        {rating && !rating.data.Error && rating.data.Ratings.map((rating, index) => <h3 key={index}>{rating.Source} : {rating.Value}</h3>)}
                        <Button variant="contained" color="primery" startIcon={<RateReviewIcon />}>
                            Add your own review
                        </Button>
                    </div>
                }
                {
                    confImg && 
                    <img src={`${confImg.data.images.base_url}/${confImg.data.images.profile_sizes[2]}/${movie.data.poster_path}`} alt='movie' />   
                }
                {/* <button onClick={goHome} >Back</button> */}
            </div>
            

        <hr />

        {
            loading &&
            <img className ='loading' src='/images/loading.gif' alt='Loading' />
        }
        {
            !loading &&
            <div className="afetrLoading">
                <h1>Actors:</h1>
                <div className="actors">
                    {actor && 
                        actor.data.cast.map((actorUrl, index) => 
                        {return(
                            actorUrl.profile_path && 
                            <img key={index} className="oneActor" 
                            src={`${confImg.data.images.base_url}/${confImg.data.images.profile_sizes[2]}/${actorUrl.profile_path}`} alt={actorUrl.name} 
                            />
                            )
                        }).slice(0,5)
                    }
                </div>

                <hr />

                <h1>You may like also...</h1>
                <div className="similarMovies">
                    {recomendedMovies && recomendedMovies.data.results.map((movieUrl, index) => 
                    {return(
                    movieUrl.poster_path &&
                        <Route path="/movie/:movieId">
                            <Link to={`/movie/${movieUrl.id}`}>
                                <img key={index} className="movieSim"  
                                src={`${confImg.data.images.base_url}/${confImg.data.images.profile_sizes[2]}/${movieUrl.poster_path}`} 
                                alt={movieUrl.title}
                                />   
                            </Link>
                        </Route>
                    )}
                    ).slice(0,10)}
                </div>
            </div>
        }

        </>
    )
}

export default MovieDetails; 