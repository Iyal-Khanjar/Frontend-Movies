import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../actions/userActions';
import { Header, Nav1, Nav2, NavItem } from '../../styles/app.styles';
import '../../index.css'
import useWindowDimensions from '../useWindowDimensions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";


function Navbar() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [hamburger, setHamburger] = useState(false)
  const [clicked, setClicked] = useState(false)
  const dispatch = useDispatch()

  const { width } = useWindowDimensions()
  useEffect(() => {
    if (width <= 815) {
      setHamburger(true)
    } else {
      setHamburger(false)
    }
  }, [width])

  const signoutHandler = () => {
    dispatch(signout())
  }
  const handleClick = (e) => {
    setClicked(!clicked)
  }


  return (
    <Header>
      {hamburger ?
        (
          !clicked ?
            <FontAwesomeIcon icon={faFilm} style={{ color: "orange", marginRight: "1rem" }} onClick={handleClick} />
            :
            <Nav1>
              <FontAwesomeIcon icon={faFilm} style={{ color: "orange", marginRight: "1rem" }} onClick={handleClick} />
              <br />
              <Link onClick={handleClick} className="brand" to="/">
                <NavItem>Movie Land</NavItem>
              </Link>
              <Link onClick={handleClick} to="/movies">
                <NavItem className=''>Movies</NavItem>
              </Link>
              <Link onClick={handleClick} to="/tvshows">
                <NavItem>Tv Shows</NavItem>
              </Link>
              <Link onClick={handleClick} to="/actors">
                <NavItem>Actors</NavItem>
              </Link>
              <Link onClick={handleClick} to="/search">
                <NavItem>Advanced Search</NavItem>
              </Link>
            </Nav1>
        )
        :
        <Nav2>
          <Link className="brand" to="/">
            <NavItem>Movie Land</NavItem>
          </Link>
          <Link to="/movies">
            <NavItem className=''>Movies</NavItem>
          </Link>
          <Link to="/tvshows">
            <NavItem>Tv Shows</NavItem>
          </Link>
          <Link to="/actors">
            <NavItem>Actors</NavItem>
          </Link>
          <Link to="/search">
            <NavItem>Advanced Search</NavItem>
          </Link>
        </Nav2>
      }
      <div className='allNav'>
        {userInfo ? (
          <>
            <div className='picAndName'>
              <img className='profilePicInNav' src={userInfo.pic} alt='user avater'></img>
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  {userInfo && userInfo.isAdmin && (
                    <li>
                      <Link to="/allusers"><NavItem>All Users</NavItem></Link>
                    </li>
                  )}
                  {userInfo &&
                    <>
                      <li>
                        <Link to="/profile"><NavItem>Profile</NavItem></Link>
                      </li>
                      <li>
                        <Link to="/favoritemovies"><NavItem>Favorites</NavItem></Link>
                      </li>
                    </>
                  }
                  <li>
                    <Link to="/" onClick={signoutHandler}>
                      <NavItem> Sign Out</NavItem>
                    </Link>
                  </li>
                </ul>
              </div>
            </div></>
        ) : (
          <Link to="/signin"><NavItem>Sign In <i className="fa-solid fa-right-to-bracket"></i></NavItem></Link>
        )}
      </div>
    </Header>
  )
}

export default Navbar;
