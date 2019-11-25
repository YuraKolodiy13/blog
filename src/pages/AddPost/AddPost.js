import React, {Component} from 'react'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import Button from '@material-ui/core/Button';
import {addPost} from "../../store/actions/postsAction";
import {connect} from "react-redux";
import './AddPost.scss'
import {Helmet} from "react-helmet";

class AddPost extends Component{

  constructor(props){
    super(props);
    this.state = {
      title: '',
      text: ''
    };
  }

  componentDidMount(){
    if(!this.props.user){
      this.props.history.push('/login')
    }
  }
  componentDidUpdate(){
    if(!this.props.user){
      this.props.history.push('/login')
    }
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addPost(this.state, this.props.history)
  };

  onBlur = e => {
    e.target.closest('.MuiFormControl-root').classList.remove('trigger')
  };
  //
  // changeI = e => {
  //   const input = e.target;
  //   if (input.files && input.files[0]) {
  //     const file = input.files[0];
  //     const name = input.files[0].name;
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       input.parentElement.style.backgroundImage = "url('" + e.target.result + "')";
  //       this.setState({
  //         fileData: file,
  //         fileName: name,
  //         errors: {file: false}
  //       });
  //     };
  //     console.log(file, 333)
  //     reader.readAsDataURL(file);
  //   }
  // }

  render(){
    return(
      <div className='container'>
        <Helmet>
          <title>Add post</title>
        </Helmet>
        <ValidatorForm onSubmit={this.onSubmit} className='addPost trigger__wrap'>
          <TextValidator
            id="outlined-basic"
            className='trigger'
            label="Title"
            variant="outlined"
            name='title'
            value={this.state.title}
            onChange={this.changeValue}
            onBlur={this.onBlur}
            validators={['required', 'minStringLength:2']}
            errorMessages={['This field is required', 'Need at least 2 characters']}
          />
          {/*<TextValidator*/}
            {/*id="outlined-basic"*/}
            {/*className='trigger'*/}
            {/*label="image"*/}
            {/*name='image'*/}
            {/*value={this.state.image}*/}
            {/*type='file'*/}
            {/*onChange={this.changeI}*/}
          {/*/>*/}
          <TextValidator
            id="outlined-multiline-static"
            className='trigger'
            label="Text"
            multiline
            rows="7"
            value={this.state.text}
            margin="normal"
            variant="outlined"
            name='text'
            onChange={this.changeValue}
            onBlur={this.onBlur}
            validators={['required', 'minStringLength:5']}
            errorMessages={['This field is required', 'Need at least 5 characters']}
          />
          <Button
            variant="contained"
            color="secondary"
            type='submit'
            className='button'
            onClick={e => e.target.closest('.addPost').classList.remove('trigger__wrap')}
          >Add</Button>
        </ValidatorForm>
      </div>
    )
  }
}

const mapsStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  addPost: addPost
};

export default connect(mapsStateToProps, mapDispatchToProps)(AddPost)