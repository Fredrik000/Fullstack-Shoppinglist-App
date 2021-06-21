import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import useHttp from 'hooks/useHttp';

function Login(props) {
  const history = useHistory();
  const { sendRequest: sendLoggedInUser } = useHttp();

  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    if (token) {
      localStorage.setItem('token', JSON.stringify({ token }));
    }

    let user = {
      name: result.givenName,
      email: result.email,
    };

    sendLoggedInUser({
      url: 'http://localhost:5000/api/user',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { user },
    });

    props.setUser(user);
    props.onLogin(true);
    props.onWelcome(true);
    history.replace('/');
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccessful. Try again.');
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
            Google Sign in
          </Button>
        )}
        buttonText='Login'
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </Card>
  );
}

export default Login;
