import {ADD_POST, GET_POST, GET_POSTS} from "./actionType";
import axios from "axios/index";

export const addPost = addArticleData => async dispatch => {
  try{
    const res = await axios.post('/api/posts', addArticleData);
    dispatch({
      type: ADD_POST,
      posts: res.data
    })
  }catch (e) {
    console.log(e)
  }
};

export const getPosts = () => async dispatch => {
  const res = await axios.get('/api/posts');
  dispatch({
    type: GET_POSTS,
    posts: res.data
  })
};

export const getPost = id => async dispatch => {
  const res = await axios.get(`/api/posts/${id}`);
  dispatch({
    type: GET_POST,
    post: res.data
  })
};