import React, { useState, useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

function MovieDetails (props) { 
    const {movieId}=useParams(); 
    const history = useHistory();
    
    const goHome = () => {        
        history.push("/home");
    }
    
    const [movie2Display, setMovie2Dsiplay] = useState(        
        props.movies.find((movie) => movie.id===parseInt(movieId))
      );     
    
      console.log ("=movie2Display=", movie2Display); 

    return (
        <div style={{width:"100%", textAlign:"center"}}> 
            <h1> {movie2Display.title} </h1>
            <img style={{width:"400px", height:"400px", margin:"auto"}} className="image" src={`${movie2Display.base_url}/${movie2Display.profile_sizes[2]}/${movie2Display.poster_path}`}    
                 alt={movie2Display.title}/>
            <h5> {movie2Display.OMDB && movie2Display.OMDB.data.Plot} </h5>            
            <h6> {movie2Display.OMDB && movie2Display.OMDB.data.Ratings.map(rating=><p>{rating.Source} : {rating.Value}</p>)}       </h6> 
            <button onClick={goHome} >Back</button>
        </div>
    )
}

export default MovieDetails; 