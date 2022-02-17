/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { MovieAdvanced } from "./MovieAdvanced";
import { TvShowsAdvanced } from "./TvShowsAdvanced";
import { SearchContainer, AdvancedSearchSelect, AdvancedSearchDiv } from './AdvancedSerch.styles'
import { ActorsAdvanced } from "./ActorsAdvanced";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import { LoadMore } from "../../components/LoadMore/LoadMore";

let moviesArr = [];
let tvsArr = [];
let actorsArr = [];
const imageUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "a4999a28333d1147dbac0d104526337a";
const url = "https://api.themoviedb.org/3";
const moviesSearchUrl = `${url}/discover/movie`;
const tvShowsUrl = `${url}/discover/tv`;
const movieQueryUrl = `${url}/search/movie`;
const tvShowsQueryUrl = `${url}/search/tv`;
const personQueryUrl = `${url}/search/person`;

function AdvancedSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [rating, setRating] = useState("");
  const [voteCount, setVoteCount] = useState("");
  const [genres, setGenres] = useState("");
  const [searchFor, setSearchFor] = useState("N/A");
  const [fromYearInfo, setFromYearInfo] = useState("N/A");
  const [toYearInfo, setToYearInfo] = useState("N/A");
  const [ratingInfo, setRatingInfo] = useState("N/A");
  const [voteCountInfo, setVoteCountInfo] = useState("N/A");
  const [genresInfo, setGenresInfo] = useState("N/A");
  const [showStatus, setShowStatus] = useState("N/A");
  const [showType, setShowType] = useState("N/A");
  const [fetcedData, setFetchedData] = useState([]);
  const [query, setQuery] = useState('');
  let [pageCount, setPageCount] = useState(1);


  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [favortieMovies, setFavortieMovies] = useState(userInfo ? userInfo.favortieMovies : [])
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
  }, [pageCount]);

  const handleOnChange = (e) => {
    moviesArr = [];
    tvsArr = [];
    actorsArr = [];
    setQuery('')
    setFetchedData([])
    const type = e.target.getAttribute("name");
    const value = e.target.value;

    switch (type) {
      case "search-for":
        setSearchFor(value);
        break;
      case "from-year":
        setFromYearInfo(value);
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

  const handleNameSearch = (e) => {
    setQuery(e.target.value)
  }


  useEffect(() => {
    getSearchDate()
  }, [pageCount])


  const getSearchDate = async () => {

    if (searchFor === "movie") {

      if (query === '') {
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
              page: pageCount,
            },
          });
          moviesArr.push(...response.data.results)
          // console.log('movies  search1', response.data.results);
          setFetchedData(moviesArr);
        } catch (error) {
          console.log("search data error: ", error);
        }
      } else {

        try {
          const response = await axios.get(movieQueryUrl, {
            params: {
              api_key: apiKey,
              language: "en_US",
              query: query,
              include_adult: false,
              page: pageCount,
              year: fromYearInfo
            },
          });

          console.log('response', response.data.results);
          moviesArr.push(...response.data.results)
          setFetchedData(moviesArr);
        } catch (error) {
          console.log("search data error: ", error);
        }

      }
    }

    else if (searchFor === "tvshow") {

      if (query === '') {
        try {
          const response = await axios.get(tvShowsUrl, {
            params: {
              api_key: apiKey,
              language: "en_US",
              sort_by: "popularity.desc",
              first_air_date_year: fromYearInfo,
              page: pageCount,
              with_status: showStatus,
              with_type: showType,
            },
          });

          tvsArr.push(...response.data.results)
          setFetchedData(tvsArr);
        } catch (error) {
          console.log("search data error: ", error);
        }
      } else {
        try {
          const response = await axios.get(tvShowsQueryUrl, {
            params: {
              api_key: apiKey,
              language: "en_US",
              query: query,
              include_adult: false,
              page: pageCount,
              first_air_date_year: fromYearInfo
            },
          });

          tvsArr.push(...response.data.results)
          setFetchedData(tvsArr);
        } catch (error) {
          console.log("search data error: ", error);
        }
      }
    }
    else if (searchFor === "moviesbyactor") {

      try {

        const response = await axios.get(personQueryUrl, {
          params: {
            api_key: apiKey,
            language: "en_US",
            include_adult: false,
            query: query,
            page: pageCount,

          },
        });

        actorsArr.push(...response.data.results)
        console.log('actorsArr', actorsArr);
        setFetchedData(actorsArr);

      } catch (error) {
        console.log("search data error: ", error);
      }
    };
  }

  useEffect(() => {
    if (fetcedData) {
      if (searchFor === 'movie') {
        fetcedData.forEach(pro => {
          pro.type = 'movie'
        })
      } else if (searchFor === 'tvshow') {
        fetcedData.forEach(pro => {
          pro.type = 'tvshow'
        })
      } else if (searchFor === 'moviesbyactor') {
        fetcedData.forEach(pro => {
          pro.type = 'moviesbyactor'
        })
      }
    }
  }, [fetcedData])

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchDate();
  };

  const handleLoadMore = () => {
    setPageCount(pageCount += 1)

  }

  useEffect(() => {
    userInfo && setFavortieMovies(userInfo.favortieMovies)
  }, [userInfo])

  useEffect(() => {
    userInfo && dispatch(updateProfile({ favortieMovies }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, favortieMovies])

  const addToFavorite = (data) => {
    if (!userInfo) {
      alert('Please Sign In First')
      navigate('/signin')
    }
    const allIDSINFavoriteMovies = favortieMovies.map(item => {
      return item.id
    })
    if (allIDSINFavoriteMovies.includes(data.id)) {
      alert('It Is Already In Your Favorites')
    } else {
      setFavortieMovies([...favortieMovies, data])
      let element = document.querySelector(`#a${data.id}`)
      element.classList.add('heartFavorite');
    }
  }
  return (
    <AdvancedSearchDiv>
      <h1>Advanced Search</h1>
      <div>
        <AdvancedSearchSelect name="search-for" onChange={handleOnChange}>
          <option value="Search For">Search For</option>
          <option value="movie">Movies</option>
          <option value="tvshow">Tv Shows</option>
          <option value="moviesbyactor">Actors</option>
        </AdvancedSearchSelect>
      </div>
      {searchFor === "N/A" ? (
        ""
      ) : searchFor === "movie" ? (

        <MovieAdvanced
          query={query}
          handleOnChange={handleOnChange}
          handleNameSearch={handleNameSearch}
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
      ) : searchFor === 'tvshow' ? (
        <TvShowsAdvanced
          query={query}
          handleOnChange={handleOnChange}
          handleNameSearch={handleNameSearch}
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
      ) :
        <>

          <ActorsAdvanced
            query={query}
            handleNameSearch={handleNameSearch}
            handleSubmit={handleSubmit}
          />
          {/* <img src='../img/Best-Actors-in-the-World.jpg' style={{width:300, height:300}} /> */}
        </>



      }

      {/* <Paginate handlePageClick={handlePageClick} pageCount={pageCount} /> */}
      <SearchContainer>
        {fetcedData.map((ele) => {
          return (
            <Card data={ele} urlLink={imageUrl} key={ele.id} type={searchFor} addToFavorite={() => addToFavorite(ele)} />
          );
        })}

      </SearchContainer>
      {fetcedData[0]?.known_for_department ? <LoadMore handleLoadMore={handleLoadMore} /> : ''}

    </AdvancedSearchDiv>
  );
}

export default AdvancedSearch;
