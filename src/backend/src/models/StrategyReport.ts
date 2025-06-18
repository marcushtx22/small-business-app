import mongoose, { Document, Schema } from 'mongoose';
import { StrategyReport as IStrategyReport } from '../types';

export interface StrategyReportDocument extends Omit<IStrategyReport, 'id'>, Document {}

const strategyReportSchema = new Schema<StrategyReportDocument>({
  sessionId: { type: Schema.Types.ObjectId as any, ref: 'Session', required: true },
  content: { type: String, required: true },
  insights: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export const StrategyReport = mongoose.model<StrategyReportDocument>('StrategyReport', strategyReportSchema); 