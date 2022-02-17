import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../actions/userActions';
import Card from '../components/Card';

function FavoriteMovies() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [favortieMovies, setFavortieMovies] = useState(userInfo.favortieMovies)
    const [movie, setMovie] = useState()
    const [tvshow, setTvshow] = useState()
    const [show, setShow] = useState('All')
    const isFavorite = true

    const imageUrl = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        setMovie(favortieMovies.filter(item => item.type === 'movie'))
        setTvshow(favortieMovies.filter(item => item.type === 'tvshow'))
    }, [favortieMovies])

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const deleteFavoriteMovie = (data) => {
        setFavortieMovies(favortieMovies.filter(movie => movie !== data));
    }

    useEffect(() => {
        dispatch(updateProfile({ favortieMovies }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favortieMovies])

    const changeFavorite = (e) => {
        setShow(e.target.value);
    }
    return <div className='favoriteContainer'>
        <h1 className='moviesTitle'>My Favorite Movies And Tv Shows</h1>
        <select className='selectFavortie' onChange={changeFavorite}>
            <option value='All'>All</option>
            <option value='Movies'>Movies</option>
            <option value='Tv Shows'>Tv Shows</option>
        </select>
        <div style={{ color: 'red' }}>Your Favorites <b>{movie?.length}</b> Movies And <b>{tvshow?.length}</b> Tv Shows </div>
        {
            <div className="movie-tv-container">
                {show === 'All' ? favortieMovies.map((ele, idx) => {
                    return (
                        <div className='movieFavoriteAndDelete' key={idx} >
                            <Card data={ele} urlLink={imageUrl} type="movie" isFavorite={isFavorite} />
                            <div key={ele.id} className='deleteFavorite' onClick={() => deleteFavoriteMovie(ele)}><i className="fa-solid fa-x"></i></div>
                        </div>
                    );
                }) : show === 'Movies' ? movie.map((ele, idx) => {
                    return (
                        <div className='movieFavoriteAndDelete' key={idx} >
                            <Card data={ele} urlLink={imageUrl} type="movie" isFavorite={isFavorite} />
                            <div key={ele.id} className='deleteFavorite' onClick={() => deleteFavoriteMovie(ele)}><i className="fa-solid fa-x"></i></div>
                        </div>
                    );
                }) : tvshow.map((ele, idx) => {
                    return (
                        <div className='movieFavoriteAndDelete' key={idx} >
                            <Card data={ele} urlLink={imageUrl} type="movie" isFavorite={isFavorite} />
                            <div key={ele.id} className='deleteFavorite' onClick={() => deleteFavoriteMovie(ele)}><i className="fa-solid fa-x"></i></div>
                        </div>
                    );
                })}
            </div>
        }
    </div>;
}

export default FavoriteMovies;
