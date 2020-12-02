import React, { useState, useEffect } from 'react';

import { getMostPopular } from '../../api/People';
import './actors.css';

function People() {

    const [mostPopular, setMostPopular] = useState([]);

    useEffect(async () => {
        const response = await getMostPopular();
        setMostPopular(response.data.results);
        console.log(mostPopular);
    }, []);

    const imgAddress='https://image.tmdb.org/t/p/w500'
    return (

        <div className="actors-card px-2">
            {
                mostPopular && mostPopular.map(item =>
                    <div className="actors">
                        <div className="img-wrapper">
                            <img className="actor-img" src={`${imgAddress}${item.profile_path}`} />
                        </div>
                        <h2 className="actor-name">{item.name}</h2>
                        <ul>
                            {item.known_for.map(movie => {
                                return <li>{movie.title}</li>
                            })}
                        </ul>
                        <footer className="actor-popularity">
                            <h5>Actor Rating: {item.popularity}</h5>
                        </footer>
                    </div>
                )
            }
        </div>
    )
}
export default People
