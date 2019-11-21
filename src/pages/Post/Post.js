import React, {Component} from 'react'
import {connect} from "react-redux";
import {deletePost, getPost} from "../../store/actions/postsAction";
import Loader from "../../components/Loader/Loader";
import Button from '@material-ui/core/Button';

import EditPost from "../../components/EditPost/EditPost";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import AddComment from "../../components/AddComment/AddComment";
import {Link} from  'react-router-dom'
import Comments from "../../components/Comments/Comments";

class Post extends Component{

  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidMount(){
    this.props.getPost(this.props.match.params.id)
  }

  closeModal = () => {
    this.setState({open: false})
  };

  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  render(){
    const {post, user, deletePost} = this.props;
    if(this.props.loading){
      return <Loader/>
    }
    return(
      <div className="post">
        <h1>{post.title}</h1>
        <p>{post.text}</p>
        <p>{post.author ? post.author.name : null}</p>
        <time>{post.date}</time>
        {post.author && user && user.id === post.author._id
          ? <div className='post__edit'>
            <Button
              variant="contained"
              color="primary"
              className='button'
              onClick={() => this.setState({open: true})}
            >Edit</Button>
            <Dialog
              className='container'
              open={this.state.open}
              onClose={() => this.setState({open: false})}
              TransitionComponent={this.Transition}
              keepMounted
            >
              <DialogContent >
                <div >
                  <EditPost post={post} id={this.props.match.params.id} open={this.state.open} closeModal={this.closeModal}/>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="contained"
              color="secondary"
              className='button'
              onClick={() => deletePost(this.props.match.params.id, this.props.history)}
            >Remove</Button>
          </div>
          : null }
          {post.comments
          ? <Comments comments={post.comments} post={post}/>
          : null}

        {user
          ? <AddComment id={this.props.match.params.id} />
          : <div>
              <p>If you want to add comment please <Link to='/login'>sign in</Link> or <Link to='/register'>sign up</Link></p>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    post: state.posts.post,
    loading: state.posts.loading
  }
};
const mapDispatchToProps = {
  getPost: getPost,
  deletePost: deletePost
};

export default connect(mapStateToProps, mapDispatchToProps)(Post)