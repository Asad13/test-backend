/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import validate from '../../middlewares/v1/data-validation';
import {
  createQuoteSchema,
  getQuoteSchema,
} from '../../schemas/v1/quote.schema';
import {
  getQuotesHandler,
  createQuoteHandler,
  getQuoteHandler,
  updateQuoteHandler,
  deleteQuoteHandler,
} from '../../controllers/v1/quote.controller';

const router = Router();

/**
 * @openapi
 * paths:
 *   /api/v1/quotes:
 *     get:
 *       tags:
 *         - Quotes
 *       summary: GET Quotes
 *       description: Get all the quotes from the database
 *       responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: true
 *                   message:
 *                     type: string
 *                     default: All Quotes
 *                   data:
 *                     type: object
 *                     properties:
 *                       quotes:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Quote'
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: false
 *                   message:
 *                     type: string
 *                     default: Error while reading data from the database
 *     post:
 *       tags:
 *         - Quotes
 *       summary: Create Quote
 *       description: Save a new quote to the database
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuoteInput'
 *       responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: true
 *                   message:
 *                     type: string
 *                     default: Quote saved successfully
 *                   data:
 *                     type: object
 *                     properties:
 *                       quote:
 *                         $ref: '#/components/schemas/Quote'
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: false
 *                   message:
 *                     type: string
 *                     default: Error while writing data into the database
 */
router
  .route('/')
  .get(getQuotesHandler)
  .post(validate(createQuoteSchema), createQuoteHandler);

/**
 * @openapi
 * paths:
 *   /api/v1/quotes/{id}:
 *     get:
 *       tags:
 *         - Quotes
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Quote ID
 *           required: true
 *           schema:
 *             type: string
 *       summary: GET Quote
 *       description: Get details of a quote by ID
 *       responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: true
 *                   message:
 *                     type: string
 *                     default: Got quote successfully
 *                   data:
 *                     type: object
 *                     properties:
 *                       quote:
 *                         $ref: '#/components/schemas/Quote'
 *         400:
 *           description: Resource Not Found Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: false
 *                   message:
 *                     type: string
 *                     default: No quote found with the given id
 *     put:
 *       tags:
 *         - Quotes
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Quote ID
 *           required: true
 *           schema:
 *             type: string
 *       summary: Update Quote
 *       description: Update the values of a existing quote
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuoteInput'
 *       responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: true
 *                   message:
 *                     type: string
 *                     default: Quote updated successfully
 *                   data:
 *                     type: object
 *                     properties:
 *                       quote:
 *                         $ref: '#/components/schemas/Quote'
 *         400:
 *           description: Resource Not Found Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: false
 *                   message:
 *                     type: string
 *                     default: No quote found with the given id
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: false
 *                   message:
 *                     type: string
 *                     default: Error while updating data into the database
 *     delete:
 *       tags:
 *         - Quotes
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Quote ID
 *           required: true
 *           schema:
 *             type: string
 *       summary: Delete Quote
 *       description: Delete a Quote from the database
 *       responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: true
 *                   message:
 *                     type: string
 *                     default: Quote deleted successfully
 *                   data:
 *                     type: object
 *                     properties:
 *                       quote:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *         400:
 *           description: Resource Not Found Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: false
 *                   message:
 *                     type: string
 *                     default: No quote found with the given id
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     default: false
 *                   message:
 *                     type: string
 *                     default: Error while deleting data from the database
 */
router
  .route('/:id')
  .all(validate(getQuoteSchema))
  .get(getQuoteHandler)
  .put(validate(createQuoteSchema), updateQuoteHandler)
  .delete(deleteQuoteHandler);

export default router;
