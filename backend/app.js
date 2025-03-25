import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.use(notFoundHandler);

export default app;

