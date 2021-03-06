/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faStar, faUser, faTelevision } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  SkContainer,
  Img,
  IconAndYearContainer,
  Input,
  Search,
  SearchResults,
} from "./SearchAutoCompleteStyle";
import { Link, useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const apiKey = "a4999a28333d1147dbac0d104526337a";
const url = "https://api.themoviedb.org/3";
const searchM = `${url}/search/movie`;
const searchP = `${url}/search/person`;
const searchT = `${url}/search/tv`;

export const SearchAutoComplete = ({ type }) => {
  const [searchLetters, setSearchLetters] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchLetters) {
      setTimeout(() => {
        setTimeout(() => {
          setLoader(true);
        }, 1000);
        search();
        setLoader(false);
      }, 1500);
    }
  }, [searchLetters]);

  const search = async () => {
    const array = [];
    if (type === "movie") {
      try {
        const responseM = await axios.get(searchM, {
          params: {
            api_key: apiKey,
            language: "en-US",
            query: searchLetters,
            page: 1,
            include_adult: false,
          },
        });

        const movies = responseM.data.results.slice(0, 7);

        array.push(...movies);
        setSearchedData(array);
      } catch (err) {
        console.log("auto complete search error:", err);
      }
    } else if (type === "tv") {
      try {
        const responseT = await axios.get(searchT, {
          params: {
            api_key: apiKey,
            language: "en-US",
            query: searchLetters,
            page: 1,
            include_adult: false,
          },
        });

        const tvshows = responseT.data.results.slice(0, 7);

        array.push(...tvshows);
        setSearchedData(array);
      } catch (err) {
        console.log("auto complete search error:", err);
      }
    } else if (type === "actors") {
      try {
        const responseP = await axios.get(searchP, {
          params: {
            api_key: apiKey,
            language: "en-US",
            query: searchLetters,
            page: 1,
            include_adult: false,
          },
        });

        const actors = responseP.data.results.slice(0, 7);

        array.push(...actors);
        setSearchedData(array);
      } catch (err) {
        console.log("auto complete search error:", err);
      }
    } else {
      try {
        const responseM = await axios.get(searchM, {
          params: {
            api_key: apiKey,
            language: "en-US",
            query: searchLetters,
            page: 1,
            include_adult: false,
          },
        });
        const responseT = await axios.get(searchT, {
          params: {
            api_key: apiKey,
            language: "en-US",
            query: searchLetters,
            page: 1,
            include_adult: false,
          },
        });
        const responseP = await axios.get(searchP, {
          params: {
            api_key: apiKey,
            query: searchLetters,
          },
        });

        const movies = responseM.data.results.slice(0, 4);
        const tvshows = responseT.data.results.slice(0, 2);
        const actors = responseP.data.results.slice(0, 2);

        array.push(...movies, ...actors, ...tvshows);
        setSearchedData(array);
        console.log('array',array);
      } catch (err) {
        console.log("auto complete search error:", err);
      }
    }
  };

  //     const tmdbCastId = async (query) => {
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/search/person?api_key=a4999a28333d1147dbac0d104526337a&query=s`
  //     );
  //     const data = await response.json();

  //     return data;
  //   };

  //   const tmdbActorsApi = async (name) => {
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/search/person?api_key=${ApiKey}&language=en-US&query=${name}&page=1&include_adult=false`
  //     );
  //     const data = await response.json();
  //     return data;
  //   };

  //
  //   results.slice(0, 4);

  // console.log(searchLetters);
  // console.log(searchedData);

  const handleChange = (e) => {
    setSearchLetters(e.target.value);
    if (searchLetters === "") {
      setSearchedData([]);
    }
  };

  //   const handleClick = (e,type) => {
  //     setSearchLetters('');
  //     if(type==='movie') {

  //         <Link to={`/${type}/${e}`}>

  //         </Link>
  //     } else {
  //         console.log(e);
  //     }

  //   }
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && searchLetters) {
      navigate(`/search/${searchLetters}`);
    }
  };

  const handleFocusOut = () => {
    setSearchedData([]);
  };

  return (
    <Search>
      <Input
        value={searchLetters}
        type="text"
        onChange={handleChange}
        placeholder="Find.."
        onKeyDown={handleKeyDown}
        // onBlur={handleFocusOut}
      />
      <SearchResults >
        {searchLetters
          ? searchedData.map((ele) => {
              if (ele.known_for_department) {
                return (
                  <div key={ele.id}>
                    {!loader ? (
                      <SkContainer>
                        <SkeletonTheme
                          baseColor="#202020"
                          highlightColor="#fff"
                          height="6px"
                        >
                          <p>
                            <Skeleton count={3} />
                          </p>
                        </SkeletonTheme>
                      </SkContainer>
                    ) : (
                      <Link to={`/moviesbyactor/${ele.id}`}>
                        <Container>
                          <Img
                            src={
                              ele.profile_path
                                ? `https://image.tmdb.org/t/p/w92/${ele.profile_path}`
                                : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                            }
                            alt=""
                          />
                          <div>
                            <div> {ele.name}</div>
                            <IconAndYearContainer>
                              <FontAwesomeIcon
                                icon={faUser}
                                style={{ marginBottom: "5px" }}
                              />
                              <div style={{ marginLeft: "1rem" }}>
                                {ele.known_for_department === "Acting"
                                  ? "Actor"
                                  : "Director"}
                              </div>
                            </IconAndYearContainer>
                          </div>
                        </Container>
                      </Link>
                    )}
                  </div>
                );
              } else if(ele.first_air_date) {
                return (
                  <div key={ele.id}>
                    {!loader ? (
                      <SkContainer>
                        <SkeletonTheme
                          baseColor="#202020"
                          highlightColor="#fff"
                          height="6px"
                        >
                          <p>
                            <Skeleton count={3} />
                          </p>
                        </SkeletonTheme>
                      </SkContainer>
                    ) : (
                      <Link to={`/tvshow/${ele.id}`}>
                        <Container>
                          <Img
                            src={`https://image.tmdb.org/t/p/w92/${ele.poster_path}`}
                            alt=""
                          />

                          <div>
                            <div> {ele.title}</div>
                            <IconAndYearContainer>
                              <FontAwesomeIcon icon={faTelevision} />
                              <div style={{ marginLeft: "1rem" }}>
                                {ele.release_date
                                  ? ele.release_date.substr(0, 4)
                                  : null}
                              </div>
                            </IconAndYearContainer>
                            <div>
                              <FontAwesomeIcon
                                icon={faStar}
                                style={{ color: "orange", marginRight: "1rem" }}
                              />
                              {ele.vote_average}
                            </div>
                          </div>
                        </Container>
                      </Link>
                    )}
                  </div>
                );
              }
              else {
                return (
                  <div key={ele.id}>
                    {!loader ? (
                      <SkContainer>
                        <SkeletonTheme
                          baseColor="#202020"
                          highlightColor="#fff"
                          height="6px"
                        >
                          <p>
                            <Skeleton count={3} />
                          </p>
                        </SkeletonTheme>
                      </SkContainer>
                    ) : (
                      <Link to={`/movie/${ele.id}`}>
                        <Container>
                          <Img
                            src={`https://image.tmdb.org/t/p/w92/${ele.poster_path}`}
                            alt=""
                          />

                          <div>
                            <div> {ele.title}</div>
                            <IconAndYearContainer>
                              <FontAwesomeIcon icon={faFilm} />
                              <div style={{ marginLeft: "1rem" }}>
                                {ele.release_date
                                  ? ele.release_date.substr(0, 4)
                                  : null}
                              </div>
                            </IconAndYearContainer>
                            <div>
                              <FontAwesomeIcon
                                icon={faStar}
                                style={{ color: "orange", marginRight: "1rem" }}
                              />
                              {ele.vote_average}
                            </div>
                          </div>
                        </Container>
                      </Link>
                    )}
                  </div>
                );
              }
            })
          : ""}
      </SearchResults>
    </Search>
  );
};
