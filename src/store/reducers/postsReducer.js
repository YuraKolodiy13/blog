import {ADD_POST, GET_POST, GET_POSTS} from "../actions/actionType";

const initialState = {
  posts: [],
  post: {}
};

const postReducer = (state = initialState, action) => {
  switch (action.type){
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.posts]
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    case GET_POST:
      return {
        ...state,
        post: action.post
      };

    default:
      return state
  }
};

export default postReducer