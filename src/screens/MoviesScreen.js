import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingBox from '../components/LoadingBox';
import MovieCard from '../components/MovieCard';
import Paginate from '../components/Paginate';

export default function MoviesScreen() {
    const [moviesData, setMoviesData] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const imageUrl = "https://image.tmdb.org/t/p/original";
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=0e0361a1e4feb360695e2fc32793d846&language=en-US&sort_by=popularity.desc&page=${pageCount}`)

            setMoviesData(response.data.results);
        }
        fetchData()
    }, [pageCount]);

    const handlePageClick = (e) => {
        const nextPage = e.selected + 1
        setPageCount(nextPage)
    };
    console.log(moviesData.results);
    return <div>
        <h1 className='moviesTitle'>Movies</h1>
        <Paginate handlePageClick={handlePageClick} pageCount={pageCount} />
        {
            moviesData ? <div className="movie-tv-container">
                {moviesData.map((ele) => {
                    return (
                        <MovieCard data={ele} urlLink={imageUrl} key={ele.id} />
                    );
                })}
            </div> : <LoadingBox></LoadingBox>
        }


    </div>;
}
