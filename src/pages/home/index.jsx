import React ,{ useState, useEffect} from 'react';
import { getTMDBconf, getTMDBmovies } from '../../api/TMDB';
import { getOMDB } from '../../api/OMDB';
import Card from '../card/index.jsx';
function Home () {
    console.log("hello"); 
    // console.log(getTMDB); 
    const [conf, setConf] = useState({});
    const [page, setPage] = useState({});
    const [movies, setMovies] = useState([]);
    
    //${getOMDB(movie.title).Ratings}

    //  let jsonMovies; 
    //  useEffect(() => {
    //      async function fetchData() {
    //         console.log("jsonMovies (before)=", jsonMovies);  
    //         jsonMovies = await getTMDB();            
    //         return jsonMovies;
    //      }
         
    //     setMovies(fetchData());
    // },[]);

    //       // You can await here
    //       const response = await MyAPI.getData(someId);
    //       // ...
    //     }
    //     fetchData();
    //   }, [someId]); // Or [] if effect doesn't need props or state

    useEffect(() => {         
        async function fetchMovies () {
            let configuration = await getTMDBconf(); 
            
        // if(!localStorage.getItem('movies')){                   //stop localstorage - gs 
            let response = await getTMDBmovies();
            let moviesPage = await response;              // added another await to handle promise
            // localStorage.setItem('movies', JSON.stringify(jsonMovies)); //stop localstorage - gs 
        // }else{           //stop localstorage - gs 
            // jsonMovies = JSON.parse(localStorage.getItem('movies')); //stop localstorage - gs 
        // }    //stop localstorage - gs                 
            setConf(configuration.data.images); 
            setPage(moviesPage.data); 
            setMovies(moviesPage.data.results);                              
        }  
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
