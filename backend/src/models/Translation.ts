import mongoose, { Document } from 'mongoose';

export interface ITranslation extends Document {
  user: mongoose.Types.ObjectId;
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  isAudio: boolean;
  audioUrl: string | null;
}

const translationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sourceText: {
    type: String,
    required: true,
  },
  translatedText: {
    type: String,
    required: true,
  },
  sourceLang: {
    type: String,
    required: true,
  },
  targetLang: {
    type: String,
    required: true,
  },
  isAudio: {
    type: Boolean,
    default: false,
  },
  audioUrl: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

const Translation = mongoose.model<ITranslation>('Translation', translationSchema);

export default Translation; 