import React ,{ useState, useEffect} from 'react';
import { getTMDB } from './TMDB'

function Try () {
    const [movies, setMovies] = useState([]);
    useEffect(async () => {
        let jsonMovies;
        if(!localStorage.getItem('movies')){
            jsonMovies = await getTMDB();
            localStorage.setItem('movies', JSON.stringify(jsonMovies));
        }else{
            jsonMovies = JSON.parse(localStorage.getItem('movies'));
        }
        setTimeout(() => {
            setMovies(jsonMovies);
        }, 1000);
    },[]);

    console.log(movies);
    return(
        <h1>dori</h1>
    )
};

export default Try;
