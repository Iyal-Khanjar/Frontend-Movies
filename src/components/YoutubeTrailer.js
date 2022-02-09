import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

function YoutubeTrailer() {
    const params = useParams()

    const [movieData, setMovieData] = useState('');
    const [trailer, setTrailer] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=9a1f04c191537cfcad233a5ab151487b&language=en-US`)
            setMovieData(response.data);
        }
        fetchData()
    }, [params.id]);
    // console.log('movieData', movieData);
    useEffect(() => {
        if (movieData) {
            const trailer = movieData.results.filter((trailer) => {
                return trailer.site === 'YouTube' && trailer.type === 'Trailer'
            })
            if (trailer.length > 0) {
                setTrailer(trailer[0].key)
            }

        }

    }, [movieData])



    // console.log('trailer', trailer);
    return <div>
        <YouTube videoId={trailer}
        //    id={string}                       // defaults -> null
        //    className={string}                // defaults -> null
        //    containerClassName={string}       // defaults -> ''
        //    title={string}                    // defaults -> null
        //    opts={obj}                        // defaults -> {}
        //    onReady={func}                    // defaults -> noop
        //    onPlay={func}                     // defaults -> noop
        //    onPause={func}                    // defaults -> noop
        //    onEnd={func}                      // defaults -> noop
        //    onError={func}                    // defaults -> noop
        //    onStateChange={func}              // defaults -> noop
        //    onPlaybackRateChange={func}       // defaults -> noop
        //    onPlaybackQualityChange={func}    // defaults -> noop              
        />
    </div>;
}

export default YoutubeTrailer;