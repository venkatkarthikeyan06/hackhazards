import React from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TranslateIcon from '@mui/icons-material/Translate';
import MicIcon from '@mui/icons-material/Mic';
import HistoryIcon from '@mui/icons-material/History';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h3" gutterBottom align="center">
        Welcome to Language Translator
      </Typography>
      <Typography variant="h6" gutterBottom align="center" color="text.secondary">
        Break down language barriers with our powerful translation tool
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TranslateIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Text Translation
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Translate text between multiple languages with high accuracy using Groq's advanced AI technology.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => navigate('/translator')}
            >
              Start Translating
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MicIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Voice Translation
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Speak naturally and get instant translations. Perfect for conversations and meetings.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => navigate('/translator')}
            >
              Start Speaking
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HistoryIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Translation History
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Access your previous translations and save your favorite phrases for quick reference.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => navigate('/history')}
            >
              View History
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 