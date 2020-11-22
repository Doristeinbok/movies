import axios from 'axios';

const getTMDB = async() => {
    //const key = '490315f3d2a02854114c705838149f3a'; Dori's 
    const key = '718ea0afa77356e0a5e2b18e7de231b7';
    const movieID = 200; 
    console.log("in getTMDB"); 
    // single movie details 
    //  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${key}`);
    
    // list of top  rated movies 
    //  const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`);
     
    // list of all movies 
     const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);

     
    
    return response;
};

export {
    getTMDB
};