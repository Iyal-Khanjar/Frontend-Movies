import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../actions/userActions';
import Card from '../components/Card';
import LoadingBox from '../components/LoadingBox';
import Paginate from '../components/Pagination/Paginate';

export default function TvShowsScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [tvshows, setTvShows] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [favortieMovies, setFavortieMovies] = useState(userInfo ? userInfo.favortieMovies : [])
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

    useEffect(() => {
        userInfo && setFavortieMovies(userInfo.favortieMovies)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        userInfo && dispatch(updateProfile({ favortieMovies }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, favortieMovies])

    const addToFavorite = (data) => {
        if (!userInfo) {
            alert('Please Sign In First')
            navigate('/signin')
        }
        const allIDSINFavoriteMovies = favortieMovies.map(item => {
            return item.id
        })
        if (allIDSINFavoriteMovies.includes(data.id)) {
            alert('It Is Already In Your Favorites')
        } else {
            setFavortieMovies([...favortieMovies, data])
            let element = document.querySelector(`#a${data.id}`)
            element.classList.add('heartFavorite');
        }
    }

    return (
        <>
            <div className='tvShowScreenContainer'>
                <h1 className='tvShowsTitle'>Tv Shows</h1>
                <Paginate handlePageClick={handlePageClick} pageCount={pageCount} numberOfPages={500} marginPagesDisplayed={4} />
                {!tvshows && <LoadingBox />}
                <div className="movie-tv-container">
                    {tvshows?.map((ele) => {
                        return (
                            <Card data={ele} urlLink={imageUrl} key={ele.id} type="tvshow" addToFavorite={() => addToFavorite(ele)} />
                        );
                    })}
                </div>
            </div>
        </>
    )
}
