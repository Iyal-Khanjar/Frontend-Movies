import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TvShowsCard from '../components/TvShowsCard';

export default function TvShowsScreen() {
    const [tvshows, setTvShows] = useState([]);

    const imageUrl = "https://image.tmdb.org/t/p/original";
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=a4999a28333d1147dbac0d104526337a&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0')
            setTvShows(response.data.results);
        }
        fetchData()
    }, []);

    console.log(tvshows.results);
    return <div>
         <h1 className='tvShowsTitle'>Tv Shows</h1>
        <div className="movie-tv-container">
            {tvshows.map((ele) => {
                return (
                    <TvShowsCard data={ele} urlLink={imageUrl} key={ele.id} />
                );
            })}
        </div>
    </div>;
}
