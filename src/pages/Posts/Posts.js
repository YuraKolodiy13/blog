import React, {Component} from 'react'
import {connect} from "react-redux";
import {getPost, getPosts} from "../../store/actions/postsAction";
import {Link} from "react-router-dom";

class Posts extends Component{
  componentDidMount(){
    this.props.getPosts()
  }
  render(){
    return(
      <div className='container'>
        <h1>List of articles</h1>
        <div className="posts__items">
          {this.props.posts.map((item, key) =>
            <div key={key} className='posts__item' style={{border: '1px solid red', marginBottom: '10px'}}>
              <h4><Link to={`post/${item._id}`}>{item.title}</Link></h4>
              <p>{item.text}</p>
              {/*<span>{item.author.name}</span>*/}
              <time>{item.date}</time>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    posts: state.posts.posts,
    post: state.posts.post
  }
};
const mapDispatchToProps = {
  getPosts: getPosts,
  getPost: getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts)