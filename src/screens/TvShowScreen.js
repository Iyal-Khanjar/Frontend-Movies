import axios from 'axios';
import { ButtonBack, ButtonNext, CarouselProvider, Slider } from 'pure-react-carousel';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import YoutubeTrailer from '../components/YoutubeTrailer';
import { ActorNameAndPic, CarouselActors } from './MovieScreen.styles';

export default function TvShowScreen() {
    const params = useParams()
    const [tvshows, setTvShows] = useState();
    const [actors, setActors] = useState([]);
    const [seasons, setSeasons] = useState([])
    const [episodes, setEpisodes] = useState([])
    const [seasonNumber, setSeasonNumber] = useState(1)
    const [episodeNumber, setEpisodeNumber] = useState(1)
    const [seasonInfo, setSeasonInfo] = useState()
    const [episodeInfo, setEpisodeInfo] = useState()
    const [imgPoster, setImgPoster] = useState('')
    const urlLink = 'https://image.tmdb.org/t/p/original'
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}?api_key=0e0361a1e4feb360695e2fc32793d846&language=en-US`)
            setTvShows(response.data);
            setSeasons(response.data.seasons);
            // console.log('response data tvshows', response.data.seasons);
        }
        fetchData()

        const fetchData2 = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}/aggregate_credits?api_key=a4999a28333d1147dbac0d104526337a&language=en-US`)
            setActors(response.data.cast)
            // console.log('actors', response.data.cast);
        }
        fetchData2()
    }, [params.id]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}/season/${seasonNumber}?api_key=a4999a28333d1147dbac0d104526337a&language=en-US`)
            setSeasonInfo(response.data)
            setEpisodes(response.data.episodes)
            setImgPoster(response.data.poster_path)
            // console.log('seasonInfo', response.data);
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seasonNumber, params.id])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=a4999a28333d1147dbac0d104526337a&language=en-US`)
            setEpisodeInfo(response.data)
            // console.log('episodeInfo', response.data);
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [episodeNumber, seasonNumber])

    const seasonChange = (e) => {
        setSeasonNumber(e.target.value)
    }

    const episodeChange = (e) => {
        setEpisodeNumber(e.target.value)
    }

    return <div className='movieScreenContainer'>
        {
            tvshows ? <div className='movieScreenContainer2'>
                <div className='picture'><img src={tvshows.backdrop_path ? urlLink + tvshows.backdrop_path : 'https://static.bond.edu.au/sites/default/files/styles/full_width/public/cinema%20750x320.jpg?itok=U8R3z3ov'} alt={tvshows.original_title} /></div>
                <div className='seasonAndTitle'>
                    <div className='allSeasons'>
                        <select onChange={seasonChange}>
                            {seasons?.map(season => {
                                return <option key={season.id} value={season.season_number}>{season.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='allepisodes'>
                        <select onChange={episodeChange}>
                            {episodes?.map(episode => {
                                return <option key={episode.id} value={episode.episode_number}>{episode.episode_number}{')'} {episode.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='title'>{tvshows.original_name}</div>
                </div>
                <div className='imgPoster'><img src={seasonInfo?.poster_path ? urlLink + imgPoster : 'https://static.bond.edu.au/sites/default/files/styles/full_width/public/cinema%20750x320.jpg?itok=U8R3z3ov'} alt=''></img></div>
                <div className=''><h2>Tv Show OverView</h2></div>
                <div className='overView'>"{tvshows?.overview}"</div>
                <div className=''><h2>Season OverView</h2></div>
                <div className='overView'>"{seasonInfo !== "" ? seasonInfo?.overview : 'There is no overview'}"</div>
                <div className=''><h2>Episode OverView</h2></div>
                <div className='overView'>"{episodeInfo !== "" ? episodeInfo?.overview : 'There is no overview'}"</div>
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
                                    {tvshows && actors.map(person => {
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
                    <YoutubeTrailer type='tvshows' />
                </div>
            </div> : ''
        }

    </div >;
}
