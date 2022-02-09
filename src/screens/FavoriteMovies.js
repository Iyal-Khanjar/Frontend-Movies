import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import LoadingBox from '../components/LoadingBox';

function FavoriteMovies() {
    const navigate = useNavigate()
    const [moviesData, setMoviesData] = useState([]);

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const imageUrl = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
        setMoviesData(userInfo.favortieMovies)
    }, [navigate, userInfo])

    return <div>
        <h1 className='moviesTitle'>My Favorite Movies</h1>
        {
            moviesData ? <div className="movie-tv-container">
                {moviesData.map((ele) => {
                    return (
                        <Card data={ele} urlLink={imageUrl} key={ele.id} type="movie" />
                    );
                })}
            </div> : <LoadingBox />
        }
    </div>;
}

export default FavoriteMovies;
