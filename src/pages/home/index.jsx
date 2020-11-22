import React ,{ useState, useEffect} from 'react';
import { getTMDB } from '../../api/TMDB';

function Home () {
    console.log("hello"); 
    // console.log(getTMDB); 
    const [movies, setMovies] = useState();
    
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

    useEffect(async () => { 
        let jsonMovies;
        // if(!localStorage.getItem('movies')){                   //stop localstorage - gs 
            jsonMovies = await getTMDB();
                        
            // localStorage.setItem('movies', JSON.stringify(jsonMovies)); //stop localstorage - gs 
        // }else{           //stop localstorage - gs 
            // jsonMovies = JSON.parse(localStorage.getItem('movies')); //stop localstorage - gs 
        // }    //stop localstorage - gs 
        setTimeout(() => {
            console.log("jsonMovies=", jsonMovies); 
            setMovies(jsonMovies);
        }, 1000);
    },[]);
    
    console.log("movies=",movies);
    // console.log("movies.data=",movies.data);
    // console.log("movies.results=",movies.data.results);
    return(
        <>
        
        {
        movies.data.results.map (movie => {
            return (<p>{`${movie.id}:  ${movie.title}  `}</p>)
        })}               
        </>
    )
};

export default Home;
