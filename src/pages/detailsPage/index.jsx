import React, { useState, useEffect } from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import './style.css';
import { actorDetails } from '../../api/actorsApi.js';


function MovieDetails (props) { 

    const {movieId}=useParams(); 
    const history = useHistory();
    
    const goHome = () => {        
        history.push("/home");
    }
    
    const [movie2Display, setMovie2Dsiplay] = useState(        
        props.movies.find((movie) => movie.id===parseInt(movieId))
      );   
      
    const [actorsImgUrl, setActorImgUrl] = useState([]);
      
      useEffect(async () => {
        let actorsInMovie = movie2Display.OMDB.data.Actors.split(','); //make it array
        let actorsDetails = [];
        actorsDetails[0] = await actorDetails(actorsInMovie[0]);
        actorsDetails[1] = await actorDetails(actorsInMovie[1]);
        actorsDetails[2] = await actorDetails(actorsInMovie[2]);
        actorsDetails[3] = await actorDetails(actorsInMovie[3]);
        console.log(actorsDetails);
        let actorImg = [];
        actorImg[0] = actorsDetails[0].data.results[0].profile_path;
        actorImg[1] = actorsDetails[1].data.results[0].profile_path;
        actorImg[2] = actorsDetails[2].data.results[0].profile_path;
        actorImg[3] = actorsDetails[3].data.results[0].profile_path;

        setTimeout(() => { 
            setActorImgUrl(actorImg);
            console.log(movie2Display);
        }, 2000);
    },[]);
    

    return (
        <>
        <div className="head">
            <div className="head-details"> 
                <h1>{movie2Display.title}</h1>
                {movie2Display.OMDB && <h3 className="plot-summery">{movie2Display.OMDB.data.Plot}</h3>}
                {movie2Display.OMDB && movie2Display.OMDB.data.Ratings.map((rating, index) => <h3 key={index}>{rating.Source} : {rating.Value}</h3>)}
                <h3>{movie2Display.OMDB.data.year}</h3>
            </div>
            <img src={`${movie2Display.base_url}/${movie2Display.profile_sizes[2]}/${movie2Display.poster_path}`} alt={movie2Display.title}/>   
            {/* <button onClick={goHome} >Back</button> */}
        </div>

        <hr />

        <h1>Lead actors:</h1>
        <div className="actors">
            {actorsImgUrl && 
                actorsImgUrl.map((actorUrl, index) => 
                <img key={index} className="oneActor" 
                src={`${movie2Display.base_url}/${movie2Display.profile_sizes[2]}/${actorUrl}`} alt={movie2Display.title}/>)
            }
        </div>

        <hr />

        {/* <h1>You may like also...</h1>
        <div className="similarMovies">
            <img className="oneActor" src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEA8PDxAPDw8PDw8QDw8PDw8NDw8PFREWFhcRFxUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFxAQFy0dHR0rLS0tLS0tLS0rLS0tLS0tKystLS0rLS0rKy0rLS0tLS0tLS0tLS0uLS0rLS0tLSstK//AABEIALgBEgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIDBAUGB//EADsQAAICAQIEAwYDBQcFAAAAAAABAhEDBCEFEjFRQWFxBhMigZHBMqGxQlLR8PEHFDNicoLhFpKio7L/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAhEQEBAAICAgMBAQEAAAAAAAAAAQIRAyESMQQiUUEyE//aAAwDAQACEQMRAD8A+TyBDl1A0ZwAFAwBjoQwAAYACGMGgIEWNCAJQZIjWxMqEQkMhKaX8A3o9bTEQjNt1svGuroUpOrp14PZ/PYn/pD8KmBCE30cXfp+dExzKUrjYQDYiiBEkRbFQQhiEZAOgoAiDAKAIismRaA0RjQAKQDoBkuYiMpEXMk1qGZ/eFkZgawBJkgIAAARxCTHDZWRQwGIchCNYnsDdiRn1GZLbq+3gO3UKTazLOujV9zHzb+PUUnfb5CjFsyyy20k00YptPal16pP9ROLfltvSrp6FcWl+JOu6V18joYYQ5VN3Sf4478r/h5Gdumk7ZZ4JJW26fRptr62OOSaTT+JLxa6f7vH5nodPoLjXwzhJWpRV7rfp3MstFBcsMnw83NFy/Z+JfDO+zvfzS7kTkVeNxser3ppV3NKaaTW6fR/Z+Zi1enlim4yjy0+97dyvFncW7fk/GzfHOsbi6JBokndPukxGvtmjQDExACCxDPRgJiAaSItDsQEVADAABDAAqlIi2ICdrDGpCsaALI5C6MzMShKhlWtDSIRmSUhpOhIkJoAQDoBGlOkrfgjlt3v36HQ1rqD86X5mGEN0TyVWEWYsN9E3t1eyL8OG7p01Xp/Poa4Re0F5W2b8PCr/C/r18+hzXN1Y8VvpxJTu4u4vo2rr6CxwlGE1eza27/zt9D0E+EOvwLo95bLt4/Ys0Hs9OTSUXOXSlso+bf2F/1h3hycbh+unh2d8ru+qa7Nea3N+r4j72HK6dX8S79/8r62vNtHqtN7DqKbzPpvafhW5wddwSKny43Ju92utdjO54W7aThz05WGaz45YsiXvYxfup7XKt1G+/gcGcf+T2//AE21DnXMnSafK6uu/wBTzGrxuLl+Fpvdefc1485fTLl4rjq1Vhz7KPVLpfVX4fX9S6zC427XjtRtlNOu6X1OjHL+OWzZkWSImiCYDASkQGNIZIpDGICRYkSZGwMwFYBstM40FAQswoQADALANhKM6LYyKCXNQ5Ssb8ZNwM+nkajSdoqvlI0WOIC0GPiP7Pbcr06tqu5dxPpFeHMT4RicpX4LqzHl6bcU3qPQabSx58bW6lji/wDckov80eg4fpVGXS/lZw8PwyT6q/o+/wCR63h0OZKSd/Q87O163FqRfhwLPlqqxYEl0a5srVt/JNJerO7hjjxRb/DFLrTOdwfG1F31lLJKXq5vY3Z9OsnKpSait6VptkKrHrcks793C72+Hf4F+9kfftH5suwcJhjSupS8ZNHQ0mGGNVCKiuyT/my7Z/0AbcueDl6dzwftVoIc8m4q223s9z6NqFv6HjvayC8dr6PyofH1ekcv2xfOs+mrpSSd3zN/MpUPi2vbxfj6GmedXJbWm6fcpTu62V7Lsux6GHt5ufo2RJMgbsCGgADMCIWNOkhMVjsAjIikSkKIGOUBgBbZwoBkrRAdAIEADoAaQhsSGGvTI1ozYEabNIyoAYhhbxHRyli2pqPxKlUun59Sngu0W/M9Bw3H7yCt+CVePSvsjj8IwUnH/NJfR0efb7lence8bP7Fsc85N8qaXhtbOlw/2gyadpZIur8U4tryfiSyaGbS5LXdxrmS8a2Z1uDcHjNy/vM9TkxuLUUpbxk633dUqezT6kTxy9rvlj6d3gvHcOZLldOrp0mdlaiC3b6qz51q+HvTZPgpU1UklFyV7NpbHuNHjjkwRbe9L9Dnz69OjHd9pan2j0+NqPM3Lsld+Zm/6pxybWON11baX6WcH2g4fLHJKOPHK97yc0lXb4aFoHJYuaeixSjGVShhfJkW18yi7Ul6tdGXMNzcZ3LV09Th4nDJ0dN+D2+nc877bxvTTl4xlFp/OqOlptPjnUsfMq3UXcZR8qOV7ZNrSyX70or7/YnGfaLz/wA184y426pP4kvC3dbh5dj6BwXg8seD+8xhB5KSxc++8nXReTvqeL49OL1Oflprnp10ckkpV/us7uHk3lY4Obi8cJlv2xtioRM6HJ6QAAAyAQADEDAYJjQgAjAjYBstKgQASsCaGMAiFjoQgY0RJQQBqwl6kVY0TLiVqYIrsnBlSpsdzhGVqCa/Zl0Xe7+5mxfDlkkmlzt7+bv7lOg1num7Vxl18mujLs808rknalytNb/sr+Bw8mFxyv5Xo8XJMsMf2PXcNptPyO7UYxcuyb8jynDNRS38DfquI80XFbR8X3OSzt3TWnJ1s3Obd22z2ugx1ihT7HhtFKOTPCLklzSXj0Xge9x41CMUmv6CzgwT1OgWRKUrdGnRaNJUvrSJaedxrxs0J8qYsSs/jPlxKNul6njfbNOeKOOP4p5YqKXVv+Wes1ObZnHxLmzKlGUoRk48zSS3Sbt+TY5dXYuO8dNPEq02lzq7eHFKal5pWj4ofU/bvXPFpJxk7yaiXJ6q/ia8qT+qPlh2/Fn1tcHzL9pPw0W+BBImdccVVsBsQjJiGAAmIYACChokPRbRoRMA0W2YAAlYGIYwQ6AAIi3DEhRowwALUhgA0glj6kSeNDgqckT0nX5lc2PTOm/PYjm/yvg6yej4bK2ovxOzl0kVG4y28+55zRW5RS8a+lnY4v7zFKC5JShyreNPc8249vWxz6V4OERyTXxcrTtNK3GXl5HoocPhOHu8knlV7ttwSl5JPf5nG4fxPlSl/d8rTVWt3fodfRcQhvWLPvv/AIb2YrjW2O/bu6DDGMFBN7VTl1L8k9t/T5nGfFMSp89W6ppwdm2eZtX4NdTO46K5d9qNZl2OBk9psGilkWRSnllCDhBR6q349FudTVz2vsfMeO6j3uoyyW6T5V6R2/Wzbg45nlqsPkct48dz2XHeM5dbleXLsltCC/DCPZfxOchyFE9KSSajy7lcrupIkIASjIRJkQMgAABAAMAcQbEgoZCwHQAXTOIYiFmMiMewYCANhOHU24lsYsXU3Y+g4mhoESHGitEUYExkMuRRVvp+o/SSzzUYtvwI8Ok8in3TXL8kczU53N30Xgux0+AraX+r7GHLluOngx+zpcN1NTi+21PY9dqM3voRS36U/M8dq8Di/eR6ftpf/R0uE8R5eW913OPPHy7jtwy8bqvSaLmhH8O68etnW0OovZxfyVfcw6DVe88trXQ7ej5eu3SzG3J1y9e01ji01JLddrMOqyrGuVehs1Wqirp150eY4jxNXypuUn0S/UUlvtnlmq49xDlxT5evI6d9Nj505HqvaPLy4XzP4pyjH70vkmeVkd/xp9bXB8u3ykv4JMIkScUdDlSAAAEJjEwCIDYgAExsQA4jFEY00gABkzAIZm0ACGAAxDAJQZtxPYwGrBIqFY0DEMaTgzncQyXLyWy+5tyTUVb/AKnOceZpeLf6k5XrR4ztVCDk6R6PhuLl+Ht+pVpuGuMH8L3Wz7s36PHbfnT/ACOXPPcd/Fx3G9tuKFr1OZrNNLE+aCbg3bj+7/weo4fw5S6tnTjwPFTtN35/Y55yarpy4tvI8L4zHH1lW3pudvT+0uNL/EX1Lo8BwJtvFG141zJ/I2YOGYZJpxW2zVKmvoGWeP4JhlJ7cjLxLLm/w7UX+2y7RaFR+KVt+LfVvudSOkhi+DHFJdh6hcqIuasePV7eC9uNR8eLGuiUpv8ARfc4eKVrzLvaLUe81OV+EWoL0j/zZhwypnfw/XGPN+Rl5Z2tdEkiVCN3PAAABkJgJgAJjAAixEhNADQAgGkAIAJnodCCyWhgIYAUAwDQIuwSKhc9dA9E6Sa6voZs2t8I/VmOeRvqyFiuQmKzmbe7stxOpRfZp/mVYiUls6606Ep9clw6Pu1Guv8ANnnY6bln5N/SS6r7/M97q8FQw5I7482KE8cluqcU6/P6M8xqsFZZR8JfHH18fTxPOm5bjXr2zKTKNWgxtJHawO0YNJi2TN+AxrVXnx79iiGJptrxOhmWxneRE7OKOXfcw8Rns/Rm2VmPPjtNvpQQ6+R6lXJyfWTbfq3ZDF1XqjXq8e8vVuPpZjPXxeHlO3RaFRlxZmtuqNEZp9Gay7Z60Yh2IACLGAACAQACYxMAaBiQMZAQABKBDEQswAABhYuYg2GxpJyIsARJosCQmgCWNl0ShGhIYffP7PEtXwjTQnfwKeK+rj7ucoxa9I0cLjWCePLyTxy58b2aVxnB+K8mT/sR4neLUaWT/BkWWH+mapr6xv5n0Pi3DY54rZc8fwvuv3Tn5uPfc9ur4/N4XV9V4Dh+VNV277P5r+eh0fdeKK9VpPdZccq2m3iku0qbi3/2tfM2Rx0ceeP9ehjlNaQ5LRnnp+yNqX5kVszPxVKwz07SM+t014pxW0nGSXrR157oxTiOTR+3yPV6RpNNbq0zhyR9B9pcCWea8Gk/qjweojUperPR4buPM+TjMbNKUhpjigo2cq3Hl7lxjJ48leg5S00AKLsZQIABgREWSIgDExiGQALEAUgAEKJsi2MBGQUABoGOhAGglRFgA9BfjxVuyxRACtFt7T+yzVPFxCEd6zQnja8LS50//H8z71iYARnOzjke03CnkxSyY9smOslfvuG9euxhlgezpq0n06rwADn5MZrbr+Pnd6UTxNEZQfYAOa4x2yq5xfmUPGwAPGKlcPiPAZ586yOLWHlScv3mv2UfNeNaVxzSVV8ON/8AriAHdw4zxeX8jO3PTm+76kXAANtMEXEVCAWgnCVGigAIVFCkADImiNAAwdBQAPRCgAAD/9k=' alt='actor' />   
            <img className="oneActor" src='data:image/jpeg;base64,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' alt='actor' />   
            <img className="oneActor" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMws8nTRAAMc3-eKZGve95VNamIzV1Yf5VGg&usqp=CAU' alt='actor' />   
        </div> */}
        {/* <div className="buttons-group">
            <Button size="large" variant="contained">Default</Button>
            <Button variant="contained" color="primary">
                Primary
            </Button>
            <Button variant="contained" color="secondary">
                Secondary
            </Button>
            <Button variant="contained" color="primary" href="#contained-buttons">
                Link
            </Button>
        </div> */}
        </>
    )
}

export default MovieDetails; 