import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../actions/userActions';
import Card from '../components/Card';
import LoadingBox from '../components/LoadingBox';
import Paginate from '../components/Paginate';
import { SearchAutoComplete } from '../components/SearchAutoComplete/SearchAutoComplete';

export default function MoviesScreen() {
    const dispatch = useDispatch();
    const [moviesData, setMoviesData] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [favortieMovies, setFavortieMovies] = useState([])

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

    // const userUpdate = useSelector((state) => state.userUpdate);
    // const { loading, error, success } = userUpdate;

    const addToFavorite = async (ele) => {
        console.log('ele', ele);
        setFavortieMovies([...favortieMovies, ele])
        dispatch(updateProfile(favortieMovies));
    }

    useEffect(() => {
        dispatch(updateProfile(favortieMovies));
    }, [dispatch, favortieMovies])



    // console.log('moviesData', moviesData);
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
