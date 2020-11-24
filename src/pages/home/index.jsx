import React ,{ useState, useEffect} from 'react';
import { getTMDBconf, getTMDBmovies } from '../../api/TMDB';
import { getOMDB } from '../../api/OMDB';
import Card from '../card/index.jsx';
function Home () {   
    
    const [conf, setConf] = useState({});
    const [page, setPage] = useState({});
    const [movies, setMovies] = useState([]);

    async function fetchMovies () {
        // if(!localStorage.getItem('movies')){                   //stop localstorage - gs 
        let configuration = await getTMDBconf();             
        let tmpMoviesPage = await getTMDBmovies();                
        
        //based on Esraa's example - for each movie, get data from second API 
        //const response2 = await Promise.all(movies.map(movie => secondApiRequest(movie.name)))
        const moreMoviesData = await Promise.all(tmpMoviesPage.data.results.map
            (movie => getOMDB(movie.title))); 
        //console.log("=OMDB=", moreMoviesData); 
        // now, lets create a unified Array of movies                     
        
        const c_base_url=configuration.data.images.base_url;
        const c_logo_sizes=configuration.data.images.logo_sizes;    
        const moviesArray=[]; 
        tmpMoviesPage.data.results.map (movie => 
            {                
                
                //console.log("in loop OMDB movie=", moreMoviesData[0].data); 
                //console.log("in loop OMDB movie=", moreMoviesData.find(OMDBmovie=>OMDBmovie.data.Title===movie.title)); 
                moviesArray.push (
                {
                    adult: movie.adult, 
                    base_url:c_base_url,
                    logo_sizes:c_logo_sizes, 
                    backdrop_path: movie.backdrop_path, 
                    genre_ids: movie.genre_ids, 
                    id: movie.id,  
                    original_language: movie.original_language, 
                    original_title: movie.original_title, 
                    overview: movie.overview,
                    popularity: movie.popularity,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                    title: movie.title,
                    video: movie.video,
                    OMDB: moreMoviesData.find(OMDBmovie=>OMDBmovie.data.Title===movie.title)                    
                          // attempts at returning only parts of the OMDB object failed with key doesn't exist messages 
                }); 
            });                    

        setConf(configuration.data.images); 
        setPage(tmpMoviesPage.data);            // page 
        setMovies(moviesArray);     // movies   - moviesPage.data.results
    }          

    useEffect(() => {         
        fetchMovies();        
    },[]);
    
    console.log("conf=",conf);    
    console.log("base_url=",conf.base_url);    
    console.log("page=",page);                   
    console.log("movies=",movies);   
    // console.log("movies.ganer=",movies.
    // genres.name);
    return(
        <div>
        {/* <span>{`${movie.id}:  ${movie.title}`} </span>
            <img src={`${conf.base_url}/${conf.logo_sizes[1]}/${movie.poster_path}`} alt={movie.title}/> */}
        {  movies.map (movie => {            
            return (
                <Card key={movie.id} conf={conf} movie={movie}/>             
            )
        })}             
        {/* <button onClick={()=>showMovies()}> Show Movies</button> */}
        </div>
        
    )
};

export default Home;
