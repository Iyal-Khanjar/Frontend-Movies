import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

function YoutubeTrailerTvShows({ type }) {
    const params = useParams()

    const [tvShowsData, setTvShowsData] = useState('');
    const [trailerForTvShows, setTrailerForTvShows] = useState();

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=9a1f04c191537cfcad233a5ab151487b&language=en-US`)
                setTvShowsData(response.data);
                console.log('tvShowsData', response.data);
            }
            fetchData()
        } catch (error) {
            console.log('error', error);
        }
    }, [params.id])

    useEffect(() => {
        if (tvShowsData) {
            const trailer = tvShowsData.results.filter((trailer) => {
                return trailer.site === 'YouTube' && trailer.type === 'Trailer'
            })
            if (trailer.length > 0) {
                setTrailerForTvShows(trailer[0].key)
                console.log('tv show trailer', trailer);
            }
        }
    }, [tvShowsData])

    return <div>
        <YouTube
            videoId={trailerForTvShows}
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

export default YoutubeTrailerTvShows;