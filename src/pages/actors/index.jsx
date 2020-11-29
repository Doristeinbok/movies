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

    return (

        <div className="actors-card">
            {
                mostPopular && mostPopular.map(item =>
                    <div className="actors">
                        <div className="actor-img">
                            <img src={item.profile_path} />
                        </div>
                        
                        <ul>
                            {item.known_for.map(movie => {
                                <li>{movie.title}</li>

                            })}
                        </ul>
                        <h2 className="actor-name">{item.name}</h2>
                        <footer className="actor-popularity">
                            <h5>Actor Rating: {item.popularity}</h5>
                        </footer>
                    </div>
                )
            }

        </div>
        // <div>{!mostPopular && mostPopular[0].name}</div>
    )
}
export default People
