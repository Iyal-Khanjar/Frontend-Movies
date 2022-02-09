import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function FavoriteMovies() {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return <div>
        Favorite Movies
    </div>;
}

export default FavoriteMovies;
