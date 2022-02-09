import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Table, TableTbodyTr,TableTd,TableTh,TableButton} from './AllUsersScreen.styles'
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
                <Table>
                    <thead>
                        <tr>
                            <TableTh>Avatar</TableTh>
                            <TableTh>Name</TableTh>
                            <TableTh>Email</TableTh>
                            <TableTh>IsAdmin</TableTh>
                            <TableTh>Delete</TableTh>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsersData.map((user) => (
                            <TableTbodyTr key={user._id}>
                                <TableTd><img className="small" src={user.pic} alt={user.name}></img></TableTd>
                                <TableTd>{user.name}</TableTd>
                                <TableTd>{user.email}</TableTd>
                                <TableTd>{user.isAdmin ? 'true' : 'false'}</TableTd>
                                <TableTd className='btnsDeleteAndEdit'>
                                    <TableButton type="button" className="primary widthMax" onClick={() => deleteHandler(user._id)}>Delete</TableButton>
                                    <TableButton type="button" className="primary widthMax" >Edit</TableButton>
                                </TableTd>
                            </TableTbodyTr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AllUsersScreen
