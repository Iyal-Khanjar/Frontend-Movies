import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../actions/userActions';
import { Header, Nav, NavItem } from '../../styles/app.styles';
import '../../index.css'
function Navbar() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }

  // const changeMode = () => {
  //   var r = document.querySelector(':root');

  //   r.style.setProperty('--light-background-color', 'lightblue'); 
  // }

  return (
    <Header>
      <Nav>
        <Link className="brand" to="/">
          <span>Movie Land</span>
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
      </Nav>
      {/* <div>
        <input type="checkbox" className="checkbox" id="chk" />
        <label className="label" htmlFor="chk">
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
          <div className="ball"></div>
        </label>
      </div> */}
      {/* <div className='mode' onClick={changeMode}></div> */}
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
