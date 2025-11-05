import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' | 'error' | 'warning' | 'info'
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setSnackbar({
        open: true,
        message: 'Giriş Başarısız!',
        severity: 'error',
      });
      return;
    }

    console.log('Giriş başarılı, kullanıcı:', data.user);
    setTimeout(() => navigate('/admin'), 500);
  };
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Aktif oturum:", data);
    };
    checkSession();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Paper elevation={3} sx={{ p: 4, width: 300, textAlign: 'center', backgroundColor: '#ffaaa5' }}>
        <Typography variant="h6" gutterBottom>Admin Girişi</Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2, '& label': {
              color: 'black', // normal (odaklanmadan önce)
            },
            '& label.Mui-focused': {
              color: 'black', // ✅ tıklanınca üste çıkan label rengi
            }, '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black', // normal durumda
              },
              '&:hover fieldset': {
                borderColor: 'black', // hover durumunda
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // ✅ tıklanınca (focus)
              },
            },
          }}
        />
        <TextField
          label="Parola"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 2, '& label': {
              color: 'black', // normal (odaklanmadan önce)
            },
            '& label.Mui-focused': {
              color: 'black', // ✅ tıklanınca üste çıkan label rengi
            }, '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black', // normal durumda
              },
              '&:hover fieldset': {
                borderColor: 'black', // hover durumunda
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // ✅ tıklanınca (focus)
              },
            },
          }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={handleLogin} sx={{ mt: 2, backgroundColor: 'white', color: 'black' }}>
          Giriş Yap
        </Button>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // ✅ sağ üst köşe
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            minWidth: 300,
            maxWidth: 450,
            width: 'fit-content',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminLogin;
