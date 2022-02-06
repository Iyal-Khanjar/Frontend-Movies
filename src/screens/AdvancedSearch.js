import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AdvancedSearch() {
    const [fromYear, setFromYear] = useState("");
    const [rating, setRating] = useState("");
    const [voteCount, setVoteCount] = useState("");
    const [genres, setGenres] = useState("");
    const [fromYearInfo, setFromYearInfo] = useState("N/A");
    const [ratingInfo, setRatingInfo] = useState("N/A");
    const [voteCountInfo, setVoteCountInfo] = useState("N/A");
    const [genresInfo, setGenresInfo] = useState("N/A");



    const voteCounts = [20000, 15000, 10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 500, 100]

    useEffect(() => {
        const fromYear = () => {
            let years = [];
            for (let i = new Date().getFullYear(); i > 1902; i--) {
                years.push(<option key={i} value={i}>{i}</option>);
            }
            setFromYear(years);
        }
        fromYear()

        const minimumRating = () => {
            let ratings = []
            for (let i = 9; i > -1; i--) {
                ratings.push(<option key={i} value={i}>{i}</option>);
            }
            setRating(ratings);
        }
        minimumRating()

        const minimumVotes = () => {
            let voteCount = [];
            for (let i = 0; i < voteCounts.length; i++) {
                voteCount.push(
                    <option key={i} value={voteCounts[i]}>
                        {voteCounts[i]}
                    </option>
                );
            }
            setVoteCount(voteCount);
        }
        minimumVotes()

        const getGenres = async () => {
            let genre = [];
            try {
                const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=a4999a28333d1147dbac0d104526337a&language=en-US')
                for (let i = 0; i < response.data.genres.length; i++) {
                    genre.push(
                        <option key={i} value={response.data.genres[i].name}>
                            {response.data.genres[i].name}
                        </option>
                    );
                }
                setGenres(genre)
            } catch (error) {
                console.log('fetching now playing movie data error', error);
            }
        }
        getGenres()
    }, []);

    const handleOnChange = (e) => {
        const type = e.target.getAttribute("name");
        const value = e.target.value;

        switch (type) {
            case "from-year":
                setFromYearInfo(value);
                break;
            case "rating":
                setRatingInfo(parseInt(value));
                break;
            case "vote-count":
                setVoteCountInfo(parseInt(value));
                break;
            case "genresss":
                setGenresInfo(value);
                break;
            default:
                return null;
        }
    }

    const showFillterdMovies = () => {
        if ((fromYearInfo || ratingInfo || voteCountInfo || genresInfo) !== "N/A") {
            alert('good')
        } else {
            alert('bad')
        }
    }

    return <div className='advancedSearch'>
        <h1>Advanced Search</h1>
        <div className='fillterSearch'>
            <div>
                <select name="from-year" defaultValue='DEFAULT' onChange={handleOnChange}>
                    <option value="DEFAULT" disabled >Release Date</option>
                    {fromYear && fromYear.map(year => year)}
                </select>
            </div>

            <div>
                <select name="rating" defaultValue='DEFAULT' onChange={handleOnChange}>
                    <option value="DEFAULT" disabled >Minimum Rating</option>
                    {rating && rating.map(rating => rating)}
                </select>
            </div>

            <div>
                <select name="vote-count" defaultValue='DEFAULT' onChange={handleOnChange}>
                    <option value="DEFAULT" disabled >Minimum Votes</option>
                    {voteCount && voteCount.map(vote => vote)}
                </select>
            </div>

            <div>
                <select name="genresss" defaultValue='DEFAULT' onChange={handleOnChange}>
                    <option value="DEFAULT" disabled >Genres</option>
                    {genres && genres.map(genre => genre)}
                </select>
            </div>
        </div>
        <div>
            <div>
                <h3>Search Information</h3>
            </div>
            <div>From Year:{fromYearInfo}</div>
            <div>Minimum Rating:{ratingInfo}</div>
            <div>Minimum Votes:{voteCountInfo}</div>
            <div>Genre:{genresInfo}</div>
        </div>
        <div>
            <input type='button' value='Search' onClick={showFillterdMovies} />
        </div>
    </div>;
}

export default AdvancedSearch;
