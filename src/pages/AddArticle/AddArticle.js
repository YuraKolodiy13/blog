import React, {Component} from 'react'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import Button from '@material-ui/core/Button';
import {addPost} from "../../store/actions/postsAction";
import {connect} from "react-redux";
import './AddArticle.scss'

class AddArticle extends Component{

  constructor(props){
    super(props);
    this.state = {
      title: '',
      text: '',
      email: ''
    }
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addPost(this.state);
  };

  render(){
    return(
      <div className='container'>
        <ValidatorForm onSubmit={this.onSubmit} className='addArticle' onError={errors => console.log(errors)}>
          <TextValidator
            id="outlined-basic"
            label="Title"
            variant="outlined"
            name='title'
            value={this.state.title}
            onChange={this.changeValue}
            validators={['required', 'matchRegexp:^.{2,}$']}
            errorMessages={['This field is required', 'Need at least 2 characters']}
          />
          <TextValidator
            id="outlined-multiline-static"
            label="Text"
            multiline
            rows="7"
            value={this.state.text}
            margin="normal"
            variant="outlined"
            name='text'
            onChange={this.changeValue}
            validators={['required', 'matchRegexp:^.{6,}$']}
            errorMessages={['This field is required', 'Need at least 6 characters']}
          />
          <Button
            variant="contained"
            color="secondary"
            type='submit'
            className='button'
          >Add</Button>
        </ValidatorForm>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    articles: state.auth.articles
  }
};

const mapDispatchToProps = {
  addPost: addPost
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle)