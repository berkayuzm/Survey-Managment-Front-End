import React from "react";
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

import { Button, Form, Icon } from "semantic-ui-react";
function Login() {
const signIn=useSignIn();
const navigate=useNavigate();
   const handleSubmit=(event)=>{
    event.preventDefault();
    const values={
        username:event.target.name.value,
        password:event.target.password.value
    }
    event.target.name.value="";
    event.target.password.value="";
    axios.post("http://localhost:3000/authenticate",values).then((response)=>{
    signIn({
        token:response.data.token,
        expiresIn:600,
        tokenType:"Bearer",
        authState:{name:values.username}
    }) 
    console.log("Giriş başarılı")
    navigate("/home")
    console.log(response)
    }).catch(err=>console.log(err))}
  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit} className="form-container">
        <label className="label-text">Username</label>

        <Form.Input
          name="name"
          className="label-text"
          icon="user"
          iconPosition="left"
          placeholder="Username"
        />
        <label className="label-text">Password</label>

        <Form.Input
          name="password"
          icon="lock"
          iconPosition="left"
          type="password"
          placeholder="Password"
        />
        <Button animated type="submit" >
          <Button.Content visible>Giris</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
      </Form>
    </div>
  );
}

export default Login;
