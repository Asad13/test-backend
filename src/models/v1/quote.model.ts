import { Schema, model, type Document } from 'mongoose';

export const LANGUAGES = [
  'arabic',
  'bengali',
  'chineese',
  'english',
  'french',
  'german',
  'greek',
  'hindi',
  'italian',
  'japaneese',
  'portuguese',
  'russian',
  'spanish',
] as const;

export interface IQuoteInput {
  message: string;
  speaker: string;
  language: string;
}

// export interface IQuoteOutput extends IQuoteInput {
//   id: Schema.Types.ObjectId;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface IQuote extends IQuoteInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const quoteSchema = new Schema<IQuote>(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: 1,
      maxlength: 255,
    },
    speaker: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: 1,
      maxlength: 100,
    },
    language: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: LANGUAGES,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

const Quote = model<IQuote>('Quote', quoteSchema);

export default Quote;
