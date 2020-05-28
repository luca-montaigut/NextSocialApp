import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { Layout } from 'antd';
import { Typography } from 'antd';

const OtherUser = () => {
    const token = useSelector(state => state.auth.token);
    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])

    let { userId } = useParams()

    useEffect(() => {
        const fetchUser = () => {
            fetch(`https://api-minireseausocial.mathis-dyk.fr/users/${userId}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response
                })
                .then((response) => response.json())
                .then((response) => {
                    setUser(response)
                })
                .catch((error) => {
                    alert(error)
                })
        }
        const fetchUserPosts = () => {
            fetch(`https://api-minireseausocial.mathis-dyk.fr/posts?user.id=${userId}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response
                })
                .then((response) => response.json())
                .then((response) => {
                    setUserPosts(response)
                })
                .catch((error) => {
                    alert(error)
                })
        }
        fetchUser()
        fetchUserPosts()
    }, [token, userId])

    const { Header, Content } = Layout;

    const { Title } = Typography;


    return (
        <>
            <Header className="site-layout-sub-header-background" style={{ padding: 0, textAlign: "center" }}>
                <Title>Welcome on {user.username}'s profile.</Title>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: "100%" }}>
                    <div>
                        <p>id : {user.id}</p>
                        <p>name : {user.username}</p>
                        <p>description : {user.description}</p>
                    </div>
                    <h2>Les messages postés par {user.username}</h2>
                    <ul>
                        {userPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => {
                            if (!post.text || !post.user) {
                                return false
                            }
                            return (
                                <li key={post.id}>

                                    <b>{post.user.username} : </b>

                                    {post.text}
                                    <span onClick={() => console.log("like")}> <b>|</b> {`❤ ${!post.like ? 0 : post.like}`} <b>|</b></span>
                                </li>)
                        })}
                    </ul>
                </div>
            </Content>
        </>)
}

export default OtherUser