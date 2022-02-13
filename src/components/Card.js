import React, { useMemo,useState } from 'react';
import { Link } from 'react-router-dom';

export default function Card({ data, isMovie = true, urlLink, type, addToFavorite, isFavorite }) {
  const releaseYear = useMemo(() => data.release_date ? data.release_date?.substring(0, 4) : data.first_air_date?.substring(0, 4), [data])

  // const [isFavorite, setIsFavorite] = useState(false)

  // const handleClick = (e) => {
  //   addToFavorite()
  //   setIsFavorite(!setIsFavorite)
  // }
  
  return (
    <div className="movie">

      <div className="flip-card-front">
        <div className="card-movie-header-chip vote-avg"><i className="fas fa-star"></i> {data.vote_average}</div>
        <div className="card-movie-header-chip movie-year">{releaseYear}</div>
        <Link to={`/${type}/${data.id}`}>
          <img className="card-movie-img" src={data.poster_path ? urlLink + data.poster_path : 'https://static.bond.edu.au/sites/default/files/styles/full_width/public/cinema%20750x320.jpg?itok=U8R3z3ov'} alt={data.title} />
        </Link>
        <div className="movie-info">
          <div><h3>{data.title ? data?.title : data?.name}</h3></div>
          <div className={`heart ${isFavorite ? 'heartFavorite' : ''}`} onClick={addToFavorite}><i className="fa-solid fa-heart"></i></div>
        </div>
      </div >
    </div >
  );
}
