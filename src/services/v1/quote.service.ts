import Quote from '@models/v1/quote.model';
import type { IQuoteInput, IQuote } from '@models/v1/quote.model';
import CustomError, { ErrorCode, ErrorType } from '@utils/custom-error';
import mongoose from 'mongoose';

export const getQuotes = async (): Promise<IQuote[] | CustomError> => {
  try {
    const quotes = await Quote.find()
      .select({
        id: 1,
        message: 1,
        speaker: 1,
        language: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .sort({
        createdAt: -1,
      });
    return quotes;
  } catch (err: any) {
    const error = new CustomError(
      'Error while reading data from the database',
      ErrorCode.INTERNAL_SERVER_ERROR,
      ErrorType.DATABASE
    );
    return error;
  }
};

export const createQuote = async (
  quoteInput: IQuoteInput
): Promise<IQuote | CustomError> => {
  try {
    const quote = await Quote.create(quoteInput);
    return quote;
  } catch (err: any) {
    const error = new CustomError(
      'Error while writing data into the database',
      ErrorCode.INTERNAL_SERVER_ERROR,
      ErrorType.DATABASE
    );
    return error;
  }
};

export const getQuote = async (id: string): Promise<IQuote | CustomError> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new CustomError(
        `No quote found with the given id`,
        ErrorCode.BAD_REQUEST,
        ErrorType.CLIENT
      );
      throw error as ICustomError;
    }

    const quote = await Quote.findOne({ _id: id }).select({
      id: 1,
      message: 1,
      speaker: 1,
      language: 1,
      createdAt: 1,
      updatedAt: 1,
    });

    if (quote != null) {
      return quote;
    } else {
      const error = new CustomError(
        `No quote found with the given id`,
        ErrorCode.BAD_REQUEST,
        ErrorType.NOT_FOUND
      );
      throw error as ICustomError;
    }
  } catch (error: any) {
    return error as CustomError;
  }
};

export const updateQuote = async (
  id: string,
  quoteInput: IQuoteInput
): Promise<IQuote | CustomError> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new CustomError(
        `No quote found with the given id`,
        ErrorCode.BAD_REQUEST,
        ErrorType.CLIENT
      );
      throw error as ICustomError;
    }

    const quote = await Quote.findOne({ _id: id });

    if (quote == null) {
      const error = new CustomError(
        `No quote found with the given id`,
        ErrorCode.BAD_REQUEST,
        ErrorType.NOT_FOUND
      );
      throw error as ICustomError;
    }

    const updatedQuote = await Quote.findOneAndUpdate({ _id: id }, quoteInput, {
      new: true,
    });

    if (updatedQuote != null) {
      return updatedQuote;
    } else {
      const error = new CustomError(
        'Error while updating data into the database',
        ErrorCode.INTERNAL_SERVER_ERROR,
        ErrorType.DATABASE
      );
      throw error as ICustomError;
    }
  } catch (error: any) {
    return error as CustomError;
  }
};

export const deleteQuote = async (id: string): Promise<true | CustomError> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new CustomError(
        `No quote found with the given id`,
        ErrorCode.BAD_REQUEST,
        ErrorType.NOT_FOUND
      );
      throw error as ICustomError;
    }

    const quote = await Quote.findOne({ _id: id });

    if (quote == null) {
      const error = new CustomError(
        `No quote found with the given id`,
        ErrorCode.BAD_REQUEST,
        ErrorType.NOT_FOUND
      );
      throw error as ICustomError;
    }

    const deletedQuote = await Quote.deleteOne({ _id: id });

    if (deletedQuote != null) {
      return true;
    } else {
      const error = new CustomError(
        'Error while deleting data from the database',
        ErrorCode.INTERNAL_SERVER_ERROR,
        ErrorType.DATABASE
      );
      throw error as ICustomError;
    }
  } catch (error: any) {
    return error as CustomError;
  }
};
