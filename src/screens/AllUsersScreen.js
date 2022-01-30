import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function AllUsersScreen() {
    const navigate = useNavigate()
    const [allUsersData, setAllUsersData] = useState([])

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
        const getUsers = async () => {
            try {
                const response = await axios.get('/api/users/allusersprofile');
                setAllUsersData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getUsers()
    }, [allUsersData, navigate, userInfo])

    const deleteHandler = (id) => {
        try {
            axios.delete(`/api/users/${id}`)
                .then(() => {
                    setAllUsersData(allUsersData.filter(item => item.id !== id));
                })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='allUsersContainer'>
            <div>
                <h1>All Users Screen</h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}

            <div className='users'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>IsAdmin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsersData.map((user) => (
                            <tr key={user._id}>
                                <td><img className="small" src={user.pic} alt={user.name}></img></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'true' : 'false'}</td>
                                <td className='btnsDeleteAndEdit'>
                                    <button type="button" className="primary widthMax" onClick={() => deleteHandler(user._id)}>Delete</button>
                                    <button type="button" className="primary widthMax" >Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllUsersScreen
