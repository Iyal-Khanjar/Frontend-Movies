import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IMDB from '../img/IMDB.jpg'
import Metacritic from '../img/Metacritic.jpg'
import RottenTomatoes from '../img/RottenTomatoes.png'

export default function TvShowScreen() {
    const params = useParams()
    const [tvshows, setTvShows] = useState();
    const [tvshows2, setTvShows2] = useState();


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}?api_key=a4999a28333d1147dbac0d104526337a&language=en-US`)
            setTvShows(response.data);
        }
        fetchData()
    }, [params.id]);

    useEffect(() => {
        const fetchData = async () => {
            if (tvshows) {
                const response = await axios.get(`http://www.omdbapi.com/?i=tt13650480&apikey=1d3a0c3d`)
                setTvShows2(response.data);
            }
        }
        fetchData()
    }, [tvshows]);

    // console.log('tvshows', tvshows);
    // console.log('tvshows2', tvshows2);

    const urlLink = 'https://image.tmdb.org/t/p/original'


    return <div className='movieScreenContainer'>
        {
            tvshows ? <div className='movieScreenContainer2'>
                <div className='picture'><img src={tvshows.backdrop_path ? urlLink + tvshows.backdrop_path : 'https://static.bond.edu.au/sites/default/files/styles/full_width/public/cinema%20750x320.jpg?itok=U8R3z3ov'} alt={tvshows.original_title} /></div>
                <div className='title'>{tvshows.original_name} ({tvshows2 ? (tvshows2.Year) : ''}) </div>
                <div className='genres'>{tvshows2 ? <div>{tvshows2.Genre} |{tvshows2.Runtime}|</div> : ''}</div>
                {/* {tvshows2 ? <div className='rating'>
                    <img src={IMDB} alt='IMDB'></img>
                    {tvshows2.Ratings[0].Value}
                    <img src={Metacritic} alt='Metacritic'></img>
                    {tvshows2.Ratings[1].Value}
                    <img src={RottenTomatoes} alt='RottenTomatoes'></img>
                    {tvshows2.Ratings[2].Value}
                </div> : ''} */}
                <div className='overView'>"{tvshows.overview}"</div>
                <div className='border'></div>
                <div className='actors'>
                    Actors
                    <div className='actorsName'>
                        {tvshows2 ? tvshows2.Actors : ''}
                    </div>
                </div>
            </div> : ''
        }

    </div>;
}
