import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     BasicResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: 'API is working...'
 *     BasicResponseError:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: 'API is not working...'
 */

/**
 * @openapi
 * paths:
 *   /api:
 *     get:
 *       tags:
 *         - Testing
 *       summary: Testing API
 *       description: For testing API is working correctly or not
 *       responses:
 *         200:
 *           description: App is up and running
 *           content:
 *             application/json:
 *           schema:
 *             $ref: '#/components/schemas/BasicResponse'
 *         400:
 *           description: App is not running
 *           content:
 *             application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicResponseError'
 *
 *
 */
router.route('/').get((req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: true, message: 'API is working...' });
  } catch (error) {
    res.status(400).json({ status: false, message: 'API is not working...' });
  }
});

export default router;
