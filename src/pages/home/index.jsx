import React ,{ useState, useEffect} from 'react';
import { getTMDB } from '../../api/TMDB';

function Home () {
    console.log("hello"); 
    // console.log(getTMDB); 
    const [movies, setMovies] = useState([]);
    
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
            
        // if(!localStorage.getItem('movies')){                   //stop localstorage - gs 
            let response = await getTMDB();
            let moviesPage = await response;              // added another await to handle promise
            // localStorage.setItem('movies', JSON.stringify(jsonMovies)); //stop localstorage - gs 
        // }else{           //stop localstorage - gs 
            // jsonMovies = JSON.parse(localStorage.getItem('movies')); //stop localstorage - gs 
        // }    //stop localstorage - gs                 
            setMovies(moviesPage.data.results);                    
        }  
        fetchMovies();        
    },[]);
           
    return(
        <div>
        {  movies.map (movie => {
            return (<p key={movie.id}> {`${movie.id}:  ${movie.title}  `}</p>)
        })}             
        {/* <button onClick={()=>showMovies()}> Show Movies</button> */}
        </div>
        
    )
};

export default Home;
