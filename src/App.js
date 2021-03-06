import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomeScreen from './screens/HomeScreen/HomeScreen'
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen'
import AllUsersScreen from './screens/AllUsersScreen/AllUsersScreen';
import ProfileScreen from './screens/ProfileScreen';
import MoviesScreen from './screens/MoviesScreen';
import MovieScreen from './screens/MovieScreen/MovieScreen';
import TvShowsScreen from './screens/TvShowsScreen';
import TvShowScreen from './screens/TvShowScreen';
import AdvancedSearch from './screens/AdvancedSearch/AdvancedSearch';
import AutoSearchResults from './screens/AutoSearchResults/AutoSearchResults';
import FavoriteMovies from './screens/FavoriteMovies';
import {AppContainer} from "./styles/app.styles"
import Navbar from './components/nav/Navbar';
import MoviesByActor from './screens/MoviesByActor';
import ActorsScreen from './screens/ActorsScreen'

function App() {

  return (
    <BrowserRouter>
      <AppContainer>
      <Navbar/>
        <main className='main'>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/allusers" element={<AllUsersScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/movies" element={<MoviesScreen />} />
            <Route path="/movie/:id" element={<MovieScreen />} />
            <Route path="/tvshows" element={<TvShowsScreen />} />
            <Route path="/tvshow/:id" element={<TvShowScreen />} />
            <Route path="/actors" element={<ActorsScreen />} />
            <Route path="/search" element={<AdvancedSearch />} />
            <Route path="/favoritemovies" element={<FavoriteMovies />} />
            <Route path="/moviesbyactor/:id" element={<MoviesByActor />} />
            <Route path="/search/:query" element={<AutoSearchResults />} />
          </Routes>
        </main>
        {/* <footer>
          <div className='footer'>
            <div className='footer-content'>
              <span>Movies Trailers </span>
              <span>??2021 Israel, Inc. All rights reserved</span>
            </div>
          </div>
        </footer> */}
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
