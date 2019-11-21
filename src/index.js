import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from "./components/App/App";
import store from './store/store'
import js_cookie from 'js-cookie'
import jwt_decode from 'jwt-decode'
import {logout, setCurrentUser} from "./store/actions/authAction";

const jwt = js_cookie.get('jwt');
if(jwt){
  const decoded = jwt_decode(jwt);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    store.dispatch(logout());
    window.location.href='/login'
  }
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.querySelector('#root'));