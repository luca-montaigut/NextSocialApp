import { NEW_POST, LOAD_POSTS, DELETE_POST } from '../actions/actionTypes';

const initialState = {
  posts: [],
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: state.posts.concat(action.posts)
      }
    case NEW_POST:
      return {
        ...state,
        posts: state.posts.concat(action.newPost)
      }
    case DELETE_POST:
      const updatedPosts = state.posts.filter((post) => post.id !== action.toDeletePost.id)
      return {
        ...state,
        posts: updatedPosts
      }
    default:
      return state
  }
}

export default postsReducer