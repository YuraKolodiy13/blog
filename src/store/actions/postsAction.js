import {
  ADD_POST,
  DELETE_POST,
  GET_POST_START,
  GET_POST_SUCCESS,
  GET_POSTS_START,
  GET_POSTS_SUCCESS,
  EDIT_POST, ADD_COMMENT
} from "./actionType";
import axios from "axios/index";

export const addPost = (post, history) => async dispatch => {
  try{
    const res = await axios.post('/api/posts', post);
    dispatch({
      type: ADD_POST,
      posts: res.data
    })
  }catch (e) {
    console.log(e)
  }
  history.push('/')
};

export const getPosts = () => async dispatch => {
  dispatch({
    type: GET_POSTS_START
  });
  const res = await axios.get('/api/posts');
  dispatch({
    type: GET_POSTS_SUCCESS,
    posts: res.data
  })
};

export const getPost = id => async dispatch => {
  dispatch({
    type: GET_POST_START
  });
  const res = await axios.get(`/api/posts/${id}`);
  dispatch({
    type: GET_POST_SUCCESS,
    post: res.data
  })
};

export const deletePost = (id, history) => async dispatch => {
  await axios.delete(`/api/posts/${id}`);
  dispatch({
    type: DELETE_POST
  });
  history.replace('/')
};

export const editPost = (id, post) => async dispatch => {
  await axios.put(`/api/posts/${id}`, post);
  dispatch({
    type: EDIT_POST
  })
}
export const addComment = (id, comment) => async dispatch => {
  const res = await axios.post(`/api/posts/comment/${id}`, comment);
  dispatch({
    type: ADD_COMMENT,
    post: res.data
  })
}