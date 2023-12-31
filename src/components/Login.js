import React from "react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Icon } from "semantic-ui-react";
import md5 from "md5";
function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const values = {
      username: event.target.name.value,
      password: md5(event.target.password.value),
    };
    axios
      .post("http://localhost:3000/authenticate", values)
      .then((response) => {
        signIn({
          token: response.data.token,
          expiresIn: 600,
          tokenType: "Bearer",
          authState: { name: values.username },
        });
        toast.success(
          <p>
            Giriş başarılı! Hoş geldin <strong>{values.username}</strong>
          </p>,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        event.target.name.value = "";
        event.target.password.value = "";
        navigate("/home");
      })
      .catch((err) => {
        toast.error(`Kullanıcı adı veya şifre hatalı!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
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
          <Button animated type="submit">
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
