import React from 'react';
import GoogleLogin from 'react-google-login';
import { Card, Button } from 'react-bootstrap';

function Login(props) {
  const responseGoogle = (response) => {
    console.log(response);
    props.onLogin(true);
  };
  return (
    <Card className='align-items-center p-3 border-0 rounded-0'>
      <Card.Title>Please Login</Card.Title>
      <GoogleLogin
        clientId='21893583680-u7nbf9bilobb0fu0gtbhvhavtknhuufj.apps.googleusercontent.com'
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant='danger'
          >
            Sign in with Google
          </Button>
        )}
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </Card>
  );
}

export default Login;
