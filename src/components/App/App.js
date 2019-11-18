import React, {Component} from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import Posts from "../../pages/Posts/Posts";
import Post from "../../pages/Post/Post";
import Header from "../Header/Header";
import Login from "../../pages/Auth/Login/Login";
import Register from "../../pages/Auth/Register/Register";
import AddArticle from "../../pages/AddArticle/AddArticle";

class App extends Component{
  render(){
    return(
      <div className='container'>
        <Header/>
        <Switch>
          <Route path='/' component={Posts} exact/>
          <Route path='/post/:id' component={Post} exact/>
          <Route path='/add' component={AddArticle}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Redirect to='/'/>
        </Switch>
      </div>
    )
  }
}

export default App