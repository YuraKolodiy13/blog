import React, {Component} from 'react'
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import {Link} from  'react-router-dom'

class User extends Component{

  componentDidMount(){
    this.props.getPosts()
  }

  render(){
    return(
      <div>
        <p>{this.props.user.name}</p>
        <p>{this.props.user.email}</p>
        <h2>My posts</h2>
        {this.props.posts.map((item, key) =>
          <ul key={key}>
            {this.props.user.id === item.author
              ? <li>
                  <Link to={`/post/${item._id}`}>{item.title}</Link>
                </li>
              : null}
          </ul>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  posts: state.posts.posts
})

const mapDispatchToProps = {
  getPosts: getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(User)