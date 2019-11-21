import React, {Component} from 'react'
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import {Link} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import './Posts.scss'
import Button from '@material-ui/core/Button';

class Posts extends Component{
  componentDidMount(){
    this.props.getPosts()
  }
  render(){
    if(this.props.loading){
      return <Loader/>
    }
    return(
      <div className='posts'>
        <h1>List of articles</h1>
        <div className="posts__items">
          {this.props.posts.map((item, key) =>
            <div key={key} className='posts__item'>
              <h4><Link to={`post/${item._id}`}>{item.title}</Link></h4>
              <h4><Link to={`post/${item._id}`}>{item.title2}</Link></h4>
              <div className="posts__info">
                <p>{item.author.name}</p>
                <time>{item.date}</time>
              </div>
              <p>{item.image}</p>
              <p>{item.text.length > 100 ? item.text.slice(0, 100) + '...' : item.text}</p>
              <Button
                variant="contained"
                color="primary"
                className='button'
              >
                <Link to={`post/${item._id}`}>Read More</Link>
              </Button>
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
    loading: state.posts.loading
  }
};
const mapDispatchToProps = {
  getPosts: getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts)