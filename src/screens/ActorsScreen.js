import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../actions/userActions';
import Card from '../components/Card';
import LoadingBox from '../components/LoadingBox';
import Paginate from '../components/Pagination/Paginate';
import { SearchAutoComplete } from '../components/SearchAutoComplete/SearchAutoComplete';

export default function ActorsScreen() {
    const [actorsData, setActorsData] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const imageUrl = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchData = async () => {
            // setTimeout(() => {

            //     setLoading(true)
            // }, 1500)

            const response = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=a4999a28333d1147dbac0d104526337a&language=en-US&page=${pageCount}`);
            setActorsData(response.data.results);
            console.log('results', response.data.results);
        }
        fetchData()
    }, [pageCount]);

    useEffect(() => {
        if (actorsData) {
            actorsData.forEach(pro => {
                pro.type = 'moviesbyactor'
            })
            console.log('actorsData', actorsData);
        }
    }, [actorsData])

    const handlePageClick = (e) => {
        const nextPage = e.selected + 1
        setPageCount(nextPage)
    };



    return (
        <><SearchAutoComplete type={'actors'} />
            <div className='movieScreenContainer'>

                <h1 className='moviesTitle'>Most Popular</h1>
                <Paginate handlePageClick={handlePageClick} pageCount={pageCount} numberOfPages={500} marginPagesDisplayed={4} />
                {!loading ? <LoadingBox /> : <div className="movie-tv-container">
                    {actorsData?.map((ele) => {
                        return (
                            <Card data={ele} urlLink={imageUrl} key={ele.id} type="moviesbyactor" />
                        );
                    })}
                </div>}
            </div>
        </>
    )
}
