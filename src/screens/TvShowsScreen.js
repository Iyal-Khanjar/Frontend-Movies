import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Paginate from '../components/Paginate';

export default function TvShowsScreen() {
    const [tvshows, setTvShows] = useState([]);
    const [pageCount, setPageCount] = useState(1);

    const imageUrl = "https://image.tmdb.org/t/p/original";
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=a4999a28333d1147dbac0d104526337a&language=en-US&sort_by=popularity.desc&page=${pageCount}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`)
            setTvShows(response.data.results);
        }
        fetchData()
    }, [pageCount]);

    const handlePageClick = (e) => {
        const nextPage = e.selected + 1
        setPageCount(nextPage)
    };
    
    return <div>
        <h1 className='tvShowsTitle'>Tv Shows</h1>
        <Paginate handlePageClick={handlePageClick} pageCount={pageCount} />
        <div className="movie-tv-container">
            {tvshows.map((ele) => {
                return (
                    <Card data={ele} isMovie={false} type={ele.type} urlLink={imageUrl} key={ele.id} />
                );
            })}
        </div>
    </div>;
}
