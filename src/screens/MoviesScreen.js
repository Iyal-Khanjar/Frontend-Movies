import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../actions/userActions';
import Card from '../components/Card';
import LoadingBox from '../components/LoadingBox';
import Paginate from '../components/Paginate';
import { SearchAutoComplete } from '../components/SearchAutoComplete/SearchAutoComplete';


let moviesArr = [];

export default function MoviesScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [moviesData, setMoviesData] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [favortieMovies, setFavortieMovies] = useState(userInfo ? userInfo.favortieMovies : [])
    const [isFavorite, setIsFavorite] = useState(false)



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
        if (userInfo) {
            console.log('favortieMovies after refresh', favortieMovies);
            setFavortieMovies(userInfo.favortieMovies)
            console.log('favortieMovies after refresh2', favortieMovies);
        }
    }, [])

    useEffect(() => {
        if (userInfo) {
            console.log('favortieMovies to update', favortieMovies);
            dispatch(updateProfile({ favortieMovies }));
        }
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
        }


    }



    useEffect(() => {
        // console.log('favoriteMovies', favortieMovies);
        const allIDSINFavoriteMovies = favortieMovies.map(item => {
            return item.id
        })
        // console.log('allIDSINFavoriteMovies', allIDSINFavoriteMovies);
        const allIDSINMoviesData = moviesData.map(item => {
            return item.id
        })
        // console.log('allIDSINMoviesData', allIDSINMoviesData);
        const found = allIDSINFavoriteMovies.some(r => allIDSINMoviesData.includes(r))
        if (found) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
    }, [favortieMovies, moviesData])
    return <div>
        {favortieMovies.map(ele=>{
            return (
                <div className='sssss'>ele.id</div>
            )
        })}
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
                        <Card data={ele} urlLink={imageUrl} key={ele.id} type="movie" isFavorite={isFavorite} addToFavorite={() => addToFavorite(ele)} />
                    );
                })}
            </div> : <LoadingBox />
        }
    </div>;
}
