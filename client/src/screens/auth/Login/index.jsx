/* eslint-disable no-undef */
import { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedEmail = process.env.REACT_APP_LOGIN_EMAIL;
    const storedPassword = process.env.REACT_APP_LOGIN_PASSWORD;

    if (email === storedEmail && password === storedPassword) {
      // Store the email in localStorage
      localStorage.setItem('userEmail', email);
      navigate('/'); // Redirect to the home page after successful login
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="xs" className="flex justify-center items-center h-screen">
      <Box className="bg-white p-8 rounded-lg shadow-xl w-full" component="form" onSubmit={handleLogin}>
        <Typography variant="h4" align="center" className="text-green-600 font-serif font-bold mb-6">
          Login
        </Typography>

        {error && <Typography color="error" className="mb-4">{error}</Typography>}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6"
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          className="bg-green-600 hover:bg-green-700"
          type="submit"
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
