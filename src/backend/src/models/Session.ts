import mongoose, { Document, Schema } from 'mongoose';
import { Session as ISession, AgentType } from '../types';

export interface SessionDocument extends Omit<ISession, 'id'>, Document {}

const sessionSchema = new Schema<SessionDocument>({
  userId: { type: String, required: true },
  activeAgents: [{ type: String, enum: ['marketing', 'sales', 'finance', 'operations'] }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt timestamp before saving
sessionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Session = mongoose.model<SessionDocument>('Session', sessionSchema); 