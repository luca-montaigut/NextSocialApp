import * as actionTypes from './actionTypes';

export const loadPosts = (posts) => {
    return {
        type: actionTypes.LOAD_POSTS,
        posts: posts
    }
}

export const newPost = (post) => {
    return {
        type: actionTypes.NEW_POST,
        newPost: post
    }
}

export const deletePost = (post) => {
    return {
        type: actionTypes.DELETE_POST,
        toDeletePost: post
    }
}
