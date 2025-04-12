import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import axios from 'axios';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
];

const Translator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const handleTranslation = async () => {
    try {
      const response = await axios.post('https://api.groq.com/translate', {
        text: inputText,
        source_lang: sourceLang,
        target_lang: targetLang,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      setOutputText(response.data.translated_text);
    } catch (error) {
      console.error('Translation error:', error);
      // Handle error appropriately
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', audioBlob);
        formData.append('source_lang', sourceLang);
        formData.append('target_lang', targetLang);

        try {
          const response = await axios.post('https://api.groq.com/speech-to-text', formData, {
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          setInputText(response.data.text);
          handleTranslation();
        } catch (error) {
          console.error('Speech recognition error:', error);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Language Translator
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Source Language</InputLabel>
              <Select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                label="Source Language"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate"
              variant="outlined"
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <IconButton
                color={isRecording ? 'secondary' : 'primary'}
                onClick={isRecording ? stopRecording : startRecording}
                size="large"
              >
                {isRecording ? <StopIcon /> : <MicIcon />}
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Target Language</InputLabel>
              <Select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                label="Target Language"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={outputText}
              placeholder="Translation will appear here"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTranslation}
            disabled={!inputText}
          >
            Translate
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Translator; 