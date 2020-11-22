import axios from 'axios';

const getTMDB = async() => {
    const key = '490315f3d2a02854114c705838149f3a';
    const response = await axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${key}`);
    return response;
};

export {
    getTMDB
};