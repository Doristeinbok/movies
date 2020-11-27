import axios from 'axios';

const key = '490315f3d2a02854114c705838149f3a'; //dori's key

const actorDetails = async (actorName) => {
    const actor = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=${key}&language=en-US&page=1&include_adult=false&query=${actorName}`);
    return actor;
};

export {
    actorDetails
};

