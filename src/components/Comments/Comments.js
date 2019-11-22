import React, {Component} from 'react'
import './Comments.scss'
import Button from '@material-ui/core/Button';
import {deleteComment, editComment} from "../../store/actions/postsAction";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';

class Comments extends Component{

  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  render(){
    const {user, post, deleteComment, editComment} = this.props;
    return(
      <div className='comments'>
        <h2>{post.comments.length} Comments</h2>
        <div className="comments__items">
          {post.comments.map((item, key) =>
            <div key={key} className='comments__item'>
              <h4>{item.author.name} says: {item.author._id === post.author._id ? <span>author</span> : null}</h4>
              {this.state.open
              ? <form onSubmit={this.onSubmit}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Type something"
                    multiline
                    rows="1"
                    name='text'
                    value={this.state.text}
                    onChange={this.changeValue}
                    margin="normal"
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className='button'
                  >Save</Button>
                </form>
              : <p>{item.text}</p>}

              {user.id === item.author._id
                ?<div className="comments__edit">
                  <Button
                    variant="contained"
                    color="primary"
                    className='button'
                    onClick={() => this.setState({open: true})}
                  >Edit</Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className='button'
                    onClick={() => deleteComment(item._id)}
                  >Remove</Button>
                </div>
                : null}

            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    post: state.posts.post
  }
};
const mapDispatchToProps = {
  deleteComment: deleteComment,
  editComment: editComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);