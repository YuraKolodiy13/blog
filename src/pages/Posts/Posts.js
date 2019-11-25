import React, {Component} from 'react'
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import {Link} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import './Posts.scss'
import Button from '@material-ui/core/Button';
import Authors from "../../components/Authors/Authors";
import Helmet from 'react-helmet'

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
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <div className="posts__list">
          <h1>List of articles</h1>
          <div className="posts__items">
            {this.props.posts.map((item, key) =>
              <div key={key} className='posts__item'>
                <h4><Link to={`post/${item._id}`}>{item.title}</Link></h4>
                <div className="posts__info">
                  <p><Link to={`/user/${item.author._id}`}>{item.author.name}</Link></p>
                  <time>{new Date(item.date).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</time>
                  <span>{item.comments.length ? `${item.comments.length} Replies` : 'No Reply'}</span>
                </div>
                <p>{item.image}</p>
                <p className='posts__description'>{item.text.length > 150 ? item.text.slice(0, 150) + '...' : item.text}</p>
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
        <Authors posts={this.props.posts}/>
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