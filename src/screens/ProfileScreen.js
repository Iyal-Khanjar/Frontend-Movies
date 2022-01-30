import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pic, setPic] = useState();
  const [picMessage, setPicMessage] = useState();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
    setName(userInfo.name)
    setEmail(userInfo.email)
    setPic(userInfo.pic)
  }, [navigate, userInfo])

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "movies");
      data.append("cloud_name", "ayal");
      fetch("https://api.cloudinary.com/v1_1/ayal/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword)
      dispatch(updateProfile({ name, email, password, pic }));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading && <LoadingBox />}
        {success && (
          <MessageBox variant="success">
            Updated Successfully
          </MessageBox>
        )}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Enter confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div className='uploadPicAndThePic'>
          <label htmlFor="profilepic">Profile Picture</label>
          <input
            onChange={(e) => postDetails(e.target.files[0])}
            id="profilepic"
            type="file"
            placeholder="Upload Profile Picture"
            accept='image/*'
          ></input>
        </div>
        <div className="profilePic">
          <img src={pic} alt={name} />
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
