import type { Request, Response, NextFunction } from 'express';
import {
  createQuote,
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
} from '@services/v1/quote.service';
import type { IQuoteInput, IQuote } from '@models/v1/quote.model';
import type {
  TCreateQuoteSchema,
  TGetQuoteSchema,
} from '@schemas/v1/quote.schema';
import _ from 'lodash';
import CustomError from '@utils/custom-error';

export const getQuotesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const quotes: IQuote[] | CustomError = await getQuotes();

    if (quotes instanceof CustomError) {
      throw quotes as ICustomError;
    }

    res.status(200).json({
      status: true,
      message: 'All Quotes',
      data: {
        quotes,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const createQuoteHandler = async (
  req: Request<Record<string, unknown>, any, TCreateQuoteSchema['body']>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const quoteData: IQuoteInput = _.pick(req.body, [
      'message',
      'speaker',
      'language',
    ]);
    const quote: IQuote | CustomError = await createQuote(quoteData);

    if (quote instanceof CustomError) {
      throw quote as ICustomError;
    }

    res.status(201).json({
      status: true,
      message: 'Quote saved successfully',
      data: {
        quote: {
          id: quote._id,
          message: quote.message,
          speaker: quote.speaker,
          language: quote.language,
          createdAt: quote.createdAt,
          updatedAt: quote.updatedAt,
        },
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getQuoteHandler = async (
  req: Request<TGetQuoteSchema['params']>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const quote: IQuote | CustomError = await getQuote(id);

    if (quote instanceof CustomError) {
      throw quote as ICustomError;
    }

    res.status(200).json({
      status: true,
      message: 'Got quote successfully',
      data: {
        quote: {
          id: quote._id,
          message: quote.message,
          speaker: quote.speaker,
          language: quote.language,
          createdAt: quote.createdAt,
          updatedAt: quote.updatedAt,
        },
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateQuoteHandler = async (
  req: Request<TGetQuoteSchema['params'], any, TCreateQuoteSchema['body']>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const quoteData: IQuoteInput = _.pick(req.body, [
      'message',
      'speaker',
      'language',
    ]);
    const quote: IQuote | CustomError = await updateQuote(id, quoteData);

    if (quote instanceof CustomError) {
      throw quote as ICustomError;
    }

    res.status(200).json({
      status: true,
      message: 'Quote updated successfully',
      data: {
        quote: {
          id: quote._id,
          message: quote.message,
          speaker: quote.speaker,
          language: quote.language,
          createdAt: quote.createdAt,
          updatedAt: quote.updatedAt,
        },
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteQuoteHandler = async (
  req: Request<TGetQuoteSchema['params']>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const quote: boolean | CustomError = await deleteQuote(id);

    if (quote instanceof CustomError) {
      throw quote as ICustomError;
    }

    res.status(200).json({
      status: true,
      message: 'Quote deleted successfully',
      data: {
        quote: {
          id,
        },
      },
    });
  } catch (error: any) {
    next(error);
  }
};
