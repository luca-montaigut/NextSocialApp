import React from 'react';
import { useSelector } from 'react-redux'

import { Layout } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const posts = useSelector(state => state.posts.posts);
  const { id, username } = user

  const likeForAll = () => {
    posts.forEach(post => {
      if (!post.like) {
        const data = {
          like: Math.floor(Math.random() * Math.floor(1000))
        }
        fetch(`https://api-minireseausocial.mathis-dyk.fr/posts/${post.id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        })
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response
          })
          .then((response) => response.json())
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            alert(error)
          })
      }
    });
  }

  const { Header, Content } = Layout;

  return (
    <>
      <Header className="site-layout-sub-header-background" style={{ padding: 0, textAlign: "center" }}>
        <Title>Welcome on your profile.</Title>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: "100%" }}>
          <p>id : {id}</p>
          <p>name : {username}</p>
          <button onClick={likeForAll}>like for all</button>
        </div>
      </Content>
    </>
  )
}

export default Profile;
