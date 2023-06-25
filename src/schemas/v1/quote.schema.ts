import { z } from 'zod';
import { LANGUAGES } from '@models/v1/quote.model';

/**
 * @openapi
 * components:
 *   schemas:
 *     Language:
 *       type: string
 *       enum:
 *         - arabic
 *         - bengali
 *         - chineese
 *         - english
 *         - french
 *         - german
 *         - greek
 *         - hindi
 *         - italian
 *         - japaneese
 *         - portuguese
 *         - russian
 *         - spanish
 *     QuoteInput:
 *       type: object
 *       required:
 *         - message
 *         - speaker
 *         - language
 *       properties:
 *         message:
 *           type: string
 *           default: You will face many defeats in life, but never let yourself be defeated
 *         speaker:
 *           type: string
 *           default: Maya Angelou
 *         language:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *           default: english
 *     Quote:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         message:
 *           type: string
 *         speaker:
 *           type: string
 *         language:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export const createQuoteSchema = z.object({
  body: z.object({
    message: z
      .string({
        required_error: 'Quote is required',
        invalid_type_error: 'Quote must be a string',
      })
      .trim()
      .min(1, { message: 'Quote cannot be empty' })
      .max(255, { message: 'Quote cannot be more than 255 characters long' }),
    speaker: z
      .string({
        required_error: 'Speaker is required',
        invalid_type_error: 'Name of a speaker must be a string',
      })
      .trim()
      .min(1, { message: 'Name of the speaker cannot be empty' })
      .max(100, {
        message: 'Name of the speaker cannot be more than 100 characters long',
      }),
    language: z.enum(LANGUAGES, {
      errorMap: (issue, ctx) => {
        return { message: 'Please select a valid language from the dropdown' };
      },
    }),
  }),
});

export const getQuoteSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'ID of the quote is required',
    }),
  }),
});

export type TCreateQuoteSchema = z.TypeOf<typeof createQuoteSchema>;
export type TGetQuoteSchema = z.TypeOf<typeof getQuoteSchema>;
