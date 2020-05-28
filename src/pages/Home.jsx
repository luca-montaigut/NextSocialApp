import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { Layout, Divider } from 'antd';
import { Typography } from 'antd';

import { loadPosts, newPost, destroyPost, editingPost } from '../redux/actions/postsActions'

import Trash from '../assets/icons/trash.svg'


const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const posts = useSelector(state => state.posts.posts);

  const [msg, setMsg] = useState("")
  const [msgEdit, setMsgEdit] = useState("")
  const [edit, setEdit] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    const getPosts = () => {
      fetch("https://api-minireseausocial.mathis-dyk.fr/posts")
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response
        })
        .then((response) => response.json())
        .then((response) => {
          dispatch(loadPosts(response))
        })
    }
    if (posts.length === 0) {
      getPosts()
    }
  }, [posts, dispatch])

  const addPost = (e) => {
    e.preventDefault()
    const addPost = {
      text: msg,
      user: user.id
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
        setMsg('')
      })
      .catch((error) => {
        alert(error)
      })
  }

  const editPost = (post) => {
    const data = {
      text: msgEdit
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
        dispatch(editingPost(response))
        setEdit("")
      })
      .catch((error) => {
        alert(error)
      })
  }

  const deletePost = (toDeletePost) => {
    if (window.confirm("Le message va être supprimé")) {
      fetch(`https://api-minireseausocial.mathis-dyk.fr/posts/${toDeletePost.id}`, {
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
          dispatch(destroyPost(response))
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  const incrementLike = (post) => {
    const data = {
      like: post.like + 1
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
        dispatch(editingPost(response))
        setEdit("")
      })
      .catch((error) => {
        alert(error)
      })
  }

  const { Title } = Typography;
  const { Header, Content } = Layout;

  return (
    <>
      <Header className="site-layout-sub-header-background" style={{ padding: 0, textAlign: "center" }}>
        <Title>Welcome on My Social Network.</Title>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {isAuthenticated &&
            <>
              <h2>Hello {user.username}, what do you want to share with us today ?</h2>
              <div className="form-box">
                <form onSubmit={addPost} className="msg-box">
                  <textarea type="text" placeholder="Your shitty message..." onChange={(e) => setMsg(e.target.value)} value={msg} />
                  <input type="submit" className="btn-submit" />
                </form>
              </div>
              <Divider>News feed</Divider>
            </>
          }
          <div>
            <ul>
              {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => {
                if (!post.text || !post.user) {
                  return false
                }
                return (

                  <li key={post.id}>
                    {isAuthenticated && post.user.id === user.id && edit !== post.id &&
                      <>
                        <img src={Trash} alt="delete post" onClick={() => deletePost(post)} style={{ height: "1em" }} />
                        <button onClick={() => setEdit(post.id)}>Edit</button>
                      </>
                    }
                    {isAuthenticated &&
                      <Link to={`/user/${post.user.id}`}>
                        <b>{post.user.username} : </b>
                      </Link>
                    }
                    {edit !== post.id &&
                      <>
                        {post.text}
                      </>
                    }
                    {isAuthenticated && edit !== post.id &&
                      <span onClick={() => incrementLike(post)}> <b>|</b> {`❤ ${!post.like ? 0 : post.like}`} <b>|</b></span>
                    }
                    {edit === post.id &&
                      <>
                        <input value={msgEdit} onFocus={() => setMsgEdit(post.text)} autoFocus onChange={(e) => setMsgEdit(e.target.value)} />
                        <button onClick={() => editPost(post)}>edit post</button>
                        <button onClick={() => setEdit("")}>cancel</button>
                      </>
                    }
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Content>
    </>
  )
}

export default Home;
