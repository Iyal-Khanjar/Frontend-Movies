import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import GoogleLogin from 'react-google-login'
// import axios from 'axios';

export default function SigninScreen() {
  const navigate = useNavigate()

  // const [user, setUser] = useState()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo]);

  const responseGoogle = async (response) => {
    console.log(response);
    alert('Comming Soon...')
    // try {
    //   const res = await axios.post('/api/users/google_login', { tokenId: response.tokenId })

    //   setUser({ ...user, error: '', success: res.data.msg })
    //   localStorage.setItem('firstLogin', true)

    //   dispatch(signin());
    //   navigate('/')
    // } catch (err) {
    //   err.response.data.msg &&
    //     setUser({ ...user, err: err.response.data.msg, success: '' })
    // }
  }




  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
          <br />
          <GoogleLogin className='googleLogin'
            clientId='539350701251-j3ols9991tnjr3lomv2t98ijof353f9o.apps.googleusercontent.com'
            buttonText="Login with google"
            onSuccess={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <div>
          <label />
          <div>
            New User?{' '}
            <Link to='/register'>
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
