import { Schema, model, Document } from 'mongoose';
export interface SubtitleData {
  text: string;
  start: number;
  end: number;
}

export interface MovieInformation{
  title: string;
  year?: string;
  tvShow?: boolean;
  season?: string;
  episode?: string;
}

export interface SubtitleDocument extends Document {
  name: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  subtitleData: SubtitleData[];
  movieInformation: MovieInformation;
}


const subtitleSchema = new Schema(
  {
    name: { type: String, required: true },
    subtitleData: { type: Array, required: true },
    movieInformation: { type: Object, required: true },
    path: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Subtitle = model<SubtitleDocument>('Subtitle', subtitleSchema);
