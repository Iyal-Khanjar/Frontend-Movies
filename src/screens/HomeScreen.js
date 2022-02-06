import React, { useEffect, useState } from 'react'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import axios from 'axios';
import Card from '../components/Card';

function HomeScreen() {
    const [movies, setMovie] = useState([])
    const [tvShows, setTvShows] = useState([])

    useEffect(() => {
        const getTopRatedMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
                    params: {
                        api_key: 'a4999a28333d1147dbac0d104526337a',
                        language: 'en_US',
                        page: 1
                    }
                })
                setMovie(response.data.results);
                console.log(response.data.results);
            } catch (error) {
                console.log('fetching now playing movie data error', error);
            }
        }
        getTopRatedMovies()

        const getTopRatedTvShows = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/tv/top_rated', {
                    params: {
                        api_key: 'a4999a28333d1147dbac0d104526337a',
                        language: 'en_US',
                        page: 1
                    }
                })
                setTvShows(response.data.results);
                console.log(response.data.results);
            } catch (error) {
                console.log('fetching now playing movie data error', error);
            }
        }
        getTopRatedTvShows()
    }, [])
    const imageUrl = "https://image.tmdb.org/t/p/original";
    return (
        <div className='homeContainer'>
            <div className='nowPlayingMovies'>
                <h1>Top 20 Rated Movies</h1>
                <CarouselProvider
                    // naturalSlideWidth={100}
                    // naturalSlideHeight={125}
                    totalSlides={20}
                    isPlaying
                    interval={3000}
                    visibleSlides={4}
                    infinite={true}
                >
                    <Slider>
                        <div className="movie-tv-container">
                            {movies.map((ele, index) => {
                                return (
                                    <Slide index={index} >
                                        <Card data={ele} urlLink={imageUrl} key={ele.id} type={'movie'} />
                                    </Slide>
                                );
                            })}
                        </div>
                    </Slider>
                </CarouselProvider>
            </div>
            <div className='nowPlayingTvShows'>
                <h1>Top 20 Rated Tv Shows</h1>
                <CarouselProvider
                    // naturalSlideWidth={100}
                    // naturalSlideHeight={125}
                    totalSlides={20}
                    isPlaying
                    interval={3000}
                    visibleSlides={4}
                    infinite={true}
                >
                    <Slider>
                        <div className="movie-tv-container">
                            {tvShows.map((ele, index) => {
                                return (
                                    <Slide index={index} >
                                        <Card data={ele} isMovie={false} urlLink={imageUrl} key={ele.id} type={'tvshow'} />
                                    </Slide>
                                );
                            })}
                        </div>
                    </Slider>
                </CarouselProvider>
            </div>
        </div>
    )
}

export default HomeScreen
