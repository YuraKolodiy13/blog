import React, {Component} from 'react'
import {connect} from "react-redux";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

import '../index.scss'
import {clearError, loginUser} from "../../../store/actions/authAction";
import {Helmet} from "react-helmet";

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      showPassword: false,
      password: '',
      email: ''
    }
  }

  componentDidUpdate(){
    if(this.props.user){
      this.props.history.push('/')
    }
  }

  componentDidMount(){
    this.props.clearError()
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state);
  };

  render(){
    return(
      <form className='auth' onSubmit={this.onSubmit}>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="form__field">
          <TextField
            type='email'
            value={this.state.email}
            label='Email'
            variant="outlined"
            name='email'
            onChange={this.changeValue}
          />
          {this.props.error.email ? <p>{this.props.error.email}</p> : null}
        </div>
        <div className="form__field">
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.changeValue}
              name='password'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => this.setState({showPassword: !this.state.showPassword})}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          {this.props.error.password ? <p>{this.props.error.password}</p> : null}
        </div>
        <Button
          variant="contained"
          color="primary"
          type='submit'
          className='button'
        >Sign in</Button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    error: state.auth.error
  }
}

const mapDispatchToProps = {
  loginUser: loginUser,
  clearError: clearError
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)