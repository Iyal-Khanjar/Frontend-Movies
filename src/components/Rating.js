import React from 'react'

function Rating({ movieData2, IMDB, Metacritic, RottenTomatoes }) {
    return (
        <>
            {
                movieData2.Ratings[0] ?
                    <div>
                        {
                            movieData2.Ratings[0].Source === "Internet Movie Database" ?
                                <img src={IMDB} alt='IMDB'></img> :
                                movieData2.Ratings[0].Source === "Rotten Tomatoes" ?
                                    <img src={RottenTomatoes} alt='RottenTomatoes'></img> :
                                    <img src={Metacritic} alt='Metacritic'></img>
                        }
                        {movieData2.Ratings[0].Value}
                    </div> : ''
            }
            {
                movieData2.Ratings[1] ?
                    <div>
                        {
                            movieData2.Ratings[1].Source === "Internet Movie Database" ?
                                <img src={IMDB} alt='IMDB'></img> :
                                movieData2.Ratings[1].Source === "Rotten Tomatoes" ?
                                    <img src={RottenTomatoes} alt='RottenTomatoes'></img> :
                                    <img src={Metacritic} alt='Metacritic'></img>
                        }
                        {movieData2.Ratings[1].Value}
                    </div> : ''
            }
            {
                movieData2.Ratings[2] ?
                    <div>
                        {
                            movieData2.Ratings[2].Source === "Internet Movie Database" ?
                                <img src={IMDB} alt='IMDB'></img> :
                                movieData2.Ratings[2].Source === "Rotten Tomatoes" ?
                                    <img src={RottenTomatoes} alt='RottenTomatoes'></img> :
                                    <img src={Metacritic} alt='Metacritic'></img>
                        }
                        {movieData2.Ratings[2].Value}
                    </div> : ''
            }

        </>
    )
}

export default Rating