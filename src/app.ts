import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import compression from 'compression';
import responseTime from './middlewares/v1/response-time';
import responseHeaders from './middlewares/v1/response-headers';
import testApiRouter from './routes/v1/testapi';
import v1QuoteRouter from './routes/v1/quote';
import swaggerDoc from './utils/swagger';
import swaggerUi from 'swagger-ui-express';
import {
  logError,
  clientErrorHandler,
  generalErrorHandler,
} from './middlewares/v1/error-handler';
import CustomError, { ErrorCode, ErrorType } from './utils/custom-error';

const app = express();
app.use(responseTime()); // Logs response time for http requests
app.disable('x-powered-by'); // Disabling 'X-Powered-By' response header
app.use(responseHeaders()); // Adding HTTP response headers
app.use(compression()); // For compressing the body of the responses
app.use(express.json({ limit: '5mb' })); // For handling json data
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // For handling form data

app.use('/api', testApiRouter); // For testing API is working correctly or not

app.use('/api/v1/quotes', v1QuoteRouter); // For handling quotes data

/* Swagger Routes */
app.use(
  '/api/docs',
  (req: Request, res: Response, next: NextFunction) => {
    res.header(
      'Content-Security-Policy',
      "default-src 'self';base-uri 'self';connect-src 'self';font-src 'self';form-action 'self';frame-ancestors 'self';img-src 'self' data:;media-src 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' 'unsafe-inline';upgrade-insecure-requests;"
    ); // Content-Security-Policy header(img-src and style-src changed for swagger ui)
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc)
);
app.use('/api/docs.json', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(swaggerDoc);
  } catch (error: any) {
    const err = new CustomError(
      'Error while serving swagger documentation in json format',
      ErrorCode.INTERNAL_SERVER_ERROR,
      ErrorType.SERVER
    );
    next(err);
  }
});

/* Custom 404 Middleware */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use(logError());
app.use(clientErrorHandler());
app.use(generalErrorHandler());

export default app;
