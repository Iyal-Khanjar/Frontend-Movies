import React, { useEffect, useState } from "react";
import axios from "axios";

const imageUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "a4999a28333d1147dbac0d104526337a";
const url = "https://api.themoviedb.org/3";
const searchM = `${url}/search/movie`;
const searchP = `${url}/search/person`;

export const SearchAutoComplete = () => {
  const [searchLetters, setSearchLetters] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    search();
  }, [searchLetters]);

  const search = async () => {
    try {
      const response = await axios.get(searchM, {
        params: {
          api_key: apiKey,
          language: "en-US",
          query: searchLetters,
          page: 1,
          include_adult: false,
        },
      });

      // const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchLetters}&page=1&include_adult=false`)
      setSearchedData(response.data.results);
      console.log(response.data.results);
    } catch (err) {
      console.log("auto complete search error:", err);
    }
  };

  //     const tmdbCastId = async (query) => {
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/search/person?api_key=${ApiKey}&query=${query}`
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
  console.log(searchLetters);

  const handleChange = (e) => {
    setSearchLetters(e.target.value);
  };

  return (
    <div>
      <input
        value={searchLetters}
        onChange={handleChange}
        placeholder="The world is your oyster..."
      />
    </div>
  );
};
