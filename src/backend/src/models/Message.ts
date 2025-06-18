import mongoose, { Document, Schema } from 'mongoose';
import { Message as IMessage } from '../types';

export interface MessageDocument extends Omit<IMessage, 'id'>, Document {}

const messageSchema = new Schema<MessageDocument>({
  sessionId: { type: Schema.Types.ObjectId as any, ref: 'Session', required: true },
  content: { type: String, required: true },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Message = mongoose.model<MessageDocument>('Message', messageSchema); 