import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function MoviesScreen() {
    const [moviesData, setMoviesData] = useState([]);

    const imageUrl = "https://image.tmdb.org/t/p/original";
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=0e0361a1e4feb360695e2fc32793d846&language=en-US&sort_by=popularity.desc&page=1');
            setMoviesData(response.data.results);
        }
        fetchData()
    }, []);

    return <div>
        <h1 className='moviesTitle'>Movies</h1>
        <div className="movie-tv-container">
            {moviesData.map((ele) => {
                return (
                    <Card data={ele} urlLink={imageUrl} key={ele.id} />
                );
            })}
        </div>
    </div>;
}
