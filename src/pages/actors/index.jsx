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

        <div className="actors-card">
            {
                mostPopular && mostPopular.map(item =>
                    <div className="actors">
                        <div className="actor-img">
                            <img src={`${imgAddress}${item.profile_path}`} />
                        </div>
                        <h2 className="actor-name">{item.name}</h2>
                        <ul>
                            {item.known_for.map(movie => {
                                console.log(`${movie.title}`);
                                return <li>{movie.title}</li>
                            })}
                        </ul>
                        <footer className="actor-popularity">
                            <h5>Actor Rating: {item.popularity}</h5>
                        </footer>
                    </div>
                )
    // https://image.tmdb.org/t/p/w500/3JTEc2tGUact9c0WktvpeJ9pajn.jpg

            }
        </div>
    )
}
export default People
