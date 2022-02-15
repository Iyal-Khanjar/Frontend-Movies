import React, { useEffect, useState } from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import axios from 'axios';
import Card from '../../components/Card';
import { HomeContainer, Carousel } from './HomeScreen.styles';
import useWindowDimensions from '../../components/useWindowDimensions';

function HomeScreen() {
    const { width } = useWindowDimensions()
    const [movies, setMovie] = useState([])
    const [tvShows, setTvShows] = useState([])
    const [slides, setSlides] = useState(1)

    useEffect(()=>{
       if(width>=1900){
           setSlides(7)
       } else if (width>=1700) {
        setSlides(6)
       } else if (width>=1500) {
        setSlides(5)
       } else if (width>=1100) {
        setSlides(4)
       } else if (width>=800) {
        setSlides(3)
       } else if (width>=560) {
        setSlides(2)
       } else if (width>=200) {
        setSlides(1)
       } 
    },[width])

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
                // console.log(response.data.results);
            } catch (error) {
                console.log('fetching now playing movie data error', error);
            }
        }
        getTopRatedTvShows()
    }, [])
    const imageUrl = "https://image.tmdb.org/t/p/original";
    return (
        <HomeContainer >
            <Carousel>
                <h1>Top 20 Rated Movies</h1>

                <CarouselProvider
                    naturalSlideWidth={50}
                    naturalSlideHeight={90}
                    totalSlides={20}
                    visibleSlides={slides}
                    isPlaying='true'
                >
                    <ButtonBack className='back carouselButton'>{"<"}</ButtonBack>
                    <Slider>
                        <div className="movie-tv-container">
                            {movies.map((ele, index) => {
                                return (
                                    <Slide key={index}  >
                                        <Card data={ele} urlLink={imageUrl} key={ele.id} type={'movie'} />
                                    </Slide>
                                );
                            })}
                        </div>
                    </Slider>
                    <ButtonNext className='next carouselButton' value={'next'} >{">"}</ButtonNext>
                </CarouselProvider>
            </Carousel>
            <Carousel>
                <h1>Top 20 Rated Tv Shows</h1>
                <CarouselProvider
                    naturalSlideWidth={50}
                    naturalSlideHeight={90}
                    totalSlides={20}
                    visibleSlides={slides}
                    isPlaying='true'
                >
                    <ButtonBack className='back carouselButton'>{"<"}</ButtonBack>
                    <Slider>
                        <div className="movie-tv-container">
                            {tvShows.map((ele, index) => {
                                return (
                                    <Slide key={index} >
                                        <Card data={ele} isMovie={false} urlLink={imageUrl} key={ele.id} type={'tvshow'} />
                                    </Slide>
                                );
                            })}
                        </div>
                    </Slider>
                    <ButtonNext className='next carouselButton' value={'next'} >{">"}</ButtonNext>
                </CarouselProvider>
            </Carousel>
        </HomeContainer>
    )
}

export default HomeScreen
