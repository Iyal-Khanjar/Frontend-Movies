import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import LoadingBox from '../components/LoadingBox';

function MoviesByActor() {
    const params = useParams()
    const [moviesData, setMoviesData] = useState();
    const imageUrl = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?api_key=9a1f04c191537cfcad233a5ab151487b&language=en-US`)
            setMoviesData(response.data.cast);
        }
        fetchData()
    }, [params.id]);

    return <div>
         {
            !moviesData && <LoadingBox />
        }
         {
            moviesData ? <div className="movie-tv-container">
                {moviesData.map((ele) => {
                    return (
                        <Card data={ele} urlLink={imageUrl} key={ele.id} type="movie" />
                    );
                })}
            </div> : <LoadingBox></LoadingBox>
        }
    </div>;
}

export default MoviesByActor;
