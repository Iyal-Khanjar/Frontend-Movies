import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProfile } from '../actions/userActions';
import Card from '../components/Card';
import PaginateUnknowLength from '../components/Pagination/PaginateUnknowLength';

function MoviesByActor() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const params = useParams()
    const [moviesData, setMoviesData] = useState();
    const [actorData, setActorData] = useState();
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [favortieMovies, setFavortieMovies] = useState(userInfo ? userInfo.favortieMovies : [])
    const imageUrl = "https://image.tmdb.org/t/p/original";

    const date = new Date().getFullYear();
    console.log('date',date);

    useEffect(() => {
        userInfo && setFavortieMovies(userInfo.favortieMovies)
    }, [userInfo])

    useEffect(() => {
        userInfo && dispatch(updateProfile({ favortieMovies }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, favortieMovies])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?api_key=9a1f04c191537cfcad233a5ab151487b&language=en-US`)
            setMoviesData(response.data.cast);
        }
        fetchData()

        const fetchData2 = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/person/${params.id}?api_key=9a1f04c191537cfcad233a5ab151487b&language=en-US`)
            setActorData(response.data);
            console.log(response.data);
        }
        fetchData2()
    }, [params.id]);

    const moviePerPage = 4;
    const pagesVisited = pageNumber * moviePerPage;

    useEffect(() => {
        setPageCount(Math.ceil(moviesData?.length / moviePerPage))
    }, [moviesData])

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

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
    return <div className='movieByActor'>
        <div className='movieScreenContainer2'>
        <div className='picture'><img src={imageUrl + actorData?.profile_path} alt={actorData?.name}></img></div>
        <h1 className='title'>{actorData?.name} </h1>
        <h2 >{date-actorData?.birthday.slice(0,4)} years</h2>
        </div>
        <h3 > From: {actorData?.place_of_birth}</h3>
        <h4>{actorData?.biography}</h4>
        <PaginateUnknowLength pageCount={pageCount} handlePageClick={handlePageClick} marginPagesDisplayed={4} />
        <div className='moviesInActorPage'>
            {moviesData?.slice(pagesVisited, pagesVisited + moviePerPage).map((ele) => {
                return (
                    <Card data={ele} urlLink={imageUrl} key={ele.id} type="movie" addToFavorite={() => addToFavorite(ele)} />
                );
            })}
        </div>
    </div>;
}

export default MoviesByActor;
