import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {SearchAutoComplete} from '../../components/SearchAutoComplete/SearchAutoComplete'
import Card from '../../components/Card';
import LoadingBox from '../../components/LoadingBox'

const imageUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "a4999a28333d1147dbac0d104526337a";
const url = "https://api.themoviedb.org/3";
const searchM = `${url}/search/movie`;
const searchA = `${url}/search/person`;
const searchT = `${url}/search/person`;

function AutoSearchResults() {
    const params = useParams()
    const [movieList, setMovieList] = useState([]);
    const [actorsList, setActorsList] = useState([]);
    const [tvList, setTvList] = useState([]);


    useEffect(() => {

    },[])

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
          const responseA = await axios.get(searchP, {
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



    return (
         <div>
        <SearchAutoComplete />
            <h1 className='moviesTitle'>Movies</h1>
            
            {
                !movieList && <LoadingBox />
            }
            {
                movieList ? <div className="movie-tv-container">
                    {movieList.map((ele) => {
                        return (
                            <Card data={ele} urlLink={imageUrl} key={ele.id} type="movie" />
                        );
                    })}
                </div> : <LoadingBox></LoadingBox>
            }
           
    
    
        </div>
        )
}

export default AutoSearchResults;
