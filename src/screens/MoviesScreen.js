import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../actions/userActions';
import Card from '../components/Card';
import LoadingBox from '../components/LoadingBox';
import Paginate from '../components/Paginate';
import { SearchAutoComplete } from '../components/SearchAutoComplete/SearchAutoComplete';

export default function MoviesScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [moviesData, setMoviesData] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [favortieMovies, setFavortieMovies] = useState(userInfo ? userInfo.favortieMovies : [])

    const imageUrl = "https://image.tmdb.org/t/p/original";
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=0e0361a1e4feb360695e2fc32793d846&language=en-US&sort_by=popularity.desc&page=${pageCount}`);
            setMoviesData(response.data.results);
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
            alert('it is already in your favorite')
        } else {
            setFavortieMovies([...favortieMovies, data])
            let element = document.querySelector(`#a${data.id}`)
            element.classList.add('heartFavorite');
        }
    }

    return <div>
        <SearchAutoComplete />
        <h1 className='moviesTitle'>Movies</h1>
        <Paginate handlePageClick={handlePageClick} pageCount={pageCount} />
        {
            !moviesData && <LoadingBox />
        }
        {
            moviesData ? <div className="movie-tv-container">
                {moviesData.map((ele) => {
                    return (
                        <Card data={ele} urlLink={imageUrl} key={ele.id} type="movie" addToFavorite={() => addToFavorite(ele)} />
                    );
                })}
            </div> : <LoadingBox />
        }
    </div>;
}
