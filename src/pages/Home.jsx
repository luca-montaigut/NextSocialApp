import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

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
    if (posts.length === 0) {
      getPosts()
    }
  }, [])

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

  const addPost = () => {
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
        console.log(response)
        dispatch(newPost(response))
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
        console.log(response)
        dispatch(editingPost(response))
        setEdit("")
      })
      .catch((error) => {
        alert(error)
      })
  }

  const deletePost = (toDeletePost) => {
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
        console.log(response)
        dispatch(destroyPost(response))
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <>
      <h1>Welcome on My Social Network.</h1>
      <p>This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
      {isAuthenticated &&
        <>
          <h2>fuck {user.username}</h2>
          <input type="text" placeholder="your shitty message" onChange={(e) => setMsg(e.target.value)} value={msg} />
          <button onClick={addPost}>Add your post</button>
        </>
      }
      <div>
        <ul>
          {posts.map((post) => {
            if (!post.text || !post.user) {
              return
            }
            return (
              <li>
                {isAuthenticated && post.user.id === user.id && edit !== post.id &&
                  <>
                    <img src={Trash} alt="delete post" onClick={() => deletePost(post)} style={{ height: "1em" }} />
                    <button onClick={() => setEdit(post.id)}>Edit</button>
                  </>
                }
                <b>{post.user.username}</b> :
                {edit !== post.id &&
                  <>
                    {post.text}
                  </>
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
    </>
  )
}

export default Home;
