import express from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Translation, { ITranslation } from '../models/Translation';
import User from '../models/User';

const router = express.Router();

interface AuthRequest extends express.Request {
  user?: {
    userId: string;
  };
}

interface TranslateRequest extends AuthRequest {
  body: {
    text: string;
    sourceLang: string;
    targetLang: string;
    isAudio?: boolean;
  };
}

// Middleware to verify JWT token
const authMiddleware = async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Translate text
router.post('/translate', authMiddleware, async (req: TranslateRequest, res: express.Response) => {
  try {
    const { text, sourceLang, targetLang, isAudio } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Call Groq API for translation
    const response = await axios.post(
      'https://api.groq.com/v1/translate',
      {
        text,
        source_language: sourceLang,
        target_language: targetLang
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const translatedText = response.data.translated_text;

    // Save translation to database
    const translation = new Translation({
      user: userId,
      sourceText: text,
      translatedText,
      sourceLang,
      targetLang,
      isAudio: isAudio || false
    });

    await translation.save();

    // Update user's translations array
    await User.findByIdAndUpdate(userId, {
      $push: { translations: translation._id }
    });

    res.json({
      translatedText,
      translationId: translation._id
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ message: 'Error translating text' });
  }
});

// Get translation history
router.get('/history', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const translations = await Translation.find({ user: userId })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json(translations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching translation history' });
  }
});

// Delete translation
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    const translationId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const translation = await Translation.findOneAndDelete({
      _id: translationId,
      user: userId
    });

    if (!translation) {
      return res.status(404).json({ message: 'Translation not found' });
    }

    // Remove translation from user's translations array
    await User.findByIdAndUpdate(userId, {
      $pull: { translations: translationId }
    });

    res.json({ message: 'Translation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting translation' });
  }
});

export default router; 