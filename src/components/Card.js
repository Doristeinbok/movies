function Card (props) {
    return (
        <div> 
            <span>{`${props.movie.id}:  ${props.movie.title}`} 
            </span>
            <img src={`${props.conf.base_url}/${props.conf.logo_sizes[1]}/${props.movie.poster_path}`} 
                 alt={props.movie.title}/> 
        </div> 
    )
}

export default Card; 