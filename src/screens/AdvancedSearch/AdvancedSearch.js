import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { SearchContainer } from "./AdvancedSearchStyle";
import { MovieAdvanced } from "./MovieAdvanced";
import { TvShowsAdvanced } from "./TvShowsAdvanced";

const imageUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "a4999a28333d1147dbac0d104526337a";
const url = "https://api.themoviedb.org/3";
const moviesSearchUrl = `${url}/discover/movie`;
const tvShowsUrl = `${url}/discover/tv`;



function AdvancedSearch() {
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [rating, setRating] = useState("");
  const [voteCount, setVoteCount] = useState("");
  const [genres, setGenres] = useState("");
  const [searchFor, setSearchFor] = useState("N/A")
  const [fromYearInfo, setFromYearInfo] = useState("N/A");
  const [toYearInfo, setToYearInfo] = useState("N/A");
  const [ratingInfo, setRatingInfo] = useState("N/A");
  const [voteCountInfo, setVoteCountInfo] = useState("N/A");
  const [genresInfo, setGenresInfo] = useState("N/A");
  const [showStatus, setShowStatus] = useState("N/A");
  const [showType, setShowType] = useState("N/A");
  const [fetcedData, setFetchedData] = useState([]);

  const voteCounts = [
    20000, 15000, 10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000,
    500, 100,
  ];

  useEffect(() => {
    const fromYear = () => {
      let years = [];
      for (let i = new Date().getFullYear(); i > 1902; i--) {
        years.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      setFromYear(years);
    };
    fromYear();

    const toYear = () => {
      let years = [];
      for (let i = new Date().getFullYear(); i > 1902; i--) {
        years.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      setToYear(years);
    };
    toYear();

    const minimumRating = () => {
      let ratings = [];
      for (let i = 9; i > -1; i--) {
        ratings.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      setRating(ratings);
    };
    minimumRating();

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
    };
    minimumVotes();

    const getGenres = async () => {
      let genre = [];
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=a4999a28333d1147dbac0d104526337a&language=en-US"
        );

        for (let i = 0; i < response.data.genres.length; i++) {
          genre.push(
            <option key={i} value={response.data.genres[i].name}>
              {response.data.genres[i].name}
            </option>
          );
        }
        setGenres(genre);
      } catch (error) {
        console.log("fetching now playing movie data error", error);
      }
    };
    getGenres();
  }, []);

  const handleOnChange = (e) => {
    const type = e.target.getAttribute("name");
    const value = e.target.value;

    switch (type) {
      case "search-for":
        setSearchFor(value)
        break;
      case "from-year":
        setFromYearInfo(value)
        break;
      case "to-year":
        setToYearInfo(value);
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
      case "show-status":
        setShowStatus(value);
        break;
      case "show-type":
        setShowType(value);
        break;
      default:
        return null;
    }
  };
  const getSearchDate = async () => {
      if (searchFor === 'movies') {
          try {
            //   const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a4999a28333d1147dbac0d104526337a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${fromYearInfo}&primary_release_date.lte=${toYearInfo}&vote_count.gte=${voteCountInfo}&vote_average.gte=${ratingInfo}&with_genres=${genresInfo}&with_watch_monetization_types=flatrate`);
            const response = await axios.get(moviesSearchUrl, {
              params: {
                api_key: apiKey,
                language: "en_US",
                sort_by: "popularity.desc",
                include_adult: false,
                include_video: false,
                "primary_release_date.gte": fromYearInfo,
                "primary_release_date.lte": toYearInfo,
                "vote_count.gte": voteCountInfo,
                "vote_average.gte": ratingInfo,
                with_genres: genresInfo,
                with_watch_monetization_types: "flatrate",
                page: 1,
              },
            });
      
            setFetchedData(response.data.results);

        } catch (error) {
          console.log("search data error: ", error);
        }
      }
      else if (searchFor === "tv-shows"){
        try {
           
            const response = await axios.get(tvShowsUrl, {
              params: {
                api_key: apiKey,
                language: "en_US",
                sort_by: "popularity.desc",
                first_air_date_year:fromYearInfo,
                page: 1,
                with_status:showStatus,
                with_type:showType
              },
            });
      
            setFetchedData(response.data.results);

        } catch (error) {
          console.log("search data error: ", error);
        }

      }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchDate();
  };

  return (
    <div className="advancedSearch">
      <h1>Advanced Search</h1>
        <div>
          <select
           name="search-for"
           onChange={handleOnChange}
           >
            <option value="Search For">Search For</option>
            <option value="movies">Movies</option>
            <option value="tv-shows">Tv Shows</option>
          </select>
        </div>
        {searchFor ==="N/A" ? '' : (
          searchFor === 'movies' ? 
          <MovieAdvanced
         handleOnChange={handleOnChange}
         fromYear={fromYear}
         toYear={toYear}
         rating={rating}
         voteCount={voteCount}
         genres={genres}
         handleSubmit={handleSubmit}
         toYearInfo={toYearInfo}
         ratingInfo={ratingInfo}
         voteCountInfo={voteCountInfo}
         genresInfo={genresInfo}
         fromYearInfo={fromYearInfo}
          /> 
          :
          <TvShowsAdvanced
          handleOnChange={handleOnChange}
         fromYear={fromYear}
         rating={rating}
         voteCount={voteCount}
         genres={genres}
         showStatus={showStatus}
         handleSubmit={handleSubmit}
         ratingInfo={ratingInfo}
         voteCountInfo={voteCountInfo}
         genresInfo={genresInfo}
         fromYearInfo={fromYearInfo}
         showType={showType}
           />
        )}
        
          
      <SearchContainer>
        {fetcedData.map((ele) => {
          return <Card data={ele} urlLink={imageUrl} />;
        })}
      </SearchContainer>
    </div>
  );
}

export default AdvancedSearch;
