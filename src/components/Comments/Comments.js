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
      text: ''
    }
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state, 111)
    console.log(this.props.id, 222)
    this.props.editComment(this.props.id, this.state)
      .then(() => this.props.getPost(this.props.id));
  }

  render(){
    const {user, post, deleteComment} = this.props;
    return(
      <div className='comments'>
        <h2>{post.comments.length} Comments</h2>
        <div className="comments__items">
          {post.comments.map((item, key) =>
            <div key={key} className='comments__item' data-open="false">
              <h4>{item.author.name} says: {item.author._id === post.author._id ? <span>author</span> : null}</h4>
              <p>{item.text}</p>
              <form onSubmit={this.onSubmit}>
                <TextField
                  id="outlined-multiline-static"
                  label="Type something"
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
                  onClick={(e) => e.target.closest('.comments__item').dataset.open = 'false'}
                >Save</Button>
              </form>

              {user.id === item.author._id
                ?<div className="comments__edit">
                  <Button
                    variant="contained"
                    color="primary"
                    className='button'
                    onClick={(e) => {e.target.closest('.comments__item').dataset.open = 'true'; this.setState({text: item.text})}}
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