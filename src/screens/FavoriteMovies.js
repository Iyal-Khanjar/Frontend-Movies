import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../actions/userActions';
import Card from '../components/Card';
import LoadingBox from '../components/LoadingBox';

function FavoriteMovies() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [favortieMovies, setFavortieMovies] = useState([])
    const isFavorite = true
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const imageUrl = "https://image.tmdb.org/t/p/original";

    // console.log('userInfo', userInfo.favortieMovies);
    if (!userInfo) {
        navigate('/')
    }
    useEffect(() => {
        setFavortieMovies(userInfo.favortieMovies)
    }, [])


    const deleteFavoriteMovie = (data) => {
        console.log(data);
        const fillter = favortieMovies.filter(movie => movie !== data)
        console.log('fillter', fillter);
        setFavortieMovies(fillter);
        console.log('fillter after', favortieMovies);
        dispatch(updateProfile({ favortieMovies, fillter }));
        // console.log('findById', findById);
        // setFavortieMovies([5]);
        // console.log('favortieMovies', favortieMovies);
        // dispatch(updateProfile({ favortieMovies }));
    }
    useEffect(() => {
        console.log('fillter after', favortieMovies);
        dispatch(updateProfile({ favortieMovies }));
    }, [dispatch, favortieMovies])
    return <div>
        <h1 className='moviesTitle'>My Favorite Movies</h1>
        {
            favortieMovies ? <div className="movie-tv-container">
                {favortieMovies.map((ele, idx) => {
                    return (
                        <div className='movieFavoriteAndDelete' key={idx} >
                            <Card data={ele} urlLink={imageUrl} type="movie" isFavorite={isFavorite} />
                            <div key={ele.id} className='deleteFavorite' onClick={() => deleteFavoriteMovie(ele)}><i className="fa-solid fa-x"></i></div>
                        </div>
                    );
                })}
            </div> : <LoadingBox />
        }
    </div>;
}

export default FavoriteMovies;
