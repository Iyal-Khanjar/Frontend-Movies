import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Img,
  IconAndYearContainer,
} from "./SearchAutoCompleteStyle";
import { Link } from "react-router-dom";

const imageUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "a4999a28333d1147dbac0d104526337a";
const url = "https://api.themoviedb.org/3";
const searchM = `${url}/search/movie`;
const searchP = `${url}/search/person`;

export const SearchAutoComplete = () => {
  const [searchLetters, setSearchLetters] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
      if(searchLetters){
          setTimeout(()=>{

              search();
          },2000)

      }
  }, [searchLetters]);

  const search = async () => {


    const array = [];
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
      const responseP = await axios.get(searchP, {
        params: {
          api_key: apiKey,
          query: searchLetters,
        },
      });

      const movies = responseM.data.results.slice(0, 4);
      const actors = responseP.data.results.slice(0, 3);

      array.push(...movies, ...actors);
      setSearchedData(array);
    } catch (err) {
      console.log("auto complete search error:", err);
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

  console.log(searchLetters);
  console.log(searchedData);

  const handleChange = (e) => {
    setSearchLetters(e.target.value);
    if(searchLetters==''){
        setSearchedData([])
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
    if (e.keyCode === 13) {
      console.log(e.target.value);
      
    }
  };


  return (
    <div>
      <input
        value={searchLetters}
        onChange={handleChange}
        placeholder="Find What You Looking For"
        onKeyDown={()=> handleKeyDown(<Link to={"/"}></Link>)}
      />
      {searchLetters? 
      
      searchedData.map((ele) => {
        if (ele.known_for_department) {
          return (
            <div key={ele.id}>
              <Container >
                <Img
                  src={ele.profile_path?`https://image.tmdb.org/t/p/w92/${ele.profile_path}` :"https://www.onlinewebfonts.com/icon/388254"}
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
            </div>
          );
        } else {
            return (
        <div key={ele.id} >
        <Link to={`/movie/${ele.id}`} >
            
          <Container >
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
        </div>
      );
        }
      }) : ''}
      
    </div>
  );
};
