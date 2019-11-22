import React, {Component, Fragment} from 'react'
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
        {/*<p>{this.props.user.name}</p>*/}
        {/*<p>{this.props.user.email}</p>*/}
        <h2>Authors posts</h2>
        {this.props.posts.map((item, key) =>
            <Fragment key={key}>
              {this.props.match.params.id === item.author._id
              ?<ul>
                 <li>
                  <Link to={`/post/${item._id}`}>{item.title}</Link>
                </li>
              </ul>
              : null}
            </Fragment>
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