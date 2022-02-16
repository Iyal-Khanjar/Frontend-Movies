import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Card({ data, urlLink, addToFavorite }) {
  const releaseYear = useMemo(() => data.release_date ? data.release_date?.substring(0, 4) : data.first_air_date?.substring(0, 4), [data])

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [favortieMovies] = useState(userInfo ? userInfo.favortieMovies : [])

  useEffect(() => {
    const allIDSINFavoriteMovies = favortieMovies.map(item => {
      return item.id
    })
    if (allIDSINFavoriteMovies.includes(data.id)) {
      data.favorite = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="movie">
      <div className="flip-card-front">
        <div className="card-movie-header-chip vote-avg"><i className="fas fa-star"></i> {data.vote_average}</div>
        <div className="card-movie-header-chip movie-year">{releaseYear}</div>
        <Link to={`/${data.type}/${data.id}`}>
          <img className="card-movie-img" src={data.poster_path ? urlLink + data.poster_path : 'https://static.bond.edu.au/sites/default/files/styles/full_width/public/cinema%20750x320.jpg?itok=U8R3z3ov'} alt={data.title} />
        </Link>
        <div className="movie-info">
          <div><h3>{data.title ? data?.title : data?.name}</h3></div>
          <div id={`a${data.id}`} className={`heart ${data.favorite ? 'heartFavorite' : ''}`} onClick={addToFavorite}><i className="fa-solid fa-heart"></i></div>
        </div>
      </div >
    </div >
  );
}
