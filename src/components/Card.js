import React,{useMemo} from 'react';
import { Link } from 'react-router-dom';

export default function Card({ data,isMovie=true,urlLink,type}) {
  const releaseYear = useMemo(()=>isMovie?data.release_date?.substring(0,4):data.first_air_date?.substring(0,4),[data]) 
  return (
    <div className="movie">

        <Link to={`/${type}/${data.id}`} className="flip-card-front">
          <div className="card-movie-header-chip vote-avg">{data.vote_average}</div>
          <div className="card-movie-header-chip movie-year">{releaseYear}</div>
          <img className="card-movie-img" src={data.poster_path ? urlLink + data.poster_path : 'https://static.bond.edu.au/sites/default/files/styles/full_width/public/cinema%20750x320.jpg?itok=U8R3z3ov'} alt={data.title} />
          <div className="movie-info">
            <h3>{isMovie?data?.title:data?.name}</h3>
          </div>
        </Link>
    </div>
  );
}
