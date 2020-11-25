import axios from 'axios';

const key = '718ea0afa77356e0a5e2b18e7de231b7'; // gil 

const getTMDBconf = async() => {
    const configuration = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=${key}`);
    return configuration;
}

const getTMDBmovies = async(queryType, pageNo=1) => {
    //const key = '490315f3d2a02854114c705838149f3a'; Dori's 
    // single movie details 
    //  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${key}`);
    let response; 
    if (queryType==="top_rated") { 
    // list of top  rated movies     
         response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=${pageNo}`);
    } else if (queryType==="discover") { 
    // list of all movies 
         response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}`);
    }
     
    
    return response;
};

export {
    getTMDBconf, 
    getTMDBmovies

};