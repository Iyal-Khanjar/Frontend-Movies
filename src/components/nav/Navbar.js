import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../actions/userActions';
import { Header,Nav,NavItem } from '../../styles/app.styles';
import '../../index.css'
function Navbar() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch()

    const signoutHandler = () => {
        dispatch(signout())
    }
    
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
            <Link to="/search">
                <NavItem>Advanced Search</NavItem>
            </Link>
        </Nav>
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
