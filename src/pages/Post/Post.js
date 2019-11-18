import React, {Component} from 'react'
import {connect} from "react-redux";
import {getPost,} from "../../store/actions/postsAction";
// import {Link} from "react-router-dom";

class Post extends Component{
  componentDidMount(){
    this.props.getPost(this.props.match.params.id)
  }
  render(){
    return(
      <div className='container'>
        <h1>List of articles</h1>
        <div className="posts__items">
          <h2>{this.props.post.title}</h2>
          <p>{this.props.post.text}</p>
          <p>{this.props.post.author ? this.props.post.author.name : null}</p>
          <time>{this.props.post.date}</time>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    post: state.posts.post
  }
};
const mapDispatchToProps = {
  getPost: getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(Post)