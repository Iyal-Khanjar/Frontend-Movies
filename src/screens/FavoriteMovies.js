import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../actions/userActions';
import Card from '../components/Card';
import LoadingBox from '../components/LoadingBox';

function FavoriteMovies() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    // const [moviesData, setMoviesData] = useState([]);
    const [favortieMovies, setFavortieMovies] = useState([])

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const imageUrl = "https://image.tmdb.org/t/p/original";

    console.log('userInfo', userInfo.favortieMovies);

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
        setFavortieMovies(userInfo.favortieMovies)
    }, [navigate, userInfo, favortieMovies])

    const deleteFavoriteMovie = (id) => {
        // const findById = favortieMovies.filter(movie => movie.id !== id)
        // console.log('findById', findById);
        // setFavortieMovies([5])
        // console.log('favortieMovies', favortieMovies);
        // dispatch(updateProfile({ favortieMovies }));
    }

    return <div>
        <h1 className='moviesTitle'>My Favorite Movies</h1>
        {
            favortieMovies ? <div className="movie-tv-container">
                {favortieMovies.map((ele) => {
                    return (
                        <div className='movieFavoriteAndDelete' key={ele.id}>
                            <Card data={ele} urlLink={imageUrl} key={ele.id} type="movie" />
                            <div className='deleteFavorite' onClick={() => deleteFavoriteMovie(ele.id)}><i className="fa-solid fa-x"></i></div>
                        </div>
                    );
                })}
            </div> : <LoadingBox />
        }
    </div>;
}

export default FavoriteMovies;
