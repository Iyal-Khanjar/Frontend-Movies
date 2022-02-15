import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IMDB from '../img/IMDB.jpg'
import Metacritic from '../img/Metacritic.jpg'
import RottenTomatoes from '../img/RottenTomatoes.png'
import YoutubeTrailer from '../components/YoutubeTrailer';
import Rating from '../components/Rating';
import { ActorNameAndPic, CarouselActors } from './MovieScreen.styles';
import { ButtonBack, ButtonNext, CarouselProvider, Slider } from 'pure-react-carousel';

export default function MovieScreen() {
    const params = useParams()

    const [movieData, setMovieData] = useState();
    const [movieData2, setMovieData2] = useState();
    const [actors, setActors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=0e0361a1e4feb360695e2fc32793d846&language=en-US`)
            setMovieData(response.data);
            console.log(response.data);
        }
        fetchData()
    }, [params.id]);

    useEffect(() => {
        const fetchData = async () => {
            if (movieData) {
                const response = await axios.get(`https://www.omdbapi.com/?i=${movieData.imdb_id}&apikey=1d3a0c3d`)
                setMovieData2(response.data);
                console.log(response.data.Response);
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

    const urlLink = 'https://image.tmdb.org/t/p/original'

    return <div>
        {
            movieData && <div className='movieScreenContainer2'>
                <div className='picture'><img src={movieData.backdrop_path ? urlLink + movieData.backdrop_path : 'https://static.bond.edu.au/sites/default/files/styles/full_width/public/cinema%20750x320.jpg?itok=U8R3z3ov'} alt={movieData.original_title} /></div>
                <div className='title'>{movieData.original_title} ({movieData2 ? (movieData2.Year) : ''}) </div>
                <div className='genres'>{movieData2 ? <div>{movieData2.Genre} |{movieData2.Runtime}|</div> : ''}</div>
                {movieData2 &&
                    <div className='rating'>
                        {
                            !movieData2.Response && <Rating movieData2={movieData2} IMDB={IMDB} Metacritic={Metacritic} RottenTomatoes={RottenTomatoes} />
                        }
                    </div>
                }
                <div className='overView'>"{movieData.overview}"</div>
                <div className='border'></div>
                <div className='actors'>
                    <CarouselActors>
                        <h1>Actors</h1>
                        <CarouselProvider
                            totalSlides={actors.cast?.length}
                            visibleSlides={7}
                        >
                            <ButtonBack className='back carouselButton'>{"<"}</ButtonBack>
                            <Slider>
                                <div className="movie-tv-container">
                                    {movieData && movieData2 && actors && actors.cast && actors.cast.map(person => {
                                        return (
                                            <Link to={`/moviesbyactor/${person.id}`} className='actorNameAndPic' key={person.id}>
                                                <ActorNameAndPic>
                                                    <img src={person.profile_path ? urlLink + person.profile_path : 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} alt={person.name}></img>
                                                    {person.name}
                                                </ActorNameAndPic>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </Slider>
                            <ButtonNext className='next carouselButton' value={'next'} >{">"}</ButtonNext>
                        </CarouselProvider>
                    </CarouselActors>
                </div>
                <div className='youtubeTrailer'>
                    <YoutubeTrailer />
                </div>
            </div>
        }
    </div>
}
