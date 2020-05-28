import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { newPost, editingPost, destroyPost } from '../redux/actions/postsActions'

import { Layout, Divider } from 'antd';
import { Typography } from 'antd';

import Faker from 'faker'

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const posts = useSelector(state => state.posts.posts);
  const { id, username } = user

  const dispatch = useDispatch()

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

  const randomPosts = (e) => {
    e.preventDefault()
    for (let i = 0; i < 25; i++) {
      const addPost = {
        text: Faker.hacker.phrase(),
        user: i,
      }
      fetch("https://api-minireseausocial.mathis-dyk.fr/posts", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addPost)
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response
        })
        .then((response) => response.json())
        .then((response) => {
          dispatch(newPost(response))
        })
        .catch(console.log)
    }
  }

  const deleteAll = () => {
    if (window.confirm("Êtes-vous sûr de vouloir tout supprimer ?")) {
      posts.forEach(post => {
        fetch(`https://api-minireseausocial.mathis-dyk.fr/posts/${post.id}`, {
          method: 'delete',
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
            console.log(response)
            dispatch(destroyPost(response))
          })
          .catch(console.log)
      });
    }
  }

  const iAmTheBoss = () => {
    const data = {
      text: `${username} c'est vraiment le boss !`
    }
    posts.forEach(post => {
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
          dispatch(editingPost(response))
        })
        .catch(console.log);
    })
  }

  const { Header, Content } = Layout;
  const { Title } = Typography;

  return (
    <>
      <Header className="site-layout-sub-header-background" style={{ padding: 0, textAlign: "center" }}>
        <Title>Welcome on your profile.</Title>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: "100%" }}>
          <p>id : {id}</p>
          <p>name : {username}</p>
          <Divider>Un grand pouvoir implique de grandes responsabilités</Divider>
          <button onClick={likeForAll}>like for all</button>
          <button onClick={randomPosts}>generate random posts</button>
          <button onClick={deleteAll}>delete all posts</button>
          <button onClick={iAmTheBoss}>petit plaisir</button>
        </div>
      </Content>
    </>
  )
}

export default Profile;
