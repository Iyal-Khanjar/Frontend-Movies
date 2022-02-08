import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IMDB from '../img/IMDB.jpg'
import Metacritic from '../img/Metacritic.jpg'
import RottenTomatoes from '../img/RottenTomatoes.png'
import YoutubeTrailer from '../components/YoutubeTrailer';

export default function MovieScreen() {
    const params = useParams()
    const [movieData, setMovieData] = useState();
    const [movieData2, setMovieData2] = useState();
    const [actors, setActors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=0e0361a1e4feb360695e2fc32793d846&language=en-US`)
            setMovieData(response.data);
        }
        fetchData()
    }, [params.id]);

    useEffect(() => {
        const fetchData = async () => {
            if (movieData) {
                const response = await axios.get(`https://www.omdbapi.com/?i=${movieData.imdb_id}&apikey=1d3a0c3d`)
                setMovieData2(response.data);
            }
        }
        fetchData()
    }, [movieData]);

    useEffect(() => {
        const fetchData = async () => {
            if (movieData) {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=9a1f04c191537cfcad233a5ab151487b&language=en-US`)
                setActors(response.data)
            }
        }
        fetchData()
    }, [movieData, params.id]);


    console.log('movieData', movieData);
    console.log('movieData2', movieData2);
    console.log('actors', actors.cast);
    const urlLink = 'https://image.tmdb.org/t/p/original'

    return <div className='movieScreenContainer'>
        {
            movieData ? <div className='movieScreenContainer2'>
                <div className='picture'><img src={movieData.backdrop_path ? urlLink + movieData.backdrop_path : 'https://static.bond.edu.au/sites/default/files/styles/full_width/public/cinema%20750x320.jpg?itok=U8R3z3ov'} alt={movieData.original_title} /></div>
                <div className='title'>{movieData.original_title} ({movieData2 ? (movieData2.Year) : ''}) </div>
                <div className='genres'>{movieData2 ? <div>{movieData2.Genre} |{movieData2.Runtime}|</div> : ''}</div>
                {movieData2 ? <div className='rating'>
                    {
                        movieData2.Ratings[0] ?
                            <div>
                                <img src={IMDB} alt='IMDB'></img>
                                {movieData2.Ratings[0].Value}
                            </div> : ''
                    }
                    {
                        movieData2.Ratings[1] ?
                            <div>
                                <img src={Metacritic} alt='Metacritic'></img>
                                {movieData2.Ratings[1].Value}
                            </div> : ''
                    }
                    {
                        movieData2.Ratings[2] ?
                            <div>
                                <img src={RottenTomatoes} alt='RottenTomatoes'></img>
                                {movieData2.Ratings[2].Value}
                            </div> : ''
                    }
                </div> : ''}
                <div className='overView'>"{movieData.overview}"</div>
                <div className='border'></div>
                <div className='actors'>
                    <h1>Actors</h1>
                    <div className='actorsName'>
                        {movieData && movieData2 && actors && actors.cast && actors.cast.map(person => {
                            return (
                                <Link to={`/moviesbyactor/${person.id}`} className='actorNameAndPic' key={person.id}>
                                    <img src={person.profile_path ? urlLink + person.profile_path : 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} alt={person.name}></img>
                                    {person.name}
                                </Link>
                            )
                        }).slice(0, 5)}
                    </div>
                </div>
                <div className='youtubeTrailer'>
                    <YoutubeTrailer />
                </div>
            </div> : ''
        }
    </div >;
}
