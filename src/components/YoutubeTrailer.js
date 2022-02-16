import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

function YoutubeTrailer({ type }) {
    const params = useParams()

    const [movieData, setMovieData] = useState('');
    const [tvShowsData, setTvShowsData] = useState('');
    const [trailerForMovies, setTrailerForMovies] = useState();
    const [trailerForTvShows, setTrailerForTvShows] = useState();

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=9a1f04c191537cfcad233a5ab151487b&language=en-US`)
                const response2 = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=9a1f04c191537cfcad233a5ab151487b&language=en-US`)
                setMovieData(response.data);
                setTvShowsData(response2.data);
            }
            fetchData()
        } catch (error) {
            console.log('error', error);
        }
    }, [params.id]);

    useEffect(() => {
        if (tvShowsData) {
            const trailer = tvShowsData.results.filter((trailer) => {
                return trailer.site === 'YouTube' && trailer.type === 'Trailer'
            })
            if (trailer.length > 0) {
                setTrailerForTvShows(trailer[0].key)
            }
        }
    }, [tvShowsData])

    useEffect(() => {
        if (movieData) {
            const trailer = movieData.results.filter((trailer) => {
                return trailer.site === 'YouTube' && trailer.type === 'Trailer'
            })
            if (trailer.length > 0) {
                setTrailerForMovies(trailer[0].key)
            }
        }
    }, [movieData])



    // console.log('trailer', trailer);
    return <div>
        <YouTube
            videoId={trailerForMovies}
        // id={null}                       // defaults -> null
        // className={null}                // defaults -> null
        // containerClassName={''}       // defaults -> ''
        // title={null}                    // defaults -> null
        // opts={{}}                        // defaults -> {}
        // onReady={''}                    // defaults -> noop
        // onPlay={''}                     // defaults -> noop
        // onPause={''}                    // defaults -> noop
        // onEnd={''}                      // defaults -> noop
        // onError={() => console.log('error')}                    // defaults -> noop
        // onStateChange={''}              // defaults -> noop
        // onPlaybackRateChange={''}       // defaults -> noop
        // onPlaybackQualityChange={''}    // defaults -> noop              
        />
    </div>;
}

export default YoutubeTrailer;